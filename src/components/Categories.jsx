const CATS = [
  {
    id: "organic", icon: "🌿", label: "Organik", color: "organic",
    desc: "Sampah yang berasal dari makhluk hidup dan dapat terurai secara alami oleh mikroorganisme.",
    items: ["Sisa Makanan", "Daun Kering", "Kulit Buah", "Sayuran", "Kertas Daur Ulang"],
    tip: "Dapat dijadikan kompos",
    tipIcon: "♻️",
  },
  {
    id: "anorganic", icon: "♻️", label: "Anorganik", color: "anorganic",
    desc: "Sampah yang berasal dari bahan non-hayati dan umumnya dapat didaur ulang menjadi produk baru.",
    items: ["Botol Plastik", "Kaleng", "Kertas Bebas", "Kaca", "Logam"],
    tip: "Setor ke bank sampah",
    tipIcon: "🏦",
  },
  {
    id: "residu", icon: "⚠️", label: "Residu", color: "residu",
    desc: "Sampah yang tidak dapat didaur ulang maupun dikompos dan memerlukan penanganan khusus.",
    items: ["Styrofoam", "Popok Bekas", "Masker", "Plastik Berlapis", "Pembalut"],
    tip: "Buang ke TPA khusus",
    tipIcon: "🗑️",
  },
];

export default function Categories() {
  return (
    <div className="r-section-wrapper">
      <div className="r-section-head">
        <div className="r-section-label">Kategori</div>
        <h2 className="r-section-title">Jenis Sampah yang Didukung</h2>
        <p className="r-section-sub">Sistem kami mengklasifikasikan sampah ke dalam tiga kategori utama berdasarkan cara pengelolaannya.</p>
      </div>

      <div className="r-cat-grid">
        {CATS.map(({ id, icon, label, color, desc, items, tip, tipIcon }) => (
          <div key={id} className={`r-cat-card r-cat-card--${color}`}>
            <div className="r-cat-icon">{icon}</div>
            <h3 className="r-cat-title">{label}</h3>
            <p className="r-cat-desc">{desc}</p>
            <div className="r-cat-items">
              {items.map(item => (
                <span key={item} className={`r-cat-tag r-cat-tag--${color}`}>{item}</span>
              ))}
            </div>
            <div className={`r-cat-tip r-cat-tip--${color}`}>
              <span>{tipIcon}</span>
              <span>{tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}