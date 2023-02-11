import { DataTypes } from "sequelize";
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
    timestamps: false,
  }
);

export default TypeTransfer;
