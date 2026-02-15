import { Draggable } from '@hello-pangea/dnd';
import { PriorityBadge } from './Badge';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

const KanbanCard = ({ task, index }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = (deadline, status) => {
        if (status === 'COMPLETED') return false;
        return new Date(deadline) < new Date();
    };

    const getDaysUntilDeadline = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysUntil = getDaysUntilDeadline(task.deadline);
    const overdue = isOverdue(task.deadline, task.status);

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`kanban-card ${snapshot.isDragging ? 'dragging' : ''} ${overdue ? 'overdue' : ''
                        }`}
                >
                    <div className="kanban-card-header">
                        <h4 className="kanban-card-title">{task.title}</h4>
                        <PriorityBadge priority={task.priority} />
                    </div>

                    <p className="kanban-card-description">{task.description}</p>

                    <div className="kanban-card-meta">
                        {task.assignedTo && (
                            <div className="kanban-card-meta-item">
                                <FiUser size={14} />
                                <span>{task.assignedTo.name}</span>
                            </div>
                        )}

                        <div className={`kanban-card-meta-item ${overdue ? 'overdue-text' : ''}`}>
                            <FiCalendar size={14} />
                            <span>{formatDate(task.deadline)}</span>
                        </div>

                        {!overdue && daysUntil <= 3 && daysUntil >= 0 && (
                            <div className="kanban-card-meta-item urgent">
                                <FiClock size={14} />
                                <span>{daysUntil} day{daysUntil !== 1 ? 's' : ''} left</span>
                            </div>
                        )}

                        {overdue && (
                            <div className="kanban-card-meta-item overdue-text">
                                <FiClock size={14} />
                                <span>Overdue!</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default KanbanCard;
