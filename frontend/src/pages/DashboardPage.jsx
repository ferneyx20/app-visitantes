import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, Typography, Container, Grid, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';

const DashboardPage = () => {
  const [visitasActivas, setVisitasActivas] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [rol, setRol] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userRole = JSON.parse(atob(token.split('.')[1])).rol;
      setRol(userRole);

      const visitasResponse = await axios.get('http://localhost:5000/api/visitas/listar?estado=activa', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisitasActivas(visitasResponse.data);

      if (userRole === 'admin') {
        const estadisticasResponse = await axios.get('http://localhost:5000/api/visitas/estadisticas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEstadisticas(estadisticasResponse.data);
      }
    };

    fetchData();
  }, []);

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
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Visitas Activas */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  Visitas Activas
                </Typography>
                <ul>
                  {visitasActivas.map((visita) => (
                    <li key={visita.id}>
                      {visita.nombre_visitante} - {visita.cedula}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>

            {/* Estadísticas (solo para admin) */}
            {rol === 'admin' && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    Estadísticas de Visitas
                  </Typography>
                  <Typography>Total Visitas: {estadisticas.totalVisitas || 0}</Typography>
                  <Typography>Visitas Activas: {estadisticas.visitasActivas || 0}</Typography>
                  <Typography>Visitas Inactivas: {estadisticas.visitasInactivas || 0}</Typography>
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
