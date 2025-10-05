// src/components/ModalCalificaciones.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup, Row, Col } from 'react-bootstrap';
import { getCalificaciones, saveCalificacion } from '../services/apiService';

const ModalCalificaciones = ({ show, handleClose, estudiante }) => {
    const [calificaciones, setCalificaciones] = useState({});

    // Cargar las calificaciones existentes del estudiante
    useEffect(() => {
        if (estudiante) {
            getCalificaciones(estudiante.id)
                .then(response => {
                    // Mapeamos las calificaciones a un objeto para fácil acceso: { cursoId: calificacion }
                    const calificacionesMap = response.data.reduce((acc, cali) => {
                        acc[cali.curso] = cali;
                        return acc;
                    }, {});
                    setCalificaciones(calificacionesMap);
                })
                .catch(error => console.error("Error al cargar calificaciones", error));
        }
    }, [estudiante]);

    // Manejar el cambio en un campo de calificación
    const handlePuntuacionChange = (cursoId, puntuacion) => {
        const calificacionExistente = calificaciones[cursoId];
        setCalificaciones(prev => ({
            ...prev,
            [cursoId]: {
                ...calificacionExistente,
                puntuacion: puntuacion,
                estudiante: estudiante.id,
                curso: cursoId
            }
        }));
    };

    // Guardar todas las calificaciones
    const handleGuardar = () => {
        const promesas = Object.values(calificaciones).map(cali => saveCalificacion(cali));
        
        Promise.all(promesas)
            .then(() => {
                handleClose(); // Cerrar el modal al terminar
            })
            .catch(error => console.error("Error al guardar calificaciones", error));
    };

    if (!estudiante) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Calificaciones de {estudiante.nombre} {estudiante.apellido}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {estudiante.cursos?.map(curso => (
                        <ListGroup.Item key={curso.id}>
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <h5>{curso.nombre}</h5>
                                </Col>
                                <Col md={4}>
                                    <Form.Control 
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="100"
                                        placeholder="Sin calificar"
                                        value={calificaciones[curso.id]?.puntuacion || ''}
                                        onChange={(e) => handlePuntuacionChange(curso.id, e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {estudiante.cursos?.length === 0 && <p>El estudiante no está inscrito en ningún curso.</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleGuardar}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCalificaciones;