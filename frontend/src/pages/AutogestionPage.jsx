import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AutogestionPage = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/autogestion', { nombre, cedula, motivo });
      alert('Solicitud enviada correctamente');
      setNombre('');
      setCedula('');
      setMotivo('');
    } catch (error) {
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Autogestión de Visitas</Typography>
      <TextField
        label="Nombre"
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
      <TextField
        label="Motivo"
        fullWidth
        margin="normal"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Enviar Solicitud
      </Button>
    </Container>
  );
};

export default AutogestionPage;
