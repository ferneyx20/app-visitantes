const pool = require('../config/db');

// Obtener usuarios inactivos (solo para admin)
exports.obtenerUsuariosInactivos = async (req, res) => {
  try {
    const usuarios = await pool.query(
      "SELECT id, nombre, correo, rol, activo, sede_id, fecha_creacion FROM usuarios WHERE activo = FALSE"
    );
    res.json(usuarios.rows);
  } catch (error) {
    console.error('Error al obtener usuarios inactivos:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
