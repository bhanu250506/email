import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { NotificationProvider } from './context/NotificationContext';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';

const AppContent = () => {
    const { user, loading } = useAuth();
    const [route, setRoute] = useState(window.location.hash.substring(1) || 'dashboard');

    useEffect(() => {
        const handleHashChange = () => setRoute(window.location.hash.substring(1) || 'dashboard');
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const setActiveRoute = (newRoute) => {
        window.location.hash = newRoute;
    };

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return route === 'register' ? <RegisterPage setActiveRoute={setActiveRoute} /> : <LoginPage setActiveRoute={setActiveRoute} />;
    }

    const renderPage = () => {
        switch (route) {
            case 'profile': return <ProfilePage />;
            case 'history': return <HistoryPage />;
            case 'dashboard':
            default: return <DashboardPage />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar activeRoute={route} setActiveRoute={setActiveRoute} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default function App() {
  return (
    <NotificationProvider>
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    </NotificationProvider>
  );
}
