import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, Typography, Container, Grid, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';

const DashboardPage = () => {
  const [rol, setRol] = useState('');
  const [visitasActivas, setVisitasActivas] = useState([]);
  const [usuariosPendientes, setUsuariosPendientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userRole = JSON.parse(atob(token.split('.')[1])).rol;
      setRol(userRole);

      try {
        const visitasResponse = await axios.get('http://localhost:5000/api/visitas/listar?estado=activa', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVisitasActivas(visitasResponse.data);

        if (userRole === 'admin') {
          const usuariosResponse = await axios.get('http://localhost:5000/api/usuarios/pendientes', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsuariosPendientes(usuariosResponse.data);

          const empleadosResponse = await axios.get('http://localhost:5000/api/empleados', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEmpleados(empleadosResponse.data);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        alert('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Cargando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          mt: 8, // Ajustar margen superior para evitar que el contenido quede oculto detrás del Navbar
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Bienvenido al Panel de Control
          </Typography>
          <Typography variant="h6" gutterBottom>
            Rol: {rol === 'admin' ? 'Administrador' : 'Usuario Estándar'}
          </Typography>
          <Grid container spacing={3}>
            {/* Visitas Activas */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  Visitas Activas
                </Typography>
                <ul>
                  {visitasActivas.length > 0 ? (
                    visitasActivas.map((visita) => (
                      <li key={visita.id}>
                        {visita.nombre_visitante} - {visita.cedula}
                      </li>
                    ))
                  ) : (
                    <Typography>No hay visitas activas.</Typography>
                  )}
                </ul>
              </Paper>
            </Grid>

            {/* Usuarios Pendientes (solo admin) */}
            {rol === 'admin' && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    Usuarios Pendientes
                  </Typography>
                  <ul>
                    {usuariosPendientes.length > 0 ? (
                      usuariosPendientes.map((usuario) => (
                        <li key={usuario.id}>
                          {usuario.nombre} - {usuario.correo}
                        </li>
                      ))
                    ) : (
                      <Typography>No hay usuarios pendientes.</Typography>
                    )}
                  </ul>
                </Paper>
              </Grid>
            )}

            {/* Empleados (solo admin) */}
            {rol === 'admin' && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    Empleados
                  </Typography>
                  <ul>
                    {empleados.length > 0 ? (
                      empleados.map((empleado) => (
                        <li key={empleado.id}>
                          {empleado.nombre} - {empleado.cargo}
                        </li>
                      ))
                    ) : (
                      <Typography>No hay empleados registrados.</Typography>
                    )}
                  </ul>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
