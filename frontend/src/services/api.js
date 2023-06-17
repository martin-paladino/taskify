const BASE_URL = 'http://localhost:8000'; // URL base del backend

export const fetchTasks = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks/`);
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}