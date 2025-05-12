const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// Ruta para login
router.post('/login', usuariosController.login);

// Ruta para ver usuarios inactivos (restringido a admin)
router.get('/pendientes', usuariosController.obtenerUsuariosInactivos);

module.exports = router;
