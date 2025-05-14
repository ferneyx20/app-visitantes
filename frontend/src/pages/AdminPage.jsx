import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, Switch } from '@mui/material';
import axios from 'axios';

const AdminPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/usuarios/pendientes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(response.data);
    };

    const fetchVisitas = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/visitas/listar', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisitas(response.data);
    };

    fetchUsuarios();
    fetchVisitas();
  }, []);

  const cambiarEstadoUsuario = async (id, activo) => {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:5000/api/usuarios/cambiar-estado/${id}`,
      { activo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUsuarios(usuarios.map((usuario) => (usuario.id === id ? { ...usuario, activo } : usuario)));
  };

  const aprobarVisita = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/visitas/finalizar/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Visita aprobada');
    setVisitas(visitas.filter((visita) => visita.id !== id));
  };

  const rechazarVisita = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/visitas/rechazar/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Visita rechazada');
    setVisitas(visitas.filter((visita) => visita.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Panel de Administración</Typography>
      <Typography variant="h5" gutterBottom>Gestión de Usuarios</Typography>
      <List>
        {usuarios.map((usuario) => (
          <ListItem key={usuario.id}>
            <ListItemText primary={usuario.nombre} secondary={usuario.correo} />
            <Switch
              checked={usuario.activo}
              onChange={(e) => cambiarEstadoUsuario(usuario.id, e.target.checked)}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" gutterBottom>Visitas Activas</Typography>
      <List>
        {visitas.map((visita) => (
          <ListItem key={visita.id}>
            <ListItemText primary={visita.nombre_visitante} secondary={visita.cedula} />
            <Button variant="contained" color="primary" onClick={() => aprobarVisita(visita.id)}>
              Aprobar
            </Button>
            <Button variant="contained" color="secondary" onClick={() => rechazarVisita(visita.id)}>
              Rechazar
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminPage;
