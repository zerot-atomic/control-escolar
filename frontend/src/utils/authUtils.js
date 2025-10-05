// src/utils/authUtils.js

export const getAuthToken = () => {
    try {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        return authToken ? authToken.access : null;
    } catch (e) {
        console.error("Error al leer el token de autenticación:", e);
        return null;
    }
};