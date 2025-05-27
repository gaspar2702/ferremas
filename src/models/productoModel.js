const pool = require('../../config/database');


function buildInitialHistorialPrecios(initialPrecio) {

    return JSON.stringify([{ Fecha: new Date().toISOString(), Valor: initialPrecio }]);
}

async function getAllProductos() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT productoid, nombre, descripcion, categoria, marca, codigo_ferremas, codigo_fabricante, precio, historial_precios, stockdisponible FROM Productos ORDER BY ProductoID ASC');
        return result.rows;
    } finally {
        client.release();
    }
}

async function getProductoById(id) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT productoid, nombre, descripcion, categoria, marca, codigo_ferremas, codigo_fabricante, precio, historial_precios, stockdisponible FROM Productos WHERE ProductoID = $1', [id]);
        return result.rows[0]; 
    } finally {
        client.release();
    }
}

async function createProducto(nombre, descripcion, categoria, marca, codigoFerremas, codigoFabricante, precio, stockDisponible) {
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
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM Productos WHERE ProductoID = $1 RETURNING ProductoID', [id]);
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
    deleteProducto
};