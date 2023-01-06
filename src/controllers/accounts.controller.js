import { accounts as data } from "../data.js";

export const getAccounts = async (req, res) => {
  try {
    const accounts = data;
    return res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const getAccountById = async (req, res) => {
  const id = req.params;
  console.log(id);
  try {
    //query account where IdUser
    const accounts = data;
    if (!accounts) {
      return res.status(204).json({ msg: "The user has no accounts" });
    }

    return res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const createAccount = async (req, res) => {
  const { dateExpiration, ...account } = req.body;

  const initialValues = {
    idState: 1,
    available: account.credit,
    expensive: 0.0,
    income: 0.0,
  };
  try {
    //format date
    const date = new Date(dateExpiration);

    const safeAccount = { ...account, ...initialValues, date };
    //insert data
    data.push(safeAccount);
    return res.status(201).json({ msg: "account created", account: safeAccount });
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const updateAccount = async (req, res) => {};

export const pathAccount = async (req, res) => {
  const idAccount = req.params;
  const { idState } = req.body;
  try {
    //query update
    const updateAccount = { idAccount, idState };

    res.status(202).json({ msj: "Updated account status" });
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};
