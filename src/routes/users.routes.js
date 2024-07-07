import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/users", async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
});

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    const { rows } = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
    );

    if (rows.length === 0)
        return res.status(404).json({ message: "user not found" });

    res.json(rows[0]);
});

router.post("/users", async (req, res) => {
    const { name, email, password } = req.body;

    const { rows } = await pool.query(
        "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password]
    );

    return res.json(rows[0]);
});

router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM users WHERE user_id = $1",
        [id]
    ); // EL rowCount es la cantidad de filas que pudo eliminar

    if (rowCount === 0)
        return res.status(404).json({ message: "user not found" });

    return res.sendStatus(204);
});

router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const { rows } = await pool.query(
        "UPDATE users SET user_name = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *",
        [data.name, data.email, data.password, id]
    );

    return res.json(rows[0]);
});

export default router;
