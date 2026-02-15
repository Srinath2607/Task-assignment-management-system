import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ tasks, onTaskMove }) => {
    const columns = [
        { id: 'PENDING', title: 'Pending' },
        { id: 'IN_PROGRESS', title: 'In Progress' },
        { id: 'COMPLETED', title: 'Completed' }
    ];

    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // Dropped outside a droppable area
        if (!destination) {
            return;
        }

        // Dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Status changed
        if (destination.droppableId !== source.droppableId) {
            const newStatus = destination.droppableId;
            onTaskMove(draggableId, newStatus);
        }
    };

    return (
        <div className="kanban-board">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="kanban-columns">
                    {columns.map(column => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            tasks={getTasksByStatus(column.id)}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;
