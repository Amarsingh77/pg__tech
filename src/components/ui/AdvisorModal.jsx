import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader, Sparkles, Send, Bot, User, RotateCcw } from 'lucide-react';
import GeminiLogo from './GeminiLogo';
import { coursesData } from '../../data/mockData';

/**
 * A simple exponential backoff retry mechanism for fetch.
 */
const fetchWithRetry = async (url, options, retries = 2, delay = 800) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 429 && retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithRetry(url, options, retries - 1, delay * 2);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 2);
        }
        throw error;
    }
};

/**
 * Smart recommendation fallback based on user query keywords
 */
const getSmartFallbackRecommendation = (userQuery) => {
    const query = userQuery.toLowerCase();
    
    if (query.includes('gen ai') || query.includes('generative') || query.includes('llm') || query.includes('gpt') || query.includes('rag') || query.includes('prompt') || query.includes('data') || query.includes('python') || query.includes('ai') || query.includes('machine learning') || query.includes('math') || query.includes('statistics') || query.includes('analytics')) {
        return "Based on your interest in **Generative AI, LLMs, and Data Science**, I highly recommend our **Post-Graduate Program in Data Science & AI**!\n\nThis course covers Generative AI architectures, Large Language Models (LLMs), machine learning algorithms, and real-world AI deployment.";
    }
    if (query.includes('cloud') || query.includes('aws') || query.includes('devops') || query.includes('server') || query.includes('infrastructure') || query.includes('docker') || query.includes('kubernetes')) {
        return "Based on your interest in systems and scalable infrastructure, our **Certification in Cloud Architecture** is the perfect choice for you!\n\nYou'll master enterprise cloud design, resilience, and modern cloud platforms.";
    }
    if (query.includes('security') || query.includes('cyber') || query.includes('hack') || query.includes('defense') || query.includes('network') || query.includes('privacy')) {
        return "For digital defense and security, our **Diploma in Cybersecurity & InfoSec** is ideally suited for you!\n\nYou'll learn network security, ethical hacking, and threat mitigation hands-on.";
    }
    
    return "Great choice! I recommend our **Advanced Diploma in Full-Stack Engineering**.\n\nIt's our most comprehensive program, covering frontend UI design, backend systems, database management, and building real-world web products.";
};

/**
 * Calls the Gemini API with conversation history.
 */
const callGeminiAPI = async (chatHistory, systemPrompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const latestMessage = chatHistory[chatHistory.length - 1]?.text || '';

    // 1. Official Gemini API key (if provided in .env)
    if (apiKey) {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const contents = chatHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        try {
            const result = await fetchWithRetry(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents,
                    systemInstruction: { parts: [{ text: systemPrompt }] }
                })
            });

            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text;
        } catch (error) {
            console.error("Official Gemini API error, attempting free endpoint:", error);
        }
    }

    // 2. Free Gemini Model Endpoint (No API key needed)
    try {
        const promptContext = systemPrompt + "\n\n" + chatHistory.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n') + "\nAI:";
        const freeEndpointUrl = `https://text.pollinations.ai/${encodeURIComponent(promptContext)}?model=gemini`;
        const response = await fetch(freeEndpointUrl);

        if (response.ok) {
            const text = await response.text();
            if (text && text.trim()) return text.trim();
        }
    } catch (error) {
        console.error("Free Gemini API error:", error);
    }

    // 3. Fallback to smart interest matching
    return getSmartFallbackRecommendation(latestMessage);
};

const SUGGESTIONS = [
    "🤖 I want to specialize in Generative AI & LLMs",
    "💻 I want to build full-stack web apps",
    "📊 I'm interested in Data Science & Machine Learning",
    "🛡️ I want to learn Cybersecurity & Hacking",
    "☁️ I want to master Cloud Architecture"
];

const INITIAL_MESSAGE = {
    id: 1,
    sender: 'ai',
    text: "Hello! 👋 I'm your PGtech GenAI Advisor. Tell me about your career goals, Generative AI interests, or tech background, and I'll help you find the perfect course!"
};

const AdvisorModal = ({ onClose }) => {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const courseList = coursesData.map(c => c.title).join(', ');
    const systemPrompt = `You are a friendly, conversational career counselor for PGtech Institute. Recommend courses from: ${courseList}. Be encouraging, interactive, and keep responses concise (2-4 sentences).`;

    // Auto-scroll chat to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (textToSend) => {
        const query = textToSend || userInput;
        if (!query.trim() || isLoading) return;

        const userMsg = { id: Date.now(), sender: 'user', text: query.trim() };
        const newHistory = [...messages, userMsg];

        setMessages(newHistory);
        setUserInput('');
        setIsLoading(true);

        try {
            const aiReplyText = await callGeminiAPI(newHistory, systemPrompt);
            const aiMsg = { id: Date.now() + 1, sender: 'ai', text: aiReplyText };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "I'm having a brief connection pause, but feel free to ask me again or pick one of the suggestions below!"
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setMessages([INITIAL_MESSAGE]);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative w-full max-w-xl bg-gray-900 rounded-2xl shadow-2xl border border-white/10 text-white flex flex-col h-[620px] max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 px-6 border-b border-gray-800 bg-gray-800/50">
                    <div className="flex items-center">
                        <GeminiLogo />
                        <div className="ml-3">
                            <h3 className="text-xl font-bold flex items-center text-white">
                                AI Advisor Chat
                                <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white font-medium">
                                    Interactive
                                </span>
                            </h3>
                            <p className="text-xs text-gray-400">Ask anything about your tech career path</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleReset}
                            title="Reset Conversation"
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        >
                            <RotateCcw size={18} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.sender === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/30 flex items-center justify-center mr-2.5 mt-0.5 shrink-0">
                                        <Bot size={18} className="text-blue-400" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                        msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                                            : 'bg-gray-800 border border-gray-700 text-gray-100 rounded-tl-none shadow-sm'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                {msg.sender === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center ml-2.5 mt-0.5 shrink-0">
                                        <User size={18} className="text-indigo-400" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center space-x-2 text-gray-400 text-sm pl-2 py-1"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/30 flex items-center justify-center mr-0.5">
                                <Bot size={18} className="text-blue-400" />
                            </div>
                            <div className="bg-gray-800 border border-gray-700 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-2">
                                <Loader className="animate-spin text-blue-400" size={16} />
                                <span className="text-xs text-gray-300">AI Advisor is thinking...</span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Quick Suggestion Pills */}
                {messages.length <= 3 && !isLoading && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                        {SUGGESTIONS.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSendMessage(suggestion)}
                                className="text-xs px-3 py-1.5 bg-gray-800/80 hover:bg-blue-600/30 border border-gray-700 hover:border-blue-500/50 rounded-full text-gray-300 hover:text-white transition-all duration-200"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                    className="p-3 border-t border-gray-800 bg-gray-800/40 flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your interests, goals, or follow-up questions..."
                        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading || !userInput.trim()}
                        className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md disabled:opacity-40 disabled:scale-100 flex items-center justify-center transition-all"
                    >
                        <Send size={18} />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdvisorModal;
