import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class InitializationFlag extends Model {
  public key!: string;
  public value!: boolean;
}

InitializationFlag.init(
  {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    value: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "initialization_flags",
  }
);

export default InitializationFlag;
