import React, { useState } from 'react';
import { Avatar, Button, TextField, Box, Typography, Container, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/login', { correo, contrasena });
      alert(response.data.mensaje);
      localStorage.setItem('token', response.data.token);
      window.location.href = response.data.rol === 'admin' ? '/admin' : '/visitas';
    } catch (error) {
      alert('Error al iniciar sesión');
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
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
