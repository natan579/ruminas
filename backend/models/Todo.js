const mongoose = require('mongoose');

// ============================================
// TODO SCHEMA
// ============================================

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: [true, 'Todo text is required'],
        trim: true,
        maxlength: [500, 'Todo cannot exceed 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// ============================================
// AUTO UPDATE TIMESTAMP
// ============================================

todoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

todoSchema.pre('findByIdAndUpdate', function() {
    this.set({ updatedAt: Date.now() });
});

// ============================================
// EXPORT MODEL
// ============================================

module.exports = mongoose.model('Todo', todoSchema);