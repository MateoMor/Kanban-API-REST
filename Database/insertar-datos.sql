-- Instrucciones para insertar datos en la base de datos

-- Insertar un valor en la tabla de users
INSERT INTO users (user_name, email, password)
VALUES ('Juan Pérez', 'juan.perez@example.com', 'contrasena123');

-- Insertar un valor en la tabla de sesion
INSERT INTO sesion (sesion_name, user_id)
VALUES ('Sesión 1', 1); -- ("": es el valor, 1: es la clave foranea)

-- Insertar descripción en la tabla de descripciones
INSERT INTO tasks (task_description, sesion_id)
VALUES ('descripción 1', 3);