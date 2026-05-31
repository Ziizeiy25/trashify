const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "trashify",  // nama database
  process.env.DB_USER || "root",      // username (XAMPP default: root)
  process.env.DB_PASS || "",          // password (XAMPP default: kosong)
  {
    host:    process.env.DB_HOST || "localhost",
    port:    process.env.DB_PORT || 3306,
    dialect: "mysql",                 // pakai MySQL

    // Matikan log SQL di console (bisa diaktifkan untuk debug)
    logging: false,

    pool: {
      max: 5,     // maks 5 koneksi sekaligus
      min: 0,
      acquire: 30000,
      idle:    10000,
    },
  }
);

module.exports = sequelize;