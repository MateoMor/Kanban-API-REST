-- Instrucciones para crear tablas

-- Crear tabla de usuarios
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL, -- El campo debe ser de 50 caracteres o menos
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL
);

-- Crear tabla de categorías
CREATE TABLE sesion (
    sesion_id SERIAL PRIMARY KEY,
    sesion_name VARCHAR(50) NOT NULL, -- El campo debe ser de 50 caracteres o menos
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id) -- Referencia a la clave foranea en user_id
);

-- Crear tabla de tareas
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(50) NOT NULL,
    task_description TEXT NOT NULL,
    user_id INTEGER,
    sesion_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE, -- Clave foránea que referencia a users(user_id)
    FOREIGN KEY (sesion_id) REFERENCES sesion(sesion_id) ON DELETE CASCADE ON UPDATE CASCADE -- Referencia a la clave foránea en sesion_id
);
