const productoModel = require('../models/productoModel');

// --- FUNCIÓN MODIFICADA ---
// Ahora acepta y pasa los tres parámetros al modelo.
async function getAllProductos(categoria, searchTerm, sucursalId) {
    try {
        // Pasamos todos los filtros al modelo.
        const productos = await productoModel.getAllProductos(categoria, searchTerm, sucursalId);
        return productos;
    } catch (error) {
        throw new Error('No se pudieron obtener los productos.');
    }
}

// --- ¡NUEVA FUNCIÓN! ---
// Llama a la nueva función del modelo para obtener las sucursales.
async function getAllSucursales() {
    try {
        const sucursales = await productoModel.getAllSucursales();
        return sucursales;
    } catch (error) {
        throw new Error('No se pudieron obtener las sucursales.');
    }
}

async function getAllCategorias() {
    try {
        const categorias = await productoModel.getAllCategorias();
        return categorias;
    } catch (error) {
        throw new Error('No se pudieron obtener las categorías.');
    }
}

async function getProductoById(id) {
    if (isNaN(id) || id <= 0) throw new Error('ID de producto inválido.');
    
    const producto = await productoModel.getProductoById(id);
    if (!producto) throw new Error('Producto no encontrado.');
    
    return producto;
}

async function createProducto(data) {
    const { nombre, precio, stockDisponible } = data;
    if (!nombre || precio === undefined || stockDisponible === undefined) {
        throw new Error('Faltan campos obligatorios (nombre, precio, stockDisponible).');
    }
    return await productoModel.createProducto(data);
}

async function updateProducto(id, data) {
    if (isNaN(id) || id <= 0) throw new Error('ID de producto inválido para actualizar.');
    
    const productoActualizado = await productoModel.updateProducto(id, data);
    if (!productoActualizado) throw new Error('Producto no encontrado para actualizar.');

    return productoActualizado;
}

async function deleteProducto(id) {
    if (isNaN(id) || id <= 0) throw new Error('ID de producto inválido para eliminar.');

    const productoEliminado = await productoModel.deleteProducto(id);
    if (!productoEliminado) throw new Error('Producto no encontrado para eliminar.');
    
    return productoEliminado;
}

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getAllCategorias,
    getAllSucursales // <-- Añadimos la nueva función
};