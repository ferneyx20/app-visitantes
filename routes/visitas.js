// routes/visitas.js
const express = require('express');
const router = express.Router();
const visitasController = require('../controllers/visitas.controller');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + path.extname(file.originalname);
    cb(null, nombreUnico);
  },
});
const upload = multer({ storage });

// Ruta para registrar una visita
router.post('/registrar', visitasController.registrarVisita);

// Ruta para listar visitas con filtros
router.get('/listar', visitasController.listarVisitas);

// Ruta para obtener estadísticas de visitas
router.get('/estadisticas', visitasController.obtenerEstadisticas);

// Nueva ruta para finalizar visitas
router.put('/finalizar/:id', visitasController.finalizarVisita);

// Nueva ruta para rechazar visitas
router.put('/rechazar/:id', visitasController.rechazarVisita);

// Nueva ruta para listar visitas por usuario
router.get('/usuario/:usuario_id', visitasController.listarVisitasPorUsuario);

module.exports = router;
