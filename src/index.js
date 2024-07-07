import express from "express";
import { PORT } from "./config.js";
import usersRouter from "./routes/users.routes.js";
import morgan from "morgan" // Sirve para ver mensajes por consola el pedido a la base de datos

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(usersRouter);

app.listen(PORT, () => console.log("Server running on port", PORT));
