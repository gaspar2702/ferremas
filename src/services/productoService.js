// src/services/productoService.js
const productoModel = require('../models/productoModel'); // Importa el modelo de productos

// Servicio para obtener todos los productos
async function getAllProductos() {
    try {
        const productos = await productoModel.getAllProductos();
        // Aquí podrías añadir lógica de negocio adicional si fuera necesario,
        // por ejemplo, filtrar productos, añadir campos calculados, etc.
        return productos;
    } catch (error) {
        console.error('Error en productoService.getAllProductos:', error);
        throw new Error('No se pudieron obtener los productos.');
    }
}

// Servicio para obtener un producto por ID
async function getProductoById(id) {
    try {
        // Validación básica: asegura que el ID sea un número
        if (isNaN(id) || id <= 0) {
            throw new Error('ID de producto inválido.');
        }
        const producto = await productoModel.getProductoById(id);
        if (!producto) {
            throw new Error('Producto no encontrado.');
        }
        return producto;
    } catch (error) {
        console.error('Error en productoService.getProductoById:', error);
        throw error; // Propagar el error para que el controlador lo maneje
    }
}

// Servicio para crear un nuevo producto
async function createProducto(productoData) {
    // Validaciones de negocio antes de enviar a la DB
    if (!productoData.nombre || !productoData.precio || !productoData.stockDisponible) {
        throw new Error('Faltan campos obligatorios para crear el producto (nombre, precio, stockDisponible).');
    }
    if (productoData.precio <= 0) {
        throw new Error('El precio debe ser un valor positivo.');
    }
    if (productoData.stockDisponible < 0) {
        throw new Error('El stock disponible no puede ser negativo.');
    }

    try {
        const nuevoProducto = await productoModel.createProducto(
            productoData.nombre,
            productoData.descripcion,
            productoData.categoria,
            productoData.precio,
            productoData.stockDisponible
        );
        return nuevoProducto;
    } catch (error) {
        console.error('Error en productoService.createProducto:', error);
        throw new Error('No se pudo crear el producto.');
    }
}

// Servicio para actualizar un producto
async function updateProducto(id, productoData) {
    // Validación básica del ID
    if (isNaN(id) || id <= 0) {
        throw new Error('ID de producto inválido para actualizar.');
    }

    // Aquí podrías añadir validaciones similares a createProducto para los datos de productoData
    // También podrías buscar el producto primero para asegurar que existe antes de actualizar

    try {
        const productoActualizado = await productoModel.updateProducto(
            id,
            productoData.nombre,
            productoData.descripcion,
            productoData.categoria,
            productoData.precio,
            productoData.stockDisponible
        );
        if (!productoActualizado) {
            throw new Error('Producto no encontrado para actualizar.');
        }
        return productoActualizado;
    } catch (error) {
        console.error('Error en productoService.updateProducto:', error);
        throw new Error('No se pudo actualizar el producto.');
    }
}

// Servicio para eliminar un producto
async function deleteProducto(id) {
    // Validación básica del ID
    if (isNaN(id) || id <= 0) {
        throw new Error('ID de producto inválido para eliminar.');
    }

    try {
        const productoEliminado = await productoModel.deleteProducto(id);
        if (!productoEliminado) {
            throw new Error('Producto no encontrado para eliminar.');
        }
        return productoEliminado; // Retorna el ID del producto eliminado
    } catch (error) {
        console.error('Error en productoService.deleteProducto:', error);
        throw new Error('No se pudo eliminar el producto.');
    }
}

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};