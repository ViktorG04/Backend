import { DataTypes } from "sequelize";
import { DB_DATABASE } from "../../config/config.js";
import database from "../connection.js";

const Categories = database.get().define(
  "Category",
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
    schema: DB_DATABASE,
    timestamps: false,
  }
);

export default Categories;
