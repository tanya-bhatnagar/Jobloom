import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";


// ─── Markdown Renderer ─────────────────────────────────────────────────────────
const RenderAnalysis = ({ text }) => {
  if (!text) return null;
  const sections = text.split(/(?=\*\*)/);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sections.map((section, i) => {
        if (!section.trim()) return null;
        const headingMatch = section.match(/^\*\*(.+?)\*\*\n([\s\S]*)/);
        if (!headingMatch) return null;

        const heading = headingMatch[1];
        const content = headingMatch[2].trim();
        const lines   = content.split('\n').filter(l => l.trim());

        return (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1.5px solid #fde68a',
            borderRadius: '14px', padding: '16px 18px',
            boxShadow: '0 2px 8px rgba(180,140,0,.07)',
          }}>
            <h3 style={{
              fontFamily: "'Sora', sans-serif", fontSize: '11px',
              fontWeight: 700, letterSpacing: '.1em',
              textTransform: 'uppercase', color: '#92400e',
              margin: '0 0 10px',
            }}>{heading}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {lines.map((line, j) => {
                if (line.startsWith('* ')) return (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>•</span>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13.5px', color: '#44403c', margin: 0, lineHeight: 1.6 }}>{line.slice(2)}</p>
                  </div>
                );
                if (/^\d+$/.test(line.trim())) return (
                  <p key={j} style={{ fontFamily: "'Sora', sans-serif", fontSize: '36px', fontWeight: 700, color: '#f59e0b', margin: 0 }}>
                    {line.trim()}<span style={{ fontSize: '16px', color: '#a8a29e' }}>/100</span>
                  </p>
                );
                return (
                  <p key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13.5px', color: '#44403c', margin: 0, lineHeight: 1.6 }}>{line}</p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Score Helpers ─────────────────────────────────────────────────────────────
const getScoreColor  = s => s >= 80 ? '#15803d'  : s >= 65 ? '#b45309' : '#b91c1c';
const getScoreBorder = s => s >= 80 ? '#bbf7d0'  : s >= 65 ? '#fde68a' : '#fca5a5';
const getScoreBg     = s => s >= 80 ? '#f0fdf4'  : s >= 65 ? '#fefce8' : '#fff1f2';
const getScoreLabel  = s => s >= 80 ? '🎉 Excellent' : s >= 65 ? '⚠️ Needs Improvement' : '❌ Poor ATS Compatibility';

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ResumeChecker() {
  const [file,    setFile]    = useState(null);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume first!");
    setLoading(true); setError(null); setResult(null);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const res = await axios.post("/api/resume/check", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) setResult(res.data);
      else setError(res.data.message || "Something went wrong.");
    } catch (err) {
      setError(err.response?.data?.message || "Error checking resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === 'application/pdf') { setFile(dropped); setResult(null); setError(null); }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(0deg, rgb(255,250,230) 0%, rgb(254,245,205) 50%, rgb(255,255,255) 100%)',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Navbar />

      {/* ── Page Header ── */}
      <div style={{ padding: '52px 24px 36px', textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          fontFamily: "'Sora', sans-serif", fontSize: '11px', fontWeight: 700,
          letterSpacing: '.12em', textTransform: 'uppercase',
          color: '#b45309', background: '#fef3c7',
          border: '1.5px solid #fde68a',
          padding: '4px 14px', borderRadius: '999px', marginBottom: '14px',
        }}> AI-Powered</span>
        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700,
          color: '#1c1917', margin: '0 0 12px', lineHeight: 1.2,
        }}>Is Your Resume ATS-Ready?</h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#78716c',
          maxWidth: '440px', margin: '0 auto', lineHeight: 1.75,
        }}>
          Upload your PDF resume and get instant AI-powered feedback on ATS compatibility, role fit, and improvement tips.
        </p>
      </div>

      {/* ── Stats row ── */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px', paddingInline: '24px' }}>
        {[
          { num: 'AI',     label: 'Powered'     },
          { num: 'PDF',    label: 'Format'       },
          { num: 'ATS',    label: 'Optimised'    },
          { num: 'Free',   label: 'Always'       },
        ].map(({ num, label }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.75)', border: '1.5px solid #fde68a',
            borderRadius: '12px', padding: '10px 22px', textAlign: 'center',
            backdropFilter: 'blur(8px)', boxShadow: '0 2px 8px rgba(180,140,0,.07)',
          }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '16px', fontWeight: 700, color: '#92400e', margin: 0 }}>{num}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#a8a29e', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 80px', flex: 1, width: '100%', boxSizing: 'border-box' }}>

        {/* ── Upload Card ── */}
        <div style={{
          background: 'rgba(255,255,255,0.78)',
          border: '1.5px solid #fde68a',
          borderRadius: '20px', padding: '32px 28px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 16px rgba(180,140,0,.09)',
        }}>
          <h2 style={{
            fontFamily: "'Sora', sans-serif", fontSize: '20px', fontWeight: 700,
            color: '#1c1917', margin: '0 0 24px', textAlign: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}>
            
            ATS Resume Checker
          </h2>

          {/* Drop zone */}
          <label
            htmlFor="resumeUpload"
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              border: `2px dashed ${dragOver ? '#f59e0b' : file ? '#f59e0b' : '#fcd34d'}`,
              borderRadius: '14px', padding: '36px 20px',
              background: dragOver ? 'rgba(254,243,199,0.6)' : file ? 'rgba(254,243,199,0.35)' : 'rgba(255,251,235,0.5)',
              cursor: 'pointer', transition: 'all .2s',
              marginBottom: '16px',
            }}
          >
            <input
              id="resumeUpload" type="file" accept=".pdf" style={{ display: 'none' }}
              onChange={e => { setFile(e.target.files[0]); setResult(null); setError(null); }}
            />
            <div style={{
              width: '52px', height: '52px', borderRadius: '12px',
              background: '#fef3c7', border: '1.5px solid #fde68a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', marginBottom: '12px',
            }}>
             {file ? (
    <img src="/documents.png" alt="File" className="w-8 h-8" />
) : (
    <img src="/dawnloads.png" alt="Upload" className="w-8 h-8" />
)}
            </div>
            <p style={{
              fontFamily: "'Sora', sans-serif", fontSize: '14px', fontWeight: 600,
              color: file ? '#92400e' : '#78716c', margin: '0 0 4px', textAlign: 'center',
            }}>
              {file ? file.name : 'Click or drag & drop your resume'}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#a8a29e', margin: 0 }}>
              {file ? 'Ready to analyse' : 'PDF only · Max 5MB'}
            </p>
            {file && (
              <button
                onClick={e => { e.preventDefault(); setFile(null); setResult(null); }}
                style={{
                  marginTop: '10px', background: 'none', border: 'none',
                  color: '#ef4444', fontSize: '12px', cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >✕ Remove</button>
            )}
          </label>

          {/* Analyse button */}
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            style={{
              width: '100%',
              background: loading || !file ? 'rgb(245, 158, 11)' : '#f59e0b',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '13px 0',
              fontFamily: "'Sora', sans-serif", fontSize: '15px', fontWeight: 700,
              cursor: loading || !file ? 'not-allowed' : 'pointer',
              boxShadow: file && !loading ? '0 4px 14px rgba(245,158,11,.35)' : 'none',
              transition: 'background .2s, transform .2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}
            onMouseEnter={e => { if (!loading && file) e.currentTarget.style.background = '#d97706'; }}
            onMouseLeave={e => { if (!loading && file) e.currentTarget.style.background = '#f59e0b'; }}
          >
            {loading ? (
              <>
                <svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.3)" strokeWidth="4" />
                  <path fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Analysing...
              </>
            ) : (
  <div className="flex items-center gap-2">
    <img src="/search.png" alt="Check Resume" className="w-5 h-5" />
    <span>Check Resume</span>
  </div>
)}
          </button>

          {/* Error */}
          {error && (
            <div style={{
              marginTop: '16px', padding: '14px 16px',
              background: '#fff1f2', border: '1.5px solid #fca5a5',
              borderRadius: '12px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '13.5px', color: '#b91c1c',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Results */}
          {result && (
            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Score card */}
              <div style={{
                background: getScoreBg(result.atsScore),
                border: `2px solid ${getScoreBorder(result.atsScore)}`,
                borderRadius: '16px', padding: '22px', textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: '11px', fontWeight: 700,
                  letterSpacing: '.1em', textTransform: 'uppercase',
                  color: '#78716c', margin: '0 0 8px',
                }}>ATS Compatibility Score</p>
                <p style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '64px', fontWeight: 700, lineHeight: 1,
                  color: getScoreColor(result.atsScore), margin: '0 0 6px',
                }}>
                  {result.atsScore}
                  <span style={{ fontSize: '20px', color: '#a8a29e' }}>/100</span>
                </p>

                {/* Score bar */}
                <div style={{ background: '#fde68a', borderRadius: '999px', height: '8px', margin: '12px 0', overflow: 'hidden' }}>
                  <div style={{
                    width: `${result.atsScore}%`, height: '100%',
                    background: getScoreColor(result.atsScore),
                    borderRadius: '999px', transition: 'width .6s ease',
                  }} />
                </div>

                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: '14px', fontWeight: 700,
                  color: getScoreColor(result.atsScore), margin: 0,
                }}>{getScoreLabel(result.atsScore)}</p>
              </div>

              <RenderAnalysis text={result.suggestions} />
            </div>
          )}
        </div>

        {/* ── Bottom CTA ── */}
        

      </div>

      <Footer />

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}