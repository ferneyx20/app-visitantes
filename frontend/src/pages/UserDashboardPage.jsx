import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Typography, Container, Grid, Paper, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';

const UserDashboardPage = () => {
  const [selectedSection, setSelectedSection] = useState('visitas');

  const sections = [
    { id: 'visitas', label: 'Visitas Activas' },
    { id: 'autogestion', label: 'Autogestión de Visitas' },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case 'visitas':
        return <Typography>Visitas Activas</Typography>;
      case 'autogestion':
        return <Typography>Autogestión de Visitas</Typography>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {sections.map((section) => (
            <ListItem button key={section.id} onClick={() => setSelectedSection(section.id)}>
              <ListItemText primary={section.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) => theme.palette.grey[100],
          p: 3,
        }}
      >
        <Toolbar />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                  Panel de Usuario
                </Typography>
                {renderSection()}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default UserDashboardPage;
