const pool = require('../config/db');

exports.listarEmpleados = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM empleados');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al listar empleados:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

exports.agregarEmpleado = async (req, res) => {
  const { id, nombre, cargo } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO empleados (id, nombre, cargo) VALUES ($1, $2, $3) RETURNING *',
      [id, nombre, cargo]
    );
    res.status(201).json({ mensaje: 'Empleado agregado correctamente', empleado: resultado.rows[0] });
  } catch (error) {
    console.error('Error al agregar empleado:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

exports.eliminarEmpleado = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('DELETE FROM empleados WHERE id = $1 RETURNING *', [id]);
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
