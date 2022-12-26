import bcrypt from "bcryptjs";
import config from "../config/config.js";

const passwordEncrypt = (password = "") => {
  return bcrypt.hashSync(password, config.keyPassword);
};

export default passwordEncrypt;
