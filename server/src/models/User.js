// src/models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: "email",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "name",
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "google_id",
    },
  },
  {
    tableName: "users", // nombre exacto de la tabla en la DB
    timestamps: false,  // si tu tabla no tiene created_at / updated_at
  }
);
