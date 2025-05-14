import React, { useState } from 'react';
import { Avatar, Button, TextField, Box, Typography, Container } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SolicitudUsuarioPage = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSolicitud = async () => {
    try {
      await axios.post('http://localhost:5000/api/usuarios/solicitar-acceso', { nombre, correo, contrasena });
      alert('Solicitud enviada. Un administrador debe aprobar tu acceso.');
      navigate('/');
    } catch (error) {
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Solicitar Usuario
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre Completo"
            name="nombre"
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="correo"
            label="Correo Electrónico"
            name="correo"
            autoComplete="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="contrasena"
            label="Contraseña"
            type="password"
            id="contrasena"
            autoComplete="current-password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSolicitud}
          >
            Enviar Solicitud
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SolicitudUsuarioPage;
