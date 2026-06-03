const LINKS = [
  { id: "scan",        label: "Scan Sampah"     },
  { id: "kategori",    label: "Kategori Sampah"  },
  { id: "cara-kerja",  label: "Cara Kerja"       },
  { id: "riwayat",     label: "Riwayat Deteksi"  },
];

export default function Footer({ navigate, activePage }) {
  return (
    <footer className="r-footer">
      <div className="r-footer-grid">
        <div className="r-footer-brand-col">
          <div className="r-footer-logo" onClick={() => navigate("home")}>
            <div className="r-footer-logo-icon">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#C0DD97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6M9 6V4h6v2" />
              </svg>
            </div>
            <span className="r-footer-brand">Trashify</span>
          </div>
          <p className="r-footer-tagline">
            Platform klasifikasi sampah cerdas berbasis AI. Satu foto, panduan lengkap pengelolaan sampah yang tepat.
          </p>
        </div>

        <div>
          <div className="r-footer-heading">Navigasi</div>
          <ul className="r-footer-links">
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  onClick={() => navigate(id)}
                  className={activePage === id ? "r-footer-link--active" : ""}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
  <div className="r-footer-heading">Tentang</div>
  <ul className="r-footer-links">
    <li>
      <a 
        href="https://github.com/Ziizeiy25/trashify" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        GitHub Repository ↗
      </a>
    </li>
    <li>
      <a 
        href="https://trashify-jq8wodeeu8puulqx2v5fyc.streamlit.app" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Dashboard Analitik ↗
      </a>
    </li>
    <li><span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Capstone Project CC26-PSU346</span></li>
    <li><span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Teknologi AI — MobileNetV2</span></li>
  </ul>
</div>
      </div>

      <div className="r-footer-bottom">
        <span>© 2026 Trashify. Hak cipta dilindungi.</span>
        <span>Dibuat dengan oleh Tim Capstone CC26-PSU346</span>
      </div>
    </footer>
  );
}