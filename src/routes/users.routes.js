import { Router } from "express";
import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    login,
    logout,
    createSessionTable,
    createTask,
    deleteSessionTable,
    deleteTask,
} from "../controllers/users.controllers.js";

const router = Router();

/* Metodos de autenticación */
router.post("/login", login);
router.post("/register", createUser);
router.post("/logout", logout);

/* Metodos de creacion */
router.post("/createSession", createSessionTable);
router.post("/createTask", createTask);

/* Métodos de borrado */
router.delete("/deleteSession/:id", deleteSessionTable);
router.delete("/deleteTask/:id", deleteTask);

/* Métodos que pueden ser utiles más tarde */
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

export default router;
