const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController'); 




router.get('/', productoController.getAllProductos);


// --- ¡NUEVA RUTA AÑADIDA! ---
// Le decimos a la app que cuando se pida GET /api/productos/categorias,
// se ejecute la función getAllCategorias de nuestro controlador.
router.get('/categorias', productoController.getAllCategorias);


router.get('/:id', productoController.getProductoById);


router.post('/', productoController.createProducto);


router.put('/:id', productoController.updateProducto);


router.delete('/:id', productoController.deleteProducto);

module.exports = router;