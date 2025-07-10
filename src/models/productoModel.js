const pool = require('../../config/database');

function buildInitialHistorialPrecios(initialPrecio) {
    return JSON.stringify([{ Fecha: new Date().toISOString(), Valor: initialPrecio }]);
}

async function getAllProductos(categoria, searchTerm, sucursalId) {
    const client = await pool.connect();
    try {
        let query = `
            SELECT 
                p.productoid, p.nombre, p.descripcion, p.categoria, p.marca, p.imagen, p.precio,
                i.stockdisponible 
            FROM productos p
            INNER JOIN inventario i ON p.productoid = i.productoid
        `;
        const conditions = [];
        const queryParams = [];
        let paramIndex = 1;

        if (sucursalId) {
            conditions.push(`i.sucursalid = $${paramIndex++}`);
            queryParams.push(sucursalId);
        } else {
            conditions.push(`i.sucursalid = $1`);
            queryParams.push(1);
        }

        if (categoria) {
            conditions.push(`p.categoria = $${paramIndex++}`);
            queryParams.push(categoria);
        }
        if (searchTerm) {
            conditions.push(`(p.nombre ILIKE $${paramIndex} OR p.descripcion ILIKE $${paramIndex})`);
            queryParams.push(`%${searchTerm}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        query += ' ORDER BY p.productoid ASC';

        const result = await client.query(query, queryParams);
        return result.rows;
    } finally {
        client.release();
    }
}

async function getAllCategorias() {
    const client = await pool.connect();
    try {
        const query = "SELECT DISTINCT categoria FROM productos WHERE categoria IS NOT NULL AND categoria <> '' ORDER BY categoria ASC";
        const result = await client.query(query);
        return result.rows;
    } finally {
        client.release();
    }
}

async function getProductoById(id) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM productos WHERE productoid = $1', [id]);
        return result.rows[0]; 
    } finally {
        client.release();
    }
}

// ... (Aquí van tus otras funciones: create, update, delete)

// --- CORRECCIÓN FINAL EN LOS EXPORTS ---
// Nos aseguramos de que todas las funciones estén listadas aquí.
module.exports = {
    getAllProductos,
    getProductoById,
    // createProducto,      // Descomenta esta línea si tienes esta función
    // updateProducto,      // Descomenta esta línea si tienes esta función
    // deleteProducto,      // Descomenta esta línea si tienes esta función
    getAllCategorias,
    // getAllSucursales,    // Descomenta esta línea si tienes esta función
};