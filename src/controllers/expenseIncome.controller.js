import Account from "../database/models/account.js";
import ExpenseIncome from "../database/models/expenseIncome.js";
import { findAccount } from "../helpers/consults.js";

export const getExpenseIncome = async (req, res) => {};

export const getExpenseIncomeById = async (req, res) => {};

export const createExpenseOrIncome = async (req, res) => {
  const { idAccount, idTypeTransfer, idCategory, amount, date, description } = req.body;
  const money = parseFloat(amount);
  try {
    //1 - select account by idAccount
    let { available, expensive, income, limit } = await findAccount(idAccount);

    //2 - validate Type Transfer
    if (!available && idTypeTransfer == "2") {
      return res.status(401).json({ message: "Cannot add more credit" });
    }

    if (idTypeTransfer == "1") {
      available -= money;
      expensive += money;
    } else {
      available += money;
      income += money;
    }

    //3 - validate that available doesn't exceed its limit
    if (available > limit) {
      return res.status(500).json({ message: "contact the administrator - available > limit" });
    }

    const safeTransfer = {
      dateReport: date,
      amount: money,
      description,
      idAccount,
      idTypeTransfer,
      idCategory,
    };

    //4 - insert expense/income and update account
    await Promise.all([
      Account.update({ available, expensive, income }, { where: { idAccount } }),
      ExpenseIncome.build(safeTransfer).save(),
    ]);

    res.status(201).json({ message: "save report" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "contact the administrator",
    });
  }
};
