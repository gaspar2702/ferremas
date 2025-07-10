const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

// Define la ruta GET /api/sucursales
router.get('/', sucursalController.getAllSucursales);

module.exports = router;