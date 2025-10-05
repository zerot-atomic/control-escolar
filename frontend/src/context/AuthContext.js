// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si hay token al cargar
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const loginUser = async (email, password) => {
        try {
            const response = await apiClient.post('auth/login/', {
                email,
                password
            });

            console.log('Respuesta completa del login:', response); // Para debug

            // DIFERENTES FORMATOS POSIBLES DE TOKEN:
            const token = response.data.token ||
                response.data.access_token ||
                response.data.access ||
                response.data.key;

            if (!token) {
                console.error('Estructura de respuesta inesperada:', response.data);
                throw new Error('No se recibió token en la respuesta');
            }

            // GUARDA EL TOKEN COMO STRING
            setAuthToken(token);
            localStorage.setItem('authToken', token);

            // Guarda información del usuario si está disponible
            if (response.data.user) {
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            console.log("Login exitoso, token guardado:", token);
            navigate('/');

        } catch (error) {
            console.error("Error de login:", error.response?.data || error.message);
            alert('¡Email o contraseña incorrectos!');
        }
    };

    const registerUser = async (email, password) => {
        try {
            await apiClient.post('register/', {
                email,
                password,
            });
            alert('¡Registro exitoso! Por favor, inicia sesión.');
            navigate('/login');
        } catch (error) {
            console.error("Error de registro:", error.response?.data);
            const errorMessage = Object.values(error.response?.data || {}).join('\n');
            alert(`Hubo un error en el registro:\n${errorMessage}`);
        }
    };

    const logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const contextData = {
        user,
        authToken,
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };