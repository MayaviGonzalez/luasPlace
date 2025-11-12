// server.js

// 1. Importar los paquetes
const express = require('express');
const cors = require('cors');
// Importamos la "llave" de conexión (el pool) que creamos en db.js
const pool = require('./db.js'); 

// 2. Configuración inicial
const app = express();
const PORT = 3000; // El puerto donde se ejecutará tu backend

// 3. Middlewares
app.use(cors()); // ¡Crucial! Permite que tu frontend haga peticiones
app.use(express.json()); // Permite al servidor entender datos en formato JSON

// 4. CREAR EL ENDPOINT (La "Ruta") PARA LEER DATOS
// Cuando tu frontend llame a 'http://localhost:3000/api/datos', se ejecutará esto
app.get('/api/datos', async (req, res) => {
  try {
    // ¡Aquí pones tu consulta SQL!
    // Cambia "tu_tabla" por el nombre real de tu tabla
    const consulta = 'SELECT * FROM clientes';
    
    const { rows } = await pool.query(consulta);
    
    // Si todo sale bien, enviamos los datos (rows) como un JSON
    res.json(rows);
    
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.stack);
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
});

// ==========================================================
// 4b. RUTA PARA GUARDAR DATOS (¡CORREGIDA!)
// ==========================================================
app.post('/api/guardar', async (req, res) => {
  try {
    // 1. Obtenemos los 3 campos del frontend
    // ¡Asegúrate que coincidan!
    const { nombre, telefono, correo } = req.body;

    // 2. La consulta SQL CORREGIDA
    // Asegúrate que el nombre de la tabla ('clientes') sea correcto
    // Y que los nombres de las columnas (nombre, telefono, correo) sean correctos
    const consulta = `
      INSERT INTO clientes (nombre, telefono, correo) 
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    // 3. Los valores en el orden correcto
    const valores = [nombre, telefono, correo];

    // 4. Ejecutamos
    const { rows } = await pool.query(consulta, valores);

    // 5. Respondemos al frontend
    console.log("Dato insertado:", rows[0]);
    res.status(201).json({ 
      message: '¡Datos guardados exitosamente!',
      data: rows[0] 
    });

  } catch (error) {
    console.error('Error al guardar los datos:', error.stack);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

// 5. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`¡Servidor backend corriendo en http://localhost:${PORT}`);
});