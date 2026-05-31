const multer = require("multer");

// Simpan file di RAM (buffer), bukan di disk
// → lebih cepat karena langsung diteruskan ke model AI
const storage = multer.memoryStorage();

// Filter: hanya terima file gambar
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true); // terima file
  } else {
    cb(new Error("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // maks 5MB
  },
});

module.exports = upload;