import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Typography, Container, Grid, Paper, IconButton, Drawer, List, ListItem, ListItemText, Card, CardContent, Modal, TextField, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinkIcon from '@mui/icons-material/Link';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboardPage = () => {
  const [selectedSection, setSelectedSection] = useState('home');
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre_visitante: '',
    cedula: '',
    empresa: '',
    motivo: '',
    foto: '',
    tipo_registro: 'manual',
    estado: 'activa',
    empleado_id: '',
    sede_id: '',
    usuario_id: '',
  });
  const navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/visitas/registrar', formData);
      alert('Visita registrada exitosamente');
      setFormData({
        nombre_visitante: '',
        cedula: '',
        empresa: '',
        motivo: '',
        foto: '',
        tipo_registro: 'manual',
        estado: 'activa',
        empleado_id: '',
        sede_id: '',
        usuario_id: '',
      });
      handleCloseModal();
    } catch (error) {
      alert('Error al registrar la visita');
    }
  };

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
        return (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" fontWeight="bold">Panel de Administración</Typography>
              <Box>
                <IconButton color="primary" title="Añadir Visita" onClick={handleOpenModal}>
                  <AddCircleIcon fontSize="large" />
                </IconButton>
                <IconButton color="secondary" title="Visita Autogestionada" onClick={() => navigate('/autogestion')}>
                  <LinkIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
                  <Typography variant="h5" fontWeight="bold">Sede A</Typography>
                  <Typography variant="h6" color="text.secondary">10 Visitas Activas</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
                  <Typography variant="h5" fontWeight="bold">Sede B</Typography>
                  <Typography variant="h6" color="text.secondary">5 Visitas Activas</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: '50%',
                    height: 150,
                    width: 150,
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">Total: 15</Typography>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 5 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>Galería de Visitas Activas</Typography>
              <Grid container spacing={3}>
                {/* Ejemplo de tarjetas de visitas activas */}
                {[1, 2, 3, 4].map((visita) => (
                  <Grid item xs={12} sm={6} md={3} key={visita}>
                    <Card sx={{ boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold">Visitante {visita}</Typography>
                        <Typography variant="body2" color="text.secondary">Cédula: 12345678</Typography>
                        <Typography variant="body2" color="text.secondary">Motivo: Reunión</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        );
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
              <Paper sx={{ p: 2, boxShadow: 3 }}>
                {renderSection()}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modal para registrar visita */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>Registrar Visita Manual</Typography>
          <TextField
            label="Nombre del Visitante"
            name="nombre_visitante"
            fullWidth
            margin="normal"
            value={formData.nombre_visitante}
            onChange={handleInputChange}
          />
          <TextField
            label="Cédula"
            name="cedula"
            fullWidth
            margin="normal"
            value={formData.cedula}
            onChange={handleInputChange}
          />
          <TextField
            label="Empresa"
            name="empresa"
            fullWidth
            margin="normal"
            value={formData.empresa}
            onChange={handleInputChange}
          />
          <TextField
            label="Motivo"
            name="motivo"
            fullWidth
            margin="normal"
            value={formData.motivo}
            onChange={handleInputChange}
          />
          <TextField
            label="Empleado ID"
            name="empleado_id"
            fullWidth
            margin="normal"
            value={formData.empleado_id}
            onChange={handleInputChange}
          />
          <TextField
            label="Sede ID"
            name="sede_id"
            fullWidth
            margin="normal"
            value={formData.sede_id}
            onChange={handleInputChange}
          />
          <TextField
            label="Usuario ID"
            name="usuario_id"
            fullWidth
            margin="normal"
            value={formData.usuario_id}
            onChange={handleInputChange}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Registrar</Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboardPage;
