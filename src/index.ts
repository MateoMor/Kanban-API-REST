import express from "express";
import { PORT } from "./config";
import usersRouter from "./routes/users.routes";
import { validateCookie } from "./controllers/middlewares";
import morgan from "morgan"; // Sirve para ver mensajes por consola el pedido a la base de datos
import cookieParser from "cookie-parser"; // Para trabajar con cookies

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Middleware para comprobat si la sesión esta iniciada
app.use(validateCookie);

app.use(usersRouter);

app.listen(PORT, () => console.log("Server running on port", PORT));
