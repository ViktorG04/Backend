import Jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config.js";
import User from "../database/models/user.js";

const validateJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      res.status(401).json({ message: "token not found" });
    }
    const payload = Jwt.verify(token, JWT_KEY);

    //check if the user is registered
    const { id: idUser } = payload;
    const user = await User.findByPk(idUser);

    if (!user) {
      res.status(401).json({ message: "user not found" })
    };

    next();
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: "The token is invalid" });
  }
};

export default validateJWT