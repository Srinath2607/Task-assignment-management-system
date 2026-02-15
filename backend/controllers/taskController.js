const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (MANAGER only)
exports.createTask = async (req, res) => {
    try {
        const { title, description, startDate, deadline, assignedTo, priority } = req.body;

        // Validate required fields
        if (!title || !description || !startDate || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Create task data
        const taskData = {
            title,
            description,
            startDate: new Date(startDate),
            deadline: new Date(deadline),
            createdBy: req.user.id
        };

        // Add priority if provided (defaults to MEDIUM in model)
        if (priority) {
            taskData.priority = priority.toUpperCase();
        }

        // If assigned to a member, validate and set assignment
        if (assignedTo) {
            const member = await User.findById(assignedTo);

            if (!member) {
                return res.status(404).json({
                    success: false,
                    message: 'Assigned user not found'
                });
            }

            if (member.role !== 'MEMBER') {
                return res.status(400).json({
                    success: false,
                    message: 'Tasks can only be assigned to MEMBER role users'
                });
            }

            taskData.assignedTo = assignedTo;
            taskData.assignedDate = new Date();

            // Business Rule Validation: deadline must not be earlier than assignment date
            const assignDate = new Date(taskData.assignedDate);
            const deadlineDate = new Date(taskData.deadline);

            assignDate.setHours(0, 0, 0, 0);
            deadlineDate.setHours(0, 0, 0, 0);

            if (deadlineDate < assignDate) {
                return res.status(400).json({
                    success: false,
                    message: 'Task deadline must not be earlier than assignment date'
                });
            }
        }

        // Create task
        const task = await Task.create(taskData);

        // Populate references
        await task.populate('createdBy', 'name email');
        if (task.assignedTo) {
            await task.populate('assignedTo', 'name email');
        }

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating task'
        });
    }
};

// @desc    Get all tasks (MANAGER sees all, MEMBER sees only assigned)
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
    try {
        let query = {};

        // If user is MEMBER, only show tasks assigned to them
        if (req.user.role === 'MEMBER') {
            query.assignedTo = req.user.id;
        }

        const tasks = await Task.find(query)
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks'
        });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email');

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check authorization
        if (req.user.role === 'MEMBER' && task.assignedTo?._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this task'
            });
        }

        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching task'
        });
    }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private (MEMBER can update their assigned tasks)
exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status || !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be PENDING, IN_PROGRESS, or COMPLETED'
            });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check authorization
        if (req.user.role === 'MEMBER' && task.assignedTo?.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this task'
            });
        }

        task.status = status;
        await task.save();

        await task.populate('createdBy', 'name email');
        await task.populate('assignedTo', 'name email');

        res.status(200).json({
            success: true,
            message: 'Task status updated successfully',
            task
        });
    } catch (error) {
        console.error('Update task status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating task status'
        });
    }
};

// @desc    Assign task to member
// @route   PUT /api/tasks/:id/assign
// @access  Private (MANAGER only)
exports.assignTask = async (req, res) => {
    try {
        const { memberId } = req.body;

        if (!memberId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide member ID'
            });
        }

        const member = await User.findById(memberId);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        if (member.role !== 'MEMBER') {
            return res.status(400).json({
                success: false,
                message: 'Can only assign tasks to MEMBER role users'
            });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Set assignment date and validate business rule
        const assignDate = new Date();
        const deadlineDate = new Date(task.deadline);

        assignDate.setHours(0, 0, 0, 0);
        deadlineDate.setHours(0, 0, 0, 0);

        if (deadlineDate < assignDate) {
            return res.status(400).json({
                success: false,
                message: 'Task deadline must not be earlier than assignment date'
            });
        }

        task.assignedTo = memberId;
        task.assignedDate = new Date();
        await task.save();

        await task.populate('createdBy', 'name email');
        await task.populate('assignedTo', 'name email');

        res.status(200).json({
            success: true,
            message: 'Task assigned successfully',
            task
        });
    } catch (error) {
        console.error('Assign task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error assigning task'
        });
    }
};

// @desc    Get all members (for assignment dropdown)
// @route   GET /api/tasks/members/list
// @access  Private (MANAGER only)
exports.getMembers = async (req, res) => {
    try {
        const members = await User.find({ role: 'MEMBER' }).select('name email');

        res.status(200).json({
            success: true,
            count: members.length,
            members
        });
    } catch (error) {
        console.error('Get members error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching members'
        });
    }
};
