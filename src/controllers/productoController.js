const productoService = require('../services/productoService');

// --- FUNCIÓN MODIFICADA ---
// Ahora lee 'categoria' y 'search' desde los parámetros de la URL
async function getAllProductos(req, res) {
    try {
        // Leemos tanto 'categoria' como el nuevo 'search' desde los query params
        const { categoria, search } = req.query; 
        // Pasamos ambos parámetros al servicio
        const productos = await productoService.getAllProductos(categoria, search);
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error en productoController.getAllProductos:', error);
        res.status(500).json({ message: error.message || 'Error interno del servidor al obtener productos.' });
    }
}

// --- ¡NUEVA FUNCIÓN AÑADIDA! --- (Ya la teníamos, se queda igual)
async function getAllCategorias(req, res) {
    try {
        const categorias = await productoService.getAllCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Error en productoController.getAllCategorias:', error);
        res.status(500).json({ message: error.message || 'Error interno del servidor al obtener categorías.' });
    }
}

async function getProductoById(req, res) {
// ... (esta función no necesita cambios)
    const { id } = req.params;
    try {
        const producto = await productoService.getProductoById(parseInt(id));
        if (!producto) { 
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error('Error en productoController.getProductoById:', error);

        if (error.message === 'ID de producto inválido.') {
            res.status(400).json({ message: error.message });
        } else { 
            res.status(500).json({ message: error.message || 'Error interno del servidor al obtener el producto.' });
        }
    }
}

async function createProducto(req, res) {
// ... (esta función no necesita cambios)
    const { nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, precio, stockDisponible } = req.body;

    try {

        if (!nombre || precio === undefined || precio === null || stockDisponible === undefined || stockDisponible === null) {
            return res.status(400).json({ message: 'Faltan campos obligatorios para crear el producto (nombre, precio, stockDisponible).' });
        }

        const nuevoProducto = await productoService.createProducto(
            nombre,
            descripcion,
            categoria,
            marca,
            codigoFerremas,
            codigoFabricante,
            precio,
            stockDisponible
        );
        res.status(201).json({ message: 'Producto creado exitosamente.', product: nuevoProducto });
    } catch (error) {
        console.error('Error en productoController.createProducto:', error);
        if (error.message.includes('Faltan campos obligatorios') || error.message.includes('inválidos')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message || 'Error interno del servidor al crear el producto.' });
        }
    }
}

async function updateProducto(req, res) {
// ... (esta función no necesita cambios)
    const { id } = req.params;
    const { nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, precio, stockDisponible } = req.body;

    try {
        const productoActualizado = await productoService.updateProducto(
            parseInt(id),
            nombre,
            descripcion,
            categoria,
            marca,
            codigoFerremas,
            codigoFabricante,
            precio, 
            stockDisponible
        );

        if (!productoActualizado) { 
            return res.status(404).json({ message: 'Producto no encontrado para actualizar.' });
        }

        res.status(200).json({ message: 'Producto actualizado exitosamente.', product: productoActualizado });
    } catch (error) {
        console.error('Error en productoController.updateProducto:', error);

        if (error.message.includes('ID de producto inválido') || error.message.includes('No se proporcionaron datos para actualizar')) {
            res.status(400).json({ message: error.message });
        } else if (error.message.includes('Producto no encontrado')) { 
             res.status(404).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error.message || 'Error interno del servidor al actualizar el producto.' });
        }
    }
}

async function deleteProducto(req, res) {
// ... (esta función no necesita cambios)
    const { id } = req.params;
    try {
        const productoEliminado = await productoService.deleteProducto(parseInt(id));
        if (!productoEliminado) { 
            return res.status(404).json({ message: 'Producto no encontrado para eliminar.' });
        }
        res.status(200).json({ message: `Producto con ID ${productoEliminado.productoid} eliminado exitosamente.` });
    } catch (error) {
        console.error('Error en productoController.deleteProducto:', error);
        if (error.message.includes('ID de producto inválido')) {
            res.status(400).json({ message: error.message });
        } else if (error.message.includes('Producto no encontrado')) {
            res.status(404).json({ message: error.message });
        } else if (error.code === '23503') { 
            res.status(409).json({ message: 'No se puede eliminar el producto porque tiene relaciones con otras tablas (ej. inventario). Elimine primero los registros dependientes.' });
        }
        else {
            res.status(500).json({ message: error.message || 'Error interno del servidor al eliminar el producto.' });
        }
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