const API_BASE_URL = 'https://email-backend-rtn0.onrender.com/api/v1';
const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An API error occurred');
      }
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  login: (credentials) => api.request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => api.request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getProfile: () => api.request('/user/profile'),
  updateProfile: (profileData) => api.request('/user/profile', { method: 'PUT', body: JSON.stringify(profileData) }),
  getApplicationHistory: () => api.request('/applications'),
  sendBatchApplications: (batchData) => api.request('/applications/send', { method: 'POST', body: JSON.stringify(batchData) }),
  personalizeLetter: (aiData) => api.request('/ai/personalize-letter', { method: 'POST', body: JSON.stringify(aiData) }),
};

export default api;
