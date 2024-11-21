const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
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

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura');
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

// Ruta raíz que sirve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de registro
app.post('/api/auth/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const [users] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Hash del password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar nuevo usuario
        const [result] = await pool.query(
            'INSERT INTO Usuario (nombre, email, password_hash, fecha_registro, activo) VALUES (?, ?, ?, NOW(), true)',
            [nombre, email, hashedPassword]
        );

        // Crear token
        const token = jwt.sign(
            { id: result.insertId, email }, 
            process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura', 
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Usuario registrado exitosamente', token });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta de login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura',
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta protegida para obtener lugares turísticos
app.get('/api/places', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM TouristPlaces');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener lugares:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta protegida para agregar lugar turístico
app.post('/api/places', authenticateToken, async (req, res) => {
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

// Ruta de logout
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout exitoso' });
});

// Manejador de errores 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});