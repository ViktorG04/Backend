import { dateFormat } from "./utils.js";
import { findMoney, findAccount } from "./consults.js";

export const formatResponseAccount = async (account) => {
  const { idAccount, bankName, numberAccount, available, idTypeMoney, dateExpiration } = account;
  const money = await findMoney(idTypeMoney);
  const date = dateFormat(dateExpiration);
  const availableFixed = +available.toFixed(2);
  return { idAccount, bankName, numberAccount, available: availableFixed, money, date };
};

export const Accounting = async (idAccount, amount, typeAccount) => {

  //1 - parse amount 
  const amountFloat = parseFloat(amount);

  //2 - query account Origin
  const { available, expensive, credit } = await findAccount(idAccount);
  let availableFloat = parseFloat(available);
  let expensiveFloat = parseFloat(expensive);

  //3 - validate the credit available  of the selected account
  if (amountFloat > availableFloat && typeAccount) {
    throw `insufficient credit to transfer, available: ${available}`;
  };

  //4 - logic account Origin
  if (typeAccount) {
    availableFloat -= amountFloat;
    expensiveFloat += amountFloat;
  } else {
    availableFloat += amountFloat;
    expensiveFloat -= amountFloat;
  };

  //5 - validate operation
  const total = Math.abs(availableFloat) + Math.abs(expensiveFloat);
  const totalFixed = +total.toFixed(2);
  if (totalFixed > credit) {
    throw `contact the administrator LIMIT: ${credit}`;
  };

  return { availableFloat, expensiveFloat };
};