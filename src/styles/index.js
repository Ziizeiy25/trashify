const styles = `
  /* ══════════════════════════════════════════════════════
     TRASHIFY REDESIGN — Nature & Eco + Apple/Linear
  ══════════════════════════════════════════════════════ */

  :root {
    --green-dark:   #27500A;
    --green:        #3B6D11;
    --green-mid:    #639922;
    --green-light:  #97C459;
    --green-pale:   #C0DD97;
    --green-ghost:  #EAF3DE;

    --blue-dark:    #0C447C;
    --blue:         #185FA5;
    --blue-light:   #E6F1FB;

    --amber-dark:   #854F0B;
    --amber:        #BA7517;
    --amber-light:  #FAEEDA;

    --text-1: #1a1a1a;
    --text-2: #4a4a4a;
    --text-3: #7a7a7a;

    --border: rgba(0,0,0,0.08);
    --border-md: rgba(0,0,0,0.14);

    --bg-page: #fafaf8;
    --bg-card: #ffffff;
    --bg-muted: #f4f3ef;

    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    background: var(--bg-page);
    color: var(--text-1);
    -webkit-font-smoothing: antialiased;
  }
  html, body, #root {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  }

  /* ── PAGE SYSTEM ───────────────────────────── */
  .r-page {
    min-height: calc(100vh - 64px);
    animation: r-fadeIn .22s ease-out;
  }
  @keyframes r-fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── NAVBAR ─────────────────────────────────── */
  .r-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 60px;
    background: rgba(250,250,248,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
  }
  .r-nav-logo {
    display: flex; align-items: center; gap: 8px;
    cursor: pointer; text-decoration: none;
  }
  .r-nav-logo-icon {
    width: 30px; height: 30px;
    background: var(--green);
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
  }
  .r-nav-brand {
    font-size: 15px; font-weight: 600;
    color: var(--text-1); letter-spacing: -0.3px;
  }
  .r-nav-links {
    display: flex; align-items: center; gap: 4px;
    list-style: none;
  }
  .r-nav-link {
    font-size: 13px; color: var(--text-2);
    padding: 6px 12px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all .15s;
    text-decoration: none; display: block;
    position: relative;
  }
  .r-nav-link:hover { color: var(--text-1); background: var(--bg-muted); }
  .r-nav-link--active {
    color: var(--green) !important; font-weight: 600;
  }
  .r-nav-link--active::after {
    content: ''; position: absolute;
    bottom: -10px; left: 12px; right: 12px;
    height: 2px; background: var(--green); border-radius: 2px;
  }
  .r-nav-right { display: flex; align-items: center; gap: 10px; }
  .r-nav-cta {
    background: var(--green); color: #fff;
    font-size: 13px; font-weight: 500;
    padding: 7px 16px; border-radius: var(--radius-sm);
    border: none; cursor: pointer; transition: background .15s;
  }
  .r-nav-cta:hover { background: var(--green-dark); }
  .r-api-badge {
    display: flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 500;
    padding: 5px 10px; border-radius: 100px;
    border: 0.5px solid var(--border-md);
  }
  .r-api-dot {
    width: 6px; height: 6px; border-radius: 50%;
  }
  .r-api-badge--online  { color: var(--green); }
  .r-api-badge--online  .r-api-dot { background: var(--green-mid); }
  .r-api-badge--offline { color: var(--amber); }
  .r-api-badge--offline .r-api-dot { background: var(--amber); }
  .r-api-badge--checking { color: var(--text-3); }
  .r-api-badge--checking .r-api-dot { background: var(--text-3); }

  /* ── HERO ───────────────────────────────────── */
  .r-hero-wrapper { background: var(--bg-card); }
  .r-hero {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 64px; align-items: center;
    padding: 72px 80px 60px;
    text-align: center;
  }
    .r-hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;  /* ← tambah ini */
  text-align: center;   /* ← tambah ini */
}

.r-hero-visual {
  /* kolom kanan hero */
}
  .r-eyebrow {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--green-ghost); color: var(--green);
    font-size: 12px; font-weight: 600;
    padding: 5px 14px; border-radius: 100px;
    letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: 24px;
  }
  .r-eyebrow-dot {
    width: 6px; height: 6px;
    background: var(--green-mid); border-radius: 50%;
  }
  .r-hero-h1 {
    font-size: 44px; font-weight: 700;
    line-height: 1.15; letter-spacing: -1px;
    color: var(--text-1); margin-bottom: 18px;
  }
  .r-hero-accent { color: var(--green); }
  .r-hero-desc {
    font-size: 15px; color: var(--text-2);
    line-height: 1.75; margin-bottom: 28px;
    max-width: 440px;
    margin-left: auto; margin-right: auto;
  }
  .r-hero-actions { display: flex; gap: 12px; margin-bottom: 36px; }

  .r-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--green); color: #fff;
    font-size: 14px; font-weight: 500;
    padding: 11px 22px; border-radius: var(--radius-sm);
    border: none; cursor: pointer; transition: background .15s;
  }
  .r-btn-primary:hover { background: var(--green-dark); }
  .r-btn-ghost {
    font-size: 14px; color: var(--text-2);
    padding: 11px 20px; border-radius: var(--radius-sm);
    background: transparent; border: 0.5px solid var(--border-md);
    cursor: pointer; transition: all .15s;
  }
  .r-btn-ghost:hover { background: var(--bg-muted); color: var(--text-1); }

  .r-hero-stats {
    display: flex; gap: 32px;
    padding-top: 24px;
    border-top: 0.5px solid var(--border);
    justify-content: center;
  }
    .r-stat {
  display: flex;
  flex-direction: column;
}
  .r-stat-num {
    font-size: 22px; font-weight: 700;
    color: var(--green); letter-spacing: -0.5px;
  }
  .r-stat-label {
    font-size: 12px; color: var(--text-3); margin-top: 2px;
  }

  /* ── SCANNER CARD ───────────────────────────── */
  .r-scanner-card {
    background: var(--bg-muted);
    border: 0.5px solid var(--border-md);
    border-radius: var(--radius-lg);
    padding: 20px;
  }
  .r-scanner-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 14px;
  }
  .r-scanner-title { font-size: 13px; font-weight: 600; color: var(--text-1); }
  .r-scanner-pill {
    display: flex; align-items: center; gap: 5px;
    background: var(--green-ghost); color: var(--green);
    font-size: 11px; font-weight: 600;
    padding: 4px 10px; border-radius: 100px;
  }
  .r-scanner-pill-dot {
    width: 5px; height: 5px;
    background: var(--green-mid); border-radius: 50%;
  }
  .r-scanner-area {
    background: var(--bg-card);
    border: 1.5px dashed var(--green-light);
    border-radius: var(--radius-md);
    min-height: 240px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 6px;
    cursor: pointer; position: relative;
    margin-bottom: 14px; transition: border-color .15s;
  }
  .r-scanner-area:hover { border-color: var(--green); }
  .r-scanner-corner {
    position: absolute; width: 14px; height: 14px;
    border-color: var(--green); border-style: solid;
  }
  .r-scanner-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
  .r-scanner-corner--tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }
  .r-scanner-corner--bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }
  .r-scanner-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }
  .r-scanner-icon-wrap {
    width: 48px; height: 48px;
    background: var(--green-ghost);
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
  }
  .r-scanner-hint { font-size: 13px; color: var(--text-2); font-weight: 500; }
  .r-scanner-hint--sub { font-size: 11px; color: var(--text-3); font-weight: 400; }
  .r-scanner-chips { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 12px; }
  .r-chip {
    display: flex; flex-direction: column; align-items: center;
    gap: 4px; padding: 10px 6px;
    border-radius: var(--radius-sm);
    font-size: 11px; font-weight: 600;
    border: 0.5px solid var(--border);
  }
  .r-chip span:first-child { font-size: 18px; }
  .r-chip--organic   { background: var(--green-ghost); color: var(--green); }
  .r-chip--anorganic { background: var(--blue-light);  color: var(--blue);  }
  .r-chip--residu    { background: var(--amber-light); color: var(--amber-dark); }
  .r-scanner-detected {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--text-2);
  }
  .r-detected-dot {
    width: 6px; height: 6px;
    background: var(--green-mid); border-radius: 50%;
  }

  /* ── HIGHLIGHTS ─────────────────────────────── */
  .r-highlights {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 20px; padding: 0 80px 64px;
  }
  .r-highlight-card {
    background: var(--bg-muted);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-md);
    padding: 24px;
  }
  .r-highlight-icon { font-size: 28px; margin-bottom: 12px; }
  .r-highlight-title { font-size: 15px; font-weight: 600; color: var(--text-1); margin-bottom: 8px; }
  .r-highlight-desc  { font-size: 13px; color: var(--text-2); line-height: 1.65; }

  /* ── CTA BANNER ─────────────────────────────── */
  .r-cta-banner {
    background: var(--green);
    padding: 56px 32px;
    text-align: center;
  }
  .r-cta-title { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 10px; letter-spacing: -0.5px; }
  .r-cta-desc  { font-size: 15px; color: rgba(255,255,255,0.8); margin-bottom: 24px; }
  .r-cta-banner .r-btn-primary {
    background: #fff; color: var(--green);
    font-weight: 600;
  }
  .r-cta-banner .r-btn-primary:hover { background: var(--green-ghost); }

  /* ── SECTION WRAPPER ─────────────────────────── */
  .r-section-wrapper {
    padding: 64px 80px;
  }
  .r-section-head { margin-bottom: 48px; }
  .r-section-label {
    font-size: 12px; font-weight: 600;
    color: var(--green); text-transform: uppercase;
    letter-spacing: 0.08em; margin-bottom: 10px;
  }
  .r-section-title {
    font-size: 32px; font-weight: 700;
    color: var(--text-1); letter-spacing: -0.6px;
    margin-bottom: 10px;
  }
  .r-section-sub {
    font-size: 15px; color: var(--text-2);
    line-height: 1.7; max-width: 560px;
    margin: 0 auto;
  }

  /* ── HOW IT WORKS ────────────────────────────── */
  .r-steps {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 32px; margin-bottom: 56px;
  }
  .r-step {
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-md);
    padding: 28px 24px;
  }
  .r-step-num {
    font-size: 11px; font-weight: 700;
    color: var(--green-mid); letter-spacing: 0.1em;
    margin-bottom: 12px;
  }
  .r-step-icon { font-size: 32px; margin-bottom: 14px; }
  .r-step-title { font-size: 15px; font-weight: 600; color: var(--text-1); margin-bottom: 8px; }
  .r-step-desc  { font-size: 13px; color: var(--text-2); line-height: 1.65; }

  .r-how-features {
    background: var(--bg-muted);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 32px;
  }
  .r-how-feat-title { font-size: 16px; font-weight: 600; color: var(--text-1); margin-bottom: 20px; }
  .r-how-feat-grid {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 16px;
  }
  .r-feat-item {
    display: flex; align-items: center; gap: 12px;
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px;
  }
  .r-feat-icon { font-size: 20px; }
  .r-feat-label { font-size: 11px; color: var(--text-3); margin-bottom: 2px; }
  .r-feat-val   { font-size: 13px; font-weight: 600; color: var(--text-1); }

  /* ── CATEGORIES ─────────────────────────────── */
  .r-cat-grid {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
  }
  .r-cat-card {
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px 24px;
  }
  .r-cat-card--organic   { border-top: 3px solid var(--green-mid); }
  .r-cat-card--anorganic { border-top: 3px solid var(--blue); }
  .r-cat-card--residu    { border-top: 3px solid var(--amber); }
  .r-cat-icon  { font-size: 36px; margin-bottom: 14px; }
  .r-cat-title { font-size: 18px; font-weight: 700; color: var(--text-1); margin-bottom: 10px; }
  .r-cat-desc  { font-size: 13px; color: var(--text-2); line-height: 1.65; margin-bottom: 16px; }
  .r-cat-items { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .r-cat-tag {
    font-size: 11px; font-weight: 600;
    padding: 4px 10px; border-radius: 100px;
  }
  .r-cat-tag--organic   { background: var(--green-ghost); color: var(--green); }
  .r-cat-tag--anorganic { background: var(--blue-light);  color: var(--blue);  }
  .r-cat-tag--residu    { background: var(--amber-light); color: var(--amber-dark); }
  .r-cat-tip {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 600;
    padding: 8px 12px; border-radius: var(--radius-sm);
    margin-top: auto;
  }
  .r-cat-tip--organic   { background: var(--green-ghost); color: var(--green); }
  .r-cat-tip--anorganic { background: var(--blue-light);  color: var(--blue);  }
  .r-cat-tip--residu    { background: var(--amber-light); color: var(--amber-dark); }

  /* ── HISTORY ─────────────────────────────────── */
  .r-history-topbar {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 24px;
  }
  .r-btn-danger {
    font-size: 13px; color: #c0392b;
    background: transparent; border: 0.5px solid #c0392b;
    padding: 7px 14px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all .15s;
  }
  .r-btn-danger:hover { background: #fdf2f2; }
  .r-history-list { display: flex; flex-direction: column; gap: 12px; }
  .r-history-item {
    display: flex; align-items: center; gap: 16px;
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    border-radius: var(--radius-md);
    padding: 14px 16px;
  }
  .r-history-img {
    width: 56px; height: 56px;
    object-fit: cover; border-radius: var(--radius-sm);
    flex-shrink: 0;
  }
  .r-history-img-placeholder {
    width: 56px; height: 56px;
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .r-history-info { flex: 1; }
  .r-history-name { font-size: 14px; font-weight: 600; color: var(--text-1); margin-bottom: 2px; }
  .r-history-time { font-size: 12px; color: var(--text-3); margin-bottom: 2px; }
  .r-history-conf { font-size: 12px; color: var(--text-2); }
  .r-history-badge {
    font-size: 12px; font-weight: 600;
    padding: 5px 12px; border-radius: 100px; flex-shrink: 0;
    display: flex; align-items: center; gap: 4px;
  }
  .r-history-loading, .r-history-empty {
    text-align: center; padding: 80px 20px;
    color: var(--text-3);
  }
  .r-history-empty-icon { font-size: 48px; margin-bottom: 16px; }
  .r-history-empty-title { font-size: 16px; font-weight: 600; color: var(--text-2); margin-bottom: 8px; }
  .r-history-empty-sub { font-size: 13px; color: var(--text-3); }
  .r-spinner {
    width: 32px; height: 32px;
    border: 3px solid var(--border);
    border-top-color: var(--green);
    border-radius: 50%;
    animation: r-spin .8s linear infinite;
    margin: 0 auto 16px;
  }
  @keyframes r-spin { to { transform: rotate(360deg); } }

  /* ── FOOTER ──────────────────────────────────── */
  .r-footer-brand-col {
  /* tidak perlu style khusus, */
  /* layout sudah dihandle .r-footer-grid */
}
  .r-footer {
    background: #1a1f16;
    padding: 48px 32px 28px;
    margin-top: auto;
  }
  .r-footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr;
    gap: 40px; margin-bottom: 40px;
  }
  .r-footer-logo {
    display: flex; align-items: center; gap: 8px;
    cursor: pointer; margin-bottom: 14px;
  }
  .r-footer-logo-icon {
    width: 28px; height: 28px;
    background: var(--green);
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
  }
  .r-footer-brand { font-size: 15px; font-weight: 600; color: #fff; }
  .r-footer-tagline { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.7; max-width: 300px; text-align: left; }
  .r-footer-heading { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; }
  .r-footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .r-footer-links a {
    font-size: 13px; color: rgba(255,255,255,0.5);
    cursor: pointer; transition: color .15s;
    text-decoration: none;
  }
  .r-footer-links a:hover { color: rgba(255,255,255,0.85); }
  .r-footer-link--active { color: var(--green-pale) !important; }
  .r-footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 24px;
    border-top: 0.5px solid rgba(255,255,255,0.1);
    font-size: 12px; color: rgba(255,255,255,0.3);
  }
  /* ── UNRECOGNIZED STATE ── */
.t-unrecognized-box {
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  padding: 32px 16px; gap: 10px;
}
.t-unrecognized-icon { font-size: 48px; }
.t-unrecognized-title {
  font-size: 16px; font-weight: 700;
  color: var(--text-1);
}
.t-unrecognized-msg {
  font-size: 13px; color: var(--text-2);
  line-height: 1.65; max-width: 260px;
}
.t-unrecognized-conf {
  font-size: 13px; font-weight: 600;
  color: var(--amber); margin-top: 4px;
}

  /* ── TOAST ───────────────────────────────────── */
  .r-toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    display: flex; align-items: center; gap: 8px;
    background: #1a1f16; color: #fff;
    font-size: 13px; font-weight: 500;
    padding: 12px 18px; border-radius: var(--radius-md);
    opacity: 0; transform: translateY(12px); pointer-events: none;
    transition: all .25s; max-width: 320px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
  .r-toast--show  { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .r-toast--error { background: #7f1d1d; }
  .r-toast-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--green-pale); flex-shrink: 0;
  }
  .r-toast--error .r-toast-dot { background: #fca5a5; }

/* ── SCAN SECTION ────────────────────────────── */
 
.t-scan-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 56px 32px;
}
 
.t-scan-header {
  margin-bottom: 40px;
  text-align: center;
}
.t-scan-header p {
  max-width: 480px;
  margin: 0 auto;  /* ← ini yang bikin tulisan di tengah halaman */
}
 
.t-section-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--green);
  margin-bottom: 8px;
}
 
.t-section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-1);
  letter-spacing: -0.5px;
  margin-bottom: 6px;
}
 
.t-section-desc {
  font-size: 14px;
  color: var(--text-2);
  max-width: 560px;
}
 
/* Demo Banner */
.t-demo-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fffbea;
  border: 1px solid #f6d860;
  border-radius: var(--radius-sm);
  padding: 10px 16px;
  font-size: 13px;
  color: #7a5c00;
  margin-bottom: 24px;
}
 
/* Main grid container */
.t-scan-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
 
/* ── UPLOAD PANEL ───────────────────────────── */
 
.t-upload-panel {
  background: var(--bg-card);
  border: 1.5px dashed var(--border-md);
  border-radius: var(--radius-lg);
  padding: 40px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
}
 
.t-upload-panel:hover,
.t-upload-panel.drag-over {
  border-color: var(--green-light);
  background: var(--green-ghost);
}
 
.t-upload-icon-wrap {
  width: 52px;
  height: 52px;
  background: var(--bg-muted);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
 
.t-upload-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 6px;
}
 
.t-upload-desc {
  font-size: 13px;
  color: var(--text-3);
  margin-bottom: 20px;
  line-height: 1.5;
}
 
.t-upload-divider {
  text-align: center;
  font-size: 12px;
  color: var(--text-3);
  margin: 12px 0;
}
 
/* ── BUTTONS ────────────────────────────────── */
 
.t-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  background: var(--green);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 20px;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
 
.t-btn-primary:hover {
  background: var(--green-dark);
}
 
.t-btn-primary:disabled {
  background: var(--bg-muted);
  color: var(--text-3);
  cursor: not-allowed;
}
 
.t-btn-primary.scanning {
  opacity: 0.85;
  cursor: wait;
}
 
.t-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--bg-muted);
  color: var(--text-2);
  font-size: 13px;
  font-weight: 500;
  padding: 9px 18px;
  border-radius: var(--radius-sm);
  border: 0.5px solid var(--border-md);
  cursor: pointer;
  transition: background 0.15s;
}
 
.t-btn-secondary:hover {
  background: var(--border);
}
 
.t-btn-camera {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  color: var(--text-2);
  font-size: 13px;
  padding: 9px;
  border-radius: var(--radius-sm);
  border: 0.5px solid var(--border-md);
  cursor: pointer;
  transition: background 0.15s;
}
 
.t-btn-camera:hover {
  background: var(--bg-muted);
}
 
/* ── PREVIEW BOX ────────────────────────────── */
 
.t-preview-box {
  background: var(--bg-card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
}
 
.t-preview-box img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}
 
.t-preview-overlay {
  display: flex;
  gap: 8px;
  padding: 14px;
  background: var(--bg-card);
}
 
.t-preview-btn {
  flex: 1;
  font-size: 13px;
  padding: 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  border: none;
  background: var(--bg-muted);
  color: var(--text-2);
  transition: background 0.15s;
}
 
.t-preview-btn:hover {
  background: var(--border);
}
 
.t-preview-btn.danger {
  background: #fdf2f2;
  color: #c0392b;
}
 
.t-preview-btn.danger:hover {
  background: #fce4e4;
}
 
/* ── CAMERA PANEL ───────────────────────────── */
 
.t-camera-panel {
  background: var(--bg-card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
 
.t-camera-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #000;
  overflow: hidden;
}
 
.t-camera-viewport video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
 
/* Corner brackets */
.t-camera-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: #fff;
  border-style: solid;
  opacity: 0.7;
}
 
.t-c-tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; }
.t-c-tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
.t-c-bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; }
.t-c-br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }
 
/* Scan line animation */
.t-scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--green, #22c55e);
  opacity: 0.8;
  animation: t-scan-sweep 2s linear infinite;
}
 
@keyframes t-scan-sweep {
  0%   { top: 10%; }
  50%  { top: 85%; }
  100% { top: 10%; }
}
 
.t-camera-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--bg-card);
  gap: 12px;
}
 
.t-btn-stop-camera {
  font-size: 13px;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  border: 0.5px solid var(--border-md);
  background: transparent;
  color: var(--text-2);
  cursor: pointer;
  transition: background 0.15s;
}
 
.t-btn-stop-camera:hover {
  background: var(--bg-muted);
}
 
.t-btn-capture {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--green, #22c55e);
  cursor: pointer;
  position: relative;
  transition: transform 0.1s;
}
 
.t-btn-capture:hover {
  transform: scale(1.06);
}
 
.t-btn-capture:active {
  transform: scale(0.95);
}
 
.t-btn-capture::after {
  content: "";
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: var(--green, #22c55e);
}
 
/* ── SCAN ACTION AREA ───────────────────────── */
 
.t-scan-actions {
  margin-top: 16px;
}
 
.t-scan-actions .t-btn-primary {
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  padding: 13px;
}
 
/* ── RESULT PANEL ───────────────────────────── */
 
.t-result-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
 
.t-result-main {
  background: var(--bg-card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
 
/* Idle state */
.t-result-idle-icon {
  width: 56px;
  height: 56px;
  background: var(--bg-muted);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  font-size: 24px;
}
 
.t-result-idle-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 6px;
  text-align: center;
}
 
.t-result-idle-desc {
  font-size: 13px;
  color: var(--text-3);
  text-align: center;
  max-width: 260px;
  line-height: 1.5;
}
 
/* Loading spinner */
.t-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--bg-muted);
  border-top-color: var(--green, #22c55e);
  border-radius: 50%;
  animation: t-spin 0.7s linear infinite;
}
 
@keyframes t-spin {
  to { transform: rotate(360deg); }
}
 
.t-loading-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-1);
}
 
.t-loading-sub {
  font-size: 12px;
  color: var(--text-3);
}
 
/* Result state */
.t-result-category-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 12px;
}
 
.t-result-category-badge.organik {
  background: var(--green-ghost, #f0fdf4);
  color: var(--green-dark, #166534);
}
 
.t-result-category-badge.anorganik {
  background: #eff6ff;
  color: #1d4ed8;
}
 
.t-result-category-badge.residu {
  background: #fffbeb;
  color: #92400e;
}
 
.t-result-category-badge.b3 {
  background: #fef2f2;
  color: #991b1b;
}
 
.t-result-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-1);
  letter-spacing: -0.3px;
  margin-bottom: 4px;
  text-align: center;
}
 
.t-result-confidence {
  font-size: 12px;
  color: var(--text-3);
  margin-bottom: 10px;
  text-align: center;
}
 
/* Confidence bar */
.t-confidence-bar {
  width: 100%;
  height: 6px;
  background: var(--bg-muted);
  border-radius: 3px;
  margin-bottom: 20px;
  overflow: hidden;
}
 
.t-confidence-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease;
  background: var(--green, #22c55e);
}
 
.t-confidence-fill.organik   { background: var(--green-mid, #16a34a); }
.t-confidence-fill.anorganik { background: var(--blue, #3b82f6); }
.t-confidence-fill.residu    { background: var(--amber, #f59e0b); }
.t-confidence-fill.b3        { background: #ef4444; }
 
/* ── GUIDE CARD ─────────────────────────────── */
 
.t-guide-card {
  background: var(--bg-card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
}
 
.t-guide-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
 
.t-guide-card-header-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
 
.t-guide-card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-1);
}
 
.t-guide-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
 
.t-guide-step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
 
.t-guide-step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--bg-muted);
  color: var(--text-2);
}
 
.t-guide-step-text {
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.5;
  padding-top: 2px;
}
 
  /* ── RESPONSIVE ──────────────────────────────── */
  @media (max-width: 768px) {
    .r-nav { padding: 0 16px; }
    .r-nav-links { display: none; }
    .r-hero { grid-template-columns: 1fr; padding: 40px 16px; gap: 32px; }
    .r-hero-h1 { font-size: 32px; }
    .r-highlights { grid-template-columns: 1fr; padding: 0 16px 40px; }
    .r-steps { grid-template-columns: 1fr; }
    .r-how-feat-grid { grid-template-columns: repeat(2,1fr); }
    .r-cat-grid { grid-template-columns: 1fr; }
    .r-footer-grid { grid-template-columns: 1fr; gap: 24px; }
    .r-footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
    .r-section-wrapper { padding: 40px 16px; }
    .t-scan-section { padding: 32px 16px; }
    .t-scan-container { grid-template-columns: 1fr; }
  }
`;

export default styles;