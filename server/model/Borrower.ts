import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db"; // Adjust the import path as needed

class Borrower extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public registeredDate!: Date;

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
    registeredDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "borrowers",
  }
);

export default Borrower;
