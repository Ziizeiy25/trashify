import { TrashIcon } from "./Icons";
 
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
            {["Coding Camp 2026","DBS Foundation","CC26-PSU346","GitHub Repository"].map((l) => (
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