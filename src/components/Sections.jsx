import { CATEGORY_LABELS, CATEGORY_ICONS } from "../constants";
import { TrashIcon } from "./Icons";

// ─────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────
export function HowItWorks() {
  const steps = [
    ["1", "Input Gambar",    "Pengguna mengunggah foto sampah atau mengambil langsung via kamera browser. Gambar dikompresi dan dikirim ke API backend."],
    ["2", "Preprocessing",   "Backend Python menerima gambar, melakukan resize ke 224×224px dan normalisasi piksel sebelum dimasukkan ke model CNN."],
    ["3", "Klasifikasi CNN", "Model MobileNetV2 dengan transfer learning memprediksi kategori sampah (organik, anorganik, residu) beserta confidence score."],
    ["4", "Hasil & Panduan", "Frontend menampilkan hasil klasifikasi secara instan beserta panduan pengelolaan sampah yang sesuai dengan kategorinya."],
  ];

  return (
    <section id="cara-kerja" className="t-section t-how-section">
      <div className="t-section-label">Teknologi</div>
      <h2 className="t-section-title">Bagaimana Trashify Bekerja?</h2>
      <p className="t-section-desc" style={{ marginBottom: 48 }}>
        Trashify mengintegrasikan tiga komponen utama: antarmuka web, model AI berbasis CNN,
        dan analitik data — semuanya terhubung melalui RESTful API.
      </p>
      <div className="t-how-grid">
        <div className="t-steps-list">
          {steps.map(([n, name, desc]) => (
            <div key={n} className="t-step-item">
              <div className="t-step-circle">{n}</div>
              <div>
                <div className="t-step-name">{name}</div>
                <p className="t-step-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="t-how-visual">
          <div className="t-how-card span2">
            <span className="t-how-card-icon">🌐</span>
            <div className="t-how-card-title">Frontend — React + Vite</div>
            <p className="t-how-card-desc">
              Antarmuka web responsif dengan fitur upload gambar, kamera langsung,
              tampilan hasil real-time, dan riwayat deteksi. Networking call via Axios ke backend.
            </p>
          </div>
          <div className="t-how-card">
            <span className="t-how-card-icon">🤖</span>
            <div className="t-how-card-title">AI Engine</div>
            <p className="t-how-card-desc">
              Model CNN MobileNetV2 + transfer learning. Dilatih di Kaggle dengan dataset
              TrashNet. Di-deploy sebagai REST API via FastAPI.
            </p>
          </div>
          <div className="t-how-card">
            <span className="t-how-card-icon">📊</span>
            <div className="t-how-card-title">Data Analytics</div>
            <p className="t-how-card-desc">
              EDA dataset, analisis distribusi kelas, dan dashboard Streamlit untuk
              memvisualisasikan tren klasifikasi pengguna.
            </p>
          </div>
          <div className="t-how-card span2">
            <span className="t-how-card-icon">⚡</span>
            <div className="t-how-card-title">Backend — Express.js + MySQL (XAMPP)</div>
            <p className="t-how-card-desc">
              RESTful API yang menangani request gambar, meneruskan ke model AI, menyimpan
              riwayat ke MySQL, dan mengembalikan respons terstruktur ke frontend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────
export function Categories() {
  const cats = [
    {
      cls: "organic", icon: "🌿", name: "Organik",
      desc: "Sampah yang berasal dari makhluk hidup dan dapat terurai secara alami. Paling ramah lingkungan dan bernilai tinggi untuk kompos.",
      tags: ["Sisa makanan", "Daun kering", "Kulit buah", "Ampas kopi", "Kayu"],
      treatment: "♻️ Bisa dikomposkan atau dijadikan pupuk",
    },
    {
      cls: "anorganic", icon: "♻️", name: "Anorganik",
      desc: "Sampah yang tidak dapat terurai secara alami namun bisa didaur ulang kembali menjadi produk yang berguna.",
      tags: ["Botol plastik", "Kertas", "Kaleng", "Kaca", "Kardus"],
      treatment: "🔄 Bisa didaur ulang di bank sampah",
    },
    {
      cls: "residu", icon: "⚠️", name: "Residu",
      desc: "Sampah yang tidak bisa dikomposkan maupun didaur ulang. Memerlukan penanganan khusus agar tidak mencemari lingkungan.",
      tags: ["Popok", "Styrofoam", "Plastik berlapis", "Pembalut", "Puntung rokok"],
      treatment: "🗑️ Buang ke TPA — tidak bisa diolah kembali",
    },
  ];

  return (
    <section id="kategori" className="t-section t-categories-section">
      <div style={{ textAlign: "center" }}>
        <div className="t-section-label">Jenis Sampah</div>
        <h2 className="t-section-title">3 Kategori yang Trashify Kenali</h2>
        <p className="t-section-desc" style={{ margin: "0 auto" }}>
          Setiap kategori sampah memiliki cara pengelolaan yang berbeda. Trashify membantu
          kamu menentukan kategori yang tepat dalam hitungan detik.
        </p>
      </div>
      <div className="t-categories-grid">
        {cats.map(({ cls, icon, name, desc, tags, treatment }) => (
          <div key={cls} className={`t-category-card ${cls}`}>
            <span className="t-category-icon">{icon}</span>
            <div className="t-category-name">{name}</div>
            <p className="t-category-desc">{desc}</p>
            <div className="t-category-examples">
              {tags.map((t) => <span key={t} className="t-example-tag">{t}</span>)}
            </div>
            <div className="t-category-treatment">{treatment}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// HISTORY
// ─────────────────────────────────────────────────────────────
export function History({ history, historyLoading, onClear }) {
  return (
    <section id="riwayat" className="t-section t-history-section">
      <div className="t-history-header">
        <div>
          <div className="t-section-label">Riwayat</div>
          <h2 className="t-section-title">Riwayat Deteksi</h2>
        </div>
        <button className="t-history-clear-btn" onClick={onClear}>
          Hapus Semua
        </button>
      </div>

      <div className="t-history-list">
        {historyLoading ? (
          <div className="t-history-loading">Memuat riwayat dari server...</div>
        ) : history.length === 0 ? (
          <div className="t-history-empty">
            <span className="t-history-empty-icon">📋</span>
            Belum ada riwayat deteksi.<br />Mulai scan sampahmu sekarang!
          </div>
        ) : (
          history.map((entry, i) => (
            <div key={i} className="t-history-item">
              {entry.imgSrc ? (
                <img className="t-history-thumb" src={entry.imgSrc} alt={entry.itemName} />
              ) : (
                <div className={`t-history-thumb-placeholder ${entry.category}`}>
                  {CATEGORY_ICONS[entry.category]}
                </div>
              )}
              <div className="t-history-info">
                <div className="t-history-name">{entry.itemName}</div>
                <div className="t-history-meta">
                  {entry.time} · Akurasi {entry.confidence}%
                </div>
              </div>
              <span className={`t-history-badge ${entry.category}`}>
                {CATEGORY_LABELS[entry.category]}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
export function Footer({ scrollTo }) {
  return (
    <footer className="t-footer">
      <div className="t-footer-grid">
        <div>
          <div className="t-footer-logo">
            <div className="t-footer-logo-icon"><TrashIcon /></div>
            <span className="t-footer-brand">Trashify</span>
          </div>
          <p className="t-footer-tagline">
            Platform klasifikasi sampah cerdas berbasis AI. Satu foto, panduan lengkap
            pengelolaan sampah yang tepat.
          </p>
        </div>
        <div>
          <div className="t-footer-heading">Fitur</div>
          <ul className="t-footer-links">
            {[["scan","Scan Sampah"],["kategori","Kategori Sampah"],["cara-kerja","Cara Kerja"],["riwayat","Riwayat Deteksi"]].map(([id, label]) => (
              <li key={id}><a onClick={() => scrollTo(id)}>{label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="t-footer-heading">Proyek</div>
          <ul className="t-footer-links">
            {["Coding Camp 2026", "DBS Foundation", "CC26-PSU346", "GitHub Repository"].map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="t-footer-bottom">
        <div className="t-footer-copy">© 2026 Trashify. Healthy Lives & Well-being.</div>
        <div className="t-footer-team">Tim <span>CC26-PSU346</span> — Coding Camp 2026</div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────
export function Toast({ message, visible, isError }) {
  return (
    <div className={`t-toast${visible ? " show" : ""}${isError ? " error" : ""}`}>
      <div className="t-toast-dot" />
      <span>{message}</span>
    </div>
  );
}