import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { API_ENDPOINTS } from '../../config/api';

const AdminOTP = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const inputs = useRef([]);

    const email = sessionStorage.getItem('adminEmail');
    const demoOTP = sessionStorage.getItem('tempOTP');

    // Navigate to admin when authentication is confirmed
    useEffect(() => {
        if (verificationSuccess && isAuthenticated) {
            console.log('🚀 Auth confirmed, navigating to /admin...');
            sessionStorage.removeItem('adminEmail');
            sessionStorage.removeItem('tempOTP');
            navigate('/admin', { replace: true });
        }
    }, [verificationSuccess, isAuthenticated, navigate]);

    useEffect(() => {
        if (!email) {
            navigate('/admin/login');
        }
    }, [email, navigate]);

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
        inputs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');

        console.log('🔐 OTP Verification Attempt:', {
            email,
            otpEntered: otpCode,
            otpFromStorage: demoOTP
        });

        if (otpCode.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setError('');
        setLoading(true);

        try {
            console.log('📡 Sending OTP verification request...');
            const res = await fetch(API_ENDPOINTS.verifyOtp, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otpCode })
            });

            const data = await res.json();
            console.log('📨 OTP Verification Response:', data);

            if (data.success) {
                console.log('✅ OTP Verified! Logging in...');
                console.log('Token:', data.token);
                console.log('User:', data.user);

                login(data.token, data.user);
                // Don't navigate here - let useEffect handle it after state update
                setVerificationSuccess(true);
                console.log('⏳ Waiting for auth state to update...');
            } else {
                console.error('❌ OTP Verification Failed:', data.message);
                setError(data.message);
                setOtp(['', '', '', '', '', '']);
                inputs.current[0]?.focus();
            }
        } catch (error) {
            console.error('💥 OTP Verification Error:', error);
            setError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl"
            >
                <button
                    onClick={() => navigate('/admin/login')}
                    className="text-gray-400 hover:text-white mb-6 flex items-center transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to login
                </button>

                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-purple-500/10 rounded-full mb-4">
                        <Shield className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
                    <p className="text-gray-400">Enter the 6-digit code</p>
                    {demoOTP && (
                        <div className="mt-4 bg-blue-500/10 border border-blue-500/50 text-blue-400 px-4 py-2 rounded-lg">
                            <p className="text-sm">Demo OTP: <span className="font-mono font-bold">{demoOTP}</span></p>
                        </div>
                    )}
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 bg-gray-700/50 border border-gray-600 rounded-lg text-center text-2xl font-bold text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.join('').length !== 6}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                        ) : (
                            'Verify & Login'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Didn't receive the code?
                        <button className="text-purple-400 hover:text-purple-300 ml-2 transition-colors">
                            Resend OTP
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminOTP;
