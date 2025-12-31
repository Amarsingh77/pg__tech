import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS } from '../../config/api';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('login'); // 'login' or 'forgot'
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [forgotEmail, setForgotEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('📡 Attempting login for:', formData.email);
            const res = await fetch(API_ENDPOINTS.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            console.log('📨 Login response status:', res.status);

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Login failed');
            }

            const data = await res.json();
            console.log('📦 Login response data:', data);

            if (data.success) {
                console.log('✅ Login successful, redirecting to OTP...');
                sessionStorage.setItem('adminEmail', formData.email);
                sessionStorage.setItem('tempOTP', data.otp);
                navigate('/admin/verify-otp');
            } else {
                console.error('❌ Login failed:', data.message);
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('💥 Login error:', error);
            setError('Login failed. Please check if the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await fetch(API_ENDPOINTS.forgotPassword, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail })
            });

            const data = await res.json();
            setSuccess(data.message);
        } catch (error) {
            setError('Request failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl overflow-hidden relative"
            >
                <AnimatePresence mode="wait">
                    {view === 'login' ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="text-center mb-8">
                                <div className="inline-block p-3 bg-blue-500/10 rounded-full mb-4">
                                    <LogIn className="w-8 h-8 text-blue-400" />
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                                <p className="text-gray-400">Enter your credentials to continue</p>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLoginSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email or Username</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="admin@pgtech.com or admin"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <div className="text-right mt-2">
                                        <button
                                            type="button"
                                            onClick={() => setView('forgot')}
                                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Continue
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="forgot"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="text-center mb-8">
                                <div className="inline-block p-3 bg-blue-500/10 rounded-full mb-4">
                                    <KeyRound className="w-8 h-8 text-blue-400" />
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                                <p className="text-gray-400">Enter your email to receive recovery instructions</p>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6 text-sm">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleForgotSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="admin@pgtech.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'Send Instructions'
                                    )}
                                </button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setView('login')}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
