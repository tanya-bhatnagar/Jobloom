import React, { useContext, useEffect, useState, useCallback } from 'react'
import { assets } from '../assets/assets'
import AppContext from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const statusConfig = {
    Accepted: {
        label: 'Accepted',
        style: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
        dot: '#22c55e',
    },
    Rejected: {
        label: 'Rejected',
        style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' },
        dot: '#ef4444',
    },
    Pending: {
        label: 'Pending',
        style: { background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' },
        dot: '#f59e0b',
    },
}

const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || statusConfig.Pending
    return (
        <span style={{
            ...config.style,
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '3px 10px', borderRadius: '999px',
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.02em', whiteSpace: 'nowrap',
        }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: config.dot, flexShrink: 0 }} />
            {config.label}
        </span>
    )
}

// Action menu — only shown for Pending applicants
const ActionMenu = ({ applicantId, onAction }) => {
    const [open, setOpen] = useState(false)

    const handleAction = (status) => {
        onAction(applicantId, status)
        setOpen(false)
    }

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={() => setOpen(prev => !prev)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '6px 10px', fontSize: '13px', fontWeight: 500,
                    color: '#374151', background: '#fff', border: '1px solid #e5e7eb',
                    borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e7eb' }}
            >
                Review
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 50,
                    background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                    overflow: 'hidden', minWidth: '130px', animation: 'fadeIn 0.1s ease',
                }}>
                    <button
                        onClick={() => handleAction('Accepted')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                            padding: '9px 14px', fontSize: '13px', fontWeight: 500, color: '#166534',
                            background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7.5l3.5 3.5 6.5-7" stroke="#22c55e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Accept
                    </button>
                    <div style={{ height: '1px', background: '#f3f4f6', margin: '0 10px' }} />
                    <button
                        onClick={() => handleAction('Rejected')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                            padding: '9px 14px', fontSize: '13px', fontWeight: 500, color: '#991b1b',
                            background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 3l8 8M11 3l-8 8" stroke="#ef4444" strokeWidth="1.75" strokeLinecap="round" />
                        </svg>
                        Reject
                    </button>
                </div>
            )}
        </div>
    )
}

