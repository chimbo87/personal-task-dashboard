// src/App.jsx
// Main App component with routing

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route 
                            path="/dashboard" 
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            } 
                        />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;