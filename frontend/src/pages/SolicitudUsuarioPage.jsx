import React, { useState } from 'react';
import { Avatar, Button, TextField, Box, Typography, Container, CssBaseline } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SolicitudUsuarioPage = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSolicitud = async () => {
    try {
      await axios.post('http://localhost:5000/api/usuarios/solicitar-acceso', { id, nombre, contrasena });
      alert('Solicitud enviada. Un administrador debe aprobar tu acceso.');
      navigate('/');
    } catch (error) {
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        minHeight: '100%',
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          zIndex: -1,
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse at 50% 50%,rgb(221, 73, 68), hsl(0, 48.60%, 48.00%))',
          backgroundRepeat: 'no-repeat',
        },
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
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
              id="id"
              label="Identificación"
              name="id"
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre Completo"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contrasena"
              label="Contraseña"
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <Button
              type="button"
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
    </Box>
  );
};

export default SolicitudUsuarioPage;
