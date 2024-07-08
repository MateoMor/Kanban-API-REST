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
} from "../controllers/users.controllers.js";

const router = Router();

router.post("/login", login);
router.post("/register", createUser);
router.post("/logout", logout);

router.post("/createSession", createSessionTable);
router.post("/createTask", createTask);

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

export default router;
