// models/Task.js
// This defines the structure of a Task document in MongoDB

const mongoose = require('mongoose');

// Define the Task schema
const TaskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
            maxlength: [100, 'Task title cannot exceed 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
            default: ''
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },
        dueDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Index to help with query performance
TaskSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Task', TaskSchema);