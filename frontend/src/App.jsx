import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import SolicitudUsuarioPage from './pages/SolicitudUsuarioPage';
import AutogestionPage from './pages/AutogestionPage';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).rol : null;

  if (!token) return <Navigate to="/" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario/dashboard"
          element={
            <PrivateRoute role="estandar">
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/empleados"
          element={
            <PrivateRoute role="admin">
              <EmployeesPage />
            </PrivateRoute>
          }
        />
        <Route path="/solicitar-usuario" element={<SolicitudUsuarioPage />} />
        <Route path="/autogestion" element={<AutogestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
