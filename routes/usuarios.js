const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/usuarios.controller');
const { loginUsuario } = require('../controllers/login.controller');

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario); // Ruta de inicio de sesión

module.exports = router;
