import React, { useState, useEffect, useCallback, createContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
  }, []);

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await api.getProfile();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile, logging out.", error);
        logout();
      }
    }
    setLoading(false);
  }, [logout]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (credentials) => {
    const response = await api.login(credentials);
    localStorage.setItem('authToken', response.data.token);
    await fetchProfile();
  };

  const register = async (userData) => {
    const response = await api.register(userData);
    localStorage.setItem('authToken', response.data.token);
    await fetchProfile();
  };

  const value = { user, login, logout, register, loading, refetchUser: fetchProfile };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
