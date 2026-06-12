import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import AppContext from '../context/AppContext'

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext)
  const titleRef    = useRef(null)
  const locationRef = useRef(null)

  const onSearch = () => {
    setSearchFilter({
      title:    titleRef.current.value,
      location: locationRef.current.value,
    })
    setIsSearched(true)
  }

  const handleKey = (e) => { if (e.key === 'Enter') onSearch() }

  const logos = [
    { src: assets.microsoft_logo, alt: 'Microsoft', color: '#fffbeb', border: '#fde68a' },
    { src: assets.walmart_logo,   alt: 'Walmart',   color: '#fffbeb', border: '#fde68a' },
    { src: assets.accenture_logo, alt: 'Accenture', color: '#fffbeb', border: '#fde68a' },
    { src: assets.samsung_logo,   alt: 'Samsung',   color: '#fffbeb', border: '#fde68a' },
    { src: assets.amazon_logo,    alt: 'Amazon',    color: '#fffbeb', border: '#fde68a' },
    { src: assets.adobe_logo,     alt: 'Adobe',     color: '#fffbeb', border: '#fde68a' },
  ]

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', paddingInline: '16px' }}>

      {/* ── Hero Banner ── */}
      <div style={{
        background: '#1c1007',
        borderRadius: '20px',
        padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1.5px solid #3d2608',
      }}>

        {/* Decorative rings */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '320px', height: '320px', borderRadius: '50%',
          border: '50px solid #3d2608', opacity: 0.5,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '220px', height: '220px', borderRadius: '50%',
          border: '35px solid #3d2608', opacity: 0.4,
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <span style={{
          display: 'inline-block',
          fontFamily: "'Sora', sans-serif",
          fontSize: '11px', fontWeight: 700,
          letterSpacing: '.12em', textTransform: 'uppercase',
          color: '#f59e0b',
          background: 'rgba(245,158,11,0.12)',
          border: '1.5px solid rgba(245,158,11,0.3)',
          padding: '5px 16px', borderRadius: '999px',
          marginBottom: '18px',
        }}>
          10,000+ active opportunities
        </span>

        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 'clamp(26px, 5vw, 48px)',
          fontWeight: 700, color: '#fef3c7',
          margin: '0 0 14px', lineHeight: 1.2,
          position: 'relative',
        }}>
          Find the Job You Were Meant to Do
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px', fontWeight: 400,
          color: '#a8956a',
          maxWidth: '480px', margin: '0 auto 36px',
          lineHeight: 1.75, position: 'relative',
        }}>
          Your next big career move starts here — explore top opportunities from leading companies worldwide.
        </p>

        {/* ── Search Bar ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          borderRadius: '999px',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '5px 5px 5px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          gap: '6px',
          position: 'relative',
        }}>
          {/* Title input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
            <img src={assets.search_icon} alt="" style={{ width: 16, opacity: .4, flexShrink: 0 }} />
            <input
              ref={titleRef}
              onKeyDown={handleKey}
              type="text"
              placeholder="Job title or keyword"
              style={{
                border: 'none', outline: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px', color: '#1c1917',
                background: 'transparent', width: '100%',
              }}
            />
          </div>

          <div style={{ width: '1px', height: '20px', background: '#fde68a', flexShrink: 0 }} />

          {/* Location input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
            <img src={assets.location_icon} alt="" style={{ width: 16, opacity: .4, flexShrink: 0 }} />
            <input
              ref={locationRef}
              onKeyDown={handleKey}
              type="text"
              placeholder="City or remote"
              style={{
                border: 'none', outline: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px', color: '#1c1917',
                background: 'transparent', width: '100%',
              }}
            />
          </div>

          <button
            onClick={onSearch}
            style={{
              background: '#f59e0b', color: '#1c1007',
              border: 'none', borderRadius: '999px',
              padding: '10px 24px',
              fontFamily: "'Sora', sans-serif",
              fontSize: '14px', fontWeight: 700,
              cursor: 'pointer', flexShrink: 0,
              transition: 'background .2s, transform .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d97706'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f59e0b'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Search
          </button>
        </div>

        {/* Quick tags */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Remote', 'Full-time', 'Engineering', 'Design', 'Marketing'].map(tag => (
            <button
              key={tag}
              onClick={() => {
                if (titleRef.current) titleRef.current.value = tag
                setSearchFilter({ title: tag, location: '' })
                setIsSearched(true)
              }}
              style={{
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '999px', padding: '4px 14px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px', color: '#fde68a',
                cursor: 'pointer', transition: 'background .15s, border-color .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.2)'; e.currentTarget.style.borderColor = '#f59e0b' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.1)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.25)' }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Trusted By Marquee ── */}
      <div style={{
        marginTop: '16px',
        border: '1.5px solid #fde68a',
        borderRadius: '16px',
        padding: '20px 0',
        background: '#fffbeb',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <p style={{
          textAlign: 'center',
          fontFamily: "'Sora', sans-serif",
          fontSize: '11px', fontWeight: 700,
          letterSpacing: '.1em', textTransform: 'uppercase',
          color: '#b45309', marginBottom: '16px', marginTop: 0,
        }}>
          Trusted by top companies
        </p>

        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '72px',
          background: 'linear-gradient(90deg, #fffbeb, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '72px',
          background: 'linear-gradient(270deg, #fffbeb, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex', alignItems: 'center',
              gap: '16px', width: 'max-content',
              animation: 'marquee 24s linear infinite',
              paddingInline: '20px',
            }}
            onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
          >
            {[...Array(2)].map((_, set) =>
              logos.map((logo, i) => (
                <div
                  key={`${set}-${i}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '10px 24px', borderRadius: '12px',
                    background: logo.color,
                    border: `1.5px solid ${logo.border}`,
                    flexShrink: 0,
                    transition: 'transform .25s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img src={logo.src} alt={logo.alt} style={{ height: '24px', width: 'auto' }} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}

export default Hero