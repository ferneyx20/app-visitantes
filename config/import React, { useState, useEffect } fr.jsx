import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const VisitsPage = () => {
  const [visitas, setVisitas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');

  useEffect(() => {
    const fetchVisitas = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/visitas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisitas(response.data);
    };
    fetchVisitas();
  }, []);

  const registrarVisita = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/visitas/registrar', { nombre_visitante: nombre, cedula }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Visita registrada');
    setNombre('');
    setCedula('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Registro de Visitas</Typography>
      <TextField
        label="Nombre del Visitante"
        fullWidth
        margin="normal"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        label="Cédula"
        fullWidth
        margin="normal"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={registrarVisita}>
        Registrar Visita
      </Button>
      <Typography variant="h5" gutterBottom>Listado de Visitas</Typography>
      <List>
        {visitas.map((visita) => (
          <ListItem key={visita.id}>
            <ListItemText primary={visita.nombre_visitante} secondary={visita.cedula} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default VisitsPage;
