import { pool } from "../db.js";

export const getUsers = async (req, res) => {
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
    try {
        const { name, email, password } = req.body;

        const { rows } = await pool.query(
            "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );

        return res.json(rows[0]);
    } catch (error) {
        if (error.code === "23505")
            return res.status(409).json({ message: "email already exists" });

        return res.status(500).json({ message: error.message });
    }
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
