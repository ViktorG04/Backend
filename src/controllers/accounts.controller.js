export const getAccountById = async (req, res) => {
  const idAccount = req.params;
  try {
    //query account where IdUser
    const accounts = "";
    if (!accounts) {
      return res.status(404).json({ error: "The user has no accounts" });
    }
    return res.status(200).json({ msg: "response data" });
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
    available: account.limit,
    expensive: 0.0,
    income: 0.0,
  };
  try {
    //format date
    const date = new Date(dateExpiration);

    const safeAccount = { ...account, ...initialValues, date };
    //insert data
    return res.status(201).json(safeAccount);
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
