import { DataTypes } from "sequelize";
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
    timestamps: false,
  }
);

export default TypeMoney;
