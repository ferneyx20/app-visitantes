const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Obtener todas las sedes
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM sedes');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener sedes:', error);
    res.status(500).json({ mensaje: 'Error al obtener sedes' });
  }
});

// Crear una nueva sede
router.post('/', async (req, res) => {
  const { nombre, ubicacion } = req.body;
  if (!nombre || !ubicacion) {
    return res.status(400).json({ mensaje: 'El nombre y la ubicación son obligatorios.' });
  }
  try {
    const resultado = await pool.query(
      'INSERT INTO sedes (nombre, ubicacion) VALUES ($1, $2) RETURNING *',
      [nombre, ubicacion]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al crear sede:', error);
    res.status(500).json({ mensaje: 'Error al crear sede' });
  }
});

// Editar una sede
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion } = req.body;
  try {
    const resultado = await pool.query(
      'UPDATE sedes SET nombre = $1, ubicacion = $2 WHERE id = $3 RETURNING *',
      [nombre, ubicacion, id]
    );
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Sede no encontrada' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al editar sede:', error);
    res.status(500).json({ mensaje: 'Error al editar sede' });
  }
});

// Eliminar una sede
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('DELETE FROM sedes WHERE id = $1 RETURNING *', [id]);
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Sede no encontrada' });
    }
    res.json({ mensaje: 'Sede eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar sede:', error);
    res.status(500).json({ mensaje: 'Error al eliminar sede' });
  }
});

module.exports = router;
