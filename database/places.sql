CREATE DATABASE IF NOT EXISTS TouristDB;

USE TouristDB;

-- Tabla de Usuarios
CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    foto_perfil VARCHAR(255),
    activo BOOLEAN DEFAULT true,
    UNIQUE KEY unique_email (email)
);

-- Tabla de Lugares Turísticos
CREATE TABLE TouristPlaces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    description TEXT,
    address VARCHAR(150),
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Usuario(id)
);

-- Datos de ejemplo para lugares turísticos
INSERT INTO TouristPlaces (name, image_url, description, address) VALUES 
('Parque Explora', 'https://c8.alamy.com/comp/HMDA91/parque-explora-explore-park-interactive-science-museum-medellin-antioquia-HMDA91.jpg', 'Centro interactivo de ciencia y tecnología.', 'Cl. 52 #73-75, Medellín'),
('Pueblito Paisa', 'https://i.pinimg.com/originals/f4/d2/9e/f4d29e293a9d29874bf7e16128d62d3d.jpg', 'Representación de un típico pueblo antioqueño.', 'Cerro Nutibara, Medellín');


INSERT INTO usuarios (nombre, email, password) VALUES 
('Administrador', 'admin@lugares.com','$2a$10$zOqBTgbXFtbBX.KE1amYWu1iR3Guqg6sFOPESEkIpgt406imL67jO',TRUE,30),
('Carlos', 'mesacarloste@gmail.com','$2a$10$IxcsAvm0vIUXw9/UU3s1DeIoGpQkO0LI/7vRiDtNlHPmnFOAS76Iq',FALSE,22);