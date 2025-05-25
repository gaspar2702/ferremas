// src/controllers/productoController.js
const productoService = require('../services/productoService'); // Importa el servicio de productos

// Controlador para obtener todos los productos
async function getAllProductos(req, res) {
    try {
        const productos = await productoService.getAllProductos();
        res.status(200).json(productos); // Envía un JSON con el array de productos y estado 200 OK
    } catch (error) {
        console.error('Error en productoController.getAllProductos:', error);
        res.status(500).json({ message: error.message || 'Error interno del servidor al obtener productos.' });
    }
}

// Controlador para obtener un producto por ID
async function getProductoById(req, res) {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL (ej. /api/productos/123)
    try {
        const producto = await productoService.getProductoById(parseInt(id)); // Convierte el ID a entero
        res.status(200).json(producto);
    } catch (error) {
        console.error('Error en productoController.getProductoById:', error);
        // Manejo de errores específico según el tipo de error
        if (error.message === 'ID de producto inválido.') {
            res.status(400).json({ message: error.message }); // Bad Request
        } else if (error.message === 'Producto no encontrado.') {
            res.status(404).json({ message: error.message }); // Not Found
        } else {
            res.status(500).json({ message: error.message || 'Error interno del servidor al obtener el producto.' });
        }
    }
}

// Controlador para crear un nuevo producto
async function createProducto(req, res) {
    const productoData = req.body; // Obtiene los datos del cuerpo de la solicitud (JSON)
    try {
        const nuevoProducto = await productoService.createProducto(productoData);
        res.status(201).json({ message: 'Producto creado exitosamente.', product: nuevoProducto }); // 201 Created
    } catch (error) {
        console.error('Error en productoController.createProducto:', error);
        // Manejo de errores de validación de negocio
        if (error.message.includes('Faltan campos obligatorios') || error.message.includes('valor positivo')) {
            res.status(400).json({ message: error.message }); // Bad Request
        } else {
            res.status(500).json({ message: error.message || 'Error interno del servidor al crear el producto.' });
        }
    }
}

// Controlador para actualizar un producto
async function updateProducto(req, res) {
    const { id } = req.params;
    const productoData = req.body;
    try {
        const productoActualizado = await productoService.updateProducto(parseInt(id), productoData);
        res.status(200).json({ message: 'Producto actualizado exitosamente.', product: productoActualizado });
    } catch (error) {
        console.error('Error en productoController.updateProducto:', error);
        if (error.message.includes('ID de producto inválido') || error.message.includes('Producto no encontrado')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message || 'Error interno del servidor al actualizar el producto.' });
        }
    }
}

// Controlador para eliminar un producto
async function deleteProducto(req, res) {
    const { id } = req.params;
    try {
        const productoEliminado = await productoService.deleteProducto(parseInt(id));
        res.status(200).json({ message: `Producto con ID ${productoEliminado.productoid} eliminado exitosamente.` });
    } catch (error) {
        console.error('Error en productoController.deleteProducto:', error);
        if (error.message.includes('ID de producto inválido') || error.message.includes('Producto no encontrado')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message || 'Error interno del servidor al eliminar el producto.' });
        }
    }
}

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};