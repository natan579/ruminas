const express = require('express');
const Todo = require('../models/Todo');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// ============================================
// GET ALL TODOS - GET /api/todos
// ============================================

router.get('/', async (req, res) => {
    try {
        const { filter } = req.query; // 'all', 'active', 'completed'

        let query = { userId: req.userId };

        if (filter === 'active') {
            query.completed = false;
        } else if (filter === 'completed') {
            query.completed = true;
        }

        const todos = await Todo.find(query).sort({ createdAt: -1 });

        res.json({
            count: todos.length,
            todos
        });
    } catch (error) {
        console.error('Get todos error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// CREATE TODO - POST /api/todos
// ============================================

router.post('/', async (req, res) => {
    try {
        const { text, priority, dueDate } = req.body;

        // Validation
        if (!text || !text.trim()) {
            return res.status(400).json({ error: 'Todo text is required' });
        }

        if (priority && !['low', 'medium', 'high'].includes(priority)) {
            return res.status(400).json({ error: 'Invalid priority level' });
        }

        // Create new todo
        const newTodo = new Todo({
            userId: req.userId,
            text: text.trim(),
            priority: priority || 'medium',
            dueDate: dueDate || null,
            completed: false
        });

        await newTodo.save();

        res.status(201).json({
            message: 'Todo created successfully',
            todo: newTodo
        });
    } catch (error) {
        console.error('Create todo error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// UPDATE TODO - PUT /api/todos/:id
// ============================================

router.put('/:id', async (req, res) => {
    try {
        const { text, completed, priority, dueDate } = req.body;

        // Find todo and verify ownership
        const todo = await Todo.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        // Validate priority if provided
        if (priority && !['low', 'medium', 'high'].includes(priority)) {
            return res.status(400).json({ error: 'Invalid priority level' });
        }

        // Update fields
        if (text !== undefined) todo.text = text.trim();
        if (completed !== undefined) todo.completed = completed;
        if (priority !== undefined) todo.priority = priority;
        if (dueDate !== undefined) todo.dueDate = dueDate;

        await todo.save();

        res.json({
            message: 'Todo updated successfully',
            todo
        });
    } catch (error) {
        console.error('Update todo error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// DELETE TODO - DELETE /api/todos/:id
// ============================================

router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        await Todo.deleteOne({ _id: req.params.id });

        res.json({
            message: 'Todo deleted successfully',
            id: req.params.id
        });
    } catch (error) {
        console.error('Delete todo error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// EXPORT ROUTER
// ============================================

module.exports = router;