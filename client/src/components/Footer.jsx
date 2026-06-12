import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  const links = {
    'For Job Seekers': [
      { label: 'Browse Jobs',        href: '/' },
      { label: 'Applied Jobs',       href: '/applications' },
      { label: 'Resume Checker',     href: '/resume-check' },
      { label: 'Resume Templates',   href: '/resume-templates' },
      { label: 'Preparation Tips',   href: '/prep-tips' },
    ],
    'For Recruiters': [
      { label: 'Post a Job',         href: '/dashboard' },
      { label: 'Recruiter Login',    href: '#' },
      { label: 'Manage Listings',    href: '/dashboard' },
      { label: 'View Applications',  href: '/dashboard' },
    ],
    'Company': [
      { label: 'About Us',           href: '#' },
      { label: 'Careers',            href: '#' },
      { label: 'Blog',               href: '#' },
      { label: 'Press',              href: '#' },
      { label: 'Contact Us',         href: '#' },
    ],
    'Legal': [
      { label: 'Privacy Policy',     href: '#' },
      { label: 'Terms of Service',   href: '#' },
      { label: 'Cookie Policy',      href: '#' },
    ],
  }

  const socials = [
    { icon: assets.facebook_icon,  label: 'Facebook' },
    { icon: assets.twitter_icon,   label: 'Twitter'  },
    { icon: assets.instagram_icon, label: 'Instagram'},
  ]

  const linkStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13.5px',
    color: '#a8956a',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '10px',
    transition: 'color .18s',
  }

  return (
    <footer style={{ background: '#1c1007', marginTop: '80px' }}>

      <style>{`
        .footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 32px 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 40px;
        }

        .footer-brand {
          grid-column: span 1;
          min-width: 200px;
        }

        .footer-newsletter {
          min-width: 200px;
        }

        @media (max-width: 640px) {
          .footer-grid {
            padding: 40px 20px 32px;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }

          .footer-brand {
            grid-column: 1 / -1;
            min-width: unset;
          }

          .footer-newsletter {
            grid-column: 1 / -1;
            min-width: unset;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 10px;
          }

          .footer-bottom-links {
            flex-wrap: wrap;
            gap: 14px !important;
          }

          .footer-divider {
            padding-inline: 20px !important;
          }

          .footer-bottom-bar {
            padding-inline: 20px !important;
          }
        }
      `}</style>

      {/* ── Main footer body ── */}
      <div className="footer-grid">

        {/* Brand column */}
        <div className="footer-brand">
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13.5px', color: '#6b4f2a',
            lineHeight: 1.75, marginBottom: '24px', marginTop: 0,
          }}>
            Connecting talent with opportunity. Find your dream job or hire the best — all in one place.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {socials.map(({ icon, label }) => (
              <a key={label} href="#" aria-label={label}
                style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  border: '1px solid #3d2608',
                  background: '#2a1a06',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color .2s, background .2s, transform .2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#f59e0b'
                  e.currentTarget.style.background = 'rgba(245,158,11,0.15)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#3d2608'
                  e.currentTarget.style.background = '#2a1a06'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <img
                  src={icon} alt={label}
                  style={{
                    width: '17px', height: '17px', objectFit: 'contain',
                    filter: 'brightness(0) saturate(100%) invert(65%) sepia(40%) saturate(400%) hue-rotate(10deg)',
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '.1em', textTransform: 'uppercase',
              color: '#92400e', marginBottom: '18px', marginTop: 0,
            }}>
              {heading}
            </p>
            {items.map(({ label, href }) => (
              <a key={label} href={href} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#fef3c7'}
                onMouseLeave={e => e.currentTarget.style.color = '#a8956a'}
              >
                {label}
              </a>
            ))}
          </div>
        ))}

        {/* Newsletter column */}
        <div className="footer-newsletter">
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '.1em', textTransform: 'uppercase',
            color: '#92400e', marginBottom: '18px', marginTop: 0,
          }}>
            Newsletter
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px', color: '#6b4f2a',
            lineHeight: 1.7, marginBottom: '14px', marginTop: 0,
          }}>
            Get the latest jobs & career tips straight to your inbox.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                background: '#2a1a06', border: '1px solid #3d2608',
                borderRadius: '8px', padding: '10px 14px',
                fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                color: '#fde68a', outline: 'none',
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#f59e0b'}
              onBlur={e  => e.currentTarget.style.borderColor = '#3d2608'}
            />
            <button style={{
              background: '#f59e0b', color: '#1c1007',
              border: 'none', borderRadius: '8px', padding: '10px 14px',
              fontFamily: "'Sora', sans-serif", fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', transition: 'background .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#d97706'}
              onMouseLeave={e => e.currentTarget.style.background = '#f59e0b'}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="footer-divider" style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '32px' }}>
        <div style={{ borderTop: '1px solid #3d2608' }} />
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom-bar" style={{
        maxWidth: '1280px', margin: '0 auto',
        paddingInline: '32px', paddingBlock: '20px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px', color: '#6b4f2a', margin: 0,
        }}>
          © 2025 Jobloom. All rights reserved.
        </p>
        <div className="footer-bottom-links" style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
            <a key={item} href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px', color: '#6b4f2a',
                textDecoration: 'none', transition: 'color .18s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fef3c7'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b4f2a'}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer