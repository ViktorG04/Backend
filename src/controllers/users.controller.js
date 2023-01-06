import passwordEncrypt from "../helpers/encryptPassword.js";

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    //select user by id
    res.status(200).json(`user by id ${id}`);
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const createNewUser = async (req, res) => {
  const { password, ...user } = req.body;
  const idState = 1;
  try {
    const encrypted = passwordEncrypt(password);
    const safeUser = { ...user, password: encrypted, idState };
    //insert data
    console.log(safeUser);
    return res.status(201).json({ msg: "register successful" });
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  try {
    const encrypted = passwordEncrypt(newPassword);
    //update db
    res.status(202).json({ msg: "password updated!", newPassword });
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};
