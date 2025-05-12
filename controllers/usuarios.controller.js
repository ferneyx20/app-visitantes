const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Login de usuario
exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const usuario = resultado.rows[0];

    console.log('Correo recibido:', correo);
console.log('Contraseña recibida:', contrasena);


    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const contraseñaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, sede_id: usuario.sede_id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// 👤 Obtener usuarios inactivos (solo admin)
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
