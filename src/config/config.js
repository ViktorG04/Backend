import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbServer: process.env.DB_SERVER || "",
  dbDatabase: process.env.DB_DATABASE || "",
  dbPort: parseInt(process.env.DB_PORT || ""),
  keyJWT: process.env.JWT_KEY || "",
  keyPassword: process.env.PASSWORD_KEY || "",
};
