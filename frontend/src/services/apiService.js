// src/services/apiService.js

// Importa el cliente que ya tiene configuración de autenticación
import apiClient from '../api';

// Función auxiliar para manejar errores
const handleApiError = (error, endpoint) => {
    console.error(`Error en ${endpoint}:`, error);
    // Devuelve un objeto con data vacío para prevenir errores
    return { data: [] };
};

// --- ESTUDIANTES ---
export const getEstudiantes = () =>
    apiClient.get('estudiantes/')
        .catch(error => handleApiError(error, 'getEstudiantes'));

export const createEstudiante = (estudiante) =>
    apiClient.post('estudiantes/', estudiante);

export const updateEstudiante = (id, estudiante) =>
    apiClient.put(`estudiantes/${id}/`, estudiante);

export const deleteEstudiante = (id) =>
    apiClient.delete(`estudiantes/${id}/`);

export const getEstudianteDetalle = (studentId) =>
    apiClient.get(`estudiantes/${studentId}/`)
        .catch(error => handleApiError(error, 'getEstudianteDetalle'));

export const updateEstudianteCursos = (studentId, courseIds) =>
    apiClient.patch(`estudiantes/${studentId}/`, { cursos_ids: courseIds });

// --- CURSOS ---
export const getCursos = () =>
    apiClient.get('cursos/')
        .catch(error => handleApiError(error, 'getCursos'));

export const createCurso = (curso) =>
    apiClient.post('cursos/', curso);

export const updateCurso = (id, curso) =>
    apiClient.put(`cursos/${id}/`, curso);

export const deleteCurso = (id) =>
    apiClient.delete(`cursos/${id}/`);

// --- CALIFICACIONES ---
export const getCalificaciones = (studentId) =>
    apiClient.get(`calificaciones/?estudiante=${studentId}`)
        .catch(error => handleApiError(error, 'getCalificaciones'));

export const saveCalificacion = (calificacionData) => {
    if (calificacionData.id) {
        return apiClient.put(`calificaciones/${calificacionData.id}/`, calificacionData);
    }
    return apiClient.post('calificaciones/', calificacionData);
};

// --- MATERIAS ---
export const getMaterias = () =>
    apiClient.get('materias/')
        .catch(error => handleApiError(error, 'getMaterias'));

export const createMateria = (materia) =>
    apiClient.post('materias/', materia);

export const updateMateria = (id, materia) =>
    apiClient.put(`materias/${id}/`, materia);

export const deleteMateria = (id) =>
    apiClient.delete(`materias/${id}/`);

// --- MAESTROS ---
export const getMaestros = () =>
    apiClient.get('maestros/')
        .catch(error => handleApiError(error, 'getMaestros'));

export const createMaestro = (maestro) =>
    apiClient.post('maestros/', maestro);

export const updateMaestro = (id, maestro) =>
    apiClient.put(`maestros/${id}/`, maestro);

export const deleteMaestro = (id) =>
    apiClient.delete(`maestros/${id}/`);

// --- CARRERAS ---
export const getCarreras = () =>
    apiClient.get('carreras/')
        .catch(error => handleApiError(error, 'getCarreras'));

export const createCarrera = (carrera) =>
    apiClient.post('carreras/', carrera);

export const updateCarrera = (id, carrera) =>
    apiClient.put(`carreras/${id}/`, carrera);

export const deleteCarrera = (id) =>
    apiClient.delete(`carreras/${id}/`);