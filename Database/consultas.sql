-- Instrucciones para consultar datos en la base de datos

-- Consultar las sesiones de un usuario
SELECT sesion.sesion_id, sesion.sesion_name, users.user_name
FROM sesion
JOIN users ON sesion.user_id = users.user_id
WHERE users.user_id = 1; -- Variar el usuario

-- Consultar las descripciones de una sesión
SELECT tasks.task_id, tasks.description, sesion.sesion_name
FROM tasks
JOIN sesion ON tasks.sesion_id = sesion.sesion_id
WHERE sesion.sesion_id = 1; -- Variar número de sesión
