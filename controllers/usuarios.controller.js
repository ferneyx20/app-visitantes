const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login de usuario
exports.loginUsuario = async (req, res) => {
  const { id, contrasena } = req.body;

  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensaje: 'ID o contraseña incorrectos' });
    }

    const usuario = resultado.rows[0];
    const passwordValido = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'ID o contraseña incorrectos' });
    }

    if (!usuario.activo) {
      return res.status(403).json({ mensaje: 'El usuario no está activado' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    );

    const redireccion = usuario.rol === 'admin' ? '/admin/dashboard' : '/usuario/dashboard';

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      rol: usuario.rol,
      redireccion
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Obtener usuarios inactivos (solo admin)
exports.obtenerUsuariosInactivos = async (req, res) => {
  try {
    const usuarios = await pool.query(
      "SELECT id, nombre, correo, rol, activo FROM usuarios WHERE activo = FALSE"
    );
    res.json(usuarios.rows);
  } catch (error) {
    console.error('Error al obtener usuarios inactivos:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Solicitud de acceso de un nuevo usuario estándar
exports.solicitarAcceso = async (req, res) => {
  const { id, nombre, contrasena } = req.body;

  try {
    // Verificar si el ID existe en la tabla de empleados
    const empleado = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);
    if (empleado.rows.length === 0) {
      return res.status(400).json({ mensaje: 'El ID no está registrado como empleado.' });
    }

    // Verificar si el usuario ya existe
    const existe = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'Este ID ya fue registrado.' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    await pool.query(
      `INSERT INTO usuarios (id, nombre, contrasena, rol, activo)
       VALUES ($1, $2, $3, 'estandar', FALSE)`,
      [id, nombre, hashedPassword]
    );

    res.status(201).json({ mensaje: 'Solicitud enviada. Un administrador debe aprobar tu acceso.' });
  } catch (error) {
    console.error('Error en solicitud de acceso:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Aprobar solicitud de usuario (activar cuenta)
exports.aprobarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      'UPDATE usuarios SET activo = TRUE WHERE id = $1 RETURNING id, nombre, correo, rol, activo',
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario aprobado correctamente', usuario: resultado.rows[0] });
  } catch (error) {
    console.error('Error al aprobar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Activar o desactivar usuario
exports.cambiarEstadoUsuario = async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  try {
    const resultado = await pool.query(
      'UPDATE usuarios SET activo = $1 WHERE id = $2 RETURNING id, nombre, correo, rol, activo',
      [activo, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Estado del usuario actualizado', usuario: resultado.rows[0] });
  } catch (error) {
    console.error('Error al cambiar estado del usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
