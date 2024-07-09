import z from "zod";

const userSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(50),
    password: z.string(), // Puedes agregar más restricciones al password si es necesario
});

export const validateUser = (user: any) => {
    return userSchema.safeParseAsync(user);
};

const sessionSchema = z.object({
    sesion_name: z.string().max(50),
});

export const validateSession = (session: any) => {
    return sessionSchema.safeParseAsync(session);
};

const taskSchema = z.object({
    task_name: z.string().max(50),
    task_description: z.string(),
    sesion_id: z.number(),
});

export const validateTask = (task: any) => {
    return taskSchema.safeParseAsync(task);
};
