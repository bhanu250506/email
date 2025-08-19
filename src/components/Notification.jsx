import React from 'react';
import { CheckCircle2, AlertCircle } from '../icons/index.jsx';

const Notification = ({ message, type }) => {
    const baseClasses = "flex items-center p-4 rounded-lg shadow-lg text-white animate-fade-in-down";
    const typeClasses = {
        success: "bg-green-500",
        error: "bg-red-500",
    };
    const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            <Icon className="w-6 h-6 mr-3" />
            <span>{message}</span>
        </div>
    );
};

export default Notification;
