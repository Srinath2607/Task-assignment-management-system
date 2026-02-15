import { FiCheckCircle, FiClock, FiAlertCircle, FiList } from 'react-icons/fi';

const AnalyticsCard = ({ title, value, icon: Icon, gradient, trend }) => {
    return (
        <div className="analytics-card" style={{ background: gradient }}>
            <div className="analytics-card-content">
                <div className="analytics-card-header">
                    <div className="analytics-card-icon">
                        <Icon size={24} />
                    </div>
                    {trend && (
                        <span className="analytics-card-trend">
                            {trend > 0 ? '+' : ''}{trend}%
                        </span>
                    )}
                </div>
                <div className="analytics-card-body">
                    <h3 className="analytics-card-value">{value}</h3>
                    <p className="analytics-card-title">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCard;
