import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinkIcon from '@mui/icons-material/Link';

const HomeModule = () => {
  const handleAddVisit = () => {
    alert('Abrir formulario para registrar una nueva visita.');
  };

  const handleAutogestionLink = () => {
    alert('Generar enlace para visita autogestionada.');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Panel de Administración</Typography>
        <Box>
          <IconButton color="primary" onClick={handleAddVisit}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <IconButton color="secondary" onClick={handleAutogestionLink}>
            <LinkIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="h6">Bienvenido al panel de administración.</Typography>
    </Box>
  );
};

export default HomeModule;
