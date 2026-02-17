import { useState, useEffect } from 'react';
import { taskService, authService } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { PriorityBadge, StatusBadge } from '../components/Badge';
import AnalyticsCard from '../components/AnalyticsCard';
import TaskDistributionChart from '../components/TaskDistributionChart';
import TeamPerformanceChart from '../components/TeamPerformanceChart';
import KanbanBoard from '../components/KanbanBoard';
import { DashboardSkeleton } from '../components/SkeletonLoaders';
import { FiList, FiClock, FiCheckCircle, FiAlertCircle, FiGrid, FiTrello, FiUsers, FiTrash2, FiEdit } from 'react-icons/fi';

const ManagerDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'kanban'
    const [editMode, setEditMode] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    // Search, Filter & Pagination States
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        assignedTo: ''
    });
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
        completedTotal: 0
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        deadline: '',
        assignedTo: '',
        priority: 'MEDIUM'
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); // Reset to first page on search
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        fetchTasks();
    }, [debouncedSearch, filters, page]);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchTasks = async () => {
        try {
            const params = {
                search: debouncedSearch,
                status: filters.status,
                priority: filters.priority,
                assignedTo: filters.assignedTo,
                page,
                limit: 10
            };
            const data = await taskService.getTasks(params);
            setTasks(data.tasks);
            setPagination({
                total: data.total,
                totalPages: data.totalPages,
                completedTotal: data.completedTotal
            });
        } catch (err) {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const fetchMembers = async () => {
        try {
            const data = await taskService.getMembers();
            setMembers(data.members);
        } catch (err) {
            console.error('Failed to fetch members');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setPage(1); // Reset page when filters change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                await taskService.updateTask(currentTaskId, formData);
                toast.success('Task updated successfully!');
            } else {
                await taskService.createTask(formData);
                toast.success('Task created successfully!');
            }
            setShowModal(false);
            resetForm();
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save task');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            startDate: '',
            deadline: '',
            assignedTo: '',
            priority: 'MEDIUM'
        });
        setEditMode(false);
        setCurrentTaskId(null);
    };

    const handleEdit = (task) => {
        setFormData({
            title: task.title,
            description: task.description,
            startDate: task.startDate.split('T')[0],
            deadline: task.deadline.split('T')[0],
            assignedTo: task.assignedTo?._id || '',
            priority: task.priority
        });
        setEditMode(true);
        setCurrentTaskId(task._id);
        setShowModal(true);
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await taskService.deleteTask(taskId);
            toast.success('Task deleted successfully!');
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete task');
        }
    };

    const handleAssign = async (taskId, memberId) => {
        try {
            await taskService.assignTask(taskId, memberId);
            toast.success('Task assigned successfully!');
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to assign task');
        }
    };

    const handleTaskMove = async (taskId, newStatus) => {
        try {
            await taskService.updateTaskStatus(taskId, newStatus);
            toast.success('Task status updated!');
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update task status');
        }
    };

    const handleDeleteUser = async (user) => {
        if (!window.confirm(`Are you sure you want to remove ${user.name}? This will also unassign all their tasks.`)) {
            return;
        }

        try {
            await authService.deleteUser(user._id);
            toast.success('User removed successfully');
            fetchMembers(); // Update members list
            fetchTasks();   // Update tasks list as they are now unassigned
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to remove user');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Calculate analytics
    const totalTasks = pagination.total || tasks.length;
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
    const overdueTasks = tasks.filter(t => {
        const isOverdue = new Date(t.deadline) < new Date();
        return isOverdue && t.status !== 'COMPLETED';
    }).length;

    const completionRate = totalTasks > 0 ? Math.round((pagination.completedTotal / totalTasks) * 100) : 0;

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="dashboard">
                    <DashboardSkeleton />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="container fade-in">
                    <div className="dashboard-header">
                        <div className="flex-between">
                            <div>
                                <h1>Manager Dashboard</h1>
                                <p>Create and manage tasks for your team</p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div className="view-toggle">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        title="Grid View"
                                    >
                                        <FiGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('kanban')}
                                        className={`view-toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`}
                                        title="Kanban View"
                                    >
                                        <FiTrello size={18} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="btn btn-primary"
                                >
                                    + Create Task
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Cards */}
                    <div className="analytics-grid">
                        <AnalyticsCard
                            title="Total Tasks"
                            value={totalTasks}
                            icon={FiList}
                            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        />
                        <AnalyticsCard
                            title="In Progress"
                            value={inProgressTasks}
                            icon={FiClock}
                            gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                        />
                        <AnalyticsCard
                            title="Completed"
                            value={completedTasks}
                            icon={FiCheckCircle}
                            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        />
                        <AnalyticsCard
                            title="Overdue"
                            value={overdueTasks}
                            icon={FiAlertCircle}
                            gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                        />
                    </div>

                    {/* Progress Bar Section */}
                    {totalTasks > 0 && (
                        <div className="progress-section fade-in" style={{ marginTop: '24px' }}>
                            <div className="flex-between mb-2">
                                <span className="text-secondary" style={{ fontWeight: 600 }}>Project Completion Rate</span>
                                <span className="text-primary" style={{ fontWeight: 700 }}>{completionRate}%</span>
                            </div>
                            <div className="progress-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${completionRate}%`, transition: 'width 0.8s ease-in-out' }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Search & Filter Bar */}
                    <div className="search-filter-batch mt-4">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="form-control"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filters-box">
                            <select name="status" className="form-control" value={filters.status} onChange={handleFilterChange}>
                                <option value="">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                            <select name="priority" className="form-control" value={filters.priority} onChange={handleFilterChange}>
                                <option value="">All Priority</option>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="CRITICAL">Critical</option>
                            </select>
                            <select name="assignedTo" className="form-control" value={filters.assignedTo} onChange={handleFilterChange}>
                                <option value="">All Members</option>
                                {members.filter(m => m.role === 'MEMBER').map(m => (
                                    <option key={m._id} value={m._id}>{m.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {totalTasks === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📋</div>
                            <h3>No tasks yet</h3>
                            <p>Create your first task to get started</p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn btn-primary"
                            >
                                Create Task
                            </button>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'kanban' ? (
                                <KanbanBoard tasks={tasks} onTaskMove={handleTaskMove} />
                            ) : (
                                <>
                                    {/* Charts Section */}
                                    <div className="charts-section">
                                        <div className="charts-grid">
                                            <div className="chart-card">
                                                <div className="chart-card-header">
                                                    <h3 className="chart-card-title">Task Distribution</h3>
                                                    <p className="chart-card-subtitle">Tasks by status</p>
                                                </div>
                                                <TaskDistributionChart tasks={tasks} />
                                            </div>
                                            <div className="chart-card">
                                                <div className="chart-card-header">
                                                    <h3 className="chart-card-title">Team Performance</h3>
                                                    <p className="chart-card-subtitle">Tasks per team member</p>
                                                </div>
                                                <TeamPerformanceChart tasks={tasks} members={members} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Task Grid */}
                                    <h2 className="section-title">Team Tasks</h2>
                                    <div className="task-grid">
                                        {tasks.map((task) => (
                                            <div key={task._id} className="card task-card">
                                                <StatusBadge status={task.status} />

                                                <div className="card-header">
                                                    <div className="flex-between mb-2">
                                                        <h3 className="card-title">{task.title}</h3>
                                                        <PriorityBadge priority={task.priority} />
                                                    </div>
                                                    <p className="card-subtitle">{task.description}</p>
                                                </div>

                                                <div className="task-info">
                                                    <div className="task-info-item">
                                                        <strong>Start:</strong> {formatDate(task.startDate)}
                                                    </div>
                                                    <div className="task-info-item">
                                                        <strong>Deadline:</strong> {formatDate(task.deadline)}
                                                    </div>
                                                    {task.assignedTo ? (
                                                        <>
                                                            <div className="task-info-item">
                                                                <strong>Assigned to:</strong> {task.assignedTo.name}
                                                            </div>
                                                            <div className="task-info-item">
                                                                <strong>Assigned on:</strong> {formatDate(task.assignedDate)}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <p className="text-muted">Unassigned</p>
                                                    )}
                                                </div>

                                                <div className="task-actions mt-3 flex-between">
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <button
                                                            onClick={() => handleEdit(task)}
                                                            className="btn-icon btn-edit"
                                                            title="Edit Task"
                                                        >
                                                            <FiEdit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteTask(task._id)}
                                                            className="btn-icon btn-delete"
                                                            title="Delete Task"
                                                        >
                                                            <FiTrash2 size={16} />
                                                        </button>
                                                    </div>
                                                    {!task.assignedTo && (
                                                        <select
                                                            onChange={(e) => handleAssign(task._id, e.target.value)}
                                                            className="form-control"
                                                            defaultValue=""
                                                            style={{ width: 'auto' }}
                                                        >
                                                            <option value="" disabled>Assign...</option>
                                                            {members.filter(m => m.role === 'MEMBER').map((member) => (
                                                                <option key={member._id} value={member._id}>
                                                                    {member.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination Controls */}
                                    {pagination.totalPages > 1 && (
                                        <div className="pagination-container mt-4 mb-4">
                                            <button
                                                className="btn btn-secondary"
                                                disabled={page === 1}
                                                onClick={() => setPage(p => p - 1)}
                                            >
                                                Previous
                                            </button>
                                            <span className="pagination-info">
                                                Page {page} of {pagination.totalPages}
                                            </span>
                                            <button
                                                className="btn btn-secondary"
                                                disabled={page === pagination.totalPages}
                                                onClick={() => setPage(p => p + 1)}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Team Management Section */}
                    <div className="team-management-section">
                        <div className="section-header">
                            <FiUsers className="section-icon" />
                            <h2 className="section-title">Team Management</h2>
                        </div>
                        <div className="card team-card">
                            <div className="member-list">
                                {members.length === 0 ? (
                                    <p className="empty-msg">No team members registered yet.</p>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="member-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {members.map((member) => (
                                                    <tr key={member._id}>
                                                        <td>{member.name}</td>
                                                        <td>{member.email}</td>
                                                        <td>
                                                            <span className={`user-badge ${member.role === 'MANAGER' ? 'user-badge-manager' : 'user-badge-member'}`}>
                                                                {member.role}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => handleDeleteUser(member)}
                                                                className="btn-icon btn-delete"
                                                                title="Remove User"
                                                            >
                                                                <FiTrash2 size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editMode ? 'Edit Task' : 'Create New Task'}</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Task Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter task title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    placeholder="Enter task description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    className="form-control"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="deadline">Deadline</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    className="form-control"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    className="form-control"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="CRITICAL">Critical</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="assignedTo">Assign To (Optional)</label>
                                <select
                                    id="assignedTo"
                                    name="assignedTo"
                                    className="form-control"
                                    value={formData.assignedTo}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a member...</option>
                                    {members.filter(m => m.role === 'MEMBER').map((member) => (
                                        <option key={member._id} value={member._id}>
                                            {member.name} ({member.email})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editMode ? 'Update Task' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManagerDashboard;
