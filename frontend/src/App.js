// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Añade Navigate aquí
import { Container } from 'react-bootstrap';

import Navegacion from './components/Navegacion';
import HomePage from './pages/HomePage';
import PerfilEstudiante from './pages/PerfilEstudiante';
import ListaEstudiantes from './components/ListaEstudiantes';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './utils/ProtectedRoute';
import GestionMaterias from './pages/GestionMaterias';
import GestionMaestros from './pages/GestionMaestros';
import GestionCarreras from './pages/GestionCarreras';
import GestionCursos from './pages/GestionCursos';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navegacion />
        <Container className="mt-4">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas Protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/perfil/:estudianteId" element={<PerfilEstudiante />} />
              <Route path="/admin" element={<ListaEstudiantes />} />
              <Route path="/materias" element={<GestionMaterias />} />
              <Route path="/maestros" element={<GestionMaestros />} />
              <Route path="/carreras" element={<GestionCarreras />} />
              <Route path="/cursos" element={<GestionCursos />} />
            </Route>
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;