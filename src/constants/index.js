export const GUIDES = {
  organic: {
    icon: "🌿",
    iconBg: "#EAF3DE",
    title: "Cara Pengelolaan Sampah Organik",
    steps: [
      { num: 1, text: "Pisahkan dari sampah anorganik dan residu untuk menjaga kualitas kompos.", cls: "organic" },
      { num: 2, text: "Masukkan ke tempat sampah organik (umumnya berwarna hijau/cokelat).", cls: "organic" },
      { num: 3, text: "Bisa langsung dijadikan kompos rumahan dengan wadah tertutup.", cls: "organic" },
      { num: 4, text: "Serahkan ke bank sampah atau petugas kebersihan untuk diolah menjadi pupuk.", cls: "organic" },
    ],
  },
  anorganic: {
    icon: "♻️",
    iconBg: "#E6F1FB",
    title: "Cara Pengelolaan Sampah Anorganik",
    steps: [
      { num: 1, text: "Bersihkan dari sisa makanan atau cairan sebelum dibuang agar tidak mencemari.", cls: "anorganic" },
      { num: 2, text: "Pisahkan berdasarkan jenisnya: plastik, kertas, kaca, dan logam terpisah.", cls: "anorganic" },
      { num: 3, text: "Simpan di tempat sampah anorganik (umumnya berwarna kuning/biru).", cls: "anorganic" },
      { num: 4, text: "Setorkan ke bank sampah terdekat untuk didaur ulang dan mendapat nilai ekonomis.", cls: "anorganic" },
    ],
  },
  residu: {
    icon: "⚠️",
    iconBg: "#FAECE7",
    title: "Cara Pengelolaan Sampah Residu",
    steps: [
      { num: 1, text: "Jangan mencampur sampah residu dengan organik atau anorganik — perlu penanganan khusus.", cls: "residu" },
      { num: 2, text: "Masukkan ke kantong plastik terpisah dan ikat rapat sebelum dibuang.", cls: "residu" },
      { num: 3, text: "Buang ke tempat sampah umum (berwarna merah/abu) untuk dibawa ke TPA.", cls: "residu" },
      { num: 4, text: "Jika merupakan limbah B3 (baterai, obat kadaluarsa), serahkan ke drop-off khusus.", cls: "residu" },
    ],
  },
};

// Dipakai saat backend tidak tersedia (Demo Mode)
export const MOCK_RESULTS = {
  organic:  [
    { name: "Sisa Makanan",      conf: 94 },
    { name: "Kulit Buah",        conf: 88 },
    { name: "Daun Kering",       conf: 91 },
  ],
  anorganic: [
    { name: "Botol Plastik",     conf: 89 },
    { name: "Kertas Bekas",      conf: 85 },
    { name: "Kaleng Aluminium",  conf: 92 },
  ],
  residu: [
    { name: "Styrofoam",         conf: 86 },
    { name: "Plastik Berlapis",  conf: 78 },
    { name: "Pembalut Bekas",    conf: 82 },
  ],
};

export const CATEGORY_LABELS = {
  organic:  "Organik",
  anorganic: "Anorganik",
  residu:   "Residu",
};

export const CATEGORY_ICONS = {
  organic:  "🌿",
  anorganic: "♻️",
  residu:   "⚠️",
};