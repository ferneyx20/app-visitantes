import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import SolicitudUsuarioPage from './pages/SolicitudUsuarioPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/empleados" element={<EmployeesPage />} />
        <Route path="/solicitar-usuario" element={<SolicitudUsuarioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
