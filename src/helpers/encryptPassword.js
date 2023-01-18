import bcrypt from "bcryptjs";
import { PASSWORD_KEY } from "../config/config.js";

const passwordEncrypt = (password = "") => {
  const salt = PASSWORD_KEY;
  return bcrypt.hashSync(password, salt);
};

export default passwordEncrypt;
