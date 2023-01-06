import bcrypt from "bcryptjs";
import config from "../config/config.js";

const passwordEncrypt = (password = "") => {
  const salt = config.keyPassword;
  return bcrypt.hashSync(password, salt);
};

export default passwordEncrypt;
