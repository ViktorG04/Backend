import { ERROR_SERVER } from "../config/config.js";
import { dateFormat } from "../helpers/utils.js";
import ExpenseIncome from "../database/models/expenseIncome.js";
import Account from "../database/models/account.js";
import TypeTransfer from "../database/models/typeTransfer.js";
import Categories from "../database/models/categories.js";
import TypeMoney from "../database/models/typeMoney.js";

export const getAllReports = async (req, res) => {
  const where = req.where;
  const { idUser } = req.user;

  try {
    const query = await ExpenseIncome.findAll({
      attributes: ["dateReport", "amount", "description"],
      where,
      include: [
        { model: Account, as: "AccountReported", where: { idUser }, include: { model: TypeMoney } },
        { model: TypeTransfer, as: "Type" },
        { model: Categories, as: "Category" },
      ],
    });

    if (!query.length) {
      return res.status(404).json({ message: "No reports" });
    }

    const reports = query.map((row) => {
      const { dateReport, amount, description, AccountReported, Type, Category } = row.dataValues;
      const { bankName, numberAccount, TypeMoney } = AccountReported;
      const symbol = TypeMoney.name;
      const date = dateFormat(dateReport);
      const amountFixed = amount.toFixed(2);
      const category = Category.name;
      const report = Type.name;

      return {
        bankName,
        numberAccount,
        date,
        amount: amountFixed,
        category,
        report,
        description,
        symbol,
      };
    });

    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_SERVER });
  }
};
