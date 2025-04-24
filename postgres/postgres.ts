import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    DB_PORT,
  } = process.env;

  if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    throw new Error("Missing required database environment variables");
  }
  

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 5432,
  dialect: DB_DIALECT as any,
  logging: false,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("database stnced",)
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connection, sequelize };
