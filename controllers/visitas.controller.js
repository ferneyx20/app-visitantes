const pool = require('../config/db');

exports.registrarVisita = async (req, res) => {
  const { nombre_visitante, cedula, empresa, motivo, tipo_registro, estado, sede_id, usuario_id } = req.body;

  if (!nombre_visitante || !cedula || !tipo_registro || !sede_id || !usuario_id) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO visitas (nombre_visitante, cedula, empresa, motivo, tipo_registro, estado, sede_id, usuario_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [nombre_visitante, cedula, empresa || null, motivo || null, tipo_registro, estado || 'activa', sede_id, usuario_id]
    );

    res.status(201).json({ mensaje: 'Visita registrada correctamente', visita: resultado.rows[0] });
  } catch (error) {
    console.error('Error al registrar visita:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

exports.listarVisitas = async (req, res) => {
  const { estado, fecha_inicio, fecha_fin, sede_id } = req.query;

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

    const query = `
      SELECT * FROM visitas
      ${filtros.length ? 'WHERE ' + filtros.join(' AND ') : ''}
      ORDER BY fecha_ingreso DESC
    `;

    const resultado = await pool.query(query, valores);
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al listar visitas:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

exports.obtenerEstadisticas = async (req, res) => {
  try {
    const totalVisitas = await pool.query('SELECT COUNT(*) FROM visitas');
    const visitasActivas = await pool.query("SELECT COUNT(*) FROM visitas WHERE estado = 'activa'");
    const visitasInactivas = await pool.query("SELECT COUNT(*) FROM visitas WHERE estado != 'activa'");

    res.json({
      totalVisitas: parseInt(totalVisitas.rows[0].count, 10),
      visitasActivas: parseInt(visitasActivas.rows[0].count, 10),
      visitasInactivas: parseInt(visitasInactivas.rows[0].count, 10),
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

exports.finalizarVisita = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "UPDATE visitas SET estado = 'finalizada', fecha_salida = NOW() WHERE id = $1 RETURNING *",
      [id]
    );
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Visita no encontrada' });
    }
    res.json({ mensaje: 'Visita finalizada correctamente', visita: resultado.rows[0] });
  } catch (error) {
    console.error('Error al finalizar visita:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

exports.rechazarVisita = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "UPDATE visitas SET estado = 'rechazada' WHERE id = $1 RETURNING *",
      [id]
    );
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Visita no encontrada' });
    }
    res.json({ mensaje: 'Visita rechazada correctamente', visita: resultado.rows[0] });
  } catch (error) {
    console.error('Error al rechazar visita:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

exports.listarVisitasPorUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const resultado = await pool.query(
      'SELECT * FROM visitas WHERE usuario_id = $1 ORDER BY fecha_ingreso DESC',
      [usuario_id]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al listar visitas por usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
