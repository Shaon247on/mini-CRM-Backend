import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from "../postgres/postgres"; // Adjust the import path as necessary
import {User} from "./user.model";

interface ClientAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  creatorId: number;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "id" | "notes" | "company"> {}

class Client
  extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public company?: string;
  public notes?: string;
  public creatorId!: number;
}

Client.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    creatorId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Client" }
);

Client.belongsTo(User, { foreignKey: "creatorId", as: "creator" });
User.hasMany(Client, { foreignKey: "creatorId", as: "clients" });

export {ClientCreationAttributes, ClientAttributes, Client};
