import React from 'react';
import { LayoutDashboard, User, History, Send } from '../icons/index.jsx';

const Sidebar = ({ activeRoute, setActiveRoute }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'history', icon: History, label: 'History' },
  ];

  return (
    <aside className="w-16 md:w-64 bg-gray-800 text-white flex-col hidden sm:flex transition-all duration-300">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-700">
        <Send className="w-8 h-8 text-indigo-400" />
        <span className="hidden md:inline ml-3 text-xl font-bold">AutoSender</span>
      </div>
      <nav className="flex-grow mt-4">
        {navItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => { e.preventDefault(); setActiveRoute(item.id); }}
            className={`flex items-center justify-center md:justify-start py-3 px-5 my-1 transition-colors duration-200 ${
              activeRoute === item.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="hidden md:inline ml-4">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
