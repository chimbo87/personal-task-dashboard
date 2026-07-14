// routes/tasks.js
// Task CRUD operations (all routes are protected by auth middleware)

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// All routes in this file require authentication
router.use(auth);

// @route   GET /api/tasks
// @desc    Get all tasks for the authenticated user
// @access  Private
router.get('/', getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', createTask);

// @route   GET /api/tasks/:id
// @desc    Get a single task by ID
// @access  Private
router.get('/:id', getTaskById);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', deleteTask);

module.exports = router;