import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Typography, Container, Grid, Paper, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [selectedSection, setSelectedSection] = useState('visitas');
  const navigate = useNavigate();

  const sections = [
    { id: 'visitas', label: 'Visitas Activas' },
    { id: 'consultas', label: 'Consultar Visitas Finalizadas' },
    { id: 'usuarios', label: 'Gestión de Usuarios' },
    { id: 'empleados', label: 'Gestión de Empleados' },
    { id: 'sedes', label: 'Gestión de Sedes' },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case 'visitas':
        return <Typography>Visitas Activas (Galería)</Typography>;
      case 'consultas':
        return <Typography>Consultar Visitas Finalizadas</Typography>;
      case 'usuarios':
        return <Typography>Gestión de Usuarios</Typography>;
      case 'empleados':
        return <Typography>Gestión de Empleados</Typography>;
      case 'sedes':
        return <Typography>Gestión de Sedes</Typography>;
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
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                  Panel de Administración
                </Typography>
                {renderSection()}
              </Paper>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate('/autogestion')}
          >
            Generar QR para Autogestión
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
