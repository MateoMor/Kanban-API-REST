import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../db.js";
import {
    validateUser,
    validateSession,
    validateTask,
} from "../schemas/shemas.js";
import { SALT_ROUNDS, SECRET_KEY } from "../config.js";

export const getUsers = async (req, res) => {
    console.log("Sesión actual:", req.session.user);
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    const { rows } = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
    );

    if (rows.length === 0)
        return res.status(404).json({ message: "user not found" });

    res.json(rows[0]);
};

export const createUser = async (req, res) => {
    const result = await validateUser(req.body); // Se hace la validación
    if (result.error) {
        return res
            .status(422)
            .json({ error: JSON.parse(result.error.message) });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    try {
        const { name, email, password } = req.body;

        const { rows } = await pool.query(
            "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        return res.json(rows[0]);
    } catch (error) {
        if (error.code === "23505")
            return res.status(409).json({ message: "email already exists" });

        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    console.log("Sesión actual:", req.session.user);
    const { email, password } = req.body;
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);

    if (rows.length === 0)
        return res.status(404).json({ message: "user not found" });

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.sendStatus(401);

    const { password: _, ...publicUser } = user; // Le quitamos la propiedad password al objeto del usuario

    const token = jwt.sign(
        { user_id: user.user_id, email: user.email, name: user.user_name },
        SECRET_KEY,
        {
            expiresIn: "3h",
        }
    );

    return res
        .cookie("acces_token", token, {
            httpOnly: true, // Solo se puede acceder a la cookie desde el servidor
            secure: process.env.NODE_ENV === "production", // Solo funiona con https
            sameSite: "strict", // Solo se puede acceder desde el mismo sitio
        })
        .json(publicUser);
};

export const logout = (req, res) => {
    res.clearCookie("acces_token");
    res.sendStatus(204);
};

export const createSessionTable = async (req, res) => {
    const user = req.session.user;
    if (!user) return res.sendStatus(401);

    const result = await validateSession(req.body);
    if (result.error) {
        return res
            .status(422)
            .json({ error: JSON.parse(result.error.message) });
    }

    const { sesion_name } = req.body;

    const { rows } = await pool.query(
        "INSERT INTO sesion (sesion_name, user_id) VALUES ($1, $2) RETURNING *",
        [sesion_name, user.user_id]
    );

    res.json(rows[0]);
};

export const deleteSessionTable = async (req, res) => {
    const user = req.session.user;
    if (!user) return res.sendStatus(401);

    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM sesion WHERE sesion_id = $1",
        [id]
    );

    if (rowCount === 0) return res.sendStatus(404); // No se encontró el recurso

    res.sendStatus(204); // Eliminación exitosa
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM tasks WHERE task_id = $1",
        [id]
    );

    if (rowCount === 0) return res.sendStatus(404); // No se encontró el recurso

    res.sendStatus(204); // Eliminación exitosa
}

export const createTask = async (req, res) => {
    const user = req.session.user;
    console.log("Sesión actual:", req.session.user);
    if (!user) return res.sendStatus(401);

    const result = await validateTask(req.body);
    if (result.error) {
        return res
            .status(422)
            .json({ error: JSON.parse(result.error.message) });
    }

    const { task_name, task_description, sesion_id } = req.body;

    const { rows } = await pool.query(
        "INSERT INTO tasks (task_name, task_description, sesion_id) VALUES ($1, $2, $3) RETURNING *",
        [task_name, task_description, sesion_id]
    );

    res.json(rows[0]);
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM users WHERE user_id = $1",
        [id]
    ); // EL rowCount es la cantidad de filas que pudo eliminar

    if (rowCount === 0)
        return res.status(404).json({ message: "user not found" });

    return res.sendStatus(204);
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const { rows } = await pool.query(
        "UPDATE users SET user_name = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *",
        [data.name, data.email, data.password, id]
    );

    return res.json(rows[0]);
};
