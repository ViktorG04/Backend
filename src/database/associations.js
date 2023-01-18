import User from "./models/user.js";
import TypeMoney from "./models/typeMoney.js";
import Account from "./models/account.js";
import Categories from "./models/categories.js";
import TypeTransfer from "./models/typeTransfer.js";
import ExpenseIncome from "./models/expenseIncome.js";

const associations = () => {
  User.hasMany(Account, { foreignKey: "idUser" });
  Account.belongsTo(User, { foreignKey: "idUser" });

  TypeMoney.hasOne(Account, { foreignKey: "idTypeMoney" });
  Account.belongsTo(TypeMoney, { foreignKey: "idTypeMoney" });

  Account.hasMany(ExpenseIncome, { foreignKey: "idAccount" });
  ExpenseIncome.belongsTo(Account, { foreignKey: "idAccount" });

  Categories.hasOne(ExpenseIncome, { foreignKey: "idCategory" });
  ExpenseIncome.belongsTo(Categories, { foreignKey: "idCategory" });

  TypeTransfer.hasOne(ExpenseIncome, { foreignKey: "idTypeTransfer" });
  ExpenseIncome.belongsTo(TypeTransfer, { foreignKey: "idTypeTransfer" });
};

export default associations;
