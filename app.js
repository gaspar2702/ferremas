// app.js
const express = require('express');
const pool = require('./config/database'); // Importa la instancia del pool directamente
const productosRoutes = require('./src/routes/productos'); // Importa las rutas de productos

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las solicitudes HTTP
app.use(express.json());

// === Middleware para usar las rutas de productos ===
app.use('/api/productos', productosRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.send('¡API de Ferremas en funcionamiento!');
});

// Función para iniciar el servidor (la conexión al pool ya está activa por el import)
async function iniciarServidor() {
  try {
    // No necesitas llamar a conectarPostgreSQL() aquí, el pool ya está activo por el require
    // Si quieres verificar la conexión explícitamente, puedes hacer un test query
    // await pool.query('SELECT 1'); // Esto podría ser un chequeo de salud si es necesario

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
      console.log(`Accede a la API de Productos en: http://localhost:${PORT}/api/productos`);
    });

  } catch (err) {
    console.error('Error crítico al iniciar el servidor:', err);
    process.exit(1); // Salir de la aplicación si hay un problema al iniciar
  }
}

iniciarServidor();