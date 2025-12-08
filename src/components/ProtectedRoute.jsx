import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, user } = useAuth();

    useEffect(() => {
        console.log('🛡️ ProtectedRoute check:', { isAuthenticated, loading, user });
    }, [isAuthenticated, loading, user]);

    if (loading) {
        console.log('⏳ ProtectedRoute: Still loading auth state...');
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        console.log('❌ ProtectedRoute: Not authenticated, redirecting to login');
        return <Navigate to="/admin/login" replace />;
    }

    console.log('✅ ProtectedRoute: Authenticated, rendering children');
    return children;
};

export default ProtectedRoute;
