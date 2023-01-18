import User from "../database/models/user.js";
import passwordEncrypt from "../helpers/encryptPassword.js";

export const createNewUser = async (req, res) => {
  const { password, ...user } = req.body;
  const state = true;
  try {
    const encrypted = passwordEncrypt(password);
    const safeUser = { state, password: encrypted, ...user };
    await User.build(safeUser).save();
    res.status(201).json("User registered");
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
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
      msg: "contact the administrator",
    });
  }
};
