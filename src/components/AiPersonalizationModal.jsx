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
      addNotification("✅ Cover letter personalized!");
    } catch (error) {
      addNotification(error.message || "❌ Failed to personalize letter.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="w-full max-w-3xl p-8 m-4 max-h-[90vh] flex flex-col 
                      rounded-2xl border border-green-500/30 
                      bg-gradient-to-br from-black via-gray-900 to-green-950 
                      shadow-2xl shadow-green-500/20">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-green-500/20 pb-3">
          <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
            <Sparkles className="text-green-400" /> AI Personalization
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-green-400 transition"
          >
            <XCircle className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto pr-2 space-y-6">
          {/* Job Description Input */}
          <div>
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-green-300 mb-2"
            >
              Paste Job Description
            </label>
            <textarea
              id="jobDescription"
              rows="8"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-500/30 
                         text-green-200 placeholder-gray-500 focus:ring-2 
                         focus:ring-green-500 focus:outline-none shadow-inner"
              placeholder="e.g., We are looking for a proactive Node.js developer..."
            />
          </div>

          {/* Personalized Letter Output */}
          {personalizedLetter && (
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">
                Personalized Cover Letter
              </h3>
              <div className="p-4 rounded-lg bg-black/40 border border-green-500/30 
                              text-green-200 whitespace-pre-wrap shadow-inner">
                {personalizedLetter}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-6 border-t border-green-500/20 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-800 text-gray-300 
                       hover:bg-gray-700 transition font-medium"
          >
            Close
          </button>
          <button
            onClick={handlePersonalize}
            disabled={loading}
            className="px-6 py-2 rounded-lg font-semibold text-black 
                       bg-green-500 hover:bg-green-400 disabled:bg-green-800 
                       flex items-center gap-2 transition"
          >
            {loading ? (
              <LoaderCircle className="w-5 h-5 animate-spin text-black" />
            ) : (
              <Sparkles className="w-5 h-5 text-black" />
            )}
            {loading ? 'Generating...' : 'Personalize'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiPersonalizationModal;
