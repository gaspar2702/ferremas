// app.js

// --- ¡¡¡ESTA DEBE SER LA PRIMERA LÍNEA!!! ---
require('dotenv').config(); 
// ------------------------------------------

const express = require('express');
const pool = require('./config/database'); 
const productosRoutes = require('./src/routes/productos'); 
const transbankController = require('./src/controllers/transbankController'); 
const bcchController = require('./src/controllers/bcchController'); // <-- ¡Añade esta línea!

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Para servir archivos HTML/CSS/JS desde la carpeta 'public'
app.use(express.static('public'));

// Rutas de la API
app.use('/api/productos', productosRoutes);

// Endpoint para iniciar la transacción de Webpay
app.post('/api/webpay/init', transbankController.iniciarPagoWebpay);

// --- ¡FALTABAN ESTAS RUTAS PARA EL RETORNO DE TRANSBANK! ---
// Transbank puede redirigir con GET o POST, es bueno manejar ambos
app.get('/webpay/return', transbankController.confirmarPagoWebpay); 
app.post('/webpay/return', transbankController.confirmarPagoWebpay);
// -----------------------------------------------------------

// Nueva ruta para obtener el valor del dólar
app.get('/api/divisas/dolar', bcchController.obtenerDolarObservado);


// La ruta raíz ahora es manejada por express.static('public') que sirve index.html
// app.get('/', (req, res) => {
//   res.send('¡API de Ferremas en funcionamiento!');
// });


async function iniciarServidor() {
  try {
    // Si tienes una función de conexión a la base de datos que se ejecuta aquí, actívala:
    // await pool.connect(); 

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
      // --- ¡NUEVO CONSOLE.LOG! Para que sepas dónde acceder al formulario de pago
      console.log(`Accede al formulario de pago Transbank en: http://localhost:${PORT}/`);
      // --------------------------------------------------------------------------
      console.log(`API de Productos en: http://localhost:${PORT}/api/productos`);
      console.log(`Endpoint para iniciar pagos Webpay: http://localhost:${PORT}/api/webpay/init (POST)`);
      // --- ¡NUEVO CONSOLE.LOG! Para ver la ruta de retorno
      console.log(`Endpoint de retorno Webpay: http://localhost:${PORT}/webpay/return (GET/POST)`);
      // -----------------------------------------------------
      console.log(`Endpoint para valor del Dólar: http://localhost:${PORT}/api/divisas/dolar (GET)`);
    });

  } catch (err) {
    console.error('Error crítico al iniciar el servidor:', err);
    process.exit(1); 
  }
}

iniciarServidor();