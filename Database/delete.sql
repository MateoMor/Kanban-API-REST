-- Instrucciones para eliminar datos en la base de datos

-- Eliminar la sesión con sesion_id (Tambien elimina las descripciones asociadas)
DELETE FROM sesion WHERE sesion_id = 1;

-- Eliminar la descripción con description_id
DELETE FROM descriptions WHERE description_id = 5;