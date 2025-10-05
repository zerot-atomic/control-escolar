// src/components/ModalSeleccionarCursos.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { getCursos, updateEstudianteCursos } from '../services/apiService';

const ModalSeleccionarCursos = ({ show, handleClose, estudiante }) => {
    const [cursos, setCursos] = useState([]);
    const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar cursos disponibles
    useEffect(() => {
        if (show && estudiante) {
            setLoading(true);
            getCursos()
                .then(response => {
                    console.log('Cursos cargados:', response.data);
                    setCursos(response.data || []);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error al cargar cursos:", error);
                    setLoading(false);
                });
        }
    }, [show, estudiante]);

    // Pre-seleccionar cursos del estudiante
    useEffect(() => {
        if (estudiante && estudiante.cursos) {
            console.log('Cursos actuales del estudiante:', estudiante.cursos);
            const idsDeCursosActuales = estudiante.cursos.map(curso => curso.id);
            console.log('IDs de cursos actuales:', idsDeCursosActuales);
            setCursosSeleccionados(idsDeCursosActuales);
        }
    }, [estudiante]);

    const handleCheckboxChange = (cursoId) => {
        setCursosSeleccionados(prev =>
            prev.includes(cursoId)
                ? prev.filter(id => id !== cursoId)
                : [...prev, cursoId]
        );
    };

    const handleGuardar = async () => {
        if (!estudiante) {
            console.error('No hay estudiante seleccionado');
            return;
        }

        console.log('🔄 Intentando guardar...');
        console.log('Estudiante ID:', estudiante.id);
        console.log('Cursos seleccionados:', cursosSeleccionados);

        setLoading(true);

        try {
            const response = await updateEstudianteCursos(estudiante.id, cursosSeleccionados);
            console.log('✅ Respuesta del servidor:', response);
            console.log('✅ Datos de la respuesta:', response.data);

            setLoading(false);
            handleClose(true); // Cerrar y recargar
            alert('Cursos actualizados correctamente');

        } catch (error) {
            console.error('❌ Error completo:', error);
            console.error('❌ Respuesta del error:', error.response);
            console.error('❌ Datos del error:', error.response?.data);
            console.error('❌ Status del error:', error.response?.status);

            setLoading(false);
            alert(`Error al guardar los cursos: ${error.response?.data?.message || error.message}`);
        }
    };

    if (!estudiante) {
        console.log('No hay estudiante para el modal');
        return null;
    }

    return (
        <Modal show={show} onHide={() => handleClose(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Seleccionar Cursos para {estudiante.nombre} {estudiante.apellido}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="text-center">Cargando cursos...</div>
                ) : (
                    <Form>
                        <Alert variant="info">
                            Selecciona los cursos en los que quieres inscribir al estudiante
                        </Alert>

                        {cursos.length === 0 ? (
                            <div className="text-center">No hay cursos disponibles</div>
                        ) : (
                            cursos.map(curso => (
                                <Form.Check
                                    type="checkbox"
                                    key={curso.id}
                                    id={`curso-${curso.id}`}
                                    label={`${curso.materia?.nombre || 'Materia'} - ${curso.profesor?.nombre || 'Profesor'} ${curso.profesor?.apellido || ''} (${curso.semestre})`}
                                    checked={cursosSeleccionados.includes(curso.id)}
                                    onChange={() => handleCheckboxChange(curso.id)}
                                    className="mb-2"
                                />
                            ))
                        )}
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(false)} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleGuardar} disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Cursos'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSeleccionarCursos;