const express = require('express');
const mysql = require('mysql2/promise');  // O usa 'pg' si es PostgreSQL
const app = express();
const port = 3000;
require('dotenv').config();

// Conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware para manejo de JSON
app.use(express.json());
app.use(express.static('public'));

// Ruta para obtener todos los sitios turísticos
app.get('/api/sitios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM SITIO_TURISTICO');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener sitios turísticos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
