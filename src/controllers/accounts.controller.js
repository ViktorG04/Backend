import Account from "../database/models/account.js";
import TypeMoney from "../database/models/typeMoney.js";
import { formatResponseAccount } from "../helpers/accounting.js";
import { nameCapitalize } from "../helpers/capitalize.js";
import dateFormat from "../helpers/dateFormat.js";

export const getAccounts = async (req, res) => {
  const { id: idAccount } = req.body;
  try {
    const accounts = await Account.findAll({});
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const getAllAccountsById = async (req, res) => {
  const { id: idUser } = req.params;
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
        dateExpiration,
        TypeMoney,
      } = account;
      const date = dateFormat(dateExpiration);
      const money = TypeMoney.name;
      return { idAccount, bankName, numberAccount, available, expensive, date, money };
    });

    res.status(200).json(Accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const getAccountById = async (req, res) => {
  const { id: idAccount } = req.params;
  try {
    const account = await Account.findOne({
      where: { idAccount },
      attributes: [
        "bankName",
        "numberAccount",
        "credit",
        "available",
        "expensive",
        "income",
        "state",
      ],
    });

    if (!account) {
      return res.status(400).json({ message: "IdAccount is invalid" });
    }

    const incomes = {};
    const expensive = {};
    const transfer = {};

    res.status(200).json({ account, incomes, expensive, transfer });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "contact the administrator",
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
    income: 0.0,
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
      msg: "contact the administrator",
    });
  }
};

export const pathAccount = async (req, res) => {
  const { id: idAccount } = req.params;
  const state = false;
  try {
    await Account.update({ state }, { where: { idAccount } });
    res.status(202).json({ message: "Updated account status" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};
