const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware para manejo de JSON y archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener todos los lugares turísticos
app.get('/api/places', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM TouristPlaces');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener lugares:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para agregar un nuevo lugar turístico
app.post('/api/places', async (req, res) => {
  const { name, image_url, description, address } = req.body;
  if (!name || !description || !address) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO TouristPlaces (name, image_url, description, address) VALUES (?, ?, ?, ?)',
      [name, image_url, description, address]
    );
    res.json({ id: result.insertId, name, image_url, description, address });
  } catch (error) {
    console.error('Error al agregar lugar:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
