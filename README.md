# 🗑️ Trashify — Smart Waste Classification

<div align="center">

![Trashify Banner](https://img.shields.io/badge/Trashify-Smart%20Waste%20Classification-3B6D11?style=for-the-badge&logo=leaf&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-3B6D11?style=for-the-badge&logo=vercel)](https://capstone-psi-jade.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://trashify-production.up.railway.app/api/health)
![Node](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**Aplikasi klasifikasi sampah berbasis AI menggunakan Computer Vision (CNN) yang membantu masyarakat memilah sampah dengan benar hanya dari foto.**

[🚀 Demo Langsung](https://capstone-psi-jade.vercel.app) · [📋 API Health](https://trashify-production.up.railway.app/api/health)

</div>

---

## 📋 Daftar Isi

- [Tentang Aplikasi](#-tentang-aplikasi)
- [Fitur](#-fitur)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Tech Stack](#-tech-stack)
- [Cara Menjalankan Lokal](#-cara-menjalankan-lokal)
- [Cara Deploy](#-cara-deploy)
- [Endpoint API](#-endpoint-api)
- [Struktur Folder](#-struktur-folder)
- [Capstone CC26-PSU346](#-tim)

---

## 🌱 Tentang Aplikasi

Trashify adalah aplikasi web yang membantu pengguna mengidentifikasi jenis sampah menggunakan kamera atau upload gambar. Model AI berbasis Convolutional Neural Network (CNN) akan menganalisis gambar dan mengklasifikasikan sampah ke dalam 3 kategori:

| Kategori | Contoh |
|---|---|
| 🟢 **Organik** | Kulit buah, daun, sisa makanan |
| 🔵 **Anorganik** | Botol plastik, kaleng, kardus |
| 🔴 **Residu** | Masker, styrofoam, pembalut |

---

## ✨ Fitur

- 📸 **Upload Gambar** — drag & drop atau pilih dari galeri
- 📷 **Kamera Langsung** — foto sampah langsung dari browser
- 🤖 **Klasifikasi AI** — hasil deteksi dengan confidence score
- 📊 **Riwayat Scan** — tersimpan otomatis di database
- 📱 **Responsive** — bisa diakses dari HP maupun desktop
- 🌐 **Demo Mode** — tetap bisa digunakan meski backend offline

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │  HTTP   │                  │  HTTP   │                 │
│   Frontend      │────────▶│   Backend        │────────▶│   AI Model      │
│   React + Vite  │         │   Express.js     │         │   FastAPI + CNN  │
│   (Vercel)      │◀────────│   (Railway)      │◀────────│   (Railway)     │
│                 │         │        │         │         │                 │
└─────────────────┘         │        ▼         │         └─────────────────┘
                            │   MySQL DB       │
                            │   (Railway)      │
                            └──────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + Vite
- **Axios** — HTTP client
- **PWA** — Service Worker + Web Manifest

### Backend
- **Node.js** + **Express.js**
- **Sequelize ORM** + **MySQL2**
- **Multer** — upload gambar
- **CORS** — cross-origin support

### AI Model
- **Python** + **FastAPI**
- **TensorFlow / Keras** — model CNN
- **Pillow** + **NumPy** — image processing
- **Uvicorn** — ASGI server

### Infrastructure
- **Vercel** — hosting frontend
- **Railway** — hosting backend, AI model, dan MySQL

---

## 🚀 Cara Menjalankan Lokal

### Prasyarat

Pastikan sudah terinstall:
- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.9+
- [XAMPP](https://www.apachefriends.org/) (untuk MySQL lokal)
- [Git](https://git-scm.com/)

---

### 1. Clone Repository

```bash
git clone https://github.com/Ziizeiy25/trashify.git
cd trashify
```

---

### 2. Jalankan AI Model (Python/FastAPI)

```bash
cd ai_model
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

AI Model akan berjalan di `http://localhost:8000`

---

### 3. Jalankan Backend (Node.js/Express)

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trashify
DB_USER=root
DB_PASS=
AI_MODEL_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

> ⚠️ Pastikan XAMPP MySQL sudah dijalankan dan database `trashify` sudah dibuat.

```bash
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

---

### 4. Jalankan Frontend (React/Vite)

```bash
cd ..
npm install
```

Buat file `.env` di folder root:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

---

## ☁️ Cara Deploy

### Frontend → Vercel

1. Push ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Tambahkan Environment Variable:
   ```
   VITE_API_URL = https://your-backend.up.railway.app
   ```
4. Deploy

### Backend & AI Model → Railway

1. Buat project baru di [railway.app](https://railway.app)
2. Tambahkan service MySQL dari Railway
3. Deploy backend dan AI model dari GitHub
4. Tambahkan Environment Variables di backend service:
   ```
   DB_HOST     = mysql.railway.internal
   DB_PORT     = 3306
   DB_NAME     = railway
   DB_USER     = root
   DB_PASS     = your-password
   AI_MODEL_URL= https://your-ai-model.up.railway.app
   FRONTEND_URL= https://your-frontend.vercel.app
   ```

---

## 📡 Endpoint API

Base URL: `https://trashify-production.up.railway.app`

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Cek status server & database |
| `POST` | `/api/classify` | Upload gambar untuk diklasifikasi |
| `GET` | `/api/history` | Ambil semua riwayat deteksi |
| `POST` | `/api/history` | Simpan hasil deteksi baru |
| `DELETE` | `/api/history` | Hapus semua riwayat |
| `DELETE` | `/api/history/:id` | Hapus satu riwayat |

### Contoh Request Klasifikasi

```bash
curl -X POST https://trashify-production.up.railway.app/api/classify \
  -F "image=@foto-sampah.jpg"
```

### Contoh Response

```json
{
  "success": true,
  "category": "anorganic",
  "confidence": 92,
  "itemName": "Botol Plastik"
}
```

---

## 📁 Struktur Folder

```
trashify/
├── src/                        # Frontend React
│   ├── components/             # Komponen UI
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ScanSection.jsx
│   │   ├── History.jsx
│   │   ├── Categories.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Footer.jsx
│   │   └── Toast.jsx
│   ├── services/
│   │   └── api.js              # Axios API calls
│   ├── constants.js
│   ├── styles.js
│   └── App.jsx
├── public/
│   ├── sw.js                   # Service Worker (PWA)
│   ├── manifest.json           # Web App Manifest
│   └── favicon.svg
├── backend/
│   ├── config/
│   │   └── database.js         # Sequelize config
│   ├── models/
│   │   └── Detection.js        # Model tabel detections
│   ├── routes/
│   │   ├── classify.js         # Route POST /api/classify
│   │   └── history.js          # Route GET/POST/DELETE /api/history
│   ├── middleware/
│   │   └── upload.js           # Multer config
│   └── server.js               # Entry point backend
├── ai_model/
│   ├── main.py                 # FastAPI app
│   ├── model.weights.h5        # Model CNN terlatih
│   ├── config.json             # Konfigurasi model
│   ├── metadata.json           # Metadata kelas
│   └── requirements.txt
├── package.json
└── vite.config.js
```

---

## 👥 Tim

**CC26-PSU346** — Capstone Project

| Nama | Role |
|---|---|
| Rezy Putratama Hendri | Full Stack Developer |
| Alghazi Rabbani | Full Stack Developer |
| Hasna Rosyida Nur Adila | Data Scientist |
| Lita Rahma Sadina | Data Scientist |
| Nadia Maghdalena | AI Engineer |
| Zalvia Inasya Zulna | AI Engineer |
---

<div align="center">

Dibuat dengan oleh tim Capstone CC26-PSU346 untuk lingkungan yang lebih bersih 🌍

</div>
