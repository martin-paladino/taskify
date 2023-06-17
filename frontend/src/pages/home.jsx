import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import { fetchTasks } from "../services/api";

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() =>{
        const getTasks = async () => {
            const tasks = await fetchTasks();
            setTasks(tasks);
        };
        getTasks();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <h1>Taskify</h1>
            <TaskList tasks={tasks}></TaskList>
        </div>
    );
}

export default Home;