import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const AdminPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/usuarios/pendientes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios pendientes.');
      }
    };
    fetchUsuarios();
  }, []);

  const aprobarUsuario = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/usuarios/aprobar/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Usuario aprobado');
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch {
      alert('Error al aprobar el usuario.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Panel de Administración</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {usuarios.length === 0 ? (
        <Typography>No hay usuarios pendientes.</Typography>
      ) : (
        <List>
          {usuarios.map((usuario) => (
            <ListItem key={usuario.id}>
              <ListItemText primary={usuario.nombre} secondary={usuario.correo} />
              <Button variant="contained" color="primary" onClick={() => aprobarUsuario(usuario.id)}>
                Aprobar
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default AdminPage;
