import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import { User, LoaderCircle } from "../icons/index";
import { motion } from "framer-motion";

const RegisterPage = ({ setActiveRoute }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <User className="w-14 h-14 text-indigo-600" />
        </div>

        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Start your journey with <span className="font-semibold">AutoSender</span>
        </p>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-md mb-5 text-sm"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
placeholder="Your email (used to send application)"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-indigo-600 text-white font-medium py-2.5 rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setActiveRoute("login")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
