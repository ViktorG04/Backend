import Jwt from "jsonwebtoken";
import User from "../database/models/user.js";
import { JWT_KEY } from "../config/config.js";

const validateJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "token not found" });
    }
    const payload = Jwt.verify(token, JWT_KEY);

    //check if the user is registered
    const { id: idUser } = payload;
    const user = await User.findByPk(idUser);

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "The token is invalid" });
  }
};

export default validateJWT;
