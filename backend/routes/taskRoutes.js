const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    getTask,
    updateTaskStatus,
    assignTask,
    getMembers
} = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Get members list (MANAGER only)
router.get('/members/list', authorize('MANAGER'), getMembers);

// Task routes
router.route('/')
    .get(getTasks)  // Both MANAGER and MEMBER can access (filtered in controller)
    .post(authorize('MANAGER'), createTask);  // Only MANAGER can create

router.route('/:id')
    .get(getTask);  // Both can view (authorization in controller)

router.put('/:id/status', updateTaskStatus);  // MEMBER can update their tasks

router.put('/:id/assign', authorize('MANAGER'), assignTask);  // Only MANAGER can assign

module.exports = router;
