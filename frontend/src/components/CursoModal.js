// src/components/CursoModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CursoModal = ({ show, handleClose, handleSave, curso, materias = [], maestros = [] }) => { // ← Valores por defecto
    const [formData, setFormData] = useState({
        semestre: '',
        materia_id: '',
        profesor_id: ''
    });

    // Resetear form cuando se abre/cierra el modal o cambia el curso
    useEffect(() => {
        if (curso) {
            // Modo edición
            setFormData({
                semestre: curso.semestre,
                materia_id: curso.materia_id || '',
                profesor_id: curso.profesor_id || ''
            });
        } else {
            // Modo creación
            setFormData({
                semestre: '',
                materia_id: '',
                profesor_id: ''
            });
        }
    }, [curso, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Validaciones básicas
        if (!formData.semestre || !formData.materia_id || !formData.profesor_id) {
            alert('Por favor, complete todos los campos');
            return;
        }
        handleSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {curso ? 'Editar Curso' : 'Crear Nuevo Curso'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Semestre</Form.Label>
                        <Form.Control
                            type="text"
                            name="semestre"
                            value={formData.semestre}
                            onChange={handleChange}
                            placeholder="Ej: 2024-1"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Materia</Form.Label>
                        <Form.Select
                            name="materia_id"
                            value={formData.materia_id}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar materia</option>
                            {materias && materias.map(materia => ( // ← VALIDACIÓN AÑADIDA
                                <option key={materia.id} value={materia.id}>
                                    {materia.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Profesor</Form.Label>
                        <Form.Select
                            name="profesor_id"
                            value={formData.profesor_id}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar profesor</option>
                            {maestros && maestros.map(maestro => ( // ← VALIDACIÓN AÑADIDA
                                <option key={maestro.id} value={maestro.id}>
                                    {maestro.nombre} {maestro.apellido}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {curso ? 'Actualizar' : 'Crear'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CursoModal;