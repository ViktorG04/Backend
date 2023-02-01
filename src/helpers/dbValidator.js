import User from "../database/models/user.js";
import Account from "../database/models/account.js";
import TypeMoney from "../database/models/typeMoney.js";
import Categories from "../database/models/categories.js";
import TypeTransfer from "../database/models/typeTransfer.js";

//validate id user
export const validateIdUser = async (idUser = "") => {
  const userData = await User.findByPk(idUser);
  if (!userData) {
    throw new Error(`User don't registered ${idUser}`);
  }
};

//validate email
export const emailIsRegister = async (email = "") => {
  const isEmail = await User.findOne({ where: { email } });
  if (isEmail) {
    throw new Error(`email ${email} already exists`);
  }
};

//validate TypeMoney
export const validateIdMoney = async (idTypeMoney = "") => {
  const isValidateMoney = await TypeMoney.findByPk(idTypeMoney);
  if (!isValidateMoney) {
    throw new Error(`TypeMoney is invalid`);
  }
};

//validate TypeCategory
export const validateIdCategory = async (idCategory = "") => {
  const isCategory = await Categories.findByPk(idCategory);
  if (!isCategory) {
    throw new Error(`Category is invalid`);
  }
};

//validate account
export const validateIdAccount = async (idAccount = "") => {
  const isAccount = await Account.findByPk(idAccount);
  if (!isAccount) {
    throw new Error(`IdAccount is invalid`);
  }
};

//validate TypeTransfer
export const validateIdTypeTransfer = async (idTypeTransfer = "") => {
  const isTransfer = await TypeTransfer.findByPk(idTypeTransfer);
  if (!isTransfer) {
    throw new Error(`TypeTransfer is invalid`);
  }
};
