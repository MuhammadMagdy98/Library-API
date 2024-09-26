import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public isbn!: string;
  public availableQuantity!: number;
  public shelfLocation!: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    availableQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    shelfLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "books",
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ["title"],
      },
      {
        unique: false,
        fields: ["author"],
      },
      {
        unique: true,
        fields: ["isbn"],
      },
    ],
  }
);

export default Book;
