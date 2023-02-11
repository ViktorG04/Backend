import { DataTypes } from "sequelize";
import database from "../connection.js";

const Account = database.get().define("Account", {
  idAccount: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bankName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  numberAccount: {
    type: DataTypes.NUMBER(16),
    allowNull: false,
  },
  credit: {
    type: DataTypes.FLOAT(4),
    allowNull: false,
  },
  available: {
    type: DataTypes.FLOAT(4),
    allowNull: false,
  },
  expensive: {
    type: DataTypes.FLOAT(4),
    allowNull: false,
  },
  dateExpiration: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Account;
