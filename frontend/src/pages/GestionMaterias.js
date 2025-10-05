// src/pages/GestionMaterias.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getMaterias, createMateria, updateMateria, deleteMateria } from '../services/apiService';
import MateriaModal from '../components/MateriaModal';

const GestionMaterias = () => {
    const [materias, setMaterias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [materiaActual, setMateriaActual] = useState(null);

    const cargarMaterias = () => {
        getMaterias().then(response => setMaterias(response.data));
    };

    useEffect(() => {
        cargarMaterias();
    }, []);

    const handleOpenModal = (materia = null) => {
        setMateriaActual(materia);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSave = (materia) => {
        if (materia.id) {
            updateMateria(materia.id, materia).then(() => cargarMaterias());
        } else {
            createMateria(materia).then(() => cargarMaterias());
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta materia?')) {
            deleteMateria(id).then(() => cargarMaterias());
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Gestión de Materias</h1>
                <Button variant="primary" onClick={() => handleOpenModal()}>+ Agregar Materia</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map(materia => (
                        <tr key={materia.id}>
                            <td>{materia.nombre}</td>
                            <td>{materia.descripcion}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleOpenModal(materia)}>Editar</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(materia.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <MateriaModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                materia={materiaActual}
            />
        </>
    );
};

export default GestionMaterias;