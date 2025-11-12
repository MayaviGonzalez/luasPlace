// db.js

const { Pool } = require('pg');

// 1. LOS DATOS DE CONEXIÓN (Deja los que ya te funcionaron)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cafeteriaLuasPlace', // <-- Asegúrate que sea la correcta
  password: 'ornelas2611', // <-- Asegúrate que sea la correcta
  port: 5432,
});

// 2. EXPORTAR EL POOL
// Esto permite que otros archivos importen esta "llave" de conexión
module.exports = pool;