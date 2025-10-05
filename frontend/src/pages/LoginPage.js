import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Lo crearemos en el siguiente paso
import { Form, Button, Container, Card } from 'react-bootstrap';

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(email, password);
    };

    return (
        <Container className="mt-5">
            <Card style={{ maxWidth: '400px', margin: 'auto' }}>
                <Card.Body>
                    <Card.Title className="text-center">Iniciar Sesión</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;