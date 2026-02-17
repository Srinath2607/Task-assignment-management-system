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

    // Search, Filter & Pagination States
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        priority: ''
    });
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
        completedTotal: 0
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        fetchTasks();
    }, [debouncedSearch, filters, page]);

    const fetchTasks = async () => {
        try {
            const params = {
                search: debouncedSearch,
                status: filters.status,
                priority: filters.priority,
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

    const handleStatusUpdate = async (taskId, newStatus) => {
        try {
            await taskService.updateTaskStatus(taskId, newStatus);
            toast.success('Task status updated successfully!');
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update task status');
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setPage(1);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = (deadline) => {
        return new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString();
    };

    // Calculate analytics
    const totalCount = pagination.total || tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'PENDING').length;
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completedTasksOnPage = tasks.filter(t => t.status === 'COMPLETED').length;

    const completionRate = totalCount > 0 ? Math.round((pagination.completedTotal / totalCount) * 100) : 0;

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
                            value={totalCount}
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
                            value={pagination.completedTotal}
                            icon={FiCheckCircle}
                            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        />
                    </div>

                    {/* Progress Bar Section */}
                    {totalCount > 0 && (
                        <div className="progress-section fade-in" style={{ marginTop: '24px' }}>
                            <div className="flex-between mb-2">
                                <span className="text-secondary" style={{ fontWeight: 600 }}>My Completion Rate</span>
                                <span className="text-primary" style={{ fontWeight: 700 }}>{completionRate}%</span>
                            </div>
                            <div className="progress-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${completionRate}%`,
                                        transition: 'width 0.8s ease-in-out'
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Search & Filter Bar */}
                    <div className="search-filter-batch mt-4">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search my tasks..."
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
                        </div>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📝</div>
                            <h3>No tasks matched your criteria</h3>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'kanban' ? (
                                <KanbanBoard tasks={tasks} onTaskMove={handleStatusUpdate} />
                            ) : (
                                <>
                                    <div className="charts-section">
                                        <div className="chart-card">
                                            <div className="chart-card-header">
                                                <h3 className="chart-card-title">My Task Distribution</h3>
                                                <p className="chart-card-subtitle">Your tasks by status</p>
                                            </div>
                                            <TaskDistributionChart tasks={tasks} />
                                        </div>
                                    </div>

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

                                                <div className="task-actions mt-3">
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
                </div>
            </div >
        </>
    );
};

export default MemberDashboard;
