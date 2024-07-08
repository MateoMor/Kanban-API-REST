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
    updateSessionTable,
    updateTask,
    moveTask,
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

/* Metodos de actualización */
router.patch("/updateSession/:id", updateSessionTable );
router.patch("/updateTask/:id", updateTask);

/* Metódo para mover un task de una sesión a otra */
router.patch("/moveTask/:id", moveTask);

/* Métodos que pueden ser utiles más tarde */
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

export default router;
