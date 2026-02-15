const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a task title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a task description'],
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, 'Please provide a start date']
    },
    deadline: {
        type: Date,
        required: [true, 'Please provide a deadline']
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        default: 'PENDING',
        uppercase: true
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'MEDIUM',
        uppercase: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    assignedDate: {
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

// Business Rule: Validate deadline is not earlier than assignment date
taskSchema.pre('save', function (next) {
    if (this.assignedDate && this.deadline) {
        const assignDate = new Date(this.assignedDate);
        const deadlineDate = new Date(this.deadline);

        // Reset time to compare only dates
        assignDate.setHours(0, 0, 0, 0);
        deadlineDate.setHours(0, 0, 0, 0);

        if (deadlineDate < assignDate) {
            return next(new Error('Task deadline must not be earlier than assignment date'));
        }
    }

    this.updatedAt = Date.now();
    next();
});

// Update timestamp on update
taskSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('Task', taskSchema);
