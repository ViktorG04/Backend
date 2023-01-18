import { DataTypes } from "sequelize";
import { DB_DATABASE } from "../../config/config.js";
import database from "../connection.js";

const ExpenseIncome = database.get().define(
  "ExpenseIncome",
  {
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: DB_DATABASE,
  }
);

export default ExpenseIncome;
