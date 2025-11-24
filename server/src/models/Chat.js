import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Chat = sequelize.define("Chat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});
