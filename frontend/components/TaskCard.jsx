// src/components/TaskCard.jsx
// Displays a single task

import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'status-completed';
            case 'in-progress': return 'status-in-progress';
            case 'pending': return 'status-pending';
            default: return '';
        }
    };

    const formatDate = (date) => {
        if (!date) return 'No due date';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="task-card">
            <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-actions">
                    <button onClick={() => onEdit(task)}>✏️</button>
                    <button onClick={() => onDelete(task._id)}>🗑️</button>
                </div>
            </div>
            {task.description && (
                <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
                <span className={`badge ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
                <span className={`badge ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
                <span className="task-date">📅 {formatDate(task.dueDate)}</span>
            </div>
        </div>
    );
};

export default TaskCard;