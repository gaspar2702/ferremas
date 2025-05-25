// config/database.js
const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false 
  }
});

pool.on('connect', () => {
  console.log('Conexión a PostgreSQL establecida correctamente.');
});

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de la base de datos', err);
  process.exit(-1); 
});


module.exports = pool;