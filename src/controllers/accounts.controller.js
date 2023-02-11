import { Op } from "sequelize";
import { ERROR_SERVER, EXPENSIVE_SELECTED, INCOME_SELECTED } from "../config/config.js";
import { formatResponseAccount } from "../helpers/accounting.js";
import { nameCapitalize, dateFormat, total, creditDebitTransfer } from "../helpers/utils.js";
import {
  findExpenseIncome,
  findMadeTransfers,
  findReceivedTransfers,
} from "../helpers/consults.js";
import Account from "../database/models/account.js";
import TypeMoney from "../database/models/typeMoney.js";

export const getAccounts = async (req, res) => {
  const { idUser } = req.params;
  try {
    const query = await Account.findAll({
      where: { idUser: { [Op.ne]: idUser } },
      include: TypeMoney,
    });

    const accounts = query.map((account) => {
      const { idAccount, bankName, numberAccount, available, TypeMoney } = account.dataValues;
      const money = TypeMoney.name;
      return { idAccount, bankName, numberAccount, available, money };
    });

    res.status(200).json(accounts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};

export const getAllAccountsById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const query = await Account.findAll({
      where: { idUser, state: true },
      include: TypeMoney,
    });

    if (!query.length) {
      return res.status(404).json({ message: "The user has no accounts" });
    }

    const Accounts = query.map((account) => {
      const {
        idAccount,
        bankName,
        numberAccount,
        available,
        expensive,
        credit,
        dateExpiration,
        TypeMoney,
      } = account;
      const date = dateFormat(dateExpiration);
      const money = TypeMoney.name;
      const availableFixed = +available.toFixed(2);
      const expensiveFixed = +expensive.toFixed(2);
      const creditFixed = +credit.toFixed(2);

      return {
        idAccount,
        bankName,
        numberAccount,
        available: availableFixed,
        expensive: expensiveFixed,
        credit: creditFixed,
        date,
        money,
      };
    });

    res.status(200).json(Accounts);
  } catch (error) {
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};

export const getAccountById = async (req, res) => {
  const { idAccount } = req.params;
  try {
    const [expensive, incomes, transferReceived, madeTransfers] = await Promise.all([
      findExpenseIncome(idAccount, EXPENSIVE_SELECTED),
      findExpenseIncome(idAccount, INCOME_SELECTED),
      findReceivedTransfers(idAccount),
      findMadeTransfers(idAccount),
    ]);

    const totalExpensive = total([...expensive, ...madeTransfers]);
    const totalIncomes = total([...incomes, ...transferReceived]);

    const { all: allExpensive, transformTransfer: debitTransfers } = creditDebitTransfer(
      totalExpensive,
      madeTransfers
    );

    const { all: allIncomes, transformTransfer: creditsTransfers } = creditDebitTransfer(
      totalIncomes,
      transferReceived
    );

    const debits = [...expensive, ...debitTransfers];

    const credits = [...incomes, ...creditsTransfers];

    res.status(200).json({ allExpensive, allIncomes, debits, credits });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};

export const createAccount = async (req, res) => {
  const { bankName, credit, dateExpiration, idTypeMoney, idUser, numberAccount } = req.body;

  const formatName = nameCapitalize(bankName);
  const money = parseFloat(credit);

  const data = {
    bankName: formatName,
    numberAccount,
    credit: money,
    available: money,
    expensive: 0.0,
    dateExpiration,
    idTypeMoney,
    idUser,
    state: true,
  };
  try {
    const query = await Account.build(data).save();
    const account = await formatResponseAccount(query.dataValues);
    res.status(201).json({ message: "account created", account });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};

export const pathAccount = async (req, res) => {
  const { idAccount } = req.params;
  const STATE = false;
  try {
    await Account.update({ state: STATE }, { where: { idAccount } });
    res.status(202).json({ message: "Account Deleted", idAccount });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};
