import { Sequelize } from "sequelize";
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_PORT, DB_DATABASE } from "../config/config.js";

class DATABASE {
  sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: "oracle",
      database: DB_DATABASE,
      host: DB_SERVER,
      username: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("DB IS RUNNING");
    } catch (error) {
      console.error(error);
      console.error("ERROR IN DB CONNECTION");
    }
  }

  get() {
    return this.sequelize;
  }
}

const database = new DATABASE();

export default database;
