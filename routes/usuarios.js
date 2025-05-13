const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const { solicitarAcceso } = require('../controllers/usuarios.controller');  
const { aprobarUsuario } = require('../controllers/usuarios.controller');
const { verificarToken, esAdmin } = require('../middleware/auth.middleware');
const { loginUsuario } = require('../controllers/usuarios.controller');


// Ruta para login
router.post('/login', loginUsuario);

// Ruta para ver usuarios inactivos (restringido a admin)
router.get('/pendientes', verificarToken, esAdmin, usuariosController.obtenerUsuariosInactivos);


// Ruta pública: Solicitud de acceso de usuario estándar
router.post('/solicitar-acceso', solicitarAcceso);

// Aprobar usuario (solo admin)
router.put('/aprobar/:id', verificarToken, esAdmin, aprobarUsuario);



module.exports = router;