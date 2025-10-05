// src/pages/PerfilEstudiante.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
// Necesitaremos una nueva función en el apiService
import { getEstudianteDetalle } from '../services/apiService';

const PerfilEstudiante = () => {
    const { estudianteId } = useParams(); // Obtiene el ID de la URL
    const [estudiante, setEstudiante] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getEstudianteDetalle(estudianteId)
            .then(response => {
                setEstudiante(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('No se pudo cargar el perfil del estudiante.');
                setLoading(false);
            });
    }, [estudianteId]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!estudiante) return <Alert variant="warning">No se encontró al estudiante.</Alert>;

    return (
        <div>
            <Card className="mb-4">
                <Card.Header>
                    <h2>Perfil del Estudiante</h2>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{estudiante.nombre} {estudiante.apellido}</Card.Title>
                    <Card.Text>
                        <strong>Matrícula:</strong> {estudiante.matricula} <br />
                        <strong>Email:</strong> {estudiante.email}
                    </Card.Text>
                </Card.Body>
            </Card>

            <h3>Mis Calificaciones</h3>
            {estudiante.cursos.map(curso => {
                // Buscamos la calificación correspondiente a este curso
                const calificacion = estudiante.calificaciones.find(c => c.curso === curso.id);
                return (
                    <Card key={curso.id} className="mb-3">
                        <Card.Header>{curso.materia.nombre} ({curso.semestre})</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Calificación:</strong> {calificacion ? `${calificacion.puntuacion}` : 'No asignada'}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                );
            })}
        </div>
    );
};

export default PerfilEstudiante;