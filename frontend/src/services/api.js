import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth Services
export const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// Task Services
export const taskService = {
    getTasks: async () => {
        const response = await api.get('/tasks');
        return response.data;
    },

    getTask: async (id) => {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    createTask: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    updateTaskStatus: async (id, status) => {
        const response = await api.put(`/tasks/${id}/status`, { status });
        return response.data;
    },

    assignTask: async (id, memberId) => {
        const response = await api.put(`/tasks/${id}/assign`, { memberId });
        return response.data;
    },

    getMembers: async () => {
        const response = await api.get('/tasks/members/list');
        return response.data;
    }
};

export default api;
