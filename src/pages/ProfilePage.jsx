import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import api from '../services/api.js';
import { LoaderCircle } from '../icons/index';

const ProfilePage = () => {
  const { user, refetchUser } = useAuth();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeUrl: '',
    linkedinProfile: '',
    portfolioUrl: '',
    defaultCoverLetter: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        resumeUrl: user.resumeUrl || '',
        linkedinProfile: user.linkedinProfile || '',
        portfolioUrl: user.portfolioUrl || '',
        defaultCoverLetter: user.defaultCoverLetter || ''
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, ...updateData } = formData;
      await api.updateProfile(updateData);
      await refetchUser();
      addNotification('Profile updated successfully!');
    } catch (error) {
      addNotification(error.message || 'Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="p-8 flex justify-center">
        <LoaderCircle className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          👤 Your Profile
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage your account information & preferences
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-8 transition hover:shadow-xl"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Email (for replies)
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="resumeUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Resume URL
            </label>
            <input
              type="url"
              name="resumeUrl"
              id="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="https://link-to-your/resume.pdf"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="linkedinProfile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedinProfile"
              id="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="portfolioUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Portfolio / Website
            </label>
            <input
              type="url"
              name="portfolioUrl"
              id="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
            />
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <label
            htmlFor="defaultCoverLetter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Default Cover Letter Template
          </label>
          <textarea
            name="defaultCoverLetter"
            id="defaultCoverLetter"
            rows="8"
            value={formData.defaultCoverLetter}
            onChange={handleChange}
            placeholder="Use {company_name} and {user_name} as placeholders."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm resize-none"
          />
          <p className="mt-2 text-xs text-gray-500">
            Tip: You can use <code>{'{company_name}'}</code> and{' '}
            <code>{'{user_name}'}</code> as dynamic placeholders.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:bg-indigo-300 flex items-center gap-2 transition"
          >
            {loading && (
              <LoaderCircle className="w-5 h-5 animate-spin" />
            )}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
