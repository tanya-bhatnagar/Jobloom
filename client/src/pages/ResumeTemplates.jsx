import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ResumeTemplates() {
  const templates = [
    { id: 1, name: "Simple Resume",       desc: "Clean & minimal layout for any industry",       badge: "Popular",  file: "/templates/resume1.docx", icon: "/templates/iconresume.png" },
    { id: 2, name: "Modern Resume",       desc: "Sleek contemporary design with bold sections",   badge: "Trending", file: "/templates/resume2.docx", icon: "/templates/iconresume.png" },
    { id: 3, name: "Creative Resume",     desc: "Stand out with a unique visual style",           badge: "New",      file: "/templates/resume3.docx", icon: "/templates/iconresume.png" },
    { id: 4, name: "Professional Resume", desc: "Traditional format trusted by top recruiters",   badge: "Classic",  file: "/templates/resume4.docx", icon: "/templates/iconresume.png" },
    { id: 5, name: "ATS-Friendly Resume", desc: "Optimised to pass applicant tracking systems",   badge: "Best ATS", file: "/templates/resume5.docx", icon: "/templates/iconresume.png" },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(0deg, rgb(255,250,230) 0%, rgb(254,245,205) 50%, rgb(255,255,255) 100%)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ── Page Header ── */}
      <div style={{ padding: 'clamp(32px, 6vw, 52px) 16px clamp(28px, 5vw, 44px)', textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          fontFamily: "'Sora', sans-serif",
          fontSize: '11px', fontWeight: 700,
          letterSpacing: '.12em', textTransform: 'uppercase',
          color: '#b45309', marginBottom: '14px',
          background: '#fef3c7', border: '1.5px solid #fde68a',
          padding: '4px 14px', borderRadius: '999px',
        }}>
          Free Downloads
        </span>
        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 'clamp(22px, 5vw, 40px)',
          fontWeight: 700, color: '#1c1917',
          margin: '0 0 14px', lineHeight: 1.2,
        }}>
          Resume Templates
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#78716c',
          maxWidth: '420px', margin: '0 auto',
          lineHeight: 1.75, fontWeight: 400,
          paddingInline: '8px',
        }}>
          Professionally designed templates to help you land your next interview — completely free.
        </p>
      </div>

      {/* ── Stats row ── */}
      <div style={{
        display: 'flex', gap: '10px', flexWrap: 'wrap',
        justifyContent: 'center', marginBottom: '32px',
        paddingInline: '16px',
      }}>
        {[
          { num: '5',     label: 'Templates'   },
          { num: 'Free',  label: 'Always'      },
          { num: '.docx', label: 'Format'      },
          { num: 'ATS',   label: 'Optimised'   },
        ].map(({ num, label }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.7)',
            border: '1.5px solid #fde68a',
            borderRadius: '12px',
            padding: 'clamp(8px, 2vw, 12px) clamp(14px, 3vw, 22px)',
            textAlign: 'center',
            backdropFilter: 'blur(8px)',
            minWidth: '70px',
          }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(14px, 3.5vw, 17px)', fontWeight: 700, color: '#92400e', margin: 0 }}>{num}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#a8a29e', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Cards grid ── */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 16px 64px', flex: 1, width: '100%',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
        gap: '16px',
        alignContent: 'start',
      }}>
        {templates.map((t) => (
          <div
            key={t.id}
            style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1.5px solid #fde68a',
              borderRadius: '18px',
              padding: '22px 18px 18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: '0 2px 12px rgba(180,140,0,.08)',
              backdropFilter: 'blur(10px)',
              transition: 'transform .25s, box-shadow .25s, border-color .25s',
              boxSizing: 'border-box',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(180,140,0,.16)'
              e.currentTarget.style.borderColor = '#f59e0b'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(180,140,0,.08)'
              e.currentTarget.style.borderColor = '#fde68a'
            }}
          >
            {/* Badge */}
            <span style={{
              alignSelf: 'flex-end',
              fontFamily: "'Sora', sans-serif",
              fontSize: '11px', fontWeight: 700,
              padding: '3px 10px', borderRadius: '999px',
              background: '#fef3c7',
              border: '1.5px solid #fde68a',
              color: '#92400e',
              marginBottom: '14px',
              letterSpacing: '.03em',
            }}>
              {t.badge}
            </span>

            {/* Icon box */}
            <div style={{
              width: '90px', height: '104px',
              background: 'linear-gradient(145deg, #fffbeb, #fef3c7)',
              border: '1.5px solid #fde68a',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '18px',
              boxShadow: '0 4px 14px rgba(180,140,0,.12)',
            }}>
              <img src={t.icon} alt={t.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
            </div>

            {/* Name */}
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 700,
              color: '#1c1917', margin: '0 0 8px',
              textAlign: 'center',
            }}>
              {t.name}
            </h2>

            {/* Description */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px', color: '#a8a29e',
              textAlign: 'center', lineHeight: 1.65,
              margin: '0 0 20px', flexGrow: 1,
            }}>
              {t.desc}
            </p>

            {/* Download button */}
            <a href={t.file} download style={{ width: '100%', textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%',
                  background: '#f59e0b', color: '#fff',
                  border: 'none', borderRadius: '10px',
                  padding: 'clamp(10px, 2.5vw, 11px) 0',
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 'clamp(13px, 3.5vw, 14px)', fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'background .2s, transform .2s',
                  boxShadow: '0 2px 10px rgba(245,158,11,.35)',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#d97706'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f59e0b'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                 Download Free
              </button>
            </a>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}