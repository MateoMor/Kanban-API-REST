import z from "zod";

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export const validateUser = (user) => {
    return userSchema.safeParseAsync(user);
};