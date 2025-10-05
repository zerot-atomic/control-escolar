// src/pages/GestionMaestros.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getMaestros, createMaestro, updateMaestro, deleteMaestro } from '../services/apiService';
import MaestroModal from '../components/MaestroModal';

const GestionMaestros = () => {
    const [maestros, setMaestros] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [maestroActual, setMaestroActual] = useState(null);

    const cargarMaestros = () => {
        getMaestros().then(response => setMaestros(response.data));
    };

    useEffect(() => {
        cargarMaestros();
    }, []);

    const handleOpenModal = (maestro = null) => {
        setMaestroActual(maestro);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSave = (maestro) => {
        if (maestro.id) {
            updateMaestro(maestro.id, maestro).then(() => cargarMaestros());
        } else {
            createMaestro(maestro).then(() => cargarMaestros());
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar a este maestro?')) {
            deleteMaestro(id).then(() => cargarMaestros());
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Gestión de Maestros</h1>
                <Button variant="primary" onClick={() => handleOpenModal()}>+ Agregar Maestro</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {maestros.map(maestro => (
                        <tr key={maestro.id}>
                            <td>{maestro.nombre}</td>
                            <td>{maestro.apellido}</td>
                            <td>{maestro.email}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleOpenModal(maestro)}>Editar</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(maestro.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <MaestroModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                maestro={maestroActual}
            />
        </>
    );
};

export default GestionMaestros;