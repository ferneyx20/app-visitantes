const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const { verificarToken, esAdmin } = require('../middleware/auth.middleware');

// Ruta para login
router.post('/login', usuariosController.loginUsuario);

// Ruta para ver usuarios inactivos (restringido a admin)
router.get('/pendientes', verificarToken, esAdmin, usuariosController.obtenerUsuariosInactivos);

// Ruta pública: Solicitud de acceso de usuario estándar
router.post('/solicitar-acceso', usuariosController.solicitarAcceso);

// Aprobar usuario (solo admin)
router.put('/aprobar/:id', verificarToken, esAdmin, usuariosController.aprobarUsuario);

// Cambiar estado de usuario (activar/desactivar)
router.put('/cambiar-estado/:id', verificarToken, esAdmin, usuariosController.cambiarEstadoUsuario);

// Nueva ruta para eliminar usuarios
router.delete('/:id', verificarToken, esAdmin, usuariosController.eliminarUsuario);

module.exports = router;