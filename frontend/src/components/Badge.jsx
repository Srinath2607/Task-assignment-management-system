const Badge = ({ children, variant = 'primary', className = '' }) => {
    const baseClass = 'badge';
    const variantClass = `badge-${variant.toLowerCase()}`;

    return (
        <span className={`${baseClass} ${variantClass} ${className}`}>
            {children}
        </span>
    );
};

// Priority Badge Component
export const PriorityBadge = ({ priority }) => {
    const priorityMap = {
        CRITICAL: { variant: 'critical', label: 'Critical' },
        HIGH: { variant: 'high', label: 'High' },
        MEDIUM: { variant: 'medium', label: 'Medium' },
        LOW: { variant: 'low', label: 'Low' }
    };

    const config = priorityMap[priority?.toUpperCase()] || priorityMap.MEDIUM;

    return (
        <Badge variant={config.variant}>
            {config.label}
        </Badge>
    );
};

// Status Badge Component
export const StatusBadge = ({ status }) => {
    const statusMap = {
        PENDING: { variant: 'pending', label: 'Pending' },
        IN_PROGRESS: { variant: 'in-progress', label: 'In Progress' },
        COMPLETED: { variant: 'completed', label: 'Completed' }
    };

    const config = statusMap[status?.toUpperCase()] || statusMap.PENDING;

    return (
        <Badge variant={config.variant}>
            {config.label}
        </Badge>
    );
};

export default Badge;
