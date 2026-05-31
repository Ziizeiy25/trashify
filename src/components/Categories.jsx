export function Categories() {
  const cats = [
    {
      cls: "organic", icon: "🌿", name: "Organik",
      desc: "Sampah yang berasal dari makhluk hidup dan dapat terurai secara alami. Paling ramah lingkungan dan bernilai tinggi untuk kompos.",
      tags: ["Sisa makanan","Daun kering","Kulit buah","Ampas kopi","Kayu"],
      treatment: "♻️ Bisa dikomposkan atau dijadikan pupuk",
    },
    {
      cls: "anorganic", icon: "♻️", name: "Anorganik",
      desc: "Sampah yang tidak dapat terurai secara alami namun bisa didaur ulang kembali menjadi produk yang berguna.",
      tags: ["Botol plastik","Kertas","Kaleng","Kaca","Kardus"],
      treatment: "🔄 Bisa didaur ulang di bank sampah",
    },
    {
      cls: "residu", icon: "⚠️", name: "Residu",
      desc: "Sampah yang tidak bisa dikomposkan maupun didaur ulang. Memerlukan penanganan khusus agar tidak mencemari lingkungan.",
      tags: ["Popok","Styrofoam","Plastik berlapis","Pembalut","Puntung rokok"],
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