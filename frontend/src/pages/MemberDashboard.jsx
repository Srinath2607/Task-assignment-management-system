import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { PriorityBadge, StatusBadge } from '../components/Badge';
import AnalyticsCard from '../components/AnalyticsCard';
import TaskDistributionChart from '../components/TaskDistributionChart';
import KanbanBoard from '../components/KanbanBoard';
import { DashboardSkeleton } from '../components/SkeletonLoaders';
import { FiList, FiClock, FiCheckCircle, FiAlertCircle, FiGrid, FiTrello } from 'react-icons/fi';

const MemberDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'kanban'

    useEffect(() => {
        fetchTasks();
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

    const handleStatusUpdate = async (taskId, newStatus) => {
        try {
            await taskService.updateTaskStatus(taskId, newStatus);
            toast.success('Task status updated successfully!');
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update task status');
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

    const isOverdue = (deadline) => {
        return new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString();
    };

    // Calculate analytics
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'PENDING').length;
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;

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
                                <h1>My Tasks</h1>
                                <p>View and update your assigned tasks</p>
                            </div>
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
                            title="Pending"
                            value={pendingTasks}
                            icon={FiAlertCircle}
                            gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
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
                    </div>

                    {/* Chart Section */}
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📝</div>
                            <h3>No tasks assigned</h3>
                            <p>You don't have any tasks assigned yet. Check back later!</p>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'kanban' ? (
                                /* Kanban Board View */
                                <KanbanBoard tasks={tasks} onTaskMove={handleStatusUpdate} />
                            ) : (
                                <>
                                    {/* Chart Section */}
                                    <div className="charts-section">
                                        <div className="chart-card">
                                            <div className="chart-card-header">
                                                <h3 className="chart-card-title">My Task Distribution</h3>
                                                <p className="chart-card-subtitle">Your tasks by status</p>
                                            </div>
                                            <TaskDistributionChart tasks={tasks} />
                                        </div>
                                    </div>

                                    {/* Task Grid */}
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
                                                        {isOverdue(task.deadline) && task.status !== 'COMPLETED' && (
                                                            <span style={{ color: '#f44336', marginLeft: '8px' }}>
                                                                (Overdue)
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="task-info-item">
                                                        <strong>Assigned by:</strong> {task.createdBy?.name || 'N/A'}
                                                    </div>
                                                    <div className="task-info-item">
                                                        <strong>Assigned on:</strong> {formatDate(task.assignedDate)}
                                                    </div>
                                                </div>

                                                <div className="task-actions">
                                                    <select
                                                        value={task.status}
                                                        onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                                                        className="form-control"
                                                    >
                                                        <option value="PENDING">Pending</option>
                                                        <option value="IN_PROGRESS">In Progress</option>
                                                        <option value="COMPLETED">Completed</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {tasks.length > 0 && (
                        <div className="mt-4">
                            <div className="card">
                                <h3 className="card-title">Task Summary</h3>
                                <div className="task-info">
                                    <div className="task-info-item">
                                        <strong>Total Tasks:</strong> {tasks.length}
                                    </div>
                                    <div className="task-info-item">
                                        <strong>Pending:</strong>{' '}
                                        {tasks.filter((t) => t.status === 'PENDING').length}
                                    </div>
                                    <div className="task-info-item">
                                        <strong>In Progress:</strong>{' '}
                                        {tasks.filter((t) => t.status === 'IN_PROGRESS').length}
                                    </div>
                                    <div className="task-info-item">
                                        <strong>Completed:</strong>{' '}
                                        {tasks.filter((t) => t.status === 'COMPLETED').length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default MemberDashboard;
