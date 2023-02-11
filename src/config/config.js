import { config } from "dotenv";
config();

export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_SERVER = process.env.DB_SERVER || "";
export const DB_DATABASE = process.env.DB_DATABASE || "";
export const DB_PORT = process.env.DB_PORT || "";
export const DB_SCHEMA = process.env.DB_SCHEMA || "";
export const JWT_KEY = process.env.JWT_KEY || "";
export const PASSWORD_KEY = process.env.PASSWORD_KEY || "";
export const PORT = process.env.PORT || 5000;
export const KEY_FIXER = process.env.KEY_FIXER || "";
export const API_FIXER = process.env.API_FIXER || "";
export const EXPENSIVE_SELECTED = "1";
export const INCOME_SELECTED = "2";
export const ERROR_SERVER = "contact the administrator";
