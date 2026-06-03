const LINKS = [
  { id: "scan",        label: "Scan Sampah" },
  { id: "kategori",    label: "Kategori"    },
  { id: "cara-kerja",  label: "Cara Kerja"  },
  { id: "riwayat",     label: "Riwayat"     },
];

export default function Navbar({ apiStatus, activePage, navigate }) {
  return (
    <nav className="r-nav">
      <div className="r-nav-logo" onClick={() => navigate("home")}>
        <div className="r-nav-logo-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C0DD97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6M9 6V4h6v2" />
          </svg>
        </div>
        <span className="r-nav-brand">Trashify</span>
      </div>

      <ul className="r-nav-links">
        {LINKS.map(({ id, label }) => (
          <li key={id}>
            <a
              className={`r-nav-link${activePage === id ? " r-nav-link--active" : ""}`}
              onClick={() => navigate(id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="r-nav-right">
        <button className="r-nav-cta" onClick={() => navigate("scan")}>
          Mulai Scan
        </button>
        <div className={`r-api-badge r-api-badge--${apiStatus}`}>
          <div className="r-api-dot" />
          {apiStatus === "online"   && "API Online"}
          {apiStatus === "offline"  && "Demo Mode"}
          {apiStatus === "checking" && "Mengecek..."}
        </div>
      </div>
    </nav>
  );
}