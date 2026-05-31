require("dotenv").config(); // baca .env

const express    = require("express");
const cors       = require("cors");
const sequelize  = require("./config/database");
const Detection  = require("./models/Detection");

const classifyRoute = require("./routes/classify");
const historyRoute  = require("./routes/history");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ───────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── KONEKSI MySQL (Sequelize) ────────────────────────────────
sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ MySQL (XAMPP) terhubung");
    // Buat tabel otomatis kalau belum ada (tidak hapus data lama)
    await sequelize.sync({ alter: true });
    console.log("✅ Tabel 'detections' siap");
  })
  .catch((err) => {
    console.error("❌ MySQL gagal terhubung:", err.message);
    console.log("⚠️  Pastikan XAMPP MySQL sudah dijalankan");
  });

// ── ROUTES ───────────────────────────────────────────────────
// Health check
app.get("/api/health", async (req, res) => {
  let dbStatus = "disconnected";
  try {
    await sequelize.authenticate();
    dbStatus = "connected";
  } catch {}

  res.status(200).json({
    success:   true,
    message:   "Trashify backend berjalan normal",
    database:  dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// Klasifikasi sampah → POST /api/classify
app.use("/api/classify", classifyRoute);

// Riwayat deteksi → GET/POST/DELETE /api/history
app.use("/api/history", historyRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} tidak ditemukan`,
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error("[Global Error]", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ── JALANKAN SERVER ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});