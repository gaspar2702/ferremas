// src/models/productoModel.js
// Importa la instancia del pool directamente
const pool = require('../../config/database');

// 1. Obtener todos los productos
async function getAllProductos() {
    const client = await pool.connect(); // Obtiene un cliente del pool
    try {
        const result = await client.query('SELECT * FROM Productos ORDER BY ProductoID ASC');
        return result.rows; // Devuelve un array de objetos (productos)
    } finally {
        client.release(); // Libera el cliente de vuelta al pool
    }
}

// 2. Obtener un producto por su ID
async function getProductoById(id) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM Productos WHERE ProductoID = $1', [id]);
        return result.rows[0]; // Devuelve el primer producto encontrado o undefined
    } finally {
        client.release();
    }
}

// 3. Crear un nuevo producto
async function createProducto(nombre, descripcion, categoria, precio, stockDisponible) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'INSERT INTO Productos (Nombre, Descripcion, Categoria, Precio, StockDisponible) VALUES ($1, $2, $3, $4, $5) RETURNING ProductoID, Nombre',
            [nombre, descripcion, categoria, precio, stockDisponible]
        );
        return res.rows[0]; // Devuelve el ID y nombre del producto creado
    } finally {
        client.release();
    }
}

// 4. Actualizar un producto existente
async function updateProducto(id, nombre, descripcion, categoria, precio, stockDisponible) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'UPDATE Productos SET Nombre = $1, Descripcion = $2, Categoria = $3, Precio = $4, StockDisponible = $5 WHERE ProductoID = $6 RETURNING *',
            [nombre, descripcion, categoria, precio, stockDisponible, id]
        );
        return res.rows[0]; // Devuelve el producto actualizado
    } finally {
        client.release();
    }
}

// 5. Eliminar un producto
async function deleteProducto(id) {
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM Productos WHERE ProductoID = $1 RETURNING ProductoID', [id]);
        return res.rows[0]; // Devuelve el ID del producto eliminado
    } finally {
        client.release();
    }
}

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};