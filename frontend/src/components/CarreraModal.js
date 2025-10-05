// src/components/CarreraModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CarreraModal = ({ show, handleClose, handleSave, carrera }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(carrera || { nombre: '', duracion_anios: 0 });
    }, [carrera]);

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
                <Modal.Title>{carrera ? 'Editar' : 'Agregar'} Carrera</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de la Carrera</Form.Label>
                        <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Duración (años)</Form.Label>
                        <Form.Control type="number" name="duracion_anios" value={formData.duracion_anios} onChange={handleChange} />
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

export default CarreraModal;