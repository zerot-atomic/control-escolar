// src/pages/GestionCarreras.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getCarreras, createCarrera, updateCarrera, deleteCarrera } from '../services/apiService';
import CarreraModal from '../components/CarreraModal';

const GestionCarreras = () => {
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [carreraActual, setCarreraActual] = useState(null);

    const cargarCarreras = () => {
        getCarreras().then(response => setCarreras(response.data));
    };

    useEffect(() => {
        cargarCarreras();
    }, []);

    const handleOpenModal = (carrera = null) => {
        setCarreraActual(carrera);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSave = (carrera) => {
        if (carrera.id) {
            updateCarrera(carrera.id, carrera).then(() => cargarCarreras());
        } else {
            createCarrera(carrera).then(() => cargarCarreras());
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta carrera?')) {
            deleteCarrera(id).then(() => cargarCarreras());
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Gestión de Carreras</h1>
                <Button variant="primary" onClick={() => handleOpenModal()}>+ Agregar Carrera</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Duración (años)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {carreras.map(carrera => (
                        <tr key={carrera.id}>
                            <td>{carrera.nombre}</td>
                            <td>{carrera.duracion_anios}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleOpenModal(carrera)}>Editar</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(carrera.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <CarreraModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                carrera={carreraActual}
            />
        </>
    );
};

export default GestionCarreras;