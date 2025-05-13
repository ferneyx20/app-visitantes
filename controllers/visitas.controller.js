const pool = require('../config/db'); // Cambiar '../db' por '../config/db'

exports.registrarVisita = async (req, res) => {
  const {
    nombre_visitante,
    cedula,
    empresa,
    motivo,
    foto,
    tipo_registro,
    estado,
    empleado_id,
    sede_id,
    usuario_id
  } = req.body;

  // Validación básica
  if (!nombre_visitante || !cedula || !tipo_registro || !sede_id || !usuario_id) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
  }

  const tipoValido = ['manual', 'autogestionado'].includes(tipo_registro);
  const estadoValido = !estado || ['activa', 'finalizada', 'rechazada'].includes(estado);

  if (!tipoValido) {
    return res.status(400).json({ mensaje: 'Tipo de registro no válido.' });
  }

  if (!estadoValido) {
    return res.status(400).json({ mensaje: 'Estado no válido.' });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO visitas (
        nombre_visitante, cedula, empresa, motivo, foto,
        tipo_registro, estado, empleado_id, sede_id, usuario_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        nombre_visitante,
        cedula,
        empresa || null,
        motivo || null,
        foto || null,
        tipo_registro,
        estado || 'activa',
        empleado_id || null,
        sede_id,
        usuario_id
      ]
    );

    res.status(201).json({
      mensaje: 'Visita registrada correctamente',
      visita: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al registrar visita:', error);
    res.status(500).json({ mensaje: 'Error al registrar la visita' });
  }
};

exports.listarVisitas = async (req, res) => {
  const { estado, fecha_inicio, fecha_fin, sede_id, empleado_id } = req.query;

  try {
    const filtros = [];
    const valores = [];

    if (estado) {
      filtros.push('estado = $' + (valores.length + 1));
      valores.push(estado);
    }
    if (fecha_inicio && fecha_fin) {
      filtros.push('fecha_ingreso BETWEEN $' + (valores.length + 1) + ' AND $' + (valores.length + 2));
      valores.push(fecha_inicio, fecha_fin);
    }
    if (sede_id) {
      filtros.push('sede_id = $' + (valores.length + 1));
      valores.push(sede_id);
    }
    if (empleado_id) {
      filtros.push('empleado_id = $' + (valores.length + 1));
      valores.push(empleado_id);
    }

    const query = `
      SELECT * FROM visitas
      ${filtros.length ? 'WHERE ' + filtros.join(' AND ') : ''}
      ORDER BY fecha_ingreso DESC
    `;

    const resultado = await pool.query(query, valores);
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al listar visitas:', error);
    res.status(500).json({ mensaje: 'Error al listar visitas' });
  }
};
