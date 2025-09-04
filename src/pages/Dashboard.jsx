import React, { useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import {
  Send,
  PlusCircle,
  XCircle,
  Sparkles,
  LoaderCircle,
} from "../icons/index";
import AiPersonalizationModal from "../components/AiPersonalizationModal";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [recipients, setRecipients] = useState([{ email: "", companyName: "" }]);
  const [subject, setSubject] = useState("Application for Open Position");
  const [loading, setLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const handleRecipientChange = (index, field, value) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const addRecipient = () =>
    setRecipients([...recipients, { email: "", companyName: "" }]);

  const removeRecipient = (index) =>
    setRecipients(recipients.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validRecipients = recipients.filter((r) => r.email && r.companyName);
    if (validRecipients.length === 0) {
      addNotification("Please add at least one valid recipient.", "error");
      setLoading(false);
      return;
    }

    try {
      await api.sendBatchApplications({ recipients: validRecipients, subject });
      addNotification(
        `✅ Successfully sent ${validRecipients.length} applications!`
      );
      setRecipients([{ email: "", companyName: "" }]);
    } catch (error) {
      addNotification(error.message || "Failed to send applications.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-black text-white overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[160px] animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-green-400/20 rounded-full blur-[140px] animate-pulse"></div>

      <div className="relative z-10 p-6 md:p-12 space-y-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              📬 Application Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your job applications effortlessly with{" "}
              <span className="font-semibold text-green-300">AI Assistance</span>.
            </p>
          </div>
          <span className="text-gray-300 text-sm md:text-base bg-gray-800/40 px-4 py-2 rounded-lg">
            Welcome back,{" "}
            <span className="font-semibold text-white">
              {user?.name || "User"}
            </span>
          </span>
        </div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.25)] border border-gray-800 space-y-8"
        >
          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-700 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500 outline-none transition"
              required
            />
          </div>

          {/* Recipients */}
          <div className="space-y-5">
            <label className="block text-sm font-medium text-gray-300">
              Recipients
            </label>
            {recipients.map((recipient, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="flex flex-col md:flex-row items-center gap-4 p-4 bg-black/40 rounded-xl border border-gray-700 relative group transition shadow-sm"
              >
                <input
                  type="email"
                  placeholder="Recipient Email"
                  value={recipient.email}
                  onChange={(e) =>
                    handleRecipientChange(index, "email", e.target.value)
                  }
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-950 border border-gray-700 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500 outline-none transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={recipient.companyName}
                  onChange={(e) =>
                    handleRecipientChange(index, "companyName", e.target.value)
                  }
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-950 border border-gray-700 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeRecipient(index)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
            <button
              type="button"
              onClick={addRecipient}
              className="flex items-center text-green-400 hover:text-green-200 font-medium transition"
            >
              <PlusCircle className="w-5 h-5 mr-2" /> Add Another Recipient
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-6 border-t border-gray-800">
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAiModal(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition"
            >
              <Sparkles className="w-5 h-5" /> AI Assistant
            </motion.button>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] disabled:opacity-50 transition"
            >
              {loading ? (
                <>
                  <LoaderCircle className="w-5 h-5 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Send{" "}
                  {recipients.filter((r) => r.email && r.companyName).length}{" "}
                  Applications
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Modal */}
        {showAiModal && (
          <AiPersonalizationModal
            user={user}
            onClose={() => setShowAiModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
