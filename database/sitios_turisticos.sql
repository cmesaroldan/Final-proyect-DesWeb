-- Base de datos: Sitios Turísticos del Valle de Aburrá

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sitios_turisticos_aburra;

USE sitios_turisticos_aburra;

-- Tabla USUARIO
CREATE TABLE USUARIO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    foto_perfil VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla CATEGORIA
CREATE TABLE CATEGORIA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla UBICACION
CREATE TABLE UBICACION (
    id INT PRIMARY KEY AUTO_INCREMENT,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    como_llegar TEXT
);

-- Tabla SITIO_TURISTICO
CREATE TABLE SITIO_TURISTICO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    horario VARCHAR(100),
    calificacion_promedio FLOAT DEFAULT 0,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    categoria_id INT,
    ubicacion_id INT,
    FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(id),
    FOREIGN KEY (ubicacion_id) REFERENCES UBICACION(id)
);

-- Tabla FAVORITO
CREATE TABLE FAVORITO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    sitio_turistico_id INT,
    fecha_marcado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(id),
    FOREIGN KEY (sitio_turistico_id) REFERENCES SITIO_TURISTICO(id)
);

-- Tabla RESENA
CREATE TABLE RESENA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    sitio_turistico_id INT,
    calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(id),
    FOREIGN KEY (sitio_turistico_id) REFERENCES SITIO_TURISTICO(id)
);

-- Tabla IMAGEN
CREATE TABLE IMAGEN (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sitio_turistico_id INT,
    url VARCHAR(255) NOT NULL,
    descripcion TEXT,
    principal BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sitio_turistico_id) REFERENCES SITIO_TURISTICO(id)
);

-- Consultas de prueba
-- INSERT INTO CATEGORIA(nombre, descripcion) VALUES ('Montañas', 'Lugares de interés con vistas panorámicas');
-- INSERT INTO USUARIO(nombre, email, password_hash) VALUES ('Juan Pérez', 'juanp@example.com', 'hashed_password');
