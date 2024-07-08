import z from "zod";

const userSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(50),
    password: z.string(), // Puedes agregar más restricciones al password si es necesario
});

const sessionSchema = z.object({
    sesion_name: z.string().max(50),
});

export const validateUser = (user) => {
    return userSchema.safeParseAsync(user);
};

export const validateSession = (session) => {
    return sessionSchema.safeParseAsync(session);
}