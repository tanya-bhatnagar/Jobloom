import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  const goToJob = () => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }

  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid #fde68a',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'transform .2s, box-shadow .2s, border-color .2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(180,140,0,0.12)'
        e.currentTarget.style.borderColor = '#f59e0b'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = '#fde68a'
      }}
    >
      {/* Company logo */}
      <div style={{
        width: '44px', height: '44px',
        borderRadius: '10px',
        border: '1.5px solid #fde68a',
        background: '#fffbeb',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <img
          src={job.companyId.image}
          alt={job.companyId.name}
          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
        />
      </div>

      {/* Title */}
      <h4 style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: '15px', fontWeight: 700,
        color: '#1c1917', margin: 0,
        lineHeight: 1.3,
      }}>
        {job.title}
      </h4>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{
          background: '#fffbeb', border: '1.5px solid #fde68a',
          borderRadius: '999px', padding: '3px 12px',
          fontSize: '12px', fontWeight: 500, color: '#92400e',
        }}>
          {job.location}
        </span>
        <span style={{
          background: '#fef3c7', border: '1.5px solid #fcd34d',
          borderRadius: '999px', padding: '3px 12px',
          fontSize: '12px', fontWeight: 500, color: '#78350f',
        }}>
          {job.level}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '13px', color: '#78716c',
          lineHeight: 1.7, margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      />

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '4px' }}>
        <button
          onClick={goToJob}
          style={{
            background: '#f59e0b', color: '#1c1007',
            border: 'none', borderRadius: '10px',
            padding: '9px 18px',
            fontFamily: "'Sora', sans-serif",
            fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', flex: 1,
            transition: 'background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#d97706'}
          onMouseLeave={e => e.currentTarget.style.background = '#f59e0b'}
        >
          Apply Now
        </button>
        <button
          onClick={goToJob}
          style={{
            background: 'transparent',
            border: '1.5px solid #fde68a',
            borderRadius: '10px', padding: '9px 18px',
            fontFamily: "'Sora', sans-serif",
            fontSize: '13px', fontWeight: 600,
            color: '#92400e', cursor: 'pointer', flex: 1,
            transition: 'background .2s, border-color .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fffbeb'; e.currentTarget.style.borderColor = '#f59e0b' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#fde68a' }}
        >
          Learn More
        </button>
      </div>
    </div>
  )
}

export default JobCard




