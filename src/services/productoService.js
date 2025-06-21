const productoModel = require('../models/productoModel');

// --- FUNCIÓN MODIFICADA ---
// Ahora acepta y pasa tanto 'categoria' como 'searchTerm' al modelo.
async function getAllProductos(categoria, searchTerm) {
    try {
        // Pasamos ambos parámetros al modelo.
        const productos = await productoModel.getAllProductos(categoria, searchTerm);
        return productos;
    } catch (error) {
        console.error('Error al obtener todos los productos en el servicio:', error);
        throw new Error('No se pudieron obtener los productos.');
    }
}

// --- ¡NUEVA FUNCIÓN AÑADIDA! --- (Ya la teníamos, se queda igual)
async function getAllCategorias() {
    try {
        const categorias = await productoModel.getAllCategorias();
        return categorias;
    } catch (error) {
        console.error('Error al obtener las categorías en el servicio:', error);
        throw new Error('No se pudieron obtener las categorías.');
    }
}

async function getProductoById(id) {
// ... (esta función no necesita cambios)
    if (isNaN(id) || id <= 0) {
        throw new Error('ID de producto inválido.');
    }
    try {
        const producto = await productoModel.getProductoById(id);
        if (!producto) {
            throw new Error('Producto no encontrado.');
        }
        return producto;
    } catch (error) {
        console.error(`Error al obtener producto por ID ${id} en el servicio:`, error);
        throw error;
    }
}


async function createProducto(nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, precio, stockDisponible) {
// ... (esta función no necesita cambios)
    if (!nombre || precio === undefined || precio === null || stockDisponible === undefined || stockDisponible === null) {
        throw new Error('Faltan campos obligatorios (nombre, precio, stockDisponible).');
    }
    if (precio <= 0) {
        throw new Error('El precio debe ser un valor positivo.');
    }
    if (stockDisponible < 0) {
        throw new Error('El stock disponible no puede ser negativo.');
    }

    try {
        const nuevoProducto = await productoModel.createProducto(
            nombre,
            descripcion,
            categoria,
            marca,
            codigoFerremas,
            codigoFabricante,
            precio,
            stockDisponible
        );
        return nuevoProducto;
    } catch (error) {
        console.error('Error al crear producto en el servicio:', error);
        throw new Error('No se pudo crear el producto.');
    }
}


async function updateProducto(id, nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, newPrecio, stockDisponible) {
// ... (esta función no necesita cambios)
    if (isNaN(id) || id <= 0) {
        throw new Error('ID de producto inválido para actualizar.');
    }


    if (nombre === undefined && descripcion === undefined && categoria === undefined &&
        marca === undefined && codigoFerremas === undefined && codigoFabricante === undefined &&
        newPrecio === undefined && stockDisponible === undefined) {
        throw new Error('No se proporcionaron datos para actualizar el producto.');
    }

    if (newPrecio !== undefined && (newPrecio <= 0 || newPrecio === null)) {
        throw new Error('El nuevo precio debe ser un valor positivo.');
    }
    if (stockDisponible !== undefined && stockDisponible < 0) {
        throw new Error('El stock disponible no puede ser negativo.');
    }

    try {

        const productoActualizado = await productoModel.updateProducto(
            id,
            nombre,
            descripcion,
            categoria,
            marca,
            codigoFerremas,
            codigoFabricante,
            newPrecio,
            stockDisponible
        );
        if (!productoActualizado) {
            throw new Error('Producto no encontrado para actualizar.');
        }
        return productoActualizado;
    } catch (error) {
        console.error(`Error al actualizar producto con ID ${id} en el servicio:`, error);
        throw error; 
    }
}

async function deleteProducto(id) {
// ... (esta función no necesita cambios)
    if (isNaN(id) || id <= 0) {
        throw new Error('ID de producto inválido para eliminar.');
    }
    try {
        const productoEliminado = await productoModel.deleteProducto(id);
        if (!productoEliminado) {
            throw new Error('Producto no encontrado para eliminar.');
        }
        return productoEliminado;
    } catch (error) {
        console.error(`Error al eliminar producto con ID ${id} en el servicio:`, error);
        throw error; 
    }
}


// --- EXPORTS ACTUALIZADO ---
module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getAllCategorias
};