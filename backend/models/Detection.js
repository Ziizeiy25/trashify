const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Detection = sequelize.define(
  "Detection",
  {
    // Primary key otomatis (id, auto increment)
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // Kategori: organic | anorganic | residu
    category: {
      type: DataTypes.ENUM("organic", "anorganic", "residu"),
      allowNull: false,
    },

    // Nama item yang terdeteksi, contoh: "Botol Plastik"
    itemName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    // Persentase keyakinan model AI (0–100)
    confidence: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "detections",  // nama tabel di MySQL
    timestamps: true,         // otomatis buat kolom createdAt & updatedAt
  }
);

module.exports = Detection;