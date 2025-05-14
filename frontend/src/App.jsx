import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import VisitsPage from './pages/VisitsPage';
import EmployeesPage from './pages/EmployeesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/visitas" element={<VisitsPage />} />
        <Route path="/empleados" element={<EmployeesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
