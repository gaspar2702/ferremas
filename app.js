require('dotenv').config(); 
    
const express = require('express');
const cors = require('cors');

const productosRoutes = require('./src/routes/productos.js');
// Asegúrate de que el nombre del archivo coincida con el que tienes en tu carpeta controllers
const pedidoController = require('./src/controllers/pedidoController.js'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/productos', productosRoutes);

// --- RUTA PARA SIMULAR LA COMPRA ---
app.post('/api/pago/simular-compra', pedidoController.procesarCompra);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});