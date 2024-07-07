import { Router } from "express";
import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    login,
} from "../controllers/users.controllers.js";

const router = Router();

router.post("/login", login)

router.post("/register", createUser)

router.post("/logout", (req, res) => {})

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

export default router;
