export function HowItWorks() {
  const steps = [
    ["1","Input Gambar",    "Pengguna mengunggah foto sampah atau mengambil langsung via kamera browser. Gambar dikompresi dan dikirim ke API backend."],
    ["2","Preprocessing",   "Backend Python menerima gambar, melakukan resize ke 224×224px dan normalisasi piksel sebelum dimasukkan ke model CNN."],
    ["3","Klasifikasi CNN", "Model MobileNetV2 dengan transfer learning memprediksi kategori sampah (organik, anorganik, residu) beserta confidence score."],
    ["4","Hasil & Panduan", "Frontend menampilkan hasil klasifikasi secara instan beserta panduan pengelolaan sampah yang sesuai dengan kategorinya."],
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
        {/* Langkah-langkah */}
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
 
        {/* Kartu arsitektur */}
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
            <div className="t-how-card-title">Backend — Express.js + FastAPI + MongoDB</div>
            <p className="t-how-card-desc">
              RESTful API yang menangani request gambar, meneruskan ke model AI, menyimpan
              riwayat ke MongoDB, dan mengembalikan respons terstruktur ke frontend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}