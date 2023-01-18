import TypeMoney from "../database/models/typeMoney.js";
import Account from "../database/models/account.js";
export const findMoney = async (idTypeMoney) => {
  const typeMoney = await TypeMoney.findOne({ where: { idTypeMoney } });
  return typeMoney.dataValues.name;
};

export const findAccount = async (idAccount) => {
  const account = await Account.findOne({
    where: { idAccount },
    attributes: ["available", "expensive", "income", ["credit", "limit"]],
  });
  return account;
};
