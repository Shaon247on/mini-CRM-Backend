"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const sequelize_1 = require("sequelize");
const postgres_1 = require("../postgres/postgres"); // Adjust the import path as necessary
const user_model_1 = require("./user.model");
class Client extends sequelize_1.Model {
}
exports.Client = Client;
Client.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
    },
    phone: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    company: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    notes: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    creatorId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: postgres_1.sequelize, modelName: "Client" });
Client.belongsTo(user_model_1.User, { foreignKey: "creatorId", as: "creator" });
user_model_1.User.hasMany(Client, { foreignKey: "creatorId", as: "clients" });
