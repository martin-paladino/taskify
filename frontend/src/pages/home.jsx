import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>Taskify</h1>
            <TaskList></TaskList>
        </div>
    );
}

export default Home;