import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Borrower extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Borrower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "borrowers",
  }
);

export default Borrower;
