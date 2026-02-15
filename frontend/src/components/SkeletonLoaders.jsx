import Skeleton from './Skeleton';

export const AnalyticsCardSkeleton = () => {
    return (
        <div className="analytics-card analytics-card-primary">
            <div className="analytics-card-content">
                <div className="analytics-card-icon">
                    <Skeleton width="40px" height="40px" borderRadius="50%" />
                </div>
                <div className="analytics-card-info">
                    <Skeleton width="60px" height="16px" />
                    <Skeleton width="40px" height="32px" />
                </div>
            </div>
        </div>
    );
};

export const TaskCardSkeleton = () => {
    return (
        <div className="card task-card">
            <div className="card-header">
                <Skeleton width="70%" height="20px" />
                <Skeleton width="60px" height="24px" borderRadius="12px" />
            </div>
            <div className="card-body">
                <Skeleton width="100%" height="16px" />
                <Skeleton width="90%" height="16px" />
                <Skeleton width="80%" height="16px" />
            </div>
            <div className="card-footer" style={{ marginTop: '12px' }}>
                <Skeleton width="100px" height="14px" />
                <Skeleton width="80px" height="14px" />
            </div>
        </div>
    );
};

export const ChartSkeleton = () => {
    return (
        <div className="chart-card">
            <div className="chart-card-header">
                <Skeleton width="150px" height="20px" />
                <Skeleton width="100px" height="14px" />
            </div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <Skeleton width="250px" height="250px" borderRadius="50%" />
            </div>
        </div>
    );
};

export const KanbanColumnSkeleton = () => {
    return (
        <div className="kanban-column">
            <div className="kanban-column-header">
                <Skeleton width="120px" height="20px" />
                <Skeleton width="30px" height="24px" borderRadius="12px" />
            </div>
            <div className="kanban-column-content">
                <KanbanCardSkeleton />
                <KanbanCardSkeleton />
                <KanbanCardSkeleton />
            </div>
        </div>
    );
};

export const KanbanCardSkeleton = () => {
    return (
        <div className="kanban-card" style={{ marginBottom: '12px' }}>
            <div className="kanban-card-header">
                <Skeleton width="70%" height="16px" />
                <Skeleton width="50px" height="20px" borderRadius="10px" />
            </div>
            <Skeleton width="100%" height="14px" />
            <Skeleton width="90%" height="14px" />
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <Skeleton width="70px" height="24px" borderRadius="4px" />
                <Skeleton width="80px" height="24px" borderRadius="4px" />
            </div>
        </div>
    );
};

export const DashboardSkeleton = () => {
    return (
        <div className="container">
            <div className="dashboard-header">
                <Skeleton width="250px" height="32px" />
                <Skeleton width="150px" height="16px" />
            </div>

            {/* Analytics Cards Skeleton */}
            <div className="analytics-grid">
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
            </div>

            {/* Task Grid Skeleton */}
            <div className="task-grid">
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
            </div>
        </div>
    );
};
