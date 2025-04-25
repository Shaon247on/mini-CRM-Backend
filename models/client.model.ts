import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../postgres/postgres';
import { User } from './user.model';

// Define attributes
export interface ClientAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  creatorId: number; // FK to User
}

// Allow partial fields for creation
export type ClientCreationAttributes = Optional<ClientAttributes, 'id' | 'company' | 'notes'>;

// Define Client model class
export class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public company?: string;
  public notes?: string;
  public creatorId!: number;
}

// Initialize the model
Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true,
  }
);

// Association
Client.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
User.hasMany(Client, { foreignKey: 'creatorId', as: 'clients' });
