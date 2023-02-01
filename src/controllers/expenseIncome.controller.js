import Account from "../database/models/account.js";
import ExpenseIncome from "../database/models/expenseIncome.js";
import { findAccount } from "../helpers/consults.js";
import { ERROR_SERVER, EXPENSIVE_SELECTED, INCOME_SELECTED } from "../config/config.js";

export const createExpenseOrIncome = async (req, res) => {
  const { idAccount, idTypeTransfer, idCategory, amount, date, description } = req.body;
  const money = parseFloat(amount);
  try {
    //1 - select account by idAccount
    const { available, expensive, credit } = await findAccount(idAccount);
    let availableFloat = parseFloat(available);
    let expensiveFloat = parseFloat(expensive);

    //2 - validate Type Transfer
    if (!expensive && idTypeTransfer == INCOME_SELECTED) {
      return res.status(401).json({ message: "Cannot add more credit" });
    }

    //3 - validate the credit available to report expense
    if (available < money && idTypeTransfer == EXPENSIVE_SELECTED) {
      return res.status(401).json({ message: "Insufficient credit to add an expensive" });
    }

    //4 - make logic process in the account
    if (idTypeTransfer == EXPENSIVE_SELECTED) {
      availableFloat -= money;
      expensiveFloat += money;
    } else {
      availableFloat += money;
      expensiveFloat -= money;
    }

    //5 - validate that available doesn't exceed its limit
    const total = Math.abs(availableFloat) + Math.abs(expensiveFloat);
    const totalFixed = +total.toFixed(2);
    if (totalFixed > credit) {
      return res.status(401).json({ message: `No more credit can be added to the designated limit: ${credit}` });
    }

    const safeTransfer = {
      dateReport: date,
      amount: money,
      description,
      idAccount,
      idTypeTransfer,
      idCategory,
    };

    //6 - insert expense/income and update account
    await Promise.all([
      Account.update({ "available": availableFloat, "expensive": expensiveFloat }, { where: { idAccount } }),
      ExpenseIncome.build(safeTransfer).save(),
    ]);

    res.status(201).json({ message: "save report" });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};
