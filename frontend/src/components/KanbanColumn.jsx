import { Droppable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ column, tasks }) => {
    const getColumnColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'kanban-column-pending';
            case 'IN_PROGRESS':
                return 'kanban-column-progress';
            case 'COMPLETED':
                return 'kanban-column-completed';
            default:
                return 'kanban-column-pending';
        }
    };

    const getColumnIcon = (status) => {
        switch (status) {
            case 'PENDING':
                return '📋';
            case 'IN_PROGRESS':
                return '⏳';
            case 'COMPLETED':
                return '✅';
            default:
                return '📋';
        }
    };

    return (
        <div className={`kanban-column ${getColumnColor(column.id)}`}>
            <div className="kanban-column-header">
                <div className="kanban-column-title">
                    <span className="kanban-column-icon">{getColumnIcon(column.id)}</span>
                    <h3>{column.title}</h3>
                </div>
                <span className="kanban-column-count">{tasks.length}</span>
            </div>

            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`kanban-column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''
                            }`}
                    >
                        {tasks.length === 0 ? (
                            <div className="kanban-empty-state">
                                <p>No tasks</p>
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <KanbanCard key={task._id} task={task} index={index} />
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default KanbanColumn;
