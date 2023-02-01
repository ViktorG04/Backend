import { DataTypes } from "sequelize";
import { DB_SCHEMA } from "../../config/config.js";
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
    schema: DB_SCHEMA,
    timestamps: false,
  }
);

export default Categories;
