import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { LogOut } from '../icons/index.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 px-6 flex items-center justify-between
                       bg-gradient-to-r from-black via-gray-900 to-green-950
                       border-b border-green-500/30 shadow-md shadow-green-500/20
                       backdrop-blur-md">
      
      {/* Left: Welcome text */}
      <h1 className="text-xl font-semibold text-green-400 drop-shadow-sm">
        Welcome, <span className="text-green-300">{user?.name || 'Guest'}</span>!
      </h1>

      {/* Right: Logout button */}
      <button
        onClick={logout}
        className="flex items-center px-4 py-2 rounded-lg 
                   bg-green-500 text-black font-medium
                   hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/30
                   transition duration-200 ease-in-out"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </button>
    </header>
  );
};

export default Navbar;
