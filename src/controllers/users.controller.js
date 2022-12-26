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
    return res.status(201).json(safeUser);
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const encrypted = passwordEncrypt(password);
    const request = `user updated ${id} password: ${encrypted}`;
    //update db
    res.status(202).json(request);
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};
