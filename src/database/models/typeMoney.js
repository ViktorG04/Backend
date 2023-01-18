import { DataTypes } from "sequelize";
import { DB_DATABASE } from "../../config/config.js";
import database from "../connection.js";

const TypeMoney = database.get().define(
  "TypeMoney",
  {
    idTypeMoney: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    schema: DB_DATABASE,
    timestamps: false,
  }
);

export default TypeMoney;
