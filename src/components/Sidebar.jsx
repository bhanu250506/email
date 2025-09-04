import React from 'react';
import { LayoutDashboard, User, History, Send } from '../icons/index.jsx';

const Sidebar = ({ activeRoute, setActiveRoute }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'history', icon: History, label: 'History' },
  ];

  return (
    <aside
      className="w-16 md:w-64 hidden sm:flex flex-col
                 bg-gradient-to-b from-black via-gray-900 to-green-950
                 text-green-300 border-r border-green-500/20
                 shadow-lg shadow-green-500/20 transition-all duration-300"
    >
      {/* Logo / Branding */}
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-green-500/20">
        <Send className="w-8 h-8 text-green-400 drop-shadow-glow" />
        <span className="hidden md:inline ml-3 text-xl font-bold text-green-300 tracking-wide">
          AutoSender
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-grow mt-4">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveRoute(item.id);
            }}
            className={`flex items-center justify-center md:justify-start py-3 px-5 my-1 rounded-lg cursor-pointer transition-all duration-200
              ${
                activeRoute === item.id
                  ? 'bg-green-600/90 text-black font-semibold shadow-md shadow-green-500/40'
                  : 'text-green-300 hover:bg-green-700/30 hover:text-green-100'
              }`}
          >
            <item.icon
              className={`w-6 h-6 ${
                activeRoute === item.id ? 'text-black' : 'text-green-400'
              }`}
            />
            <span className="hidden md:inline ml-4">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
