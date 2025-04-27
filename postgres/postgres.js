"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.connection = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_DIALECT, DATABASE_PUBLIC_URL } = process.env;
if (!DB_DIALECT || !DATABASE_PUBLIC_URL) {
    throw new Error("❌ Missing required environment variables: DB_DIALECT or DATABASE_PUBLIC_URL.");
}
const sequelize = new sequelize_1.Sequelize(DATABASE_PUBLIC_URL, {
    dialect: DB_DIALECT,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
exports.sequelize = sequelize;
const connection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("✅ Database synced successfully.");
        console.log("✅ Connection has been established successfully.");
    }
    catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
};
exports.connection = connection;
