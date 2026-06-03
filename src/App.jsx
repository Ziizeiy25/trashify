import { useState, useEffect, useRef, useCallback } from "react";
import { MOCK_RESULTS, CATEGORY_LABELS } from "./constants";
import { checkApiHealth, classifyWaste, fetchHistory, saveHistory, deleteAllHistory } from "./services/api";

import  Navbar       from "./components/Navbar";
import  HeroSection  from "./components/HeroSection";
import  ScanSection  from "./components/ScanSection";
import  HowItWorks   from "./components/HowItWorks";
import  Categories   from "./components/Categories";
import { History }     from "./components/History";
import  Footer       from "./components/Footer";
import  Toast        from "./components/Toast";

const PAGES = ["home", "scan", "cara-kerja", "kategori", "riwayat"];
const allowedTypes = [ "image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/bmp", "image/tiff", "image/heic", "image/heif", "image/svg+xml"];

export default function App() {
  const [activePage,      setActivePage]      = useState("home");
  const [currentFile,     setCurrentFile]     = useState(null);
  const [previewSrc,      setPreviewSrc]      = useState("");
  const [mode,            setMode]            = useState("upload");
  const [isDragOver,      setIsDragOver]      = useState(false);
  const [cameraStream,    setCameraStream]    = useState(null);
  const [scanState,       setScanState]       = useState("idle");
  const [result,          setResult]          = useState(null);
  const [scanError,       setScanError]       = useState("");
  const [confBarWidth,    setConfBarWidth]    = useState(0);
  const [history,         setHistory]         = useState([]);
  const [historyLoading,  setHistoryLoading]  = useState(false);
  const [apiStatus,       setApiStatus]       = useState("checking");
  const [isDemoMode,      setIsDemoMode]      = useState(false);
  const [toast,           setToast]           = useState({ visible: false, message: "", isError: false });

  const videoRef      = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        await checkApiHealth();
        setApiStatus("online");
        setIsDemoMode(false);
        loadHistoryFromServer();
      } catch {
        setApiStatus("offline");
        setIsDemoMode(true);
        loadHistoryFromLocalStorage();
      }
    };
    init();
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activePage]);

  useEffect(() => {
    return () => { if (cameraStream) cameraStream.getTracks().forEach(t => t.stop()); };
  }, [cameraStream]);

  useEffect(() => {
    if (mode === "camera" && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [mode, cameraStream]);

  const navigate = useCallback((page) => {
    if (PAGES.includes(page)) setActivePage(page);
  }, []);

  const showToast = useCallback((message, isError = false) => {
    setToast({ visible: true, message, isError });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setToast(t => ({ ...t, visible: false })), 3000
    );
  }, []);

  const loadHistoryFromServer = async () => {
    setHistoryLoading(true);
    try {
      const response = await fetchHistory();
      const arr = Array.isArray(response?.data) ? response.data : [];
      setHistory(arr);
    } catch { loadHistoryFromLocalStorage(); }
    finally { setHistoryLoading(false); }
  };

  const loadHistoryFromLocalStorage = () => {
    try { setHistory(JSON.parse(localStorage.getItem("trashify_history") || "[]")); }
    catch { setHistory([]); }
  };

  const saveToLocalStorage = (data) => {
    try { localStorage.setItem("trashify_history", JSON.stringify(data)); } catch {}
  };

  const handleClearHistory = async () => {
    if (history.length === 0) return;
    setHistory([]);
    saveToLocalStorage([]);
    if (!isDemoMode) { try { await deleteAllHistory(); } catch {} }
    showToast("Riwayat berhasil dihapus");
  };

  const loadImageFile = (file) => {
    if (file.size > 5 * 1024 * 1024) { showToast("Ukuran file terlalu besar — maks 5MB", true); return; }
    if (!allowedTypes.includes(file.type)) { showToast("Format tidak didukung — gunakan JPG, PNG, WEBP, GIF, BMP, TIFF, atau HEIC", true); return; }
    setCurrentFile(file);
    const reader = new FileReader();
    reader.onload  = (e) => { setPreviewSrc(e.target.result); setMode("preview"); showToast("Gambar berhasil dimuat"); };
    reader.onerror = ()  => showToast("Gagal membaca file — coba lagi", true);
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => { if (e.target.files[0]) loadImageFile(e.target.files[0]); };
  const handleDrop       = (e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files[0]) loadImageFile(e.dataTransfer.files[0]); };
  const handleDragOver   = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave  = ()  => setIsDragOver(false);
  const handleReset      = ()  => { setCurrentFile(null); setPreviewSrc(""); setMode("upload"); resetScanResult(); };

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setCameraStream(stream); setMode("camera");
    } catch (err) {
      showToast(err.name === "NotAllowedError"
        ? "Izin kamera ditolak — aktifkan di pengaturan browser"
        : "Tidak dapat mengakses kamera — coba upload gambar", true);
    }
  };

  const handleStopCamera = () => {
    if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); setCameraStream(null); }
    setMode("upload");
  };

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      handleStopCamera();
      setCurrentFile(file); setPreviewSrc(canvas.toDataURL("image/jpeg")); setMode("preview");
      showToast("Foto berhasil diambil");
    }, "image/jpeg", 0.9);
  };

  const handleClassify = async () => {
    if (!currentFile) return;
    setScanState("loading"); setResult(null); setScanError(""); setConfBarWidth(0);
    try {
      let data;
      if (isDemoMode) {
        await new Promise(r => setTimeout(r, 2000));
        const cats = ["organic", "anorganic", "residu"];
        const cat  = cats[Math.floor(Math.random() * cats.length)];
        const mock = MOCK_RESULTS[cat][Math.floor(Math.random() * MOCK_RESULTS[cat].length)];
        data = { category: cat, confidence: mock.conf, itemName: mock.name };
      } else {
        data = await classifyWaste(currentFile);
      }
      if (!data?.category || !CATEGORY_LABELS[data.category]) throw new Error("Response tidak valid");
      // ── THRESHOLD CHECK — bukan sampah jika confidence < 85% ──
if (data.confidence < 85) {
  setScanState("unrecognized");
  setResult({ confidence: data.confidence });
  showToast("Gambar tidak dikenali sebagai sampah", true);
  return;
}
      const entry = { category: data.category, confidence: data.confidence, itemName: data.itemName, imgSrc: previewSrc, time: new Date().toLocaleString("id-ID") };
      setResult({ category: data.category, confidence: data.confidence, itemName: data.itemName });
      setScanState("result");
      setTimeout(() => setConfBarWidth(data.confidence), 50);
      const newHistory = [entry, ...history].slice(0, 20);
      setHistory(newHistory); saveToLocalStorage(newHistory);
      if (!isDemoMode) { try { await saveHistory(entry); } catch {} }
      showToast(`${CATEGORY_LABELS[data.category]} terdeteksi!`);
    } catch (err) {
      setScanState("error");
      let msg = "Terjadi kesalahan — coba lagi";
      if (err.code === "ECONNABORTED")       msg = "Koneksi timeout";
      else if (err.response?.status === 413) msg = "Gambar terlalu besar";
      else if (err.response?.data?.message)  msg = err.response.data.message;
      else if (err.message)                  msg = err.message;
      setScanError(msg); showToast(msg, true);
    }
  };

  const resetScanResult = () => { setScanState("idle"); setResult(null); setScanError(""); setConfBarWidth(0); };

  const scanProps = {
    mode, previewSrc, isDragOver, currentFile, scanState, result,
    confBarWidth, scanError, isDemoMode,
    onFileSelect: handleFileSelect, onDrop: handleDrop,
    onDragOver: handleDragOver, onDragLeave: handleDragLeave, onReset: handleReset,
    onStartCamera: handleStartCamera, onStopCamera: handleStopCamera,
    onCapture: handleCapture, videoRef,
    onClassify: handleClassify, onResetResult: resetScanResult,
  };

  return (
    <>
      <Navbar apiStatus={apiStatus} activePage={activePage} navigate={navigate} />

      <main>
        {activePage === "home"      && <HeroSection navigate={navigate} />}
        {activePage === "scan"      && <div className="r-page"><ScanSection {...scanProps} /></div>}
        {activePage === "cara-kerja"&& <div className="r-page"><HowItWorks /></div>}
        {activePage === "kategori"  && <div className="r-page"><Categories /></div>}
        {activePage === "riwayat"   && <div className="r-page"><History history={history} historyLoading={historyLoading} onClear={handleClearHistory} /></div>}
      </main>

      <Footer navigate={navigate} activePage={activePage} />
      <Toast message={toast.message} visible={toast.visible} isError={toast.isError} />
    </>
  );
}