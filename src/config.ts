import dotenv from 'dotenv';

dotenv.config();

export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_HOST: string | undefined = process.env.DB_HOST;
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
export const DB_DATABASE: string | undefined = process.env.DB_DATABASE;
export const DB_PORT: string | any = process.env.DB_PORT;

export const PORT: string | number = process.env.PORT ? parseInt(process.env.PORT) : 4000;

export const SALT_ROUNDS: number = 10;

export const SECRET_KEY: string | any = process.env.SECRET_KEY;
