import { config } from "dotenv";
config();

export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_SERVER = process.env.DB_SERVER || "";
export const DB_DATABASE = process.env.DB_DATABASE || "";
export const DB_PORT = process.env.DB_PORT || "";
export const JWT_KEY = process.env.JWT_KEY || "";
export const PASSWORD_KEY = process.env.PASSWORD_KEY || "";
export const PORT = process.env.PORT || 3000;
