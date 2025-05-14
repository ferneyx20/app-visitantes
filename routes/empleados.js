const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');
const { verificarToken, esAdmin } = require('../middleware/auth.middleware');

router.get('/', verificarToken, esAdmin, empleadosController.listarEmpleados);
router.post('/', verificarToken, esAdmin, empleadosController.agregarEmpleado);
router.delete('/:id', verificarToken, esAdmin, empleadosController.eliminarEmpleado);

module.exports = router;
