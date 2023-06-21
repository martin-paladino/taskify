import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, deleteTask, createTask, updateTask } from "../services/api";
import { getUser } from '../utils';
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import NewTask from "../components/NewTask";
import { Modal, IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [openedModal, setOpenedModal] = useState(false);

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() =>{
        const currentUser = getUser();
        if(!currentUser) {
            navigate("/login");
            return;
        }

        const getTasks = async () => {
            const tasks = await fetchTasks(currentUser.id);
            setTasks(tasks);
            setFilteredTasks(tasks);
        };
        getTasks();
    }, []);

    useEffect(() => {
        if(selectedFilter === "all") {
            setFilteredTasks(tasks);
        }
        else if(selectedFilter === "completed") {
            setFilteredTasks(tasks.filter((task) => task.completed === true));
        }
        else if(selectedFilter === "pending") {
            setFilteredTasks(tasks.filter((task) => task.completed === false));
        }
    }, [tasks, selectedFilter]);

    const handleDeleteTask = async (id, userId) => {
        await deleteTask(id, userId);
        // filter out the task that was deleted avoids having to make another API call
        // to get the updated list of tasks
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleCreateTask = async (task) => {
        const newTask = await createTask(task);
        setTasks([...tasks, newTask]);
    };

    const handleUpdateTaskCompleted = async (fields, taskId, userId) => {
        const task = await updateTask(fields, taskId, userId);
        setTasks(tasks.map((t) => (t.id === taskId ? task : t)));
    };

    const handleOpenModal = () => setOpenedModal(true);
    const handleCloseModal = () => setOpenedModal(false);

    return (
        <div>
            <Navbar setSelectedFilter={setSelectedFilter}></Navbar>
            <TaskList tasks={filteredTasks} actions={{ handleDeleteTask, handleUpdateTaskCompleted }}></TaskList>
            <Tooltip title={t("tooltips.add")}>
                <IconButton style={{ boxShadow: "none" }} variant="contained" onClick={handleOpenModal}>
                    <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
            </Tooltip>
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