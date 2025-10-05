// src/components/EstudianteModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EstudianteModal = ({ show, handleClose, handleSave, estudiante }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Si se pasa un estudiante, es para editar. Si no, es para crear.
        setFormData(estudiante || { nombre: '', apellido: '', email: '', matricula: '' });
    }, [estudiante]);

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
                <Modal.Title>{estudiante ? 'Editar' : 'Agregar'} Estudiante</Modal.Title>
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
                        <Form.Label>Matrícula</Form.Label>
                        <Form.Control type="text" name="matricula" value={formData.matricula} onChange={handleChange} />
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

export default EstudianteModal;