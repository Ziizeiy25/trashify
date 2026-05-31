import { CATEGORY_LABELS, CATEGORY_ICONS } from "../constants";
 
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