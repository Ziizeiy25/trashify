import { useState, useEffect, useRef, useCallback } from "react";

// Data statis
import { MOCK_RESULTS, CATEGORY_LABELS } from "./constants";

// Networking calls ke backend (RESTful API via axios)
import {
  checkApiHealth,
  classifyWaste,
  fetchHistory,
  saveHistory,
  deleteAllHistory,
} from "./services/api";

// CSS global
import styles from "./styles";

// Komponen UI
import Navbar                            from "./components/Navbar";
import HeroSection                       from "./components/HeroSection";
import ScanSection                       from "./components/ScanSection";
import { HowItWorks, Categories, History, Footer, Toast } from "./components/Sections";

export default function App() {

  // ── STATE: Upload & Kamera ──────────────────────────────────
  const [currentFile, setCurrentFile] = useState(null);
  const [previewSrc,  setPreviewSrc]  = useState("");
  const [mode,        setMode]        = useState("upload"); // "upload" | "preview" | "camera"
  const [isDragOver,  setIsDragOver]  = useState(false);
  const [cameraStream,setCameraStream]= useState(null);

  // ── STATE: Proses Scan ──────────────────────────────────────
  const [scanState,    setScanState]    = useState("idle"); // "idle"|"loading"|"result"|"error"
  const [result,       setResult]       = useState(null);
  const [scanError,    setScanError]    = useState("");
  const [confBarWidth, setConfBarWidth] = useState(0);

  // ── STATE: Riwayat ──────────────────────────────────────────
  const [history,        setHistory]        = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // ── STATE: Koneksi & Mode ───────────────────────────────────
  const [apiStatus,  setApiStatus]  = useState("checking"); // "checking"|"online"|"offline"
  const [isDemoMode, setIsDemoMode] = useState(false);

  // ── STATE: Toast notifikasi ─────────────────────────────────
  const [toast, setToast] = useState({ visible: false, message: "", isError: false });

  // ── REFS ────────────────────────────────────────────────────
  const videoRef      = useRef(null);
  const toastTimerRef = useRef(null);

  // ════════════════════════════════════════════════════════════
  // EFFECT: Cek kesehatan backend saat pertama kali load
  // ════════════════════════════════════════════════════════════
  useEffect(() => {
    const init = async () => {
      try {
        await checkApiHealth();           // GET /api/health
        setApiStatus("online");
        setIsDemoMode(false);
        loadHistoryFromServer();          // GET /api/history
      } catch {
        setApiStatus("offline");
        setIsDemoMode(true);
        loadHistoryFromLocalStorage();    // fallback ke localStorage
      }
    };
    init();
  }, []);

  // EFFECT: Matikan kamera saat komponen unmount (prevent memory leak)
  useEffect(() => {
    return () => {
      if (cameraStream) cameraStream.getTracks().forEach((t) => t.stop());
    };
  }, [cameraStream]);

  // EFFECT: Sambungkan stream ke elemen <video> saat kamera aktif
  useEffect(() => {
    if (mode === "camera" && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [mode, cameraStream]);

  // ════════════════════════════════════════════════════════════
  // TOAST — tampilkan notifikasi singkat
  // ════════════════════════════════════════════════════════════
  const showToast = useCallback((message, isError = false) => {
    setToast({ visible: true, message, isError });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      3000
    );
  }, []);

  // ════════════════════════════════════════════════════════════
  // UTILITY
  // ════════════════════════════════════════════════════════════
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // ════════════════════════════════════════════════════════════
  // HISTORY — ambil & simpan riwayat
  // ════════════════════════════════════════════════════════════
  const loadHistoryFromServer = async () => {
    setHistoryLoading(true);
    try {
      const response = await fetchHistory(); // GET /api/history (RESTful)
      // Response backend: { success: true, count: 1, data: [...] }
      // // Ambil .data yang berisi array-nya, bukan seluruh object
      const arr = Array.isArray(response?.data) ? response.data : [];
      setHistory(arr);
    } catch {
      loadHistoryFromLocalStorage();
    } finally {
      setHistoryLoading(false);
    }
  };

  const loadHistoryFromLocalStorage = () => {
    try {
      setHistory(JSON.parse(localStorage.getItem("trashify_history") || "[]"));
    } catch {
      setHistory([]);
    }
  };

  const saveToLocalStorage = (data) => {
    try { localStorage.setItem("trashify_history", JSON.stringify(data)); } catch {}
  };

  const handleClearHistory = async () => {
    if (history.length === 0) return;
    setHistory([]);
    saveToLocalStorage([]);
    if (!isDemoMode) {
      try { await deleteAllHistory(); } catch {} // DELETE /api/history
    }
    showToast("Riwayat berhasil dihapus");
  };

  // ════════════════════════════════════════════════════════════
  // UPLOAD — validasi dan baca file gambar
  // ════════════════════════════════════════════════════════════
  const loadImageFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran file terlalu besar — maks 5MB", true);
      return;
    }
    if (!file.type.startsWith("image/")) {
      showToast("Format tidak didukung — gunakan JPG, PNG, atau WEBP", true);
      return;
    }
    setCurrentFile(file);
    const reader = new FileReader();
    reader.onload  = (e) => { setPreviewSrc(e.target.result); setMode("preview"); showToast("Gambar berhasil dimuat"); };
    reader.onerror = ()  => showToast("Gagal membaca file — coba lagi", true);
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => { if (e.target.files[0]) loadImageFile(e.target.files[0]); };
  const handleDrop = (e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files[0]) loadImageFile(e.dataTransfer.files[0]); };
  const handleDragOver  = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = ()  => setIsDragOver(false);

  const handleReset = () => {
    setCurrentFile(null);
    setPreviewSrc("");
    setMode("upload");
    resetScanResult();
  };

  // ════════════════════════════════════════════════════════════
  // KAMERA — buka, tutup, ambil foto
  // ════════════════════════════════════════════════════════════
  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 1280, height: 720 },
      });
      setCameraStream(stream);
      setMode("camera");
    } catch (err) {
      showToast(
        err.name === "NotAllowedError"
          ? "Izin kamera ditolak — aktifkan di pengaturan browser"
          : "Tidak dapat mengakses kamera — coba upload gambar",
        true
      );
    }
  };

  const handleStopCamera = () => {
    if (cameraStream) { cameraStream.getTracks().forEach((t) => t.stop()); setCameraStream(null); }
    setMode("upload");
  };

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      handleStopCamera();
      setCurrentFile(file);
      setPreviewSrc(canvas.toDataURL("image/jpeg"));
      setMode("preview");
      showToast("Foto berhasil diambil — siap diklasifikasi");
    }, "image/jpeg", 0.9);
  };

  // ════════════════════════════════════════════════════════════
  // KLASIFIKASI — inti fitur AI
  // ════════════════════════════════════════════════════════════
  const handleClassify = async () => {
    if (!currentFile) return;
    setScanState("loading");
    setResult(null);
    setScanError("");
    setConfBarWidth(0);

    try {
      let data;

      if (isDemoMode) {
        // ── DEMO: simulasi tanpa backend ──
        await new Promise((r) => setTimeout(r, 2000));
        const cats   = ["organic", "anorganic", "residu"];
        const cat    = cats[Math.floor(Math.random() * cats.length)];
        const mock   = MOCK_RESULTS[cat][Math.floor(Math.random() * MOCK_RESULTS[cat].length)];
        data = { category: cat, confidence: mock.conf, itemName: mock.name };
      } else {
        // ── REAL: networking call ke backend (POST /api/classify) ──
        data = await classifyWaste(currentFile);
      }

      if (!data?.category || !CATEGORY_LABELS[data.category]) throw new Error("Response tidak valid");

      // Simpan ke state & history
      const entry = {
        category:   data.category,
        confidence: data.confidence,
        itemName:   data.itemName,
        imgSrc:     previewSrc,
        time:       new Date().toLocaleString("id-ID"),
      };
      setResult({ category: data.category, confidence: data.confidence, itemName: data.itemName });
      setScanState("result");
      setTimeout(() => setConfBarWidth(data.confidence), 50);

      const newHistory = [entry, ...history].slice(0, 20);
      setHistory(newHistory);
      saveToLocalStorage(newHistory);

      if (!isDemoMode) {
        try { await saveHistory(entry); } catch {} // POST /api/history
      }

      showToast(`Klasifikasi selesai — ${CATEGORY_LABELS[data.category]} terdeteksi!`);

    } catch (err) {
      setScanState("error");
      let msg = "Terjadi kesalahan — coba lagi";
      if (err.code === "ECONNABORTED")         msg = "Koneksi timeout — server lambat merespons";
      else if (err.response?.status === 413)   msg = "Gambar terlalu besar — kompres terlebih dahulu";
      else if (err.response?.status === 422)   msg = "Format gambar tidak didukung oleh model";
      else if (err.response?.data?.message)    msg = err.response.data.message;
      else if (err.message)                    msg = err.message;
      setScanError(msg);
      showToast(msg, true);
    }
  };

  const resetScanResult = () => {
    setScanState("idle");
    setResult(null);
    setScanError("");
    setConfBarWidth(0);
  };

  // ════════════════════════════════════════════════════════════
  // RENDER — hanya memanggil komponen, tidak ada JSX panjang
  // ════════════════════════════════════════════════════════════
  return (
    <>
      <style>{styles}</style>

      <Navbar apiStatus={apiStatus} scrollTo={scrollTo} />

      <HeroSection scrollTo={scrollTo} />

      <ScanSection
        // State upload
        mode={mode} previewSrc={previewSrc} isDragOver={isDragOver} currentFile={currentFile}
        // State scan
        scanState={scanState} result={result} confBarWidth={confBarWidth}
        scanError={scanError} isDemoMode={isDemoMode}
        // Handler upload
        onFileSelect={handleFileSelect} onDrop={handleDrop}
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onReset={handleReset}
        // Handler kamera
        onStartCamera={handleStartCamera} onStopCamera={handleStopCamera}
        onCapture={handleCapture} videoRef={videoRef}
        // Handler scan
        onClassify={handleClassify} onResetResult={resetScanResult}
      />

      <HowItWorks />

      <Categories />

      <History
        history={history}
        historyLoading={historyLoading}
        onClear={handleClearHistory}
      />

      <Footer scrollTo={scrollTo} />

      <Toast
        message={toast.message}
        visible={toast.visible}
        isError={toast.isError}
      />
    </>
  );
}