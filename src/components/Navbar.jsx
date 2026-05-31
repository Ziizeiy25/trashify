import { TrashIcon } from "./Icons";

export default function Navbar({ apiStatus, scrollTo }) {
  return (
    <nav className="t-nav">
      {/* Logo */}
      <div className="t-nav-logo" onClick={() => scrollTo("hero")}>
        <div className="t-nav-logo-icon">
          <TrashIcon />
        </div>
        <span className="t-nav-brand">
          Trash<span>ify</span>
        </span>
      </div>

      {/* Link navigasi */}
      <ul className="t-nav-links">
        <li><a onClick={() => scrollTo("scan")}>Scan Sampah</a></li>
        <li><a onClick={() => scrollTo("kategori")}>Kategori</a></li>
        <li><a onClick={() => scrollTo("cara-kerja")}>Cara Kerja</a></li>
        <li><a onClick={() => scrollTo("riwayat")}>Riwayat</a></li>
        <li><a className="t-nav-cta" onClick={() => scrollTo("scan")}>Mulai Scan</a></li>
      </ul>

      {/* Badge status koneksi backend */}
      <div className={`t-api-status ${apiStatus}`}>
        <div className="t-api-status-dot" />
        {apiStatus === "online"   && "API Online"}
        {apiStatus === "offline"  && "Demo Mode"}
        {apiStatus === "checking" && "Mengecek..."}
      </div>
    </nav>
  );
}