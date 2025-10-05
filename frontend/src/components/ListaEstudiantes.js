// src/components/ListaEstudiantes.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getEstudiantes, createEstudiante, updateEstudiante, deleteEstudiante } from '../services/apiService';
import { Link } from 'react-router-dom';

// Import all modals we will use
import EstudianteModal from './EstudianteModal'; // For Create/Edit students
import ModalSeleccionarCursos from './ModalSeleccionarCursos'; // For Assigning Courses
import ModalCalificaciones from './ModalCalificaciones'; // For Viewing Grades

const ListaEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudianteActual, setEstudianteActual] = useState(null);

    // States to control the visibility of each modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCursosModal, setShowCursosModal] = useState(false);
    const [showCalificacionesModal, setShowCalificacionesModal] = useState(false);

    // Function to load or reload the student list
    const cargarEstudiantes = () => {
        getEstudiantes().then(response => setEstudiantes(response.data));
    };

    useEffect(() => {
        cargarEstudiantes();
    }, []);

    // --- HANDLERS FOR STUDENT CRUD ---
    const handleSaveEstudiante = (estudiante) => {
        if (estudiante.id) {
            updateEstudiante(estudiante.id, estudiante).then(() => cargarEstudiantes());
        } else {
            createEstudiante(estudiante).then(() => cargarEstudiantes());
        }
        setShowEditModal(false); // Close the modal after saving
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar a este estudiante?')) {
            deleteEstudiante(id).then(() => cargarEstudiantes());
        }
    };

    // --- FUNCTIONS TO OPEN EACH MODAL ---
    const handleOpenEditModal = (estudiante = null) => {
        setEstudianteActual(estudiante);
        setShowEditModal(true);
    };

    const handleOpenCursosModal = (estudiante) => {
        setEstudianteActual(estudiante);
        setShowCursosModal(true);
    };

    const handleOpenCalificacionesModal = (estudiante) => {
        setEstudianteActual(estudiante);
        setShowCalificacionesModal(true);
    };

    const handleCloseCursosModal = (shouldReload = false) => {
        setShowCursosModal(false);
        if (shouldReload) {
            cargarEstudiantes(); // Recargar la lista después de guardar
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Gestión de Estudiantes</h1>
                <Button variant="primary" onClick={() => handleOpenEditModal()}>+ Agregar Estudiante</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Cursos Inscritos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map(estudiante => (
                        <tr key={estudiante.id}>
                            <td>
                                <Link to={`/perfil/${estudiante.id}`}>{estudiante.nombre}</Link>
                            </td>
                            <td>{estudiante.apellido}</td>
                            <td>{estudiante.email}</td>
                            <td>
                                {/* Iterate over the nested courses and display them */}
                                {estudiante.cursos && estudiante.cursos.length > 0 ? (
                                    <ul>
                                        {estudiante.cursos.map(curso => (
                                            <li key={curso.id}>{curso.materia.nombre}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No hay cursos inscritos.</span>
                                )}
                            </td>
                            <td>
                                <Button variant="warning" size="sm" className="me-1" onClick={() => handleOpenEditModal(estudiante)}>Editar</Button>
                                <Button variant="danger" size="sm" className="me-1" onClick={() => handleDelete(estudiante.id)}>Eliminar</Button>
                                <Button variant="info" size="sm" className="me-1" onClick={() => handleOpenCursosModal(estudiante)}>Cursos</Button>
                                <Button variant="success" size="sm" onClick={() => handleOpenCalificacionesModal(estudiante)}>Calificaciones</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modals are rendered here, as they were before. */}
            {showEditModal && <EstudianteModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                handleSave={handleSaveEstudiante}
                estudiante={estudianteActual}
            />}

            {showCursosModal && <ModalSeleccionarCursos
                show={showCursosModal}
                handleClose={handleCloseCursosModal}
                estudiante={estudianteActual}
            />}

            {showCalificacionesModal && <ModalCalificaciones
                show={showCalificacionesModal}
                handleClose={() => setShowCalificacionesModal(false)}
                estudiante={estudianteActual}
            />}
        </>
    );
};

export default ListaEstudiantes;