import dateFormat from "./dateFormat.js";
import { findMoney } from "./consults.js";

export const formatResponseAccount = async (account) => {
  const { idAccount, bankName, numberAccount, available, idTypeMoney, dateExpiration } = account;
  const money = await findMoney(idTypeMoney);
  const date = dateFormat(dateExpiration);
  return { idAccount, bankName, numberAccount, available, money, date };
};
