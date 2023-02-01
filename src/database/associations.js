import User from "./models/user.js";
import TypeMoney from "./models/typeMoney.js";
import Account from "./models/account.js";
import Categories from "./models/categories.js";
import TypeTransfer from "./models/typeTransfer.js";
import ExpenseIncome from "./models/expenseIncome.js";
import Transfer from "./models/transfer.js";

const associations = () => {
  User.hasMany(Account, { foreignKey: "idUser" });
  Account.belongsTo(User, { foreignKey: "idUser" });

  TypeMoney.hasOne(Account, { foreignKey: "idTypeMoney" });
  Account.belongsTo(TypeMoney, { foreignKey: "idTypeMoney" });

  Categories.hasMany(ExpenseIncome, { foreignKey: "idCategory" });
  ExpenseIncome.belongsTo(Categories, { as: "Category", foreignKey: "idCategory" });

  TypeTransfer.hasMany(ExpenseIncome, { foreignKey: "idTypeTransfer" });
  ExpenseIncome.belongsTo(TypeTransfer, { as: "Type", foreignKey: "idTypeTransfer" });

  Account.hasMany(ExpenseIncome, { foreignKey: "idAccount" });
  ExpenseIncome.belongsTo(Account, { as: "AccountReported", foreignKey: "idAccount" });

  Account.hasMany(Transfer, { foreignKey: "idAccountOrigin" });
  Transfer.belongsTo(Account, { as: "AccountOrigin", foreignKey: "idAccountOrigin" });

  Account.hasMany(Transfer, { foreignKey: "idAccountDestiny" });
  Transfer.belongsTo(Account, { as: "AccountDestiny", foreignKey: "idAccountDestiny" });
};

export default associations;
