// src/pages/Dashboard.jsx
// Dashboard page showing all tasks

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const { user, token, api, logout } = useAuth();
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    // Fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            if (error.response?.status === 401) {
                logout();
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTasks();
        }
    }, [token]);

    // Handle task creation/update
    const handleSaveTask = async (taskData) => {
        try {
            if (editingTask) {
                // Update existing task
                const response = await api.put(`/tasks/${editingTask._id}`, taskData);
                setTasks(tasks.map(task => 
                    task._id === editingTask._id ? response.data.task : task
                ));
                setEditingTask(null);
            } else {
                // Create new task
                const response = await api.post('/tasks', taskData);
                setTasks([response.data.task, ...tasks]);
            }
            setShowForm(false);
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${taskId}`);
                setTasks(tasks.filter(task => task._id !== taskId));
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    // Handle task edit
    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="loading">Loading tasks...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome, {user?.username}!</h1>
                    <p className="task-count">You have {tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="header-actions">
                    <button 
                        className="btn-primary"
                        onClick={() => {
                            setEditingTask(null);
                            setShowForm(true);
                        }}
                    >
                        + Add New Task
                    </button>
                    <button 
                        className="btn-secondary"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSave={handleSaveTask}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTask(null);
                    }}
                />
            )}

            {tasks.length === 0 ? (
                <div className="empty-state">
                    <p>No tasks yet. Create your first task!</p>
                </div>
            ) : (
                <div className="task-grid">
                    {tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;