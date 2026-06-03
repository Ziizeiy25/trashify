export default function HeroSection({ navigate }) {
  return (
    <div className="r-hero-wrapper">
      {/* ── HERO ── */}
      <section className="r-hero">
        <div className="r-hero-text">
          <div className="r-eyebrow">
            <span className="r-eyebrow-dot" />
            AI-Powered Classification
          </div>
          <h1 className="r-hero-h1">
            Kenali Sampahmu,<br />
            <span className="r-hero-accent">Jaga Bumi</span><br />
            Kita Bersama
          </h1>
          <p className="r-hero-desc">
            Cukup foto sampahnya — Trashify langsung mengidentifikasi jenis sampah
            dan memberikan panduan pengelolaan yang tepat menggunakan teknologi
            Computer Vision berbasis CNN.
          </p>
          <div className="r-hero-actions">
            <button className="r-btn-primary" onClick={() => navigate("scan")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
              Scan Sekarang
            </button>
            <button className="r-btn-ghost" onClick={() => navigate("cara-kerja")}>
              Cara Kerja →
            </button>
          </div>
          <div className="r-hero-stats">
            {[["3","Kategori Sampah"],["85%+","Target Akurasi AI"],["<3s","Respons Deteksi"]].map(([n,l]) => (
              <div key={l} className="r-stat">
                <div className="r-stat-num">{n}</div>
                <div className="r-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="r-hero-visual">
          <div className="r-scanner-card">
            <div className="r-scanner-header">
              <span className="r-scanner-title">Trashify Scanner</span>
              <span className="r-scanner-pill">
                <span className="r-scanner-pill-dot" /> Model CNN aktif
              </span>
            </div>
            <div className="r-scanner-area" onClick={() => navigate("scan")}>
              <div className="r-scanner-corner r-scanner-corner--tl" />
              <div className="r-scanner-corner r-scanner-corner--tr" />
              <div className="r-scanner-corner r-scanner-corner--bl" />
              <div className="r-scanner-corner r-scanner-corner--br" />
              <div className="r-scanner-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h7v7M14 14v4M18 14h3"/></svg>
              </div>
              <p className="r-scanner-hint">Tap untuk mulai scan</p>
              <p className="r-scanner-hint r-scanner-hint--sub">Arahkan kamera ke sampah</p>
            </div>
            <div className="r-scanner-chips">
              {[["organic","🌿","Organik"],["anorganic","♻️","Anorganik"],["residu","⚠️","Residu"]].map(([cls,icon,label]) => (
                <div key={cls} className={`r-chip r-chip--${cls}`}>
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="r-scanner-detected">
              <span className="r-detected-dot" />
              Terdeteksi: Sampah Organik
            </div>
          </div>
        </div>
      </section>

      {/* ── FITUR HIGHLIGHTS ── */}
      <section className="r-highlights">
        {[
          { icon: "🌱", title: "Ramah Lingkungan", desc: "Bantu kurangi dampak sampah dengan klasifikasi yang tepat dan panduan pengelolaan yang benar." },
          { icon: "⚡", title: "Cepat & Akurat",   desc: "Model CNN kami memproses gambar dalam hitungan detik dengan tingkat akurasi yang tinggi." },
          { icon: "📊", title: "Lacak Riwayat",    desc: "Simpan dan pantau semua hasil klasifikasi sampah yang pernah kamu lakukan sebelumnya." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="r-highlight-card">
            <div className="r-highlight-icon">{icon}</div>
            <h3 className="r-highlight-title">{title}</h3>
            <p className="r-highlight-desc">{desc}</p>
          </div>
        ))}
      </section>

      {/* ── CTA BANNER ── */}
      <section className="r-cta-banner">
        <h2 className="r-cta-title">Siap mengklasifikasikan sampah?</h2>
        <p className="r-cta-desc">Mulai scan sekarang dan dapatkan panduan pengelolaan sampah yang tepat.</p>
        <button className="r-btn-primary" onClick={() => navigate("scan")}>
          Mulai Scan Gratis
        </button>
      </section>
    </div>
  );
}