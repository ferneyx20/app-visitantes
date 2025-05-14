import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const EmployeesPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');

  useEffect(() => {
    const fetchEmpleados = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/empleados', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmpleados(response.data);
    };
    fetchEmpleados();
  }, []);

  const agregarEmpleado = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:5000/api/empleados',
      { nombre, cargo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Empleado agregado');
    setNombre('');
    setCargo('');
    const response = await axios.get('http://localhost:5000/api/empleados', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEmpleados(response.data);
  };

  const eliminarEmpleado = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/empleados/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Empleado eliminado');
    setEmpleados(empleados.filter((empleado) => empleado.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Gestión de Empleados</Typography>
      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        label="Cargo"
        fullWidth
        margin="normal"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={agregarEmpleado}>
        Agregar Empleado
      </Button>
      <Typography variant="h5" gutterBottom>Lista de Empleados</Typography>
      <List>
        {empleados.map((empleado) => (
          <ListItem key={empleado.id}>
            <ListItemText primary={empleado.nombre} secondary={empleado.cargo} />
            <Button variant="contained" color="secondary" onClick={() => eliminarEmpleado(empleado.id)}>
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EmployeesPage;
