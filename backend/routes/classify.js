const express  = require("express");
const axios    = require("axios");
const FormData = require("form-data"); // bawaan Node.js, tidak perlu install
const upload   = require("../middleware/upload");

const router = express.Router();

// ── POST /api/classify ───────────────────────────────────────
// Terima gambar dari frontend, teruskan ke model AI
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Cek apakah ada file yang diupload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada gambar yang diupload",
      });
    }

    // Siapkan FormData untuk dikirim ke FastAPI (model AI)
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename:    req.file.originalname || "image.jpg",
      contentType: req.file.mimetype,
    });

    // Kirim ke model AI (FastAPI Python)
    // URL model diambil dari .env → AI_MODEL_URL
    const aiResponse = await axios.post(
      `${process.env.AI_MODEL_URL}/predict`,
      formData,
      {
        headers: {
          ...formData.getHeaders(), // isi Content-Type multipart secara otomatis
        },
        timeout: 30000, // 30 detik timeout
      }
    );

    // Ambil hasil dari model AI
    // Ekspektasi response FastAPI: { category, confidence, item_name }
    const { category, confidence, item_name } = aiResponse.data;

    // Kembalikan ke frontend dengan format yang konsisten
    return res.status(200).json({
      success:    true,
      category,               // "organic" | "anorganic" | "residu"
      confidence: Math.round(confidence), // ubah 0.92 → 92
      itemName:   item_name,  // "Botol Plastik"
    });

  } catch (error) {
    console.error("[classify] Error:", error.message);

    // Multer error (ukuran file terlalu besar)
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "Ukuran gambar terlalu besar — maks 5MB",
      });
    }

    // Model AI tidak merespons
    if (error.code === "ECONNREFUSED" || error.code === "ECONNABORTED") {
      return res.status(503).json({
        success: false,
        message: "Model AI tidak tersedia — coba beberapa saat lagi",
      });
    }

    // Error umum
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
});

module.exports = router;