require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productosRoutes = require('./src/routes/productos.js');
const sucursalesRoutes = require('./src/routes/sucursalesRoutes.js'); // <-- 1. IMPORTAMOS LAS NUEVAS RUTAS
const pedidoController = require('./src/controllers/pedidoController.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/productos', productosRoutes);
app.use('/api/sucursales', sucursalesRoutes); // <-- 2. LE DECIMOS A LA APP QUE USE LAS NUEVAS RUTAS
app.post('/api/pago/simular-compra', pedidoController.procesarCompra);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});