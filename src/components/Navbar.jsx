import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { LogOut } from '../icons/index.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
       <div>
         <h1 className="text-xl font-semibold text-gray-800">Welcome, {user?.name || 'Guest'}!</h1>
       </div>
       <div>
        <button
            onClick={logout}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
        >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
        </button>
       </div>
    </header>
  );
};

export default Navbar;
