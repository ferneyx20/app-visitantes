import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, List, ListItem, ListItemText, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import HomeModule from './modules/HomeModule';
import SedesModule from './modules/SedesModule';
import UsuariosModule from './modules/UsuariosModule';
import EmpleadosModule from './modules/EmpleadosModule';
import VisitasModule from './modules/VisitasModule';

const AdminDashboardPage = () => {
  const [selectedSection, setSelectedSection] = useState('home');
  const navigate = useNavigate();

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'visitas', label: 'Visitas Activas' },
    { id: 'consultas', label: 'Consultar Visitas Finalizadas' },
    { id: 'usuarios', label: 'Gestión de Usuarios' },
    { id: 'empleados', label: 'Gestión de Empleados' },
    { id: 'sedes', label: 'Gestión de Sedes' },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case 'home':
        return <HomeModule />;
      case 'visitas':
        return <VisitasModule />;
      case 'consultas':
        return <div>Consultar Visitas Finalizadas</div>;
      case 'usuarios':
        return <UsuariosModule />;
      case 'empleados':
        return <EmpleadosModule />;
      case 'sedes':
        return <SedesModule />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {sections.map((section) => (
            <ListItem button key={section.id} onClick={() => setSelectedSection(section.id)}>
              <ListItemText primary={section.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) => theme.palette.grey[100],
          p: 3,
        }}
      >
        <Toolbar />
        <Container>{renderSection()}</Container>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
