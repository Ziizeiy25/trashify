const COLOR = { organic: "#3B6D11", anorganic: "#185FA5", residu: "#854F0B" };
const BG    = { organic: "#EAF3DE", anorganic: "#E6F1FB", residu: "#FAEEDA" };
const LABEL = { organic: "Organik", anorganic: "Anorganik", residu: "Residu" };
const ICON  = { organic: "🌿",      anorganic: "♻️",        residu: "⚠️"    };

export function History({ history, historyLoading, onClear }) {
  if (historyLoading) return (
    <div className="r-section-wrapper">
      <div className="r-history-loading">
        <div className="r-spinner" />
        <p>Memuat riwayat...</p>
      </div>
    </div>
  );

  return (
    <div className="r-section-wrapper">
      <div className="r-section-head">
        <div className="r-section-label">Riwayat</div>
        <div className="r-history-topbar">
          <h2 className="r-section-title" style={{ margin: 0 }}>Scan Terakhir</h2>
          {history.length > 0 && (
            <button className="r-btn-danger" onClick={onClear}>Hapus Semua</button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className="r-history-empty">
          <div className="r-history-empty-icon">📋</div>
          <p className="r-history-empty-title">Belum ada riwayat scan</p>
          <p className="r-history-empty-sub">Hasil klasifikasi akan muncul di sini setelah kamu melakukan scan pertama.</p>
        </div>
      ) : (
        <div className="r-history-list">
          {history.map((item, i) => (
            <div key={i} className="r-history-item">
              {item.imgSrc && (
                <img src={item.imgSrc} alt={item.itemName} className="r-history-img" />
              )}
              {!item.imgSrc && (
                <div className="r-history-img-placeholder" style={{ background: BG[item.category] }}>
                  <span style={{ fontSize: 24 }}>{ICON[item.category]}</span>
                </div>
              )}
              <div className="r-history-info">
                <div className="r-history-name">{item.itemName || "Sampah"}</div>
                <div className="r-history-time">{item.time}</div>
                <div className="r-history-conf">Confidence: {item.confidence?.toFixed ? item.confidence.toFixed(1) : item.confidence}%</div>
              </div>
              <div className="r-history-badge" style={{ background: BG[item.category], color: COLOR[item.category] }}>
                {ICON[item.category]} {LABEL[item.category]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}