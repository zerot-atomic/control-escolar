// src/components/MaestroModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getCarreras } from '../services/apiService'; // Para poblar el desplegable

const MaestroModal = ({ show, handleClose, handleSave, maestro }) => {
    const [formData, setFormData] = useState({});
    const [carreras, setCarreras] = useState([]);

    // Carga la lista de carreras cuando el componente se monta
    useEffect(() => {
        getCarreras().then(response => setCarreras(response.data));
    }, []);

    useEffect(() => {
        // Si se pasa un maestro, es para editar. Si no, es para crear.
        setFormData(maestro || { nombre: '', apellido: '', email: '', carrera: '' });
    }, [maestro]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSave = () => {
        handleSave(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{maestro ? 'Editar' : 'Agregar'} Maestro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Carrera</Form.Label>
                        <Form.Select name="carrera" value={formData.carrera} onChange={handleChange}>
                            <option>Selecciona una carrera</option>
                            {carreras.map(carrera => (
                                <option key={carrera.id} value={carrera.id}>
                                    {carrera.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={onSave}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MaestroModal;