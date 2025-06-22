const pool = require('../../config/database');

function buildInitialHistorialPrecios(initialPrecio) {
    return JSON.stringify([{ Fecha: new Date().toISOString(), Valor: initialPrecio }]);
}

async function getAllProductos(categoria, searchTerm) {
    const client = await pool.connect();
    try {
        // CORRECCIÓN: Nombres de tabla y columnas en minúscula para consistencia
        let query = 'SELECT productoid, nombre, descripcion, categoria, marca, codigo_ferremas, codigo_fabricante, precio, historial_precios, stockdisponible, imagen FROM productos';
        const conditions = [];
        const queryParams = [];
        let paramIndex = 1;

        if (categoria) {
            conditions.push(`categoria = $${paramIndex++}`);
            queryParams.push(categoria);
        }

        if (searchTerm) {
            conditions.push(`(nombre ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`);
            queryParams.push(`%${searchTerm}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY productoid ASC';

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
        // CORRECCIÓN: Nombres de tabla y columnas en minúscula
        const result = await client.query('SELECT * FROM productos WHERE productoid = $1', [id]);
        return result.rows[0]; 
    } finally {
        client.release();
    }
}

async function createProducto(nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, precio, stockDisponible) {
    const client = await pool.connect();
    try {
        const historialPreciosJson = buildInitialHistorialPrecios(precio);

        // CORRECCIÓN: Nombres de tabla y columnas en minúscula
        const res = await client.query(
            `INSERT INTO productos (nombre, descripcion, categoria, marca, codigo_ferremas, codigo_fabricante, precio, historial_precios, stockdisponible)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)
             RETURNING *`,
            [nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, precio, historialPreciosJson, stockDisponible]
        );
        return res.rows[0];
    } finally {
        client.release();
    }
}

async function updateProducto(id, nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, newPrecio, stockDisponible) {
    const client = await pool.connect();
    try {
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;

        if (nombre !== undefined && nombre !== null) { updateFields.push(`nombre = $${paramIndex++}`); updateValues.push(nombre); }
        if (descripcion !== undefined && descripcion !== null) { updateFields.push(`descripcion = $${paramIndex++}`); updateValues.push(descripcion); }
        if (categoria !== undefined && categoria !== null) { updateFields.push(`categoria = $${paramIndex++}`); updateValues.push(categoria); }
        if (marca !== undefined && marca !== null) { updateFields.push(`marca = $${paramIndex++}`); updateValues.push(marca); }
        if (codigoFerremas !== undefined && codigoFerremas !== null) { updateFields.push(`codigo_ferremas = $${paramIndex++}`); updateValues.push(codigoFerremas); }
        if (codigoFabricante !== undefined && codigoFabricante !== null) { updateFields.push(`codigo_fabricante = $${paramIndex++}`); updateValues.push(codigoFabricante); }
        if (stockDisponible !== undefined && stockDisponible !== null) { updateFields.push(`stockdisponible = $${paramIndex++}`); updateValues.push(stockDisponible); }

        if (newPrecio !== undefined && newPrecio !== null) {
            updateFields.push(`precio = $${paramIndex++}`);
            updateValues.push(newPrecio);
            
            const newPriceEntry = JSON.stringify({ Fecha: new Date().toISOString(), Valor: newPrecio });
            updateFields.push(`historial_precios = jsonb_insert(COALESCE(historial_precios, '[]'::jsonb), '{99999}', $${paramIndex++}::jsonb, true)`);
            updateValues.push(newPriceEntry);
        }

        if (updateFields.length === 0) {
            throw new Error('No se proporcionaron datos válidos para actualizar el producto.');
        }

        const query = `UPDATE productos SET ${updateFields.join(', ')} WHERE productoid = $${paramIndex} RETURNING *`;
        updateValues.push(id); 

        const res = await client.query(query, updateValues);
        return res.rows[0]; 
    } finally {
        client.release();
    }
}

async function deleteProducto(id) {
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM productos WHERE productoid = $1 RETURNING *', [id]);
        return res.rows[0]; 
    } finally {
        client.release();
    }
}

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getAllCategorias
};