import { useRef } from "react";
import { GUIDES, CATEGORY_LABELS, CATEGORY_ICONS } from "../constants";
import { UploadIcon, CameraIcon, SearchIcon, InfoIcon } from "./Icons";

export default function ScanSection({
  // State upload
  mode, previewSrc, isDragOver, currentFile,
  // State scan
  scanState, result, confBarWidth, scanError, isDemoMode,
  // Handler upload
  onFileSelect, onDrop, onDragOver, onDragLeave, onReset,
  // Handler kamera
  onStartCamera, onStopCamera, onCapture, videoRef,
  // Handler scan
  onClassify, onResetResult,
}) {
  const fileInputRef = useRef(null);
  const guide = result ? GUIDES[result.category] : null;

  return (
    <section id="scan" className="t-section t-scan-section">
      {/* Header */}
      <div className="t-scan-header">
        <div className="t-section-label">Coba Sekarang</div>
        <h2 className="t-section-title">Scan Sampahmu</h2>
        <p className="t-section-desc">
          Upload foto atau gunakan kamera langsung. Model AI kami akan
          mengklasifikasikan jenis sampah dan memberikan panduan pengelolaannya.
        </p>
      </div>

      {/* Banner demo mode — muncul jika backend belum tersambung */}
      {isDemoMode && (
        <div className="t-demo-banner">
          <span>⚠️</span>
          <span>
            <strong>Mode Demo:</strong> Backend tidak terdeteksi.
            Hasil klasifikasi menggunakan data simulasi.
          </span>
        </div>
      )}

      <div className="t-scan-container">
        {/* ── KOLOM KIRI: Input gambar ── */}
        <div>
          {/* Mode: upload */}
          {mode === "upload" && (
            <div
              className={`t-upload-panel${isDragOver ? " drag-over" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <div className="t-upload-icon-wrap"><UploadIcon /></div>
              <div className="t-upload-title">Upload Foto Sampah</div>
              <p className="t-upload-desc">
                Seret & lepas gambar ke sini, atau klik untuk memilih dari galeri.<br />
                Format: JPG, PNG, WEBP (Maks. 5MB)
              </p>
              <button
                className="t-btn-primary"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                <UploadIcon /> Pilih Gambar
              </button>
              <div className="t-upload-divider">atau</div>
              <button
                className="t-btn-camera"
                onClick={(e) => { e.stopPropagation(); onStartCamera(); }}
              >
                <CameraIcon /> Gunakan Kamera
              </button>
            </div>
          )}

          {/* Mode: preview gambar */}
          {mode === "preview" && (
            <div className="t-preview-box">
              <img src={previewSrc} alt="Preview sampah" />
              <div className="t-preview-overlay">
                <button className="t-preview-btn" onClick={onReset}>Ganti Foto</button>
                <button className="t-preview-btn danger" onClick={onReset}>Hapus</button>
              </div>
            </div>
          )}

          {/* Mode: kamera aktif */}
          {mode === "camera" && (
            <div className="t-camera-panel">
              <div className="t-camera-viewport">
                <video ref={videoRef} autoPlay playsInline />
                <span className="t-camera-corner t-c-tl" />
                <span className="t-camera-corner t-c-tr" />
                <span className="t-camera-corner t-c-bl" />
                <span className="t-camera-corner t-c-br" />
                <div className="t-scan-line" />
              </div>
              <div className="t-camera-controls">
                <button className="t-btn-stop-camera" onClick={onStopCamera}>
                  ✕ Tutup Kamera
                </button>
                <button className="t-btn-capture" onClick={onCapture} title="Ambil Foto" />
              </div>
            </div>
          )}

          {/* Tombol klasifikasi */}
          <div className="t-scan-actions">
            <button
              className={`t-btn-primary${scanState === "loading" ? " scanning" : ""}`}
              onClick={onClassify}
              disabled={!currentFile || scanState === "loading"}
            >
              <SearchIcon />
              {scanState === "loading" ? "Menganalisis..." : "Klasifikasikan Sampah"}
            </button>
          </div>

          {/* Input file tersembunyi */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileSelect}
            style={{ display: "none" }}
          />
        </div>

        {/* ── KOLOM KANAN: Hasil klasifikasi ── */}
        <div className="t-result-panel">
          <div className="t-result-main">
            {/* Idle — belum ada gambar */}
            {scanState === "idle" && (
              <>
                <div className="t-result-idle-icon"><InfoIcon /></div>
                <div className="t-result-idle-title">Menunggu gambar</div>
                <p className="t-result-idle-desc">
                  Upload atau ambil foto sampah, lalu klik "Klasifikasikan Sampah"
                </p>
              </>
            )}

            {/* Loading — sedang diproses */}
            {scanState === "loading" && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
                <div className="t-spinner" />
                <div className="t-loading-text">Menganalisis gambar...</div>
                <div className="t-loading-sub">
                  {isDemoMode ? "Menjalankan simulasi" : "Model CNN sedang memproses"}
                </div>
              </div>
            )}

            {/* Error — klasifikasi gagal */}
{scanState === "error" && (
  <>
    <div className="t-result-idle-icon" style={{ background: "var(--residu-bg)" }}>
      <span style={{ fontSize: 32 }}>⚠️</span>
    </div>
    <div className="t-result-idle-title" style={{ color: "var(--residu)" }}>
      Klasifikasi Gagal
    </div>
    <p className="t-result-idle-desc">{scanError}</p>
    <button className="t-btn-secondary" onClick={onClassify} style={{ fontSize: 13 }}>
      Coba Lagi
    </button>
  </>
)}

{/* Unrecognized — bukan sampah / confidence rendah */}
{scanState === "unrecognized" && (
  <>
    <div className="t-result-idle-icon" style={{ background: "#FFF8E6" }}>
      <span style={{ fontSize: 32 }}>🤔</span>
    </div>
    <div className="t-result-idle-title" style={{ color: "var(--amber, #BA7517)" }}>
      Bukan Sampah?
    </div>
    <p className="t-result-idle-desc">
      Tingkat keyakinan hanya <strong>{result?.confidence?.toFixed(1)}%</strong> — 
      di bawah batas minimum 85%. Pastikan gambar menampilkan 
      sampah dengan jelas dan pencahayaan cukup.
    </p>
    <button 
  className="t-btn-secondary" 
  onClick={() => { onResetResult(); onReset(); }} 
  style={{ fontSize: 13 }}
>
  Coba Gambar Lain
</button>
  </>
)}
            {/* Result — berhasil */}
            {scanState === "result" && result && (
              <div style={{ width: "100%" }}>
                <div className={`t-result-category-badge ${result.category}`}>
                  <span>{CATEGORY_ICONS[result.category]}</span>
                  <span>{CATEGORY_LABELS[result.category]}</span>
                </div>
                <div className="t-result-name">{result.itemName}</div>
                <div className="t-result-confidence">
                  Tingkat keyakinan: {result.confidence}%
                  {isDemoMode && " (simulasi)"}
                </div>
                <div className="t-confidence-bar">
                  <div
                    className={`t-confidence-fill ${result.category}`}
                    style={{ width: `${confBarWidth}%` }}
                  />
                </div>
                <button
                  className="t-btn-secondary"
                  onClick={() => { onResetResult(); onReset(); }}
                  style={{ width:"100%", justifyContent:"center", fontSize:13 }}
                >
                  Scan Ulang
                </button>
              </div>
            )}
          </div>

          {/* Panduan pengelolaan — hanya muncul setelah hasil keluar */}
          {scanState === "result" && guide && (
            <div className="t-guide-card">
              <div className="t-guide-card-header">
                <div className="t-guide-card-header-icon" style={{ background: guide.iconBg }}>
                  {guide.icon}
                </div>
                <div className="t-guide-card-title">{guide.title}</div>
              </div>
              <div className="t-guide-steps">
                {guide.steps.map((s) => (
                  <div key={s.num} className="t-guide-step">
                    <div className={`t-guide-step-num ${s.cls}`}>{s.num}</div>
                    <div className="t-guide-step-text">{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}