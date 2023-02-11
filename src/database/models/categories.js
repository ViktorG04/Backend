import { DataTypes } from "sequelize";
import database from "../connection.js";

const Categories = database.get().define(
  "Categories",
  {
    idCategory: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Categories;
