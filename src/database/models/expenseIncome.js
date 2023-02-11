import { DataTypes } from "sequelize";
import database from "../connection.js";

const ExpenseIncome = database.get().define("ExpenseIncome", {
  idReport: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  dateReport: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT(4),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default ExpenseIncome;
