import express from "express";
import { PORT, SECRET_KEY } from "./config.js";
import usersRouter from "./routes/users.routes.js";
import morgan from "morgan"; // Sirve para ver mensajes por consola el pedido a la base de datos
import cookieParser from "cookie-parser"; // Para trabajar con cookies
import jwt from "jsonwebtoken";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Middleware para comprobat si la sesión esta iniciada
app.use((req, res, next) => {
    const token = req.cookies.acces_token;

    req.session = { user: null };
    try {
        const tokenData = jwt.verify(token, SECRET_KEY);
        req.session.user = tokenData;
    } catch {}

    next();
});

app.use(usersRouter);

app.listen(PORT, () => console.log("Server running on port", PORT));
