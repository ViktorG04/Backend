import { ERROR_SERVER } from "../config/config.js";
import { passwordEncrypt } from "../helpers/utils.js";
import User from "../database/models/user.js";


export const createNewUser = async (req, res) => {
  const { password, ...user } = req.body;
  const STATE = true;
  try {
    const encrypted = passwordEncrypt(password);
    const safeUser = { "state": STATE, password: encrypted, ...user };
    await User.build(safeUser).save();
    res.status(201).json("User registered");
  } catch (error) {
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};

export const updateUserById = async (req, res) => {
  const { id: idUser } = req.params;
  const { newPassword } = req.body;
  try {
    const encrypted = passwordEncrypt(newPassword);
    await User.update({ password: encrypted }, { where: { idUser } });
    res.status(202).json({ message: "password updated!", newPassword });
  } catch (error) {
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};
