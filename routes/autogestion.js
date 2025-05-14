const express = require('express');
const router = express.Router();
const visitasController = require('../controllers/visitas.controller');

// Ruta para registrar una visita autogestionada
router.post('/', visitasController.registrarVisita);

module.exports = router;
