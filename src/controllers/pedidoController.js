const pool = require('../../config/database');

async function procesarCompra(req, res) {
  // Ahora también recibimos el sucursalId desde el front-end
  const { items, total, sucursalId } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío.' });
  }
  if (!sucursalId) {
    return res.status(400).json({ error: 'No se ha especificado una sucursal.' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciamos una transacción para seguridad

    for (const item of items) {
      // CORRECCIÓN: La consulta ahora actualiza la tabla 'inventario'
      // y usa tanto el productoid como el sucursalid para ser específico.
      const query = `
        UPDATE inventario 
        SET stockdisponible = stockdisponible - $1 
        WHERE productoid = $2 AND sucursalid = $3 AND stockdisponible >= $1
      `;
      const result = await client.query(query, [item.quantity, item.productoid, sucursalId]);
      
      if (result.rowCount === 0) {
        throw new Error(`Stock insuficiente para el producto: ${item.nombre} en la sucursal seleccionada.`);
      }
    }
    
    await client.query('COMMIT'); 
    
    console.log(`✅ Stock actualizado correctamente en la base de datos para la sucursal ${sucursalId}.`);
    res.status(200).json({ message: 'Compra simulada y stock actualizado exitosamente.' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al procesar la compra:', error.message);
    res.status(500).json({ error: 'No se pudo procesar la compra.', details: error.message });
  } finally {
    client.release();
  }
}

module.exports = {
  procesarCompra
};