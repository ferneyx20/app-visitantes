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


// Solicitud de acceso de un nuevo usuario estándar
exports.solicitarAcceso = async (req, res) => {
  const { nombre, correo, contrasena, sede_id } = req.body;

  try {
    // Verificar si el correo ya existe
    const existe = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'Este correo ya fue registrado.' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Insertar el nuevo usuario con estado inactivo y rol 'estandar'
    await pool.query(
      `INSERT INTO usuarios (nombre, correo, contrasena, rol, activo, sede_id)
       VALUES ($1, $2, $3, 'estandar', FALSE, $4)`,
      [nombre, correo, hashedPassword, sede_id]
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

    res.json({
      mensaje: 'Usuario aprobado correctamente',
      usuario: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al aprobar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
