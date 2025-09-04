import React from 'react';
import { CheckCircle2, AlertCircle } from '../icons/index.jsx';

const Notification = ({ message, type }) => {
  const baseClasses =
    "flex items-center px-5 py-4 rounded-xl shadow-xl text-sm font-medium animate-fade-in-down transition transform";
  
  const typeClasses = {
    success:
      "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-green-500/30 border border-green-400/40",
    error:
      "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-red-500/30 border border-red-400/40",
  };

  const Icon = type === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <Icon className="w-6 h-6 mr-3 drop-shadow-md" />
      <span className="tracking-wide">{message}</span>
    </div>
  );
};

export default Notification;
