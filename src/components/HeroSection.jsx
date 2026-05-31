import { CameraIcon, GridIcon } from "./Icons";

export default function HeroSection({ scrollTo }) {
  return (
    <section id="hero" className="t-hero">
      {/* Teks kiri */}
      <div>
        <div className="t-hero-eyebrow">AI-Powered Classification</div>
        <h1 className="t-hero-title">
          Kenali Sampahmu,<br />
          <span className="accent">Jaga Bumi</span><br />
          Kita Bersama
        </h1>
        <p className="t-hero-desc">
          Cukup foto sampahnya — Trashify langsung mengidentifikasi jenis sampah
          dan memberikan panduan pengelolaan yang tepat menggunakan teknologi
          Computer Vision berbasis CNN.
        </p>
        <div className="t-hero-actions">
          <button className="t-btn-primary" onClick={() => scrollTo("scan")}>
            <CameraIcon size={18} /> Scan Sekarang
          </button>
          <button className="t-btn-secondary" onClick={() => scrollTo("cara-kerja")}>
            Cara Kerja →
          </button>
        </div>
        <div className="t-hero-stats">
          {[
            ["3",    "Kategori Sampah"],
            ["70%+", "Target Akurasi AI"],
            ["<3s",  "Respons Deteksi"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="t-stat-num">{n}</div>
              <div className="t-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Kartu scanner kanan */}
      <div className="t-hero-visual">
        <div className="t-hero-badge t-badge-top">
          <div className="t-hero-badge-dot" style={{ background: "var(--green)" }} />
          Model CNN aktif
        </div>

        <div className="t-scanner-card">
          <div className="t-scanner-topbar">
            <div className="t-scanner-title">Trashify Scanner</div>
            <div className="t-scanner-badge">Powered by AI</div>
          </div>
          <div className="t-scanner-area" onClick={() => scrollTo("scan")}>
            <div className="t-corner t-corner-tl" /><div className="t-corner t-corner-tr" />
            <div className="t-corner t-corner-bl" /><div className="t-corner t-corner-br" />
            <div className="t-scanner-area-icon"><GridIcon /></div>
            <div className="t-scanner-area-text">
              <strong>Tap untuk mulai scan</strong>
              <span>Arahkan kamera ke sampah</span>
            </div>
          </div>
          <div className="t-result-preview">
            {[["organic","🌿","Organik"],["anorganic","♻️","Anorganik"],["residu","⚠️","Residu"]].map(
              ([cls, icon, label]) => (
                <div key={cls} className={`t-result-chip ${cls}`}>
                  <span className="t-result-chip-icon">{icon}</span>
                  <div className="t-result-chip-label">{label}</div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="t-hero-badge t-badge-bottom">
          <div className="t-hero-badge-dot" style={{ background: "var(--organic-mid)" }} />
          Terdeteksi: Sampah Organik
        </div>
      </div>
    </section>
  );
}