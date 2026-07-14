// controllers/taskController.js
// Handles all task CRUD operations

const Task = require('../models/Task');

// @desc    Get all tasks for the authenticated user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        
        res.json({ 
            count: tasks.length, 
            tasks 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to fetch tasks', 
            error: error.message 
        });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        // Validate required fields
        if (!title) {
            return res.status(400).json({ 
                message: 'Task title is required' 
            });
        }

        // Create task with user ID from auth
        const task = new Task({
            user: req.user._id,
            title,
            description: description || '',
            status: status || 'pending',
            priority: priority || 'medium',
            dueDate: dueDate || null
        });

        await task.save();
        res.status(201).json({ 
            message: 'Task created successfully', 
            task 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to create task', 
            error: error.message 
        });
    }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ 
                message: 'Task not found' 
            });
        }

        res.json({ task });
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to fetch task', 
            error: error.message 
        });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        // Find task and ensure it belongs to the user
        const task = await Task.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ 
                message: 'Task not found' 
            });
        }

        // Update fields
        if (title) task.title = title;
        if (description !== undefined) task.description = description;
        if (status) task.status = status;
        if (priority) task.priority = priority;
        if (dueDate !== undefined) task.dueDate = dueDate;

        await task.save();

        res.json({ 
            message: 'Task updated successfully', 
            task 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to update task', 
            error: error.message 
        });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ 
                message: 'Task not found' 
            });
        }

        res.json({ 
            message: 'Task deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to delete task', 
            error: error.message 
        });
    }
};

module.exports = {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};