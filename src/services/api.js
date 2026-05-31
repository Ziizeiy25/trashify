import axios from "axios";

// Base URL diambil dari .env → VITE_API_URL=http://localhost:5000
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Instance axios dengan konfigurasi default
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 detik timeout
});

// ── 1. CEK KESEHATAN SERVER ──────────────────────────────────
// GET /api/health → cek apakah backend online
export async function checkApiHealth() {
  const response = await api.get("/api/health", { timeout: 5000 });
  return response.data;
}

// ── 2. KLASIFIKASI GAMBAR ────────────────────────────────────
// POST /api/classify → kirim gambar, terima hasil klasifikasi AI
// Menggunakan FormData (multipart/form-data) untuk upload file
export async function classifyWaste(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await api.post("/api/classify", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // Response yang diharapkan dari backend:
  // { category: "organic"|"anorganic"|"residu", confidence: 92, itemName: "Botol Plastik" }
  return response.data;
}

// ── 3. AMBIL RIWAYAT ─────────────────────────────────────────
// GET /api/history → ambil semua riwayat deteksi dari MongoDB
export async function fetchHistory() {
  const response = await api.get("/api/history");
  // response.data = { success: true, count: N, data: [...array...] }
  return response.data; // biarkan, yang difix adalah cara terima di App.jsx
}

// ── 4. SIMPAN RIWAYAT ────────────────────────────────────────
// POST /api/history → simpan satu hasil deteksi ke MongoDB
export async function saveHistory(entry) {
  const response = await api.post("/api/history", {
    category:   entry.category,
    confidence: entry.confidence,
    itemName:   entry.itemName,
    time:       entry.time,
  });
  return response.data;
}

// ── 5. HAPUS SEMUA RIWAYAT ───────────────────────────────────
// DELETE /api/history → hapus seluruh riwayat dari MongoDB
export async function deleteAllHistory() {
  const response = await api.delete("/api/history");
  return response.data;
}