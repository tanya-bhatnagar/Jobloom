

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'

// ── Shared style tokens (same as InterviewPreparation) ──────────────
const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(0deg, rgb(255,250,230) 0%, rgb(254,245,205) 50%, rgb(255,255,255) 100%)',
    display: 'flex', flexDirection: 'column',
    fontFamily: "'DM Sans', sans-serif",
  },
  wrap: {
    maxWidth: '1200px', margin: '0 auto',
    padding: '0 clamp(16px, 4vw, 48px) 80px', flex: 1,
  },
  card: (extra = {}) => ({
    background: 'rgba(255,255,255,0.78)',
    border: '1.5px solid #fde68a',
    borderRadius: '18px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 12px rgba(180,140,0,.08)',
    ...extra,
  }),
  pill: (bg = '#fef3c7', border = '#fde68a', color = '#92400e') => ({
    display: 'inline-block',
    fontFamily: "'Sora', sans-serif",
    fontSize: '11px', fontWeight: 700,
    letterSpacing: '.12em', textTransform: 'uppercase',
    color, background: bg, border: `1.5px solid ${border}`,
    padding: '4px 14px', borderRadius: '999px',
  }),
  h1: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 700,
    color: '#1c1917', margin: '0 0 10px', lineHeight: 1.2,
  },
  h2: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '18px', fontWeight: 700,
    color: '#1c1917', margin: '0 0 16px',
  },
  muted: { fontSize: '14px', color: '#a8a29e', lineHeight: 1.75 },
  amberBtn: {
    background: '#f59e0b', color: '#fff',
    border: 'none', borderRadius: '10px',
    padding: '11px 28px',
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px', fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(245,158,11,.35)',
    transition: 'background .2s, transform .2s',
    display: 'inline-block', textDecoration: 'none',
  },
}

const ApplyJob = () => {
  const { id } = useParams()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)
      if (data.success) setJobData(data.job)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const applyHandler = async () => {
    try {
      if (!userData) return toast.error('Login to apply for jobs')
      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply')
      }
      const token = await getToken()
      const { data } = await axios.post(
        backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => { fetchJob() }, [id])
  useEffect(() => {
    if (userApplications.length > 0 && JobData) checkAlreadyApplied()
  }, [JobData, userApplications, id])

  const infoChips = JobData ? [
    { icon: assets.suitcase_icon, label: JobData.companyId.name },
    { icon: assets.location_icon, label: JobData.location },
    { icon: assets.person_icon,   label: JobData.level },
    { icon: assets.money_icon,    label: `CTC: ${kconvert.convertTo(JobData.salary)}` },
  ] : []

  const moreJobs = JobData
    ? jobs
        .filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
        .filter(job => {
          const appliedIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
          return !appliedIds.has(job._id)
        })
        .slice(0, 4)
    : []

  return JobData ? (
    <div style={S.page}>
      <Navbar />

      {/* ── Page header ── */}
      <div style={{ padding: 'clamp(32px, 6vw, 52px) 16px clamp(20px, 4vw, 36px)', textAlign: 'center' }}>
        <span style={S.pill()}>Job Details</span>
        <h1 style={{ ...S.h1, marginTop: '14px' }}>{JobData.title}</h1>
        <p style={{ ...S.muted, maxWidth: '440px', margin: '0 auto' }}>
          {JobData.companyId.name} · {JobData.location}
        </p>
      </div>

      <div style={S.wrap}>

        {/* ── Hero card ── */}
        <div style={S.card({ padding: 'clamp(20px, 4vw, 36px)', marginBottom: '24px' })}>
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'flex-start',
            gap: '24px',
          }}>

            {/* Left: logo + info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '18px' }}>
              <div style={{
                width: '80px', height: '80px', flexShrink: 0,
                background: 'linear-gradient(145deg, #fffbeb, #fef3c7)',
                border: '1.5px solid #fde68a',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(180,140,0,.12)',
              }}>
                <img
                  src={JobData.companyId.image} alt={JobData.companyId.name}
                  style={{ width: '54px', height: '54px', objectFit: 'contain' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  {infoChips.map(({ icon, label }) => (
                    <span key={label} style={{
                      ...S.pill('#fef3c7', '#fde68a', '#92400e'),
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      fontSize: '12px', fontWeight: 600,
                      textTransform: 'none', letterSpacing: 0,
                    }}>
                      <img src={icon} alt="" style={{ width: '13px', height: '13px', objectFit: 'contain' }} />
                      {label}
                    </span>
                  ))}
                </div>
                <p style={{ ...S.muted, margin: 0, fontSize: '13px' }}>
                  Posted {moment(JobData.date).fromNow()}
                </p>
              </div>
            </div>

            {/* Right: apply button */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={applyHandler}
                style={{
                  ...S.amberBtn,
                  background: isAlreadyApplied ? '#22c55e' : '#f59e0b',
                  boxShadow: isAlreadyApplied
                    ? '0 2px 10px rgba(34,197,94,.25)'
                    : '0 2px 10px rgba(245,158,11,.35)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {isAlreadyApplied ? '✓ Already Applied' : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Main content row ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: moreJobs.length > 0 ? 'minmax(0, 1fr) 320px' : '1fr',
          gap: '24px',
          alignItems: 'start',
        }}>

          {/* ── Job description ── */}
          <div style={S.card({ padding: 'clamp(20px, 4vw, 32px)' })}>
            <h2 style={S.h2}>Job Description</h2>

            {/* Rich text */}
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: JobData.description }}
              style={{ color: '#57534e', lineHeight: 1.8, fontSize: '14px' }}
            />

            {/* Bottom apply button */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1.5px solid #fde68a' }}>
              <button
                onClick={applyHandler}
                style={{
                  ...S.amberBtn,
                  background: isAlreadyApplied ? '#22c55e' : '#f59e0b',
                  boxShadow: isAlreadyApplied
                    ? '0 2px 10px rgba(34,197,94,.25)'
                    : '0 2px 10px rgba(245,158,11,.35)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {isAlreadyApplied ? '✓ Already Applied' : 'Apply Now'}
              </button>
            </div>
          </div>

          {/* ── More jobs sidebar ── */}
          {moreJobs.length > 0 && (
            <div style={S.card({ padding: '24px 20px' })}>
              <h2 style={{ ...S.h2, fontSize: '15px', marginBottom: '18px' }}>
                More from {JobData.companyId.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {moreJobs.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loading />
  )
}

export default ApplyJob