import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, UserPlus, Users, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';

const AdminSettings = () => {
    const { user, token } = useAuth();
    const [activeTab, setActiveTab] = useState('security'); // 'security' or 'team'

    // Change Password State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Team Management State
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ email: '', password: '', mobile: '' });
    const [teamStatus, setTeamStatus] = useState({ type: '', message: '' });
    const [teamLoading, setTeamLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'team') {
            fetchAdmins();
        }
    }, [activeTab]);

    const fetchAdmins = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.admins, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error('Failed to fetch admins');
            const data = await res.json();
            setAdmins(data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordStatus({ type: '', message: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordStatus({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        setPasswordLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.changePassword, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentEmail: user.email,
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to update password');
            }

            const data = await res.json();

            if (data.success) {
                setPasswordStatus({ type: 'success', message: data.message });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setPasswordStatus({ type: 'error', message: data.message });
            }
        } catch (error) {
            setPasswordStatus({ type: 'error', message: 'Failed to update password' });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setTeamStatus({ type: '', message: '' });
        setTeamLoading(true);

        try {
            const res = await fetch(API_ENDPOINTS.addAdmin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newAdmin)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to add admin');
            }

            const data = await res.json();

            if (data.success) {
                setTeamStatus({ type: 'success', message: data.message });
                setNewAdmin({ email: '', password: '', mobile: '' });
                fetchAdmins(); // Refresh list
            } else {
                setTeamStatus({ type: 'error', message: data.message });
            }
        } catch (error) {
            setTeamStatus({ type: 'error', message: 'Failed to add admin' });
        } finally {
            setTeamLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-8">Settings</h2>

            <div className="flex space-x-4 mb-8 border-b border-gray-700 pb-1">
                <button
                    onClick={() => setActiveTab('security')}
                    className={`pb-3 px-4 font-medium transition-colors relative ${activeTab === 'security' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Lock size={18} />
                        Security
                    </div>
                    {activeTab === 'security' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('team')}
                    className={`pb-3 px-4 font-medium transition-colors relative ${activeTab === 'team' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Users size={18} />
                        Team Management
                    </div>
                    {activeTab === 'team' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                    )}
                </button>
            </div>

            {activeTab === 'security' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl"
                >
                    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Shield className="text-blue-400" />
                            Change Password
                        </h3>

                        {passwordStatus.message && (
                            <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${passwordStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {passwordStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                {passwordStatus.message}
                            </div>
                        )}

                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                {passwordLoading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}

            {activeTab === 'team' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Add Admin Form */}
                    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 h-fit">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <UserPlus className="text-blue-400" />
                            Add New Admin
                        </h3>

                        {teamStatus.message && (
                            <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${teamStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {teamStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                {teamStatus.message}
                            </div>
                        )}

                        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-sm">
                            <p>Current Admins: <span className="font-bold">{admins.length}</span> / 10</p>
                        </div>

                        <form onSubmit={handleAddAdmin} className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Mobile Number</label>
                                <input
                                    type="text"
                                    value={newAdmin.mobile}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, mobile: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Initial Password</label>
                                <input
                                    type="password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={teamLoading || admins.length >= 10}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {teamLoading ? 'Adding...' : admins.length >= 10 ? 'Limit Reached' : 'Add Admin'}
                            </button>
                        </form>
                    </div>

                    {/* Admin List */}
                    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Users className="text-blue-400" />
                            Admin Team
                        </h3>
                        <div className="space-y-4">
                            {admins.map((admin) => (
                                <div key={admin.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {admin.email[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{admin.email}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <span className="capitalize">{admin.role.replace('_', ' ')}</span>
                                                {admin.mobile && <span>• {admin.mobile}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    {admin.email === user?.email && (
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                                            You
                                        </span>
                                    )}
                                </div>
                            ))}
                            {admins.length === 0 && (
                                <p className="text-gray-400 text-center py-4">Loading team...</p>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AdminSettings;
