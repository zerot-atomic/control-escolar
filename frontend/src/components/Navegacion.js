// src/components/Navegacion.js

import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto

const Navegacion = () => {
    const { user, logoutUser } = useContext(AuthContext); // Obtiene el usuario y la función de logout

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} to="/">Control Escolar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/admin">Estudiantes</Nav.Link>
                                <Nav.Link as={Link} to="/materias">Materias</Nav.Link>
                                <Nav.Link as={Link} to="/maestros">Maestros</Nav.Link>
                                <Nav.Link as={Link} to="/carreras">Carreras</Nav.Link>
                                <Nav.Link as={Link} to="/cursos">Cursos</Nav.Link> {/* <-- AÑADE ESTA LÍNEA */}
                                <Button variant="outline-light" onClick={logoutUser}>Cerrar Sesión</Button>
                            </>
                        ) : (
                            // Si no hay usuario (no está logueado)
                            <>
                                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navegacion;