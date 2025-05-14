import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import SolicitudUsuarioPage from './pages/SolicitudUsuarioPage';

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
        <Route path="/solicitar-usuario" element={<SolicitudUsuarioPage />} /> {/* Ruta para el formulario */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario/dashboard"
          element={
            <PrivateRoute role="estandar">
              <UserDashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
