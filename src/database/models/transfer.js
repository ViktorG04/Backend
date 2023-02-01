import { DataTypes } from "sequelize";
import { DB_SCHEMA } from "../../config/config.js";
import database from "../connection.js";

const Transfer = database.get().define(
  "Transfer",
  {
    idTransfer: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    dateReport: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amountOrigin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amountDestiny: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    taxes: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: DB_SCHEMA,
  }
);

export default Transfer;