import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/login', { correo, contrasena });
      alert(response.data.mensaje);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/visitas';
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
      <TextField
        label="Correo"
        fullWidth
        margin="normal"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Iniciar Sesión
      </Button>
    </Container>
  );
};

export default LoginPage;
