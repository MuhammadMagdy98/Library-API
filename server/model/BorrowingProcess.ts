import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db"; // Adjust the import path as needed
import Book from "./Book";
import Borrower from "./Borrower";

class BorrowingProcess extends Model {
  public id!: number;
  public borrowerId!: number;
  public bookId!: number;
  public checkoutDate!: Date;
  public dueDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BorrowingProcess.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    borrowerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Borrower,
        key: "id",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: "id",
      },
    },
    checkoutDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "borrowing_processes",
  }
);

// Define relationships
Book.hasMany(BorrowingProcess, { foreignKey: "bookId" });
Borrower.hasMany(BorrowingProcess, { foreignKey: "borrowerId" });
BorrowingProcess.belongsTo(Book, { foreignKey: "bookId" });
BorrowingProcess.belongsTo(Borrower, { foreignKey: "borrowerId" });

export default BorrowingProcess;
