import { DataTypes } from "sequelize";
import database from "../connection.js";

const User = database.get().define("User", {
  idUser: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default User;
