import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface todoAttributes {
  id: string;
  title: string;
  completed: boolean;
}

export class todoInstance extends Model<todoAttributes> {}

todoInstance.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "todos",
  }
);
