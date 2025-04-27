import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
  POSTGRES_USER,
    PGUSER,
    PGPASSWORD,
    PGHOST,
    DB_DIALECT,
    PGPORT,
  } = process.env;

  if (!POSTGRES_USER || !PGUSER || !PGPASSWORD || !PGHOST || !DB_DIALECT) {
    throw new Error("Missing required database environment variables");
  }
  

const sequelize = new Sequelize(PGUSER, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT ? Number(PGPORT) : 5432,
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
