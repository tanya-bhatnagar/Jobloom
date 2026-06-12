import React, { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserButton, useClerk, useUser } from '@clerk/clerk-react'
import AppContext from '../context/AppContext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const { setShowRecruiterLogin } = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/',                 label: 'Jobs'           },
    { to: '/prep-tips',        label: 'Prep Tips'      },
    { to: '/resume-check',     label: 'Resume Checker' },
    { to: '/resume-templates', label: 'Templates'      },
    { to: '/applications',     label: 'Applied Jobs'   },
  ]

  const isActive = (to) => location.pathname === to

  const linkStyle = (to) => ({
    fontSize: 'clamp(13px, 1.1vw, 15px)',   // ← laptop pe bada, mobile pe chhota
    fontWeight: 500,
    color: isActive(to) ? '#92400e' : '#78716c',
    textDecoration: 'none',
    padding: '6px 10px',
    borderRadius: '8px',
    background: isActive(to) ? '#fef3c7' : 'transparent',
    whiteSpace: 'nowrap',
    transition: 'all .15s',
  })

  return (
    <>
      <nav style={{
        background: '#fff',
        borderBottom: '1.5px solid #fde68a',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 20px',
          height: 'clamp(60px, 6vw, 72px)',   // ← navbar height bhi responsive
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* ── Logo ── */}
          <img
            onClick={() => { navigate('/'); setMenuOpen(false) }}
            src="/logo.png"
            alt="NexHire"
            style={{
              height: 'clamp(44px, 4vw, 58px)',  // ← mobile: 44px, laptop: ~58px
              width: 'auto',
              objectFit: 'contain',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />

          {/* ── Desktop Nav ── */}
          <div id="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {user ? (
              <>
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    style={linkStyle(to)}
                    onMouseEnter={e => {
                      if (!isActive(to)) {
                        e.currentTarget.style.background = '#fef3c7'
                        e.currentTarget.style.color = '#92400e'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive(to)) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#78716c'
                      }
                    }}
                  >
                    {label}
                  </Link>
                ))}
                <div style={{ width: '1px', height: '20px', background: '#fde68a', margin: '0 8px' }} />
                <span style={{
                  fontSize: 'clamp(12px, 1vw, 14px)',   // ← "Hi, Name" bhi responsive
                  fontWeight: 600,
                  color: '#92400e',
                  whiteSpace: 'nowrap',
                  marginRight: '10px',
                }}>
                  Hi, {user.firstName}
                </span>
                <UserButton />
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowRecruiterLogin(true)}
                  style={{
                    background: 'transparent', border: 'none',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    fontWeight: 500, color: '#78716c', cursor: 'pointer',
                    marginRight: '4px',
                  }}
                >
                  Recruiter Login
                </button>
                <button
                  onClick={() => openSignIn()}
                  style={{
                    background: '#f59e0b', color: '#fff',
                    border: 'none', borderRadius: '999px',
                    padding: '8px 22px',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* ── Mobile Right ── */}
          <div id="mobile-nav" style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
            {user && <UserButton />}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              style={{
                background: menuOpen ? '#fef3c7' : 'transparent',
                border: '1.5px solid #fde68a',
                borderRadius: '8px', padding: '7px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background .15s',
              }}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <line x1="2" y1="2" x2="16" y2="16" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="16" y1="2" x2="2" y2="16" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <line x1="2" y1="4" x2="16" y2="4" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="2" y1="9" x2="16" y2="9" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="2" y1="14" x2="16" y2="14" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        {menuOpen && (
          <div id="mobile-menu" style={{
            background: '#fffbeb',
            borderTop: '1.5px solid #fde68a',
            padding: '0 16px 16px',
          }}>
            {user ? (
              <>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px 0 14px',
                  borderBottom: '1px solid #fde68a',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#fef3c7', border: '1.5px solid #f59e0b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '15px', fontWeight: 700, color: '#92400e', flexShrink: 0,
                  }}>
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1c1917' }}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p style={{
                      margin: 0, fontSize: '12px', color: '#a8a29e',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>

                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '13px 0', fontSize: '14px',
                      fontWeight: isActive(to) ? 600 : 500,
                      color: isActive(to) ? '#92400e' : '#44403c',
                      textDecoration: 'none',
                      borderBottom: '1px solid #fef3c7',
                    }}
                  >
                    {label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke={isActive(to) ? '#f59e0b' : '#a8a29e'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ))}
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px' }}>
                <button
                  onClick={() => { setShowRecruiterLogin(true); setMenuOpen(false) }}
                  style={{
                    background: 'transparent', border: '1.5px solid #fde68a',
                    borderRadius: '10px', padding: '12px',
                    fontSize: '14px', fontWeight: 500, color: '#78716c', cursor: 'pointer',
                  }}
                >
                  Recruiter Login
                </button>
                <button
                  onClick={() => { openSignIn(); setMenuOpen(false) }}
                  style={{
                    background: '#f59e0b', color: '#fff', border: 'none',
                    borderRadius: '10px', padding: '13px',
                    fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          #desktop-nav { display: none !important; }
          #mobile-nav  { display: flex !important; }
        }
        @media (min-width: 769px) {
          #mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar