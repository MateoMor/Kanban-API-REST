import express from "express";
import { PORT } from "./config.js";
import usersRouter from "./routes/users.routes.js";

const app = express();

app.use(usersRouter);

app.use(express.json());

app.listen(PORT, () => console.log("Server running on port", PORT));
