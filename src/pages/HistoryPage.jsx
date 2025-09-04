import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { LoaderCircle } from '../icons/index';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.getApplicationHistory();
        setHistory(response.data);
      } catch (err) {
        setError('Failed to fetch application history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="p-12 flex justify-center">
        <LoaderCircle className="w-10 h-10 text-green-400 animate-spin" />
      </div>
    );

  if (error)
    return <div className="p-8 text-red-400 font-medium">{error}</div>;

  // 🔹 function to render status nicely
  const renderStatus = (status) => {
    switch (status) {
      case 'success':
      case 'Sent':
        return (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/40 text-green-300 border border-green-500/30">
            ✅ Email Sent
          </span>
        );
      case 'failed':
      case 'error':
        return (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900/40 text-red-300 border border-red-500/30">
            ❌ Failed
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-gray-300">
            ⏳ {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-4xl font-extrabold text-green-400 tracking-tight">
          📊 Application History
        </h1>
        <span className="text-gray-400 text-sm md:text-base">
          Track your past job applications
        </span>
      </div>

      {/* History Table */}
      <div className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-green-500/20 overflow-hidden transition hover:shadow-green-500/30">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 text-sm text-gray-300">
            <thead className="bg-gradient-to-r from-green-800/40 to-green-900/40">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-green-300">
                  Company
                </th>
                <th className="px-6 py-3 text-left font-semibold text-green-300">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left font-semibold text-green-300">
                  Date Sent
                </th>
                <th className="px-6 py-3 text-left font-semibold text-green-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {history.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No applications sent yet.
                  </td>
                </tr>
              ) : (
                history.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-green-900/20 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-green-200">
                      {app.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {app.recipientEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Date(app.sentAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatus(app.status || 'Sent')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
