import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TeamPerformanceChart = ({ tasks, members }) => {
    // Calculate tasks per member
    const memberTaskCounts = members.map(member => {
        const memberTasks = tasks.filter(t => t.assignedTo?._id === member._id);
        const completed = memberTasks.filter(t => t.status === 'COMPLETED').length;
        const inProgress = memberTasks.filter(t => t.status === 'IN_PROGRESS').length;
        const pending = memberTasks.filter(t => t.status === 'PENDING').length;

        return {
            name: member.name.split(' ')[0], // First name only for cleaner display
            Completed: completed,
            'In Progress': inProgress,
            Pending: pending,
            total: memberTasks.length
        };
    });

    // Filter members with at least one task
    const filteredData = memberTaskCounts.filter(m => m.total > 0);

    if (filteredData.length === 0) {
        return (
            <div className="chart-empty-state">
                <p>No team data available</p>
                <p className="text-muted">Assign tasks to members to see performance metrics</p>
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const total = payload.reduce((sum, entry) => sum + entry.value, 0);
            return (
                <div className="chart-tooltip">
                    <p className="chart-tooltip-label">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="chart-tooltip-item" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                    <p className="chart-tooltip-total">Total: {total}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                        dataKey="name"
                        stroke="var(--text-secondary)"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="var(--text-secondary)"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: '12px' }}
                        iconType="circle"
                    />
                    <Bar dataKey="Completed" fill="#10b981" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="In Progress" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Pending" fill="#eab308" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TeamPerformanceChart;
