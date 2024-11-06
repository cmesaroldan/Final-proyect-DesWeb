CREATE DATABASE IF NOT EXISTS TouristDB;

USE TouristDB;

CREATE TABLE TouristPlaces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),  -- URL de la imagen del sitio
    description TEXT,
    address VARCHAR(150)
);

-- Datos de ejemplo
INSERT INTO TouristPlaces (name, image_url, description, address) VALUES 
('Parque Explora', 'https://example.com/parque_explora.jpg', 'Centro interactivo de ciencia y tecnología.', 'Cl. 52 #73-75, Medellín'),
('Pueblito Paisa', 'https://example.com/pueblito_paisa.jpg', 'Representación de un típico pueblo antioqueño.', 'Cerro Nutibara, Medellín');
