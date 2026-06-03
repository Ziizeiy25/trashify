export default function HowItWorks() {
  return (
    <div className="r-section-wrapper">
      <div className="r-section-head">
        <div className="r-section-label">Cara Kerja</div>
        <h2 className="r-section-title">Tiga Langkah Mudah</h2>
        <p className="r-section-sub">Klasifikasi sampah yang akurat dalam hitungan detik, dari foto hingga panduan pengelolaan.</p>
      </div>

      <div className="r-steps">
        {[
          { num: "01", icon: "📸", title: "Ambil Foto", desc: "Foto sampah menggunakan kamera atau upload dari galeri perangkat kamu. Format JPG, PNG, WEBP (Maks. 5MB)." },
          { num: "02", icon: "🤖", title: "Analisis AI",  desc: "Model CNN MobileNetV2 kami menganalisis gambar dan mengidentifikasi jenis sampah dalam hitungan detik." },
          { num: "03", icon: "♻️", title: "Panduan Pengelolaan", desc: "Terima panduan langkah-by-langkah tentang cara membuang atau mendaur ulang sampah dengan benar." },
        ].map(({ num, icon, title, desc }) => (
          <div key={num} className="r-step">
            <div className="r-step-num">{num}</div>
            <div className="r-step-icon">{icon}</div>
            <h3 className="r-step-title">{title}</h3>
            <p className="r-step-desc">{desc}</p>
          </div>
        ))}
      </div>

      <div className="r-how-features">
        <h3 className="r-how-feat-title">Teknologi di balik Trashify</h3>
        <div className="r-how-feat-grid">
          {[
            { icon: "🧠", label: "Model CNN",       val: "MobileNetV2"         },
            { icon: "🖼️", label: "Input Size",      val: "224 × 224 px"        },
            { icon: "🎯", label: "Output Kelas",    val: "3 kategori"           },
            { icon: "⚡", label: "Respons",         val: "< 3 detik"            },
            { icon: "🔧", label: "Framework AI",    val: "TensorFlow / Keras"   },
            { icon: "🚀", label: "API",             val: "FastAPI + Express.js" },
          ].map(({ icon, label, val }) => (
            <div key={label} className="r-feat-item">
              <span className="r-feat-icon">{icon}</span>
              <div>
                <div className="r-feat-label">{label}</div>
                <div className="r-feat-val">{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}