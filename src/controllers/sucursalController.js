const pool = require('../../config/database');

async function getAllSucursales(req, res) {
  try {
    const result = await pool.query('SELECT sucursalid, nombresucursal FROM sucursales ORDER BY sucursalid');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener las sucursales:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

module.exports = {
  getAllSucursales,
};