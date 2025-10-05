// src/pages/HomePage.js

import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaBook, FaChalkboardTeacher } from 'react-icons/fa';

const HomePage = () => {
    return (
        <Container>
            {/* Sección de Bienvenida Principal */}
            <div className="bg-light p-5 rounded-3 my-4 text-center">
                <h1 className="display-4">Bienvenido al Sistema de Control Escolar</h1>
                <p className="lead">
                    Una solución integral para administrar estudiantes, cursos, calificaciones y más.
                </p>
                <hr className="my-4" />
                <p>
                    Comienza por gestionar la información de los estudiantes o explora las otras secciones administrativas.
                </p>
                <Button as={Link} to="/admin" variant="primary" size="lg">
                    <FaUsers className="me-2" /> Ir a Gestión de Estudiantes
                </Button>
            </div>

            {/* Sección de Tarjetas de Acceso Rápido */}
            <Row className="text-center">
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <FaBook size={40} className="text-info mb-3" />
                            <Card.Title>Cursos y Materias</Card.Title>
                            <Card.Text>
                                Administra el catálogo de materias y los cursos disponibles por semestre.
                            </Card.Text>
                            {/* --- MODIFICA ESTE BOTÓN --- */}
                            <Button as={Link} to="/materias" variant="info">Administrar</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <FaChalkboardTeacher size={40} className="text-success mb-3" />
                            <Card.Title>Maestros</Card.Title>
                            <Card.Text>
                                Gestiona el personal docente, sus asignaciones y la información de contacto.
                            </Card.Text>
                            {/* --- MODIFICA ESTE BOTÓN --- */}
                            <Button as={Link} to="/maestros" variant="success">Administrar</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <FaUsers size={40} className="text-primary mb-3" />
                            <Card.Title>Estudiantes</Card.Title>
                            <Card.Text>
                                Consulta, edita y gestiona los perfiles y la matrícula de los estudiantes.
                            </Card.Text>
                            <Button as={Link} to="/admin" variant="primary">Administrar</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;