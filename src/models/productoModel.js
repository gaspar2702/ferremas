const pool = require('../../config/database');


function buildInitialHistorialPrecios(initialPrecio) {

    return JSON.stringify([{ Fecha: new Date().toISOString(), Valor: initialPrecio }]);
}

// --- FUNCIÓN MODIFICADA ---
// Ahora acepta 'categoria' y 'searchTerm' para filtrar los resultados
async function getAllProductos(categoria, searchTerm) {
    const client = await pool.connect();
    try {
        let query = 'SELECT productoid, nombre, descripcion, categoria, marca, codigo_ferremas, codigo_fabricante, precio, historial_precios, stockdisponible, imagen FROM Productos';
        const conditions = [];
        const queryParams = [];
        let paramIndex = 1;

        // Si se proporciona una categoría, se añade un filtro
        if (categoria) {
            conditions.push(`categoria = $${paramIndex++}`);
            queryParams.push(categoria);
        }

        // --- ¡NUEVA LÓGICA DE BÚSQUEDA! ---
        // Si se proporciona un término de búsqueda, se añade otro filtro
        if (searchTerm) {
            // ILIKE no distingue mayúsculas/minúsculas, y % busca el término en cualquier parte
            conditions.push(`(nombre ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`);
            queryParams.push(`%${searchTerm}%`);
        }

        // Si hay condiciones, las unimos con 'AND' y las añadimos a la query
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY ProductoID ASC';

        const result = await client.query(query, queryParams);
        return result.rows;
    } finally {
        client.release();
    }
}

// --- ¡NUEVA FUNCIÓN AÑADIDA! --- (Ya la teníamos, se queda igual)
async function getAllCategorias() {
    const client = await pool.connect();
    try {
        const query = `
            SELECT DISTINCT categoria FROM productos 
            WHERE categoria IS NOT NULL AND categoria <> '' 
            ORDER BY categoria ASC
        `;
        const result = await client.query(query);
        return result.rows;
    } finally {
        client.release();
    }
}


async function getProductoById(id) {
// ... (esta función no necesita cambios)
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT productoid, nombre, descripcion, categoria, marca, codigo_ferremas, codigo_fabricante, precio, historial_precios, stockdisponible FROM Productos WHERE ProductoID = $1', [id]);
        return result.rows[0]; 
    } finally {
        client.release();
    }
}

async function createProducto(nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, precio, stockDisponible) {
// ... (esta función no necesita cambios)
    const client = await pool.connect();
    try {
       
        const historialPreciosJson = buildInitialHistorialPrecios(precio);

        const res = await client.query(
            `INSERT INTO Productos (Nombre, Descripcion, Categoria, Marca, Codigo_Ferremas, Codigo_Fabricante, Precio, Historial_Precios, StockDisponible)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)
             RETURNING productoid, nombre, descripcion, categoria, marca, codigo_ferremas, codigo_fabricante, precio, historial_precios, stockdisponible`,
            [nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, precio, historialPreciosJson, stockDisponible]
        );
        return res.rows[0];
    } finally {
        client.release();
    }
}

async function updateProducto(id, nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, newPrecio, stockDisponible) {
// ... (esta función no necesita cambios)
    const client = await pool.connect();
    try {
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;

        
        if (nombre !== undefined && nombre !== null) { updateFields.push(`Nombre = $${paramIndex++}`); updateValues.push(nombre); }
        if (descripcion !== undefined && descripcion !== null) { updateFields.push(`Descripcion = $${paramIndex++}`); updateValues.push(descripcion); }
        if (categoria !== undefined && categoria !== null) { updateFields.push(`Categoria = $${paramIndex++}`); updateValues.push(categoria); }
        if (marca !== undefined && marca !== null) { updateFields.push(`Marca = $${paramIndex++}`); updateValues.push(marca); }
        if (codigoFerremas !== undefined && codigoFerremas !== null) { updateFields.push(`Codigo_Ferremas = $${paramIndex++}`); updateValues.push(codigoFerremas); }
        if (codigoFabricante !== undefined && codigoFabricante !== null) { updateFields.push(`Codigo_Fabricante = $${paramIndex++}`); updateValues.push(codigoFabricante); }
        if (stockDisponible !== undefined && stockDisponible !== null) { updateFields.push(`StockDisponible = $${paramIndex++}`); updateValues.push(stockDisponible); }

        
        if (newPrecio !== undefined && newPrecio !== null) {
            updateFields.push(`Precio = $${paramIndex++}`);
            updateValues.push(newPrecio);

            
            const newPriceEntry = JSON.stringify({ Fecha: new Date().toISOString(), Valor: newPrecio });
            updateFields.push(`Historial_Precios = jsonb_insert(COALESCE(Historial_Precios, '[]'::jsonb), '{99999}', $${paramIndex++}::jsonb, true)`);
            updateValues.push(newPriceEntry);
        }

        if (updateFields.length === 0) {
            throw new Error('No se proporcionaron datos válidos para actualizar el producto.');
        }

        const query = `UPDATE Productos SET ${updateFields.join(', ')} WHERE ProductoID = $${paramIndex} RETURNING *`;
        updateValues.push(id); 

        const res = await client.query(query, updateValues);
        return res.rows[0]; 
    } finally {
        client.release();
    }
}

async function deleteProducto(id) {
// ... (esta función no necesita cambios)
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM Productos WHERE ProductoID = $1 RETURNING ProductoID', [id]);
        return res.rows[0]; 
    } finally {
        client.release();
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