const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Inicio de sesión de usuario
exports.loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (usuario.rows.length === 0) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const validPassword = await bcrypt.compare(contrasena, usuario.rows[0].contrasena);
    if (!validPassword) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    // Verificar que el usuario esté activo
    if (!usuario.rows[0].activo) {
      return res.status(400).json({ mensaje: 'El usuario no está activado' });
    }

    // Generar el JWT
    const token = jwt.sign(
      { id: usuario.rows[0].id, rol: usuario.rows[0].rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expira en 1 hora
    );

    // Devolver el token al cliente
    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
