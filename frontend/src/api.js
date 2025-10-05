// src/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');

        console.log('🔐 Interceptor - Token encontrado:', token);

        if (token) {
            // CAMBIO: Usar 'Bearer' en lugar de 'Token' para JWT
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('🔐 Interceptor - Header Authorization agregado con Bearer');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;