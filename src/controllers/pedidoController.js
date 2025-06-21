const pool = require('../../config/database'); // Necesitamos la conexión a la DB

async function procesarCompra(req, res) {
  // Recibimos la lista de items y el total desde el front-end
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío.' });
  }

  const client = await pool.connect(); // Nos conectamos a la DB

  try {
    await client.query('BEGIN'); // Iniciamos una transacción para seguridad

    // Recorremos cada item del carrito para actualizar su stock
    for (const item of items) {
      const query = `
        UPDATE productos 
        SET stockdisponible = stockdisponible - $1 
        WHERE productoid = $2 AND stockdisponible >= $1
      `;
      const result = await client.query(query, [item.quantity, item.productoid]);

      // Si ninguna fila fue afectada, significa que no había stock suficiente
      if (result.rowCount === 0) {
        throw new Error(`Stock insuficiente para el producto: ${item.nombre}`);
      }
    }

    // Aquí también se insertaría el registro del pedido en una tabla 'pedidos'
    // ... (lógica futura) ...

    await client.query('COMMIT'); // Confirmamos todos los cambios en la DB

    console.log('✅ Stock actualizado correctamente en la base de datos.');
    res.status(200).json({ message: 'Compra simulada y stock actualizado exitosamente.' });

  } catch (error) {
    await client.query('ROLLBACK'); // Si algo falla, revertimos todos los cambios
    console.error('❌ Error al procesar la compra:', error.message);
    res.status(500).json({ error: 'No se pudo procesar la compra.', details: error.message });
  } finally {
    client.release(); // Liberamos la conexión a la DB
  }
}

module.exports = {
  procesarCompra
};