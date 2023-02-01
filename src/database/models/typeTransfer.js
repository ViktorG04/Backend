import { DataTypes } from "sequelize";
import { DB_SCHEMA } from "../../config/config.js";
import database from "../connection.js";

const TypeTransfer = database.get().define(
  "TypeTransfer",
  {
    idTypeTransfer: {
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
    schema: DB_SCHEMA,
    timestamps: false,
  }
);

export default TypeTransfer;
