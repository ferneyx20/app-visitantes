import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          Panel de Control
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
