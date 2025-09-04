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
    githubUrl: '',
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
        githubUrl: user.githubUrl || '',
        defaultCoverLetter: user.defaultCoverLetter || '',
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, ...updateData } = formData; // don’t send email
      await api.updateProfile(updateData);
      await refetchUser();
      addNotification("✅ Profile updated successfully!");
    } catch (error) {
      addNotification(error.message || "❌ Failed to update profile.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-8 flex justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-green-400" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-10 min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950">
      <h1 className="text-4xl font-extrabold text-green-400 tracking-tight">
        👤 Your Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/5 p-8 rounded-2xl shadow-2xl border border-green-500/20 space-y-10 transition hover:shadow-green-500/30"
      >
        {/* Section 1: Personal Info */}
        <section>
          <h2 className="text-lg font-semibold text-green-300 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-green-400 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg bg-black/40 border border-green-500/30 text-green-200 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-400 mb-1"
              >
                Your Email (for replies)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                className="w-full rounded-lg bg-gray-800 text-gray-400 px-4 py-2 cursor-not-allowed border border-gray-700"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                This is your login email and cannot be changed.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Links */}
        <section>
          <h2 className="text-lg font-semibold text-green-300 mb-4">
            Professional Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'resumeUrl', label: 'Resume URL', placeholder: 'https://drive.google.com/your-resume' },
              { id: 'linkedinProfile', label: 'LinkedIn Profile', placeholder: 'https://linkedin.com/in/yourname' },
              { id: 'portfolioUrl', label: 'Portfolio / Website', placeholder: 'https://yourportfolio.com' },
              { id: 'githubUrl', label: 'GitHub Profile', placeholder: 'https://github.com/yourusername' },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-green-400 mb-1"
                >
                  {field.label}
                </label>
                <input
                  type="url"
                  name={field.id}
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg bg-black/40 border border-green-500/30 text-green-200 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Cover Letter */}
        <section>
          <h2 className="text-lg font-semibold text-green-300 mb-4">
            Default Cover Letter
          </h2>
          <textarea
            name="defaultCoverLetter"
            id="defaultCoverLetter"
            rows="8"
            value={formData.defaultCoverLetter}
            onChange={handleChange}
            placeholder="Write your default cover letter template here..."
            className="w-full rounded-lg bg-black/40 border border-green-500/30 text-green-200 px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-2">
            This cover letter will be used as a base template when applying for jobs. 
            You can still customize it per application.
          </p>
          <p className="text-xs text-green-400 mt-1 font-medium">
            💡 Tip: Use <code>{`{company.name}`}</code> in your cover letter.  
            It will be replaced with the actual company name when you apply.
          </p>
        </section>

        {/* Submit */}
        <div className="flex justify-end pt-6 border-t border-gray-800">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-black font-semibold rounded-lg hover:bg-green-500 disabled:bg-green-800 flex items-center gap-2 transition-all duration-200"
          >
            {loading && (
              <LoaderCircle className="w-5 h-5 animate-spin text-black" />
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
