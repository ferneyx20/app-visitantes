import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const AdminPage = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/usuarios/pendientes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(response.data);
    };
    fetchUsuarios();
  }, []);

  const aprobarUsuario = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/usuarios/aprobar/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Usuario aprobado');
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Panel de Administración</Typography>
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
    </Container>
  );
};

export default AdminPage;
