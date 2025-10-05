// src/pages/GestionCursos.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { getCursos, createCurso, updateCurso, deleteCurso, getMaestros, getMaterias } from '../services/apiService';
import CursoModal from '../components/CursoModal';

const GestionCursos = () => {
    const [cursos, setCursos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [maestros, setMaestros] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [cursoActual, setCursoActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar datos iniciales
    useEffect(() => {
        const cargarDatosIniciales = async () => {
            setLoading(true);
            setError(null);

            try {
                // Cargar todos los datos en paralelo
                const [cursosResponse, maestrosResponse, materiasResponse] = await Promise.all([
                    getCursos(),
                    getMaestros(),
                    getMaterias()
                ]);

                setCursos(cursosResponse?.data || []);
                setMaestros(maestrosResponse?.data || []);
                setMaterias(materiasResponse?.data || []);
            } catch (err) {
                setError('Error al cargar los datos');
                console.error("Error al cargar datos:", err);
            } finally {
                setLoading(false);
            }
        };

        cargarDatosIniciales();
    }, []);

    // SOLO MANTENER cargarCursos - eliminar las otras funciones
    const cargarCursos = () => {
        return getCursos()
            .then(response => setCursos(response.data || []))
            .catch(error => {
                console.error("Error al cargar cursos:", error);
                setCursos([]);
            });
    };

    const handleOpenModal = (curso = null) => {
        setCursoActual(curso);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCursoActual(null);
    };

    const handleSave = (cursoData) => {
        const promesa = cursoActual
            ? updateCurso(cursoActual.id, cursoData)
            : createCurso(cursoData);

        promesa
            .then(() => {
                cargarCursos(); // Recargar solo los cursos después de guardar
                handleCloseModal();
            })
            .catch(error => {
                console.error("Error al guardar curso:", error);
                alert('Error al guardar el curso');
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este curso?')) {
            deleteCurso(id)
                .then(() => cargarCursos())
                .catch(error => {
                    console.error("Error al eliminar curso:", error);
                    alert('Error al eliminar el curso');
                });
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-2">Cargando datos...</p>
            </div>
        );
    }

    return (
        <>
            <h1>Gestión de Cursos</h1>

            {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Button variant="primary" onClick={() => handleOpenModal()}>
                + Agregar Curso
            </Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Semestre</th>
                        <th>Materia</th>
                        <th>Profesor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No hay cursos disponibles
                            </td>
                        </tr>
                    ) : (
                        cursos.map(curso => (
                            <tr key={curso.id}>
                                <td>{curso.id}</td>
                                <td>{curso.semestre}</td>
                                <td>{curso.materia?.nombre || 'N/A'}</td>
                                <td>
                                    {curso.profesor?.nombre || 'N/A'} {curso.profesor?.apellido || ''}
                                </td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleOpenModal(curso)}
                                        className="me-2"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(curso.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <CursoModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                curso={cursoActual}
                materias={materias || []}  // ← Esto asegura que siempre sea array
                maestros={maestros || []}  // ← Esto asegura que siempre sea array
            />
        </>
    );
};

export default GestionCursos;