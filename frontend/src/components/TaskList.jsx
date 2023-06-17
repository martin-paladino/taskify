import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, error }) => {
    if (loading) {
        return <p>Loading tasks...</p>;
    }
    
    if (error) {
        return <p>Error loading tasks</p>;
    }
    
    return (
        <ul>
        {tasks.map((task) => (
            <li key={task.id}>
                <TaskItem task={task}></TaskItem>
            </li>
        ))}
        </ul>
    );
};

export default TaskList;