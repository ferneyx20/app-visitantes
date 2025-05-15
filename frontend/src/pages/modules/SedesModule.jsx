import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, IconButton, Modal, TextField, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import axios from 'axios';

const SedesModule = () => {
  const [sedes, setSedes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('crear');
  const [formData, setFormData] = useState({ nombre: '', ubicacion: '' });
  const [editingSedeId, setEditingSedeId] = useState(null);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sedes');
        setSedes(response.data);
      } catch (error) {
        console.error('Error al cargar las sedes:', error);
        alert('No se pudo cargar la lista de sedes. Verifica la conexión con el servidor.');
      }
    };
    fetchSedes();
  }, []);

  const handleOpenModal = (type, sede = null) => {
    setModalType(type);
    if (type === 'editar' && sede) {
      setFormData({ nombre: sede.nombre, ubicacion: sede.ubicacion });
      setEditingSedeId(sede.id);
    } else {
      setFormData({ nombre: '', ubicacion: '' });
      setEditingSedeId(null);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ nombre: '', ubicacion: '' });
    setEditingSedeId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateOrEditSede = async () => {
    try {
      if (modalType === 'crear') {
        if (!formData.nombre || !formData.ubicacion) {
          alert('El nombre y la ubicación son obligatorios.');
          return;
        }
        await axios.post('http://localhost:5000/api/sedes', formData);
        alert('Sede creada exitosamente');
      } else if (modalType === 'editar') {
        await axios.put(`http://localhost:5000/api/sedes/${editingSedeId}`, formData);
        alert('Sede editada exitosamente');
      }
      const response = await axios.get('http://localhost:5000/api/sedes');
      setSedes(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      alert('No se pudo procesar la solicitud. Verifica la conexión con el servidor.');
    }
  };

  const handleDeleteSede = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta sede?')) {
      try {
        await axios.delete(`http://localhost:5000/api/sedes/${id}`);
        alert('Sede eliminada exitosamente');
        setSedes(sedes.filter((sede) => sede.id !== id));
      } catch (error) {
        console.error('Error al eliminar la sede:', error);
        alert('No se pudo eliminar la sede. Verifica la conexión con el servidor.');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Gestión de Sedes
        </Typography>
        <IconButton color="primary" onClick={() => handleOpenModal('crear')}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {sedes.map((sede) => (
          <Grid item xs={12} sm={6} md={4} key={sede.id}>
            <Card sx={{ boxShadow: 3, position: 'relative' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationCityIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">{sede.nombre}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Ubicación: {sede.ubicacion}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton color="primary" onClick={() => handleOpenModal('editar', sede)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteSede(sede.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {modalType === 'crear' ? 'Crear Sede' : 'Editar Sede'}
          </Typography>
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="normal"
            value={formData.nombre}
            onChange={handleInputChange}
          />
          <TextField
            label="Ubicación"
            name="ubicacion"
            fullWidth
            margin="normal"
            value={formData.ubicacion}
            onChange={handleInputChange}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleCreateOrEditSede}>
              {modalType === 'crear' ? 'Crear' : 'Guardar'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SedesModule;
