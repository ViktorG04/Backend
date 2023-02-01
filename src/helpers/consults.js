import { dateFormat } from "./utils.js";
import TypeMoney from "../database/models/typeMoney.js";
import TypeTransfer from "../database/models/typeTransfer.js";
import Account from "../database/models/account.js";
import Categories from "../database/models/categories.js";
import ExpenseIncome from "../database/models/ExpenseIncome.js";
import Transfer from "../database/models/transfer.js";

export const findMoney = async (idTypeMoney) => {
  const typeMoney = await TypeMoney.findByPk(idTypeMoney)
  return typeMoney.dataValues.name;
};

export const findTypeTransfer = async (idTypeTransfer) => {
  const typeTransfer = await TypeTransfer.findByPk(idTypeTransfer);
  return typeTransfer.dataValues.name;
};

export const findCategories = async (idCategory) => {
  const category = await Categories.findOne({ where: { idCategory } });
  return category.dataValues.name;
};

export const findAccount = async (idAccount) => {
  const account = await Account.findOne({ where: { idAccount }, include: TypeMoney });

  const { bankName, numberAccount, credit, available, expensive, state, ...data } = account.dataValues;
  const typeMoney = data.TypeMoney.name;
  const creditFixed = +credit.toFixed(2);
  const expensiveFixed = +expensive.toFixed(2);
  const availableFixed = +available.toFixed(2);
  return {
    bankName,
    numberAccount,
    "credit": creditFixed,
    "available": availableFixed,
    "expensive": expensiveFixed,
    state,
    typeMoney
  };
};

export const findExpenseIncome = async (idAccount = "", idTypeTransfer = "") => {

  const query = await ExpenseIncome.findAll({
    where: { idAccount, idTypeTransfer },
    attributes: [
      "dateReport",
      "amount",
      "description",
      "idCategory",
    ],
  });

  const reports = query.map(async (report) => {
    const { dateReport, amount, description, idCategory } = report.dataValues;
    const date = dateFormat(dateReport);
    const amountFixed = +amount.toFixed(2);
    const category = await findCategories(idCategory);
    return { date, "amount": amountFixed, category, description };
  });
  const promise = Promise.all(reports);
  return promise;
};


export const findReceivedTransfers = async (idAccount = "") => {
  const query = await Transfer.findAll({
    where: { "idAccountDestiny": idAccount },
    include: [{ model: Account, as: 'AccountOrigin' }]
  });

  const transfers = query.map((transfer) => {
    const { dateReport, amountDestiny, description, AccountOrigin } = transfer.dataValues;
    const { bankName, numberAccount } = AccountOrigin;
    const date = dateFormat(dateReport);
    const amount = +amountDestiny.toFixed(2);
    return { date, amount, description, bankName, numberAccount };
  })

  return transfers;
};

export const findMadeTransfers = async (idAccount = "") => {
  const query = await Transfer.findAll({ where: { "idAccountOrigin": idAccount }, include: [{ model: Account, as: "AccountDestiny" }] })

  const transfers = query.map((transfer) => {
    const { dateReport, amountOrigin, amountDestiny, taxes, description, AccountDestiny } = transfer.dataValues;
    const { bankName, numberAccount } = AccountDestiny;
    const date = dateFormat(dateReport);
    const amount = +amountOrigin.toFixed(2);
    const pTaxes = +taxes.toFixed(2);
    const amountDestinyFixed = +amountDestiny.toFixed(2);

    return { date, amount, "amountDestiny": amountDestinyFixed, exchange: pTaxes, description, bankName, numberAccount }
  });

  return transfers;
};