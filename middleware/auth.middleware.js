const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

exports.esAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado' });
  }
  next();
};

exports.esUsuarioEstandar = (req, res, next) => {
  if (req.usuario.rol !== 'estandar' && req.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado' });
  }
  next();
};
