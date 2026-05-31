const express   = require("express");
const Detection = require("../models/Detection");

const router = express.Router();

// ── GET /api/history ─────────────────────────────────────────
// Ambil semua riwayat, terbaru di atas
router.get("/", async (req, res) => {
  try {
    const detections = await Detection.findAll({
      order: [["createdAt", "DESC"]], // terbaru di atas
      limit: 50,
    });

    return res.status(200).json({
      success: true,
      count:   detections.length,
      data:    detections.map((d) => ({
        id:         d.id,
        category:   d.category,
        itemName:   d.itemName,
        confidence: d.confidence,
        time:       new Date(d.createdAt).toLocaleString("id-ID"),
      })),
    });

  } catch (error) {
    console.error("[history GET] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil riwayat",
    });
  }
});

// ── POST /api/history ────────────────────────────────────────
// Simpan satu hasil deteksi baru ke MySQL
router.post("/", async (req, res) => {
  try {
    const { category, itemName, confidence } = req.body;

    // Validasi input
    if (!category || !itemName || confidence === undefined) {
      return res.status(400).json({
        success: false,
        message: "Data tidak lengkap: category, itemName, confidence wajib diisi",
      });
    }

    // Simpan ke tabel detections di MySQL
    const detection = await Detection.create({ category, itemName, confidence });

    return res.status(201).json({
      success: true,
      message: "Riwayat berhasil disimpan",
      data: {
        id:         detection.id,
        category:   detection.category,
        itemName:   detection.itemName,
        confidence: detection.confidence,
        time:       new Date(detection.createdAt).toLocaleString("id-ID"),
      },
    });

  } catch (error) {
    console.error("[history POST] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan riwayat",
    });
  }
});

// ── DELETE /api/history ──────────────────────────────────────
// Hapus SEMUA riwayat
router.delete("/", async (req, res) => {
  try {
    const count = await Detection.destroy({ where: {} });
    return res.status(200).json({
      success: true,
      message: `${count} riwayat berhasil dihapus`,
    });
  } catch (error) {
    console.error("[history DELETE all] Error:", error.message);
    return res.status(500).json({ success: false, message: "Gagal menghapus riwayat" });
  }
});

// ── DELETE /api/history/:id ──────────────────────────────────
// Hapus SATU riwayat berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const count = await Detection.destroy({ where: { id: req.params.id } });

    if (count === 0) {
      return res.status(404).json({ success: false, message: "Riwayat tidak ditemukan" });
    }

    return res.status(200).json({ success: true, message: "Riwayat berhasil dihapus" });

  } catch (error) {
    console.error("[history DELETE one] Error:", error.message);
    return res.status(500).json({ success: false, message: "Gagal menghapus riwayat" });
  }
});

module.exports = router;