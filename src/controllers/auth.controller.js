import bcrypt from "bcryptjs";
import generatorJWT from "../helpers/generator-jwt.js";
import User from "../database/models/user.js";
import { ERROR_SERVER } from "../config/config.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if the user exists by email
    const isRegistered = await User.findOne({ where: { email } });

    if (!isRegistered) {
      return res.status(400).json({
        message: "Email wrong",
      });
    }
    // check if the user is active
    if (!isRegistered.state) {
      return res.state(400).json({
        message: "User disabled",
      });
    }
    //check the password
    const validPassword = bcrypt.compareSync(password, isRegistered.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Password wrong",
      });
    }

    //generate token
    const token = await generatorJWT(isRegistered.idUser);
    //send ok
    const { idUser, name } = isRegistered;

    res.status(202).json({ idUser, name, email, password, token });
  } catch (error) {
    return res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};
