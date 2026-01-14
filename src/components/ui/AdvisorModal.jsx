import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader, Sparkles } from 'lucide-react';
import GeminiLogo from './GeminiLogo';
import { coursesData } from '../../data/mockData';

/**
 * A simple exponential backoff retry mechanism for fetch.
 */
const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 429 && retries > 0) {
                // Throttled, wait and retry
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
        console.error("Fetch failed after retries:", error);
        throw error; // Re-throw error after all retries
    }
};

/**
 * Calls the Gemini API.
 */
const callGeminiAPI = async (userQuery, systemPrompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        console.error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
        return "I'm unable to connect to the server right now. Please contact the administrator.";
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try {
        const result = await fetchWithRetry(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const candidate = result.candidates?.[0];
        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            throw new Error("Invalid response structure from Gemini API.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Our AI is currently taking a break. Please try again in a moment.";
    }
};

const AdvisorModal = ({ onClose }) => {
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState('');
    const [apiError, setApiError] = useState('');

    const courseList = coursesData.map(c => c.title).join(', ');
    const systemPrompt = `You are a friendly and expert career counselor for PGtech. A prospective student will describe their interests or goals. Your task is to analyze their input, recommend one of the institute's courses, and provide a brief (2-3 sentences) explanation for why it's a good fit. The available courses are: ${courseList}. Only recommend one of these courses. Format your response clearly with the recommended course name first.`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        setIsLoading(true);
        setApiResponse('');
        setApiError('');

        try {
            const response = await callGeminiAPI(userInput, systemPrompt);
            setApiResponse(response);
        } catch (error) {
            setApiError("Sorry, our AI advisor couldn't be reached. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl border border-white/10 text-white"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    <div className="flex items-center mb-6">
                        <GeminiLogo />
                        <h3 className="text-3xl font-bold ml-3">AI Course Advisor</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="userInterests" className="block text-sm font-medium text-gray-300 mb-2">
                                Tell us about your interests or career goals:
                            </label>
                            <textarea
                                id="userInterests"
                                rows="4"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 'I love solving puzzles and am good at math.' or 'I want to build apps that look beautiful.'"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg transition-opacity duration-300 disabled:opacity-50 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <Sparkles size={18} className="mr-2" />
                                    Get Recommendation
                                </>
                            )}
                        </motion.button>
                    </form>

                    {(apiResponse || apiError) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-gray-700/50 border border-gray-600 rounded-lg"
                        >
                            <h4 className="font-bold text-lg mb-2 text-blue-300">Our AI Advisor suggests:</h4>
                            <p className="text-gray-200 whitespace-pre-wrap">
                                {apiResponse || apiError}
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AdvisorModal;
