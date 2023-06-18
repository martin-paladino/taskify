import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import NewTask from "../components/NewTask";
import { fetchTasks, deleteTask, createTask, updateTask } from "../services/api";
import { Button, Modal } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [openedModal, setOpenedModal] = useState(false);

    useEffect(() =>{
        const getTasks = async () => {
            const tasks = await fetchTasks();
            setTasks(tasks);
        };
        getTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        // filter out the task that was deleted avoids having to make another API call
        // to get the updated list of tasks
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleCreateTask = async (task) => {
        const newTask = await createTask(task);
        console.log("nueva task added", newTask)
        setTasks([...tasks, newTask]);
    };

    const handleUpdateTaskCompleted = async (fields, taskId) => {
        const task = await updateTask(fields, taskId);
        setTasks(tasks.map((t) => (t.id === taskId ? task : t)));
    };

    const handleOpenModal = () => setOpenedModal(true);
    const handleCloseModal = () => setOpenedModal(false);

    return (
        <div>
            <Navbar></Navbar>
            <h1>Taskify</h1>
            <TaskList tasks={tasks} actions={ {handleDeleteTask, handleUpdateTaskCompleted} }></TaskList>
            <Button style={{ boxShadow: "none" }} variant="contained" onClick={handleOpenModal}>
                <AddCircleOutlineIcon />
            </Button>
            <Modal
                open={openedModal}
                onClose={handleCloseModal}
            >
                <NewTask onCreateTask={handleCreateTask} onCloseModal={handleCloseModal} />
            </Modal>
        </div>
    );
}

export default Home;