import React, { useState } from 'react';
import api from '../services/api.js';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { Send, PlusCircle, XCircle, Sparkles, LoaderCircle } from '../icons/index';
import AiPersonalizationModal from '../components/AiPersonalizationModal';

const DashboardPage = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [recipients, setRecipients] = useState([{ email: '', companyName: '' }]);
  const [subject, setSubject] = useState('Application for Open Position');
  const [loading, setLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const handleRecipientChange = (index, field, value) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const addRecipient = () =>
    setRecipients([...recipients, { email: '', companyName: '' }]);

  const removeRecipient = (index) =>
    setRecipients(recipients.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validRecipients = recipients.filter((r) => r.email && r.companyName);
    if (validRecipients.length === 0) {
      addNotification('Please add at least one valid recipient.', 'error');
      setLoading(false);
      return;
    }

    try {
      await api.sendBatchApplications({ recipients: validRecipients, subject });
      addNotification(`Successfully sent ${validRecipients.length} applications!`);
      setRecipients([{ email: '', companyName: '' }]);
    } catch (error) {
      addNotification(error.message || 'Failed to send applications.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          📬 Application Dashboard
        </h1>
        <span className="text-gray-600 text-sm md:text-base">
          Welcome back, <span className="font-semibold">{user?.name || 'User'}</span>
        </span>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-8 transition hover:shadow-xl"
      >
        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
            required
          />
        </div>

        {/* Recipients */}
        <div className="space-y-5">
          <label className="block text-sm font-medium text-gray-700">
            Recipients
          </label>
          {recipients.map((recipient, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 relative group transition hover:shadow-md"
            >
              <input
                type="email"
                placeholder="Recipient Email"
                value={recipient.email}
                onChange={(e) =>
                  handleRecipientChange(index, 'email', e.target.value)
                }
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                value={recipient.companyName}
                onChange={(e) =>
                  handleRecipientChange(index, 'companyName', e.target.value)
                }
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => removeRecipient(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRecipient}
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Add Another Recipient
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowAiModal(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition"
          >
            <Sparkles className="w-5 h-5" /> AI Assistant
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 transition"
          >
            {loading ? (
              <LoaderCircle className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {loading ? 'Sending...' : `Send ${recipients.filter((r) => r.email && r.companyName).length} Applications`}
          </button>
        </div>
      </form>

      {/* Modal */}
      {showAiModal && (
        <AiPersonalizationModal user={user} onClose={() => setShowAiModal(false)} />
      )}
    </div>
  );
};

export default DashboardPage;
