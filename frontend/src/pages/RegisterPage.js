// src/pages/RegisterPage.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Card, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await registerUser(email, password, password2);
        } catch (err) {
            // El error se muestra desde el AuthContext
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Card style={{ maxWidth: '400px', margin: 'auto' }}>
                <Card.Body>
                    <Card.Title className="text-center">Crear Cuenta</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            {/* --- LÍNEA CORREGIDA --- */}
                            <Form.Control type="password" placeholder="Confirma la contraseña" value={password2} onChange={(e) => setPassword2(e.target.value)} required disabled={loading} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span className="ms-2">Registrando...</span>
                                </>
                            ) : (
                                "Registrarse"
                            )}
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <small>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></small>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RegisterPage;