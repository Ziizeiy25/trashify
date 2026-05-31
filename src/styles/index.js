const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green:        #1D9E75;
    --green-dark:   #085041;
    --green-mid:    #0F6E56;
    --green-light:  #E1F5EE;
    --green-pale:   #F0FAF6;
    --organic:      #3B6D11;
    --organic-bg:   #EAF3DE;
    --organic-mid:  #639922;
    --anorganic:    #0C447C;
    --anorganic-bg: #E6F1FB;
    --anorganic-mid:#378ADD;
    --residu:       #712B13;
    --residu-bg:    #FAECE7;
    --residu-mid:   #D85A30;
    --gray-50:      #F8F9FA;
    --gray-100:     #F1EFE8;
    --gray-200:     #D3D1C7;
    --gray-500:     #888780;
    --gray-700:     #444441;
    --gray-900:     #1A1A18;
    --white:        #FFFFFF;
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
    --radius-sm:    8px;
    --radius-md:    12px;
    --radius-lg:    20px;
    --radius-xl:    32px;
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--gray-50); color: var(--gray-900); min-height: 100vh; line-height: 1.6; }

  /* NAV */
  .t-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(29,158,117,0.15); padding: 0 max(24px, calc((100% - 1120px)/2)); height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .t-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; }
  .t-nav-logo-icon { width: 36px; height: 36px; background: var(--green); border-radius: var(--radius-sm); display: grid; place-items: center; }
  .t-nav-logo-icon svg { width: 20px; height: 20px; }
  .t-nav-brand { font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--green-dark); letter-spacing: -.5px; }
  .t-nav-brand span { color: var(--green); }
  .t-nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
  .t-nav-links a { font-size: 14px; font-weight: 500; color: var(--gray-700); text-decoration: none; transition: color .2s; cursor: pointer; }
  .t-nav-links a:hover { color: var(--green); }
  .t-nav-cta { background: var(--green) !important; color: var(--white) !important; padding: 8px 20px !important; border-radius: 100px !important; font-size: 14px !important; font-weight: 500 !important; transition: background .2s, transform .15s !important; }
  .t-nav-cta:hover { background: var(--green-mid) !important; transform: translateY(-1px) !important; }
  .t-api-status { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 100px; border: 1px solid; }
  .t-api-status.online  { background: var(--organic-bg);  color: var(--organic);  border-color: rgba(59,109,17,0.2);  }
  .t-api-status.offline { background: var(--residu-bg);   color: var(--residu);   border-color: rgba(113,43,19,0.2); }
  .t-api-status.checking{ background: var(--gray-100);    color: var(--gray-500); border-color: var(--gray-200);     }
  .t-api-status-dot { width: 6px; height: 6px; border-radius: 50%; }
  .t-api-status.online  .t-api-status-dot { background: var(--organic-mid); }
  .t-api-status.offline .t-api-status-dot { background: var(--residu-mid);  }
  .t-api-status.checking .t-api-status-dot { background: var(--gray-500);   }

  /* HERO */
  .t-hero { padding: 80px max(24px, calc((100% - 1120px)/2)) 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .t-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: var(--green-light); color: var(--green-dark); font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 6px 14px; border-radius: 100px; margin-bottom: 20px; }
  .t-hero-eyebrow::before { content:''; width: 6px; height: 6px; background: var(--green); border-radius: 50%; }
  .t-hero-title { font-family: var(--font-display); font-size: clamp(36px,4vw,56px); font-weight: 800; line-height: 1.1; letter-spacing: -1.5px; color: var(--gray-900); margin-bottom: 20px; }
  .t-hero-title .accent { color: var(--green); }
  .t-hero-desc { font-size: 17px; font-weight: 300; color: var(--gray-700); line-height: 1.7; margin-bottom: 36px; max-width: 480px; }
  .t-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .t-hero-stats { display: flex; gap: 32px; margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--gray-100); }
  .t-stat-num { font-family: var(--font-display); font-size: 28px; font-weight: 800; color: var(--green-dark); line-height: 1; }
  .t-stat-label { font-size: 13px; color: var(--gray-500); margin-top: 4px; }
  .t-hero-visual { position: relative; }
  .t-scanner-card { background: var(--white); border-radius: var(--radius-xl); border: 1px solid rgba(29,158,117,0.12); padding: 24px; box-shadow: 0 32px 80px rgba(29,158,117,0.08), 0 4px 16px rgba(0,0,0,0.04); }
  .t-scanner-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .t-scanner-title { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--gray-900); }
  .t-scanner-badge { background: var(--green-light); color: var(--green-dark); font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; letter-spacing: .04em; }
  .t-scanner-area { background: var(--gray-50); border: 2px dashed rgba(29,158,117,0.3); border-radius: var(--radius-lg); height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; position: relative; overflow: hidden; margin-bottom: 20px; cursor: pointer; transition: border-color .2s, background .2s; }
  .t-scanner-area:hover { border-color: var(--green); background: var(--green-pale); }
  .t-scanner-area-icon { width: 56px; height: 56px; background: var(--green-light); border-radius: 50%; display: grid; place-items: center; }
  .t-scanner-area-icon svg { width: 28px; height: 28px; color: var(--green); }
  .t-scanner-area-text strong { display: block; font-size: 14px; font-weight: 500; color: var(--gray-700); }
  .t-scanner-area-text span { font-size: 12px; color: var(--gray-500); }
  .t-corner { position: absolute; width: 20px; height: 20px; border-color: var(--green); border-style: solid; }
  .t-corner-tl { top: 12px; left: 12px;  border-width: 2px 0 0 2px; }
  .t-corner-tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
  .t-corner-bl { bottom: 12px; left: 12px;  border-width: 0 0 2px 2px; }
  .t-corner-br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }
  .t-result-preview { display: flex; gap: 8px; }
  .t-result-chip { flex: 1; border-radius: var(--radius-md); padding: 12px; text-align: center; }
  .t-result-chip.organic  { background: var(--organic-bg);  }
  .t-result-chip.anorganic{ background: var(--anorganic-bg);}
  .t-result-chip.residu   { background: var(--residu-bg);   }
  .t-result-chip-icon  { font-size: 22px; margin-bottom: 4px; display: block; }
  .t-result-chip-label { font-size: 11px; font-weight: 600; }
  .t-result-chip.organic   .t-result-chip-label { color: var(--organic);   }
  .t-result-chip.anorganic .t-result-chip-label { color: var(--anorganic); }
  .t-result-chip.residu    .t-result-chip-label { color: var(--residu);    }
  .t-hero-badge { position: absolute; background: var(--white); border: 1px solid rgba(0,0,0,0.06); border-radius: var(--radius-md); padding: 10px 14px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
  .t-hero-badge-dot { width: 8px; height: 8px; border-radius: 50%; }
  .t-badge-top    { top: -16px;    right: 24px; }
  .t-badge-bottom { bottom: -16px; left:  24px; }

  /* SECTION COMMON */
  .t-section { padding: 80px max(24px, calc((100% - 1120px)/2)); }
  .t-section-label { font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--green); margin-bottom: 12px; }
  .t-section-title { font-family: var(--font-display); font-size: clamp(28px,3vw,40px); font-weight: 800; letter-spacing: -1px; color: var(--gray-900); margin-bottom: 16px; line-height: 1.15; }
  .t-section-desc  { font-size: 16px; font-weight: 300; color: var(--gray-700); max-width: 560px; line-height: 1.7; }

  /* BUTTONS */
  .t-btn-primary   { display: inline-flex; align-items: center; gap: 8px; background: var(--green); color: var(--white); padding: 14px 28px; border-radius: 100px; font-size: 15px; font-weight: 500; text-decoration: none; border: none; cursor: pointer; transition: background .2s, transform .15s; font-family: var(--font-body); }
  .t-btn-primary:hover { background: var(--green-mid); transform: translateY(-2px); }
  .t-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .t-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--gray-700); padding: 14px 24px; border-radius: 100px; font-size: 15px; font-weight: 500; text-decoration: none; border: 1.5px solid var(--gray-200); cursor: pointer; transition: border-color .2s, color .2s; font-family: var(--font-body); }
  .t-btn-secondary:hover { border-color: var(--green); color: var(--green); }
  .t-btn-camera    { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--green); padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 500; border: 1.5px solid var(--green); cursor: pointer; transition: background .2s; font-family: var(--font-body); }
  .t-btn-camera:hover { background: var(--green-light); }

  /* SCAN SECTION */
  .t-scan-section  { background: var(--white); border-top: 1px solid var(--gray-100); border-bottom: 1px solid var(--gray-100); }
  .t-scan-header   { text-align: center; margin-bottom: 48px; }
  .t-scan-container{ display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
  .t-scan-actions  { margin-top: 16px; display: flex; gap: 12px; }
  .t-scan-actions .t-btn-primary { flex: 1; justify-content: center; }
  .t-demo-banner   { background: #FAEEDA; border: 1px solid rgba(186,117,23,0.3); border-radius: var(--radius-md); padding: 10px 16px; display: flex; align-items: center; gap: 10px; font-size: 13px; color: #633806; margin-bottom: 16px; }
  .t-demo-banner strong { font-weight: 600; }

  /* UPLOAD */
  .t-upload-panel  { background: var(--gray-50); border: 1.5px dashed var(--gray-200); border-radius: var(--radius-xl); padding: 40px 32px; text-align: center; transition: border-color .25s, background .25s; cursor: pointer; }
  .t-upload-panel.drag-over, .t-upload-panel:hover { border-color: var(--green); background: var(--green-pale); }
  .t-upload-icon-wrap { width: 80px; height: 80px; background: var(--green-light); border-radius: 50%; display: grid; place-items: center; margin: 0 auto 20px; }
  .t-upload-icon-wrap svg { width: 40px; height: 40px; color: var(--green); }
  .t-upload-title  { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--gray-900); margin-bottom: 8px; }
  .t-upload-desc   { font-size: 14px; color: var(--gray-500); margin-bottom: 24px; line-height: 1.6; }
  .t-upload-divider{ display: flex; align-items: center; gap: 12px; margin: 20px 0; color: var(--gray-500); font-size: 13px; }
  .t-upload-divider::before, .t-upload-divider::after { content:''; flex: 1; height: 1px; background: var(--gray-200); }

  /* PREVIEW */
  .t-preview-box   { position: relative; border-radius: var(--radius-lg); overflow: hidden; background: var(--gray-100); aspect-ratio: 4/3; }
  .t-preview-box img { width: 100%; height: 100%; object-fit: cover; }
  .t-preview-overlay { position: absolute; bottom: 12px; right: 12px; display: flex; gap: 8px; }
  .t-preview-btn   { background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-sm); padding: 6px 12px; font-size: 12px; font-weight: 500; cursor: pointer; color: var(--gray-700); font-family: var(--font-body); }
  .t-preview-btn.danger { color: var(--residu); }

  /* CAMERA */
  .t-camera-panel    { display: flex; flex-direction: column; gap: 12px; }
  .t-camera-viewport { border-radius: var(--radius-lg); overflow: hidden; background: var(--gray-900); aspect-ratio: 4/3; position: relative; }
  .t-camera-viewport video { width: 100%; height: 100%; object-fit: cover; }
  .t-camera-corner   { position: absolute; width: 24px; height: 24px; border-color: var(--green); border-style: solid; }
  .t-c-tl { top: 12px;    left: 12px;  border-width: 2px 0 0 2px; }
  .t-c-tr { top: 12px;    right: 12px; border-width: 2px 2px 0 0; }
  .t-c-bl { bottom: 12px; left: 12px;  border-width: 0 0 2px 2px; }
  .t-c-br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }
  .t-scan-line { position: absolute; left: 10%; width: 80%; height: 2px; background: linear-gradient(90deg, transparent, var(--green), transparent); top: 20%; animation: scanAnim 2s ease-in-out infinite; }
  @keyframes scanAnim { 0%{top:15%;opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{top:85%;opacity:0} }
  .t-camera-controls { display: flex; justify-content: center; gap: 16px; align-items: center; }
  .t-btn-capture     { width: 56px; height: 56px; border-radius: 50%; background: var(--green); border: 3px solid var(--white); box-shadow: 0 0 0 2px var(--green); cursor: pointer; transition: transform .15s; }
  .t-btn-capture:hover { transform: scale(1.05); }
  .t-btn-stop-camera { display: inline-flex; align-items: center; gap: 6px; background: transparent; color: var(--residu); padding: 8px 16px; border-radius: 100px; font-size: 13px; border: 1.5px solid var(--residu-mid); cursor: pointer; font-family: var(--font-body); }

  /* RESULT */
  .t-result-panel  { display: flex; flex-direction: column; gap: 16px; }
  .t-result-main   { background: var(--white); border: 1px solid var(--gray-100); border-radius: var(--radius-xl); padding: 28px; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; }
  .t-result-idle-icon  { width: 64px; height: 64px; background: var(--gray-100); border-radius: 50%; display: grid; place-items: center; }
  .t-result-idle-icon svg { width: 32px; height: 32px; color: var(--gray-500); }
  .t-result-idle-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--gray-700); }
  .t-result-idle-desc  { font-size: 13px; color: var(--gray-500); max-width: 240px; }
  .t-spinner { width: 48px; height: 48px; border: 3px solid var(--green-light); border-top-color: var(--green); border-radius: 50%; animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .t-loading-text { font-size: 14px; color: var(--gray-700); font-weight: 500; }
  .t-loading-sub  { font-size: 12px; color: var(--gray-500); }
  .t-result-category-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 100px; font-size: 13px; font-weight: 600; margin-bottom: 12px; }
  .t-result-category-badge.organic  { background: var(--organic-bg);  color: var(--organic);  }
  .t-result-category-badge.anorganic{ background: var(--anorganic-bg); color: var(--anorganic);}
  .t-result-category-badge.residu   { background: var(--residu-bg);   color: var(--residu);   }
  .t-result-name       { font-family: var(--font-display); font-size: 24px; font-weight: 800; color: var(--gray-900); margin-bottom: 4px; }
  .t-result-confidence { font-size: 13px; color: var(--gray-500); margin-bottom: 16px; }
  .t-confidence-bar    { width: 100%; height: 6px; background: var(--gray-100); border-radius: 100px; overflow: hidden; margin-bottom: 20px; }
  .t-confidence-fill   { height: 100%; border-radius: 100px; transition: width .8s cubic-bezier(.23,1,.32,1); }
  .t-confidence-fill.organic  { background: var(--organic-mid);  }
  .t-confidence-fill.anorganic{ background: var(--anorganic-mid);}
  .t-confidence-fill.residu   { background: var(--residu-mid);   }

  /* GUIDE */
  .t-guide-card        { background: var(--white); border: 1px solid var(--gray-100); border-radius: var(--radius-xl); overflow: hidden; }
  .t-guide-card-header { padding: 16px 20px; border-bottom: 1px solid var(--gray-100); display: flex; align-items: center; gap: 10px; }
  .t-guide-card-header-icon { width: 32px; height: 32px; border-radius: var(--radius-sm); display: grid; place-items: center; font-size: 16px; }
  .t-guide-card-title  { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--gray-900); }
  .t-guide-steps       { padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; }
  .t-guide-step        { display: flex; gap: 12px; align-items: flex-start; }
  .t-guide-step-num    { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; font-weight: 700; margin-top: 1px; }
  .t-guide-step-num.organic  { background: var(--organic-bg);  color: var(--organic);  }
  .t-guide-step-num.anorganic{ background: var(--anorganic-bg); color: var(--anorganic);}
  .t-guide-step-num.residu   { background: var(--residu-bg);   color: var(--residu);   }
  .t-guide-step-text   { font-size: 13px; color: var(--gray-700); line-height: 1.55; }

  /* HOW IT WORKS */
  .t-how-section { background: var(--gray-50); }
  .t-how-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .t-steps-list  { display: flex; flex-direction: column; gap: 0; position: relative; }
  .t-steps-list::before { content:''; position: absolute; left: 19px; top: 32px; bottom: 32px; width: 2px; background: linear-gradient(to bottom, var(--green-light), var(--green), var(--green-light)); }
  .t-step-item   { display: flex; gap: 20px; align-items: flex-start; padding: 0 0 32px; position: relative; }
  .t-step-item:last-child { padding-bottom: 0; }
  .t-step-circle { flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: var(--white); border: 2px solid var(--green); display: grid; place-items: center; font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--green); position: relative; z-index: 1; }
  .t-step-name   { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; margin-top: 8px; }
  .t-step-desc   { font-size: 14px; color: var(--gray-700); line-height: 1.6; }
  .t-how-visual  { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .t-how-card    { background: var(--white); border: 1px solid var(--gray-100); border-radius: var(--radius-lg); padding: 20px; }
  .t-how-card.span2   { grid-column: span 2; }
  .t-how-card-icon    { font-size: 28px; margin-bottom: 10px; display: block; }
  .t-how-card-title   { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
  .t-how-card-desc    { font-size: 12px; color: var(--gray-500); line-height: 1.55; }

  /* CATEGORIES */
  .t-categories-section { background: var(--white); }
  .t-categories-grid    { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; }
  .t-category-card      { border-radius: var(--radius-xl); padding: 28px 24px; position: relative; overflow: hidden; }
  .t-category-card.organic  { background: var(--organic-bg);  }
  .t-category-card.anorganic{ background: var(--anorganic-bg);}
  .t-category-card.residu   { background: var(--residu-bg);   }
  .t-category-icon { font-size: 40px; margin-bottom: 16px; display: block; }
  .t-category-name { font-family: var(--font-display); font-size: 20px; font-weight: 800; margin-bottom: 8px; }
  .t-category-card.organic   .t-category-name { color: var(--organic);   }
  .t-category-card.anorganic .t-category-name { color: var(--anorganic); }
  .t-category-card.residu    .t-category-name { color: var(--residu);    }
  .t-category-desc     { font-size: 13px; color: var(--gray-700); line-height: 1.6; margin-bottom: 16px; }
  .t-category-examples { display: flex; flex-wrap: wrap; gap: 6px; }
  .t-example-tag { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; }
  .t-category-card.organic   .t-example-tag { background: rgba(59,109,17,0.12);  color: var(--organic);   }
  .t-category-card.anorganic .t-example-tag { background: rgba(12,68,124,0.12);  color: var(--anorganic); }
  .t-category-card.residu    .t-example-tag { background: rgba(113,43,19,0.12);  color: var(--residu);    }
  .t-category-treatment { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.06); display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 500; }
  .t-category-card.organic   .t-category-treatment { color: var(--organic);   }
  .t-category-card.anorganic .t-category-treatment { color: var(--anorganic); }
  .t-category-card.residu    .t-category-treatment { color: var(--residu);    }

  /* HISTORY */
  .t-history-section   { background: var(--gray-50); }
  .t-history-header    { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 32px; }
  .t-history-clear-btn { background: transparent; color: var(--residu-mid); font-size: 13px; font-weight: 500; border: 1px solid rgba(216,90,48,0.3); padding: 8px 16px; border-radius: 100px; cursor: pointer; font-family: var(--font-body); transition: background .2s; }
  .t-history-clear-btn:hover { background: var(--residu-bg); }
  .t-history-list  { display: flex; flex-direction: column; gap: 12px; }
  .t-history-item  { background: var(--white); border: 1px solid var(--gray-100); border-radius: var(--radius-lg); padding: 16px 20px; display: flex; align-items: center; gap: 16px; transition: transform .15s; }
  .t-history-item:hover { transform: translateY(-1px); }
  .t-history-thumb { width: 56px; height: 56px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0; }
  .t-history-thumb-placeholder { width: 56px; height: 56px; border-radius: var(--radius-sm); display: grid; place-items: center; font-size: 24px; flex-shrink: 0; }
  .t-history-thumb-placeholder.organic  { background: var(--organic-bg);  }
  .t-history-thumb-placeholder.anorganic{ background: var(--anorganic-bg);}
  .t-history-thumb-placeholder.residu   { background: var(--residu-bg);   }
  .t-history-info  { flex: 1; }
  .t-history-name  { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
  .t-history-meta  { font-size: 12px; color: var(--gray-500); }
  .t-history-badge { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 100px; }
  .t-history-badge.organic  { background: var(--organic-bg);  color: var(--organic);  }
  .t-history-badge.anorganic{ background: var(--anorganic-bg); color: var(--anorganic);}
  .t-history-badge.residu   { background: var(--residu-bg);   color: var(--residu);   }
  .t-history-empty { text-align: center; padding: 48px 24px; color: var(--gray-500); font-size: 14px; }
  .t-history-empty-icon { font-size: 40px; margin-bottom: 12px; display: block; }
  .t-history-loading{ text-align: center; padding: 32px; color: var(--gray-500); font-size: 14px; }

  /* FOOTER */
  .t-footer      { background: var(--gray-900); color: var(--white); padding: 48px max(24px, calc((100% - 1120px)/2)) 32px; }
  .t-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 40px; }
  .t-footer-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .t-footer-logo-icon { width: 32px; height: 32px; background: var(--green); border-radius: var(--radius-sm); display: grid; place-items: center; }
  .t-footer-logo-icon svg { width: 16px; height: 16px; }
  .t-footer-brand   { font-family: var(--font-display); font-size: 18px; font-weight: 800; color: var(--white); }
  .t-footer-tagline { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6; max-width: 280px; }
  .t-footer-heading { font-family: var(--font-display); font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.9); letter-spacing: .05em; margin-bottom: 16px; }
  .t-footer-links   { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .t-footer-links a { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color .2s; cursor: pointer; }
  .t-footer-links a:hover { color: var(--white); }
  .t-footer-bottom  { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
  .t-footer-copy    { font-size: 13px; color: rgba(255,255,255,0.4); }
  .t-footer-team    { font-size: 13px; color: rgba(255,255,255,0.4); }
  .t-footer-team span { color: var(--green); }

  /* TOAST */
  .t-toast { position: fixed; bottom: 24px; right: 24px; background: var(--gray-900); color: var(--white); padding: 12px 20px; border-radius: var(--radius-md); font-size: 14px; font-weight: 500; z-index: 999; transform: translateY(80px); opacity: 0; transition: all .3s cubic-bezier(.23,1,.32,1); display: flex; align-items: center; gap: 10px; pointer-events: none; }
  .t-toast.show  { transform: translateY(0); opacity: 1; }
  .t-toast-dot   { width: 8px; height: 8px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
  .t-toast.error .t-toast-dot { background: var(--residu-mid); }

  @keyframes ripple { 0%{box-shadow:0 0 0 0 rgba(29,158,117,0.3)} 100%{box-shadow:0 0 0 16px rgba(29,158,117,0)} }
  .t-btn-primary.scanning { animation: ripple 1.2s ease-out infinite; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .t-hero           { grid-template-columns: 1fr; gap: 40px; padding-top: 40px; }
    .t-scan-container { grid-template-columns: 1fr; }
    .t-how-grid       { grid-template-columns: 1fr; }
    .t-categories-grid{ grid-template-columns: 1fr; }
    .t-footer-grid    { grid-template-columns: 1fr; }
    .t-nav            { padding: 0 20px; }
    .t-nav-links      { display: none; }
    .t-hero-badge     { display: none; }
  }
`;

export default styles;