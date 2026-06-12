import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 20px 80px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: '#fffbeb',
        border: '1.5px solid #fde68a',
        borderRadius: '20px',
        padding: 'clamp(28px, 5vw, 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Decorative background ring */}
        <div style={{
          position: 'absolute', right: '-40px', top: '-40px',
          width: '300px', height: '300px', borderRadius: '50%',
          border: '40px solid #fde68a', opacity: 0.25,
          pointerEvents: 'none',
        }} />

        {/* Left content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>

          {/* Badge */}
          <span style={{
            display: 'inline-block',
            fontFamily: "'Sora', sans-serif",
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '.1em', textTransform: 'uppercase',
            color: '#92400e', background: '#fef3c7',
            border: '1.5px solid #fde68a',
            padding: '4px 14px', borderRadius: '999px',
            marginBottom: '18px',
          }}>
            Mobile App
          </span>

          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 700, color: '#1c1917',
            margin: '0 0 12px', lineHeight: 1.25,
          }}>
            Download the App for a Better Experience
          </h2>

          <p style={{
            fontSize: '14px', color: '#78716c',
            lineHeight: 1.75, margin: '0 0 28px',
          }}>
            Search jobs, track applications, and get notified instantly — all from your phone.
          </p>

          {/* Store buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#1c1007', borderRadius: '12px',
              padding: '10px 20px', gap: '10px',
              textDecoration: 'none',
              border: '1.5px solid #3d2608',
              transition: 'background .2s, border-color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2a1a06'; e.currentTarget.style.borderColor = '#f59e0b' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1c1007'; e.currentTarget.style.borderColor = '#3d2608' }}
            >
              <img src={assets.play_store} alt="Play Store" style={{ height: '28px', objectFit: 'contain' }} />
              <div>
                <p style={{ margin: 0, fontSize: '10px', color: '#a8956a', fontFamily: "'DM Sans', sans-serif" }}>Get it on</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#fef3c7', fontFamily: "'Sora', sans-serif" }}>Google Play</p>
              </div>
            </a>

            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#1c1007', borderRadius: '12px',
              padding: '10px 20px', gap: '10px',
              textDecoration: 'none',
              border: '1.5px solid #3d2608',
              transition: 'background .2s, border-color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2a1a06'; e.currentTarget.style.borderColor = '#f59e0b' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1c1007'; e.currentTarget.style.borderColor = '#3d2608' }}
            >
              <img src={assets.app_store} alt="App Store" style={{ height: '28px', objectFit: 'contain' }} />
              <div>
                <p style={{ margin: 0, fontSize: '10px', color: '#a8956a', fontFamily: "'DM Sans', sans-serif" }}>Download on the</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#fef3c7', fontFamily: "'Sora', sans-serif" }}>App Store</p>
              </div>
            </a>
          </div>
        </div>

        {/* App image — hidden on mobile */}
        <img
          src={assets.app_main_img}
          alt="App preview"
          id="app-preview-img"
          style={{
            height: 'clamp(180px, 22vw, 300px)',
            objectFit: 'contain',
            position: 'relative', zIndex: 1,
            flexShrink: 0,
          }}
        />
      </div>

      <style>{`
        @media (max-width: 600px) {
          #app-preview-img { display: none !important; }
        }
      `}</style>
    </div>
  )
}

export default AppDownload