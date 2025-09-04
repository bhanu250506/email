import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import { User, LoaderCircle } from "../icons/index";
import { motion } from "framer-motion";

const RegisterPage = ({ setActiveRoute }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      await register({ name, email, password });
      addNotification("🎉 Registration successful!");
      setActiveRoute("login");
    } catch (err) {
      let message = err.message || "Registration failed. Please try again.";
      if (err.response?.status === 409) message = "Email already exists.";
      if (err.response?.status === 400) message = "Invalid input details.";
      setError(message);
      addNotification(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden">
      {/* Glowing Orbs */}
      <div className="absolute -top-28 -left-28 w-96 h-96 bg-green-500/20 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"></div>

      {/* Wide Floating Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl p-10 rounded-2xl bg-gray-900/70 backdrop-blur-xl border border-green-500/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 rounded-full shadow-md shadow-green-500/40 mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2 text-center">
            Join{" "}
            <span className="text-green-400 font-semibold">AutoSender</span> and
            start your journey 🚀
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 text-red-400 border border-red-500/40 p-3 rounded-md mb-5 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Form - Wide */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-500/30 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-500/30 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password (takes full width) */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-500/30 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md shadow-green-500/40 hover:shadow-green-400/60 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setActiveRoute("login")}
            className="text-green-400 hover:text-green-300 hover:underline font-medium transition"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
