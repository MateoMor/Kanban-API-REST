import {Router} from "express";

const router = Router();

router.get("/users", (req, res) => {
    res.send("obteniendo ususarios");
});

router.get("/users/:id", (req, res) => {
    const {id} = req.params
    res.send("obteniendo ususario" + id);
});

router.post("/users", (req, res) => {
    res.send("creando usuario");
});

router.delete("/users/:id", (req, res) => {
    res.send("Eliminando ususario");
});

router.put("/users/:id", (req, res) => {
    const {id} = req.params
    res.send("actualizadno ususario" + id);
});

export default router;