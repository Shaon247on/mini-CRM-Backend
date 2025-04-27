import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, DATABASE_URL, DB_DIALECT } = process.env;

if (!DATABASE_URL || !DB_DIALECT) {
  throw new Error("Missing required environment variables");
}

const isProduction = NODE_ENV === "production";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: DB_DIALECT as any,
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Database synced successfully.");
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

export { connection, sequelize };
