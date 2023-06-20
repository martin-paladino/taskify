import { getCsrfTokenCookie } from "../utils";

const BASE_URL = 'http://localhost:8000';

/* --------- Tasks --------- */

export const fetchTasks = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks/`);
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks/`, {
            method: 'POST',
            body: task,
        });
        const data = await res.json();
        console.log("data", data)
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateTask = async (fields, taskId) => {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks/${taskId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fields),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks/${id}/`, {
            method: 'DELETE',
        });
        return res.status === 204;
    } catch (error) {
        throw error;
    }
};

/* --------- Authentication --------- */

export const registerUser = async (credentials) => {
    try {
        const res = await fetch(`${BASE_URL}/api/register/`, {
            method: 'POST',
              body: credentials,
        });
        const data = await res.json();
        console.log("data token", data)
        return data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const res = await fetch(`${BASE_URL}/api/login/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
              body: JSON.stringify(credentials),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    const csrfToken = getCsrfTokenCookie();
    try {
        const res = await fetch(`${BASE_URL}/api/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
        });
        return res.status === 204;
    } catch (error) {
        throw error;
    }
};