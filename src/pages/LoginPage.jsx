import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { Send, LoaderCircle } from '../icons/index';

const LoginPage = ({ setActiveRoute }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      addNotification("Login successful!");
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      addNotification("Login failed!", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 relative">
      {/* Decorative green glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-2xl"></div>

      <div className="bg-gray-900/80 backdrop-blur-xl w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 border border-green-500/20 relative z-10">
        
        {/* Logo / Icon */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full shadow-lg">
            <Send className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2 text-sm">Log in and continue your journey 🚀</p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center font-medium border border-red-500/30">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-green-500/30 bg-gray-800/60 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none shadow-sm transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-green-500/30 bg-gray-800/60 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none shadow-sm transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-70 shadow-lg hover:shadow-green-500/30 transition-all duration-300"
          >
            {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <a
            href="#register"
            onClick={() => setActiveRoute('register')}
            className="text-green-400 hover:text-green-300 hover:underline font-medium transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
