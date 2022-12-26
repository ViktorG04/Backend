export const getExpenseIncome = async (req, res) => {};

export const getExpenseIncomeById = async (req, res) => {};

export const createExpenseOrIncome = async (req, res) => {
  const { idAccount, idTransfer, idCategory, amount, date, description } = req.body;

  try {
    //1 - select account by idAccount
    let { available, expensive, income, limit } = idAccount;

    //2 - validate Type Transfer
    if (idTransfer === "expense") {
      available -= amount;
      expensive += amount;
    } else {
      available += amount;
      income += amount;
    }

    //3 - validate that available doesn't exceed its limit
    if (available > limit) {
      return "error";
    }

    //5 - update account
    const accountUpdate = { available, expensive, income, idAccount };

    //6 - format date
    let time = new Date(date);
    time = time.split("/").reverse().join("/");

    //7 - insert expense/income
    const safeTransfer = { idAccount, idTransfer, idCategory, date: time, amount, description };

    res.status(201).json({ safeTransfer });
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};
