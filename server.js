const express = require('express');
const cors = require('cors');
const pool = require('./db.js'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/datos', async (req, res) => {
  try {
    const consulta = 'SELECT * FROM clientes';
    
    const { rows } = await pool.query(consulta);
    
    res.json(rows);
    
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.stack);
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
});

app.post('/api/guardar', async (req, res) => {
  try {
    const { nombre, telefono, correo } = req.body;

    const consulta = `
      INSERT INTO clientes (nombre, telefono, correo) 
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const valores = [nombre, telefono, correo];

    const { rows } = await pool.query(consulta, valores);

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

app.listen(PORT, () => {
  console.log(`¡Servidor backend corriendo en http://localhost:${PORT}`);
});