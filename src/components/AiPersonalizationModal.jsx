import React, { useState } from 'react';
import api from '../services/api.js';
import { useNotification } from '../hooks/useNotification.jsx';
import { Sparkles, XCircle, LoaderCircle } from '../icons/index.jsx';

const AiPersonalizationModal = ({ user, onClose }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [personalizedLetter, setPersonalizedLetter] = useState('');
    const [loading, setLoading] = useState(false);
    const { addNotification } = useNotification();

    const handlePersonalize = async () => {
        if (!jobDescription) {
            addNotification("Please paste a job description.", 'error');
            return;
        }
        setLoading(true);
        setPersonalizedLetter('');
        try {
            const response = await api.personalizeLetter({
                jobDescription,
                baseLetter: user.defaultCoverLetter,
            });
            setPersonalizedLetter(response.data.personalizedLetter);
            addNotification("Cover letter personalized!");
        } catch (error) {
            addNotification(error.message || "Failed to personalize letter.", 'error');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 m-4 max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Sparkles className="text-purple-500"/>AI Personalization</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XCircle className="w-8 h-8"/></button>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                    <div>
                        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">Paste Job Description</label>
                        <textarea
                            id="jobDescription"
                            rows="8"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., We are looking for a proactive Node.js developer..."
                        />
                    </div>

                    {personalizedLetter && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalized Cover Letter</h3>
                            <div className="p-4 bg-gray-50 border rounded-md whitespace-pre-wrap text-gray-700">
                                {personalizedLetter}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Close</button>
                    <button onClick={handlePersonalize} disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300 flex items-center gap-2">
                        {loading ? <LoaderCircle className="w-5 h-5"/> : <Sparkles className="w-5 h-5"/>}
                        {loading ? 'Generating...' : 'Personalize'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiPersonalizationModal;

