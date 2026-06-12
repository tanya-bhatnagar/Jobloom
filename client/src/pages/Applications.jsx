import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import moment from 'moment'
import Footer from '../components/Footer'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import { useUser, useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {
    try {
      const formData = new FormData()
      formData.append('resume', resume)
      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setIsEdit(false)
    setResume(null)
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user, fetchUserApplications])

  const statusStyle = (status) => {
    if (status === 'Accepted')  return { background: '#dcfce7', color: '#15803d', border: '1.5px solid #bbf7d0' }
    if (status === 'Rejected')  return { background: '#fee2e2', color: '#b91c1c', border: '1.5px solid #fca5a5' }
    return { background: '#fef3c7', color: '#92400e', border: '1.5px solid #fde68a' }
  }

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
          fontFamily: "'Sora', sans-serif",
          fontSize: '11px', fontWeight: 700,
          letterSpacing: '.12em', textTransform: 'uppercase',
          color: '#b45309', background: '#fef3c7',
          border: '1.5px solid #fde68a',
          padding: '4px 14px', borderRadius: '999px',
          marginBottom: '14px',
        }}>
           My Applications
        </span>
        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700,
          color: '#1c1917', margin: '0 0 10px', lineHeight: 1.2,
        }}>
          Your Applications
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px', color: '#78716c',
          maxWidth: '400px', margin: '0 auto', lineHeight: 1.75,
        }}>
          Track your job applications and manage your resume all in one place.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 10px 80px', flex: 1, width: '100%', boxSizing: 'border-box' }}>

        {/* ── Stats row ── */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}>
          {[
            { num: userApplications.length,                                                           label: 'Applied'  },
            { num: userApplications.filter(j => j.status === 'Accepted').length,                     label: 'Accepted' },
            { num: userApplications.filter(j => j.status === 'Rejected').length,                     label: 'Rejected' },
            { num: userApplications.filter(j => j.status !== 'Accepted' && j.status !== 'Rejected').length, label: 'Pending'  },
          ].map(({ num, label }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1.5px solid #fde68a',
              borderRadius: '12px', padding: '10px 22px',
              textAlign: 'center', backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(180,140,0,.07)',
            }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '17px', fontWeight: 700, color: '#92400e', margin: 0 }}>{num}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#a8a29e', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* ── Resume Card ── */}
        <div style={{
          background: 'rgba(255,255,255,0.78)',
          border: '1.5px solid #fde68a',
          borderRadius: '18px', padding: '22px 24px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 12px rgba(180,140,0,.08)',
          marginBottom: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '14px',
        }}>
          <div>
            <p style={{
              fontFamily: "'Sora', sans-serif", fontSize: '13px',
              fontWeight: 700, color: '#92400e',
              textTransform: 'uppercase', letterSpacing: '.08em',
              margin: '0 0 4px',
            }}> Your Resume</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#a8a29e', margin: 0 }}>
              {userData?.resume ? 'Resume uploaded — keep it up to date' : 'No resume uploaded yet'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {isEdit || userData?.resume === '' ? (
              <>
                <label htmlFor="resumeUpload" style={{ cursor: 'pointer' }}>
                  <div style={{
                    background: '#fef3c7', border: '1.5px solid #fde68a',
                    borderRadius: '10px', padding: '9px 18px',
                    fontFamily: "'Sora', sans-serif", fontSize: '13px',
                    fontWeight: 600, color: '#92400e',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                     {resume ? resume.name : 'Select Resume'}
                  </div>
                  <input
                    id="resumeUpload"
                    onChange={e => setResume(e.target.files[0])}
                    accept="application/pdf" type="file" hidden
                  />
                </label>
                <button
                  onClick={updateResume}
                  style={{
                    background: '#f59e0b', color: '#fff',
                    border: 'none', borderRadius: '10px',
                    padding: '10px 20px',
                    fontFamily: "'Sora', sans-serif", fontSize: '13px', fontWeight: 600,
                    cursor: 'pointer', boxShadow: '0 2px 10px rgba(245,158,11,.3)',
                    transition: 'background .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#d97706'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f59e0b'}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <a
                  target="_blank" rel="noopener noreferrer"
                  href={userData?.resume}
                  style={{
                    background: '#fef3c7', border: '1.5px solid #fde68a',
                    borderRadius: '10px', padding: '9px 18px',
                    fontFamily: "'Sora', sans-serif", fontSize: '13px',
                    fontWeight: 600, color: '#92400e', textDecoration: 'none',
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <img src="/eye.png" alt="Resume" width="16" height="16" />
  <span>View Resume</span>
</div>
                </a>
                <button
                  onClick={() => setIsEdit(true)}
                  style={{
                    background: 'transparent',
                    border: '1.5px solid #fde68a',
                    borderRadius: '10px', padding: '9px 18px',
                    fontFamily: "'Sora', sans-serif", fontSize: '13px', fontWeight: 600,
                    color: '#78716c', cursor: 'pointer',
                    transition: 'border-color .2s, color .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.color = '#92400e'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#fde68a'; e.currentTarget.style.color = '#78716c'; }}
                >
                   Edit
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Applications Table ── */}
        <div style={{
          background: 'rgba(255,255,255,0.78)',
          border: '1.5px solid #fde68a',
          borderRadius: '18px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 12px rgba(180,140,0,.08)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 24px 14px', borderBottom: '1.5px solid #fde68a' }}>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontSize: '16px',
              fontWeight: 700, color: '#1c1917', margin: 0,
            }}>
              Jobs Applied
            </h2>
          </div>

          {userApplications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: '#a8a29e' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}><div className="flex justify-center items-center mb-4">
  <img
    src="/documents.png"
    alt="Resume"
    className="w-16 h-16 object-contain"
  />
</div></div>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: '#78716c', margin: '0 0 6px' }}>No applications yet</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', margin: 0 }}>Start applying to jobs and track them here</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
                <thead>
                  <tr style={{ background: 'rgba(254,243,199,0.5)' }}>
                    {['Company', 'Job Title', 'Location', 'Date', 'Status'].map((h, i) => (
                      <th key={h} style={{
                        padding: '12px 18px', textAlign: 'left',
                        fontFamily: "'Sora', sans-serif", fontSize: '11px',
                        fontWeight: 700, letterSpacing: '.08em',
                        textTransform: 'uppercase', color: '#92400e',
                        borderBottom: '1.5px solid #fde68a',
                        ...(i === 2 ? { display: 'table-cell' } : {}),
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {userApplications.map((job, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: '1px solid #fef3c7', transition: 'background .15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(254,243,199,0.3)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '8px',
                            border: '1.5px solid #fde68a', overflow: 'hidden',
                            background: '#fffbeb', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <img src={job.companyId?.image} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                          </div>
                          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '13px', fontWeight: 600, color: '#1c1917' }}>
                            {job.companyId?.name}
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: '14px 18px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#44403c' }}>
                        {job.jobId?.title}
                      </td>

                      <td style={{ padding: '14px 18px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#78716c' }}>
                        {job.jobId?.location}
                      </td>

                      <td style={{ padding: '14px 18px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#78716c', whiteSpace: 'nowrap' }}>
                        {job?.date ? moment(job.date).format('ll') : '—'}
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          ...statusStyle(job.status),
                          padding: '4px 14px', borderRadius: '999px',
                          fontFamily: "'Sora', sans-serif", fontSize: '12px', fontWeight: 600,
                        }}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Applications