// Mobile card for a single applicant
const ApplicantCard = ({ applicant, index, onAction }) => (
    <div style={{
        background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb',
        padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
        {/* Top row: avatar + name + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {applicant.userId.image ? (
                    <img src={applicant.userId.image} alt={applicant.userId.name}
                        style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #e5e7eb', flexShrink: 0 }} />
                ) : (
                    <div style={{
                        width: 38, height: 38, borderRadius: '50%', background: '#ede9fe',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: 600, color: '#7c3aed', flexShrink: 0,
                    }}>
                        {applicant.userId.name?.charAt(0).toUpperCase()}
                    </div>
                )}
                <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>{applicant.userId.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>#{index + 1}</p>
                </div>
            </div>
            <StatusBadge status={applicant.status} />
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="#9ca3af" strokeWidth="1.25" />
                    <path d="M1 6h12" stroke="#9ca3af" strokeWidth="1.25" />
                    <path d="M5 1v3M9 1v3" stroke="#9ca3af" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{applicant.jobId.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M7 1.5a3 3 0 010 6 3 3 0 010-6z" stroke="#9ca3af" strokeWidth="1.25" />
                    <path d="M7 7.5S3.5 10 3.5 12h7C10.5 10 7 7.5 7 7.5z" stroke="#9ca3af" strokeWidth="1.25" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>{applicant.jobId.location}</span>
            </div>
        </div>

        {/* Bottom row: resume + action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
            {applicant.userId.resume ? (
                <a href={applicant.userId.resume} target="_blank" rel="noreferrer"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '5px 10px', fontSize: '12px', fontWeight: 500,
                        color: '#4f46e5', background: '#eef2ff', border: '1px solid #c7d2fe',
                        borderRadius: '7px', textDecoration: 'none',
                    }}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Resume
                </a>
            ) : (
                <span style={{ fontSize: '12px', color: '#d1d5db', fontStyle: 'italic' }}>No resume</span>
            )}

            {applicant.status === 'Pending' ? (
                <ActionMenu applicantId={applicant._id} onAction={onAction} />
            ) : (
                <span style={{ fontSize: '13px', color: '#d1d5db' }}>—</span>
            )}
        </div>
    </div>
)

const ViewApplications = () => {
    const { backendUrl, companyToken } = useContext(AppContext)
    const [applicants, setApplicants] = useState(false)

    const fetchCompanyJobApplications = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/applicants',
                { headers: { token: companyToken } }
            )
            if (data.success) {
                setApplicants(data.applications.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [backendUrl, companyToken])

    const changeJobApplicationStatus = async (id, status) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/company/change-status',
                { id, status },
                { headers: { token: companyToken } }
            )
            if (data.success) {
                fetchCompanyJobApplications()
                toast.success(`Application ${status.toLowerCase()} successfully`)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (companyToken) fetchCompanyJobApplications()
    }, [companyToken, fetchCompanyJobApplications])

    const filteredApplicants = applicants ? applicants.filter(item => item.jobId && item.userId) : []

    const stats = applicants ? {
        total: filteredApplicants.length,
        pending: filteredApplicants.filter(a => a.status === 'Pending').length,
        accepted: filteredApplicants.filter(a => a.status === 'Accepted').length,
        rejected: filteredApplicants.filter(a => a.status === 'Rejected').length,
    } : null

    if (applicants === false) return <Loading />

    return (
        <div style={{
            padding: '24px 16px',
            maxWidth: '1100px',
            margin: '0 auto',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
                .app-row { transition: background 0.15s ease; }
                .app-row:hover { background: #f9fafb !important; }
                /* Desktop table: visible above 640px */
                .desktop-table { display: block; }
                /* Mobile cards: visible below 640px */
                .mobile-cards { display: none; }
                @media (max-width: 640px) {
                    .desktop-table { display: none !important; }
                    .mobile-cards { display: flex !important; flex-direction: column; gap: 12px; }
                    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .page-padding { padding: 16px 12px !important; }
                }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
                    Applications
                </h1>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    Review and manage incoming job applications
                </p>
            </div>

            {/* Stats */}
            {stats && filteredApplicants.length > 0 && (
                <div className="stats-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px',
                    marginBottom: '24px',
                }}>
                    {[
                        { label: 'Total', value: stats.total, color: '#4f46e5', bg: '#eef2ff' },
                        { label: 'Pending', value: stats.pending, color: '#d97706', bg: '#fffbeb' },
                        { label: 'Accepted', value: stats.accepted, color: '#16a34a', bg: '#f0fdf4' },
                        { label: 'Rejected', value: stats.rejected, color: '#dc2626', bg: '#fef2f2' },
                    ].map(stat => (
                        <div key={stat.label} style={{ background: stat.bg, borderRadius: '10px', padding: '14px 16px' }}>
                            <p style={{ fontSize: '11px', fontWeight: 600, color: stat.color, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {stat.label}
                            </p>
                            <p style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {filteredApplicants.length === 0 ? (
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '80px 20px', background: '#f9fafb',
                    borderRadius: '16px', border: '1.5px dashed #e5e7eb',
                }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: '14px', background: '#ede9fe',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                    }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                                stroke="#7c3aed" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>No applications yet</p>
                    <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>Applications will appear here once candidates apply</p>
                </div>
            ) : (
                <>
                    {/* ── DESKTOP TABLE ── */}
                    <div className="desktop-table" style={{
                        background: '#fff', borderRadius: '14px',
                        border: '1px solid #e5e7eb', overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                                <thead>
                                    <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                        {['#', 'Candidate', 'Position', 'Location', 'Resume', 'Status', 'Action'].map(h => (
                                            <th key={h} style={{
                                                padding: '11px 16px', textAlign: 'left',
                                                fontSize: '11px', fontWeight: 600, color: '#6b7280',
                                                letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                                            }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApplicants.map((applicant, index) => (
                                        <tr key={applicant._id || index} className="app-row" style={{
                                            borderBottom: index < filteredApplicants.length - 1 ? '1px solid #f3f4f6' : 'none',
                                            background: '#fff',
                                        }}>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>
                                                {index + 1}
                                            </td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    {applicant.userId.image ? (
                                                        <img src={applicant.userId.image} alt={applicant.userId.name}
                                                            style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #e5e7eb', flexShrink: 0 }} />
                                                    ) : (
                                                        <div style={{
                                                            width: 34, height: 34, borderRadius: '50%', background: '#ede9fe',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: '13px', fontWeight: 600, color: '#7c3aed', flexShrink: 0,
                                                        }}>
                                                            {applicant.userId.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>
                                                        {applicant.userId.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: '14px', color: '#374151' }}>
                                                {applicant.jobId.title}
                                            </td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                                                        <path d="M7 1.5a3 3 0 010 6 3 3 0 010-6z" stroke="#9ca3af" strokeWidth="1.25" />
                                                        <path d="M7 7.5S3.5 10 3.5 12h7C10.5 10 7 7.5 7 7.5z" stroke="#9ca3af" strokeWidth="1.25" strokeLinejoin="round" />
                                                    </svg>
                                                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{applicant.jobId.location}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 16px' }}>
                                                {applicant.userId.resume ? (
                                                    <a href={applicant.userId.resume} target="_blank" rel="noreferrer"
                                                        style={{
                                                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                                                            padding: '5px 10px', fontSize: '12px', fontWeight: 500,
                                                            color: '#4f46e5', background: '#eef2ff', border: '1px solid #c7d2fe',
                                                            borderRadius: '7px', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.15s',
                                                        }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = '#e0e7ff'; e.currentTarget.style.borderColor = '#a5b4fc' }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.borderColor = '#c7d2fe' }}
                                                    >
                                                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                                            <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        Resume
                                                    </a>
                                                ) : (
                                                    <span style={{ fontSize: '12px', color: '#d1d5db', fontStyle: 'italic' }}>None</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <StatusBadge status={applicant.status} />
                                            </td>
                                            {/* Action — only Review button for Pending */}
                                            <td style={{ padding: '14px 16px' }}>
                                                {applicant.status === 'Pending' ? (
                                                    <ActionMenu applicantId={applicant._id} onAction={changeJobApplicationStatus} />
                                                ) : (
                                                    <span style={{ fontSize: '13px', color: '#d1d5db' }}>—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ── MOBILE CARDS ── */}
                    <div className="mobile-cards">
                        {filteredApplicants.map((applicant, index) => (
                            <ApplicantCard
                                key={applicant._id || index}
                                applicant={applicant}
                                index={index}
                                onAction={changeJobApplicationStatus}
                            />
                        ))}
                    </div>
                </>
            )}

            {filteredApplicants.length > 0 && (
                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '12px', textAlign: 'right' }}>
                    Showing {filteredApplicants.length} application{filteredApplicants.length !== 1 ? 's' : ''}
                </p>
            )}
        </div>
    )
}

export default ViewApplications