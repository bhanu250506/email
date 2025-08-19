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
        <LoaderCircle className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );

  if (error)
    return <div className="p-8 text-red-500 font-medium">{error}</div>;

  // 🔹 function to render status nicely
  const renderStatus = (status) => {
    switch (status) {
      case 'success':
      case 'Sent':
        return (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            ✅ Email Sent Successfully
          </span>
        );
      case 'failed':
      case 'error':
        return (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            ❌ Failed to Send
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            ⏳ {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          📊 Application History
        </h1>
        <span className="text-gray-600 text-sm md:text-base">
          Track your past job applications
        </span>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition hover:shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Company
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Date Sent
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
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
                  <tr key={app._id} className="hover:bg-indigo-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {app.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {app.recipientEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(app.sentAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     Sent Successfully ✅
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
