import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from "../config";
import jwt from "jsonwebtoken";

export const validateCookie = (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies.acces_token;

    req.session = { user: null };
    try {
        const tokenData = jwt.verify(token, SECRET_KEY);
        req.session.user = tokenData;
    } catch {}

    next();
};
