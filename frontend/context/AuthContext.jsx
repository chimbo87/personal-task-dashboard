// src/context/AuthContext.jsx
// Manages authentication state across the entire app

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Set up axios defaults
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    // Add token to headers if it exists
    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    // Check if user is already logged in
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // You could also verify the token with backend here
        }
        setLoading(false);
    }, []);

    // Register function
    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
            return { success: true, data: response.data };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    // Login function
    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
            return { success: true, data: response.data };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    // Logout function
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        api
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};