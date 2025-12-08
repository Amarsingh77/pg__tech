import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const isInitialMount = useRef(true);

    // Only check auth on initial mount, not on token changes from login
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            checkAuth();
        }
    }, []);

    const checkAuth = async () => {
        const savedToken = localStorage.getItem('adminToken');
        if (!savedToken) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/api/auth/check', {
                headers: {
                    'Authorization': `Bearer ${savedToken}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                setToken(savedToken);
            } else {
                localStorage.removeItem('adminToken');
                setToken(null);
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('adminToken');
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (newToken, userData) => {
        console.log('🔐 AuthContext.login() called:', { newToken, userData });
        localStorage.setItem('adminToken', newToken);
        console.log('💾 Token saved to localStorage');
        setToken(newToken);
        setUser(userData);
        console.log('✅ Auth state updated - isAuthenticated will be:', !!userData);
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:3001/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('adminToken');
            setToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

