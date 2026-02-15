import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TaskDistributionChart = ({ tasks }) => {
    // Calculate task distribution
    const data = [
        {
            name: 'Pending',
            value: tasks.filter(t => t.status === 'PENDING').length,
            color: '#eab308'
        },
        {
            name: 'In Progress',
            value: tasks.filter(t => t.status === 'IN_PROGRESS').length,
            color: '#3b82f6'
        },
        {
            name: 'Completed',
            value: tasks.filter(t => t.status === 'COMPLETED').length,
            color: '#10b981'
        }
    ];

    // Filter out zero values
    const filteredData = data.filter(item => item.value > 0);

    if (filteredData.length === 0) {
        return (
            <div className="chart-empty-state">
                <p>No task data available</p>
            </div>
        );
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-tooltip">
                    <p className="chart-tooltip-label">{payload[0].name}</p>
                    <p className="chart-tooltip-value">
                        {payload[0].value} task{payload[0].value !== 1 ? 's' : ''}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={filteredData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {filteredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TaskDistributionChart;
