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
import { FiList, FiClock, FiCheckCircle, FiAlertCircle, FiGrid, FiTrello, FiUsers, FiTrash2 } from 'react-icons/fi';

const ManagerDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'kanban'

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        deadline: '',
        assignedTo: '',
        priority: 'MEDIUM'
    });

    useEffect(() => {
        fetchTasks();
        fetchMembers();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks();
            setTasks(data.tasks);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await taskService.createTask(formData);
            toast.success('Task created successfully!');
            setShowModal(false);
            setFormData({
                title: '',
                description: '',
                startDate: '',
                deadline: '',
                assignedTo: '',
                priority: 'MEDIUM'
            });
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create task');
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

    const getStatusClass = (status) => {
        return status.toLowerCase().replace('_', '-');
    };

    // Calculate analytics
    const totalTasks = tasks.length;
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
    const overdueTasks = tasks.filter(t => {
        const isOverdue = new Date(t.deadline) < new Date();
        return isOverdue && t.status !== 'COMPLETED';
    }).length;

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

                    {tasks.length === 0 ? (
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
                                /* Kanban Board View */
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
                                                        <div className="task-actions">
                                                            <select
                                                                onChange={(e) => handleAssign(task._id, e.target.value)}
                                                                className="form-control"
                                                                defaultValue=""
                                                            >
                                                                <option value="" disabled>
                                                                    Assign to member...
                                                                </option>
                                                                {members.filter(m => m.role === 'MEMBER').map((member) => (
                                                                    <option key={member._id} value={member._id}>
                                                                        {member.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Create New Task</h2>
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
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Create Task
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
