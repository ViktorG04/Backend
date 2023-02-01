import { ERROR_SERVER } from "../config/config.js";
import ExpenseIncome from "../database/models/ExpenseIncome.js";
import { findAccount, findCategories, findTypeTransfer } from "../helpers/consults.js";
import { dateFormat } from "../helpers/utils.js";

export const getAllReports = async (req, res) => {
  const where = req.where;
  console.log(where)
  try {
    const query = await ExpenseIncome.findAll({
      where: where,
      attributes: [
        "dateReport",
        "amount",
        "description",
        "idTypeTransfer",
        "idCategory",
        "idAccount"
      ],
    });

    if (!query.length) {
      return res.status(404).json({ message: "No reports on the requested date" });
    };

    const reports = query.map(async (row) => {
      const { dateReport, amount, description, idCategory, idTypeTransfer, idAccount } = row.dataValues;
      const date = dateFormat(dateReport);
      const amountFixed = +amount.toFixed(2);
      const category = await findCategories(idCategory);
      const report = await findTypeTransfer(idTypeTransfer);
      const { bankName, numberAccount } = await findAccount(idAccount);
      return { bankName, numberAccount, date, "amount": amountFixed, category, report, description };
    });
    const promise = await Promise.all(reports);
    res.status(200).json(promise)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_SERVER });
  };
};