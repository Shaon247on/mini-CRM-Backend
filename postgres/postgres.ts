import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// const { DB_DIALECT, DATABASE_PUBLIC_URL } = process.env;

// if (!DB_DIALECT || !DATABASE_PUBLIC_URL) {
//   throw new Error("❌ Missing required environment variables: DB_DIALECT or DATABASE_PUBLIC_URL.");
// }

const sequelize = new Sequelize(process.env.DATABASE_PUBLIC_URL as string, {
  dialect: process.env.DB_DIALECT as any,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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
