import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Users, FileText, Settings, LogOut, MessageSquare, Image } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/courses', icon: BookOpen, label: 'Courses' },
        { path: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
        { path: '/admin/batches', icon: Calendar, label: 'Batches' },
        { path: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
        { path: '/admin/gallery', icon: Image, label: 'Gallery' },
        { path: '/admin/enrollments', icon: Users, label: 'Enrollments' },
        { path: '/admin/leads', icon: BookOpen, label: 'Leads' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Admin Panel
                    </h1>
                    {user && (
                        <p className="text-xs text-gray-400 mt-2">{user.email}</p>
                    )}
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className="mr-3" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <LogOut size={20} className="mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-900 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
