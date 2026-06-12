import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

  const [showFilter, setShowFilter]           = useState(false)
  const [currentPage, setCurrentPage]         = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations]   = useState([])
  const [filteredJobs, setFilteredJobs]       = useState(jobs)

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
    )
  }

  useEffect(() => {
    const matchesCategory      = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
    const matchesLocation      = job => selectedLocations.length  === 0 || selectedLocations.includes(job.location)
    const matchesTitle         = job => searchFilter.title    === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
    const matchesSearchLocation= job => searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

    setFilteredJobs(
      jobs.slice().reverse().filter(job =>
        matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
      )
    )
    setCurrentPage(1)
  }, [jobs, selectedCategories, selectedLocations, searchFilter])

  const activeFilterCount = selectedCategories.length + selectedLocations.length

  // ── shared style tokens ──
  const sectionHeadingStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: '11px', fontWeight: 700,
    letterSpacing: '.1em', textTransform: 'uppercase',
    color: '#92400e', margin: '0 0 14px',
    paddingBottom: '10px',
    borderBottom: '1.5px solid #fde68a',
  }

  return (
    <div style={{
      maxWidth: '1280px', margin: '0 auto',
      padding: '32px 16px 80px',
      display: 'flex', flexDirection: 'column', gap: '24px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }} id="job-list">

        {/* ══ Sidebar ══ */}
        <aside style={{ width: '260px', flexShrink: 0 }} id="sidebar-desktop">

          <div style={{
            background: '#fffbeb',
            border: '1.5px solid #fde68a',
            borderRadius: '16px',
            padding: '20px',
            position: 'sticky', top: '80px',
          }}>

            {/* Active search tags */}
            {isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
              <div style={{ marginBottom: '18px' }}>
                <p style={{ ...sectionHeadingStyle }}>Current Search</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {searchFilter.title && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: '#fef3c7', border: '1.5px solid #fcd34d',
                      borderRadius: '999px', padding: '3px 12px',
                      fontSize: '12px', color: '#92400e',
                    }}>
                      {searchFilter.title}
                      <img
                        onClick={() => setSearchFilter(prev => ({ ...prev, title: '' }))}
                        src={assets.cross_icon}
                        alt="remove"
                        style={{ width: '10px', cursor: 'pointer', opacity: .6 }}
                      />
                    </span>
                  )}
                  {searchFilter.location && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: '#fef3c7', border: '1.5px solid #fcd34d',
                      borderRadius: '999px', padding: '3px 12px',
                      fontSize: '12px', color: '#92400e',
                    }}>
                      {searchFilter.location}
                      <img
                        onClick={() => setSearchFilter(prev => ({ ...prev, location: '' }))}
                        src={assets.cross_icon}
                        alt="remove"
                        style={{ width: '10px', cursor: 'pointer', opacity: .6 }}
                      />
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Category filter */}
            <div style={{ marginBottom: '20px' }}>
              <p style={sectionHeadingStyle}>Categories</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
                {JobCategories.map((category, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      id={`cat-${index}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      style={{ accentColor: '#f59e0b', width: '15px', height: '15px', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <label
                      htmlFor={`cat-${index}`}
                      style={{ fontSize: '13px', color: '#44403c', cursor: 'pointer', lineHeight: 1.4 }}
                    >
                      {category}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location filter */}
            <div>
              <p style={sectionHeadingStyle}>Locations</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
                {JobLocations.map((location, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      id={`loc-${index}`}
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                      style={{ accentColor: '#f59e0b', width: '15px', height: '15px', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <label
                      htmlFor={`loc-${index}`}
                      style={{ fontSize: '13px', color: '#44403c', cursor: 'pointer', lineHeight: 1.4 }}
                    >
                      {location}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clear all */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setSelectedCategories([]); setSelectedLocations([]) }}
                style={{
                  marginTop: '18px', width: '100%',
                  background: 'transparent',
                  border: '1.5px solid #fca5a5',
                  borderRadius: '10px', padding: '8px',
                  fontSize: '13px', fontFamily: "'Sora', sans-serif",
                  fontWeight: 600, color: '#b91c1c',
                  cursor: 'pointer', transition: 'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Clear All ({activeFilterCount})
              </button>
            )}
          </div>
        </aside>

        {/* ══ Main content ══ */}
        <section style={{ flex: 1, minWidth: 0 }}>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilter(prev => !prev)}
            id="mobile-filter-btn"
            style={{
              display: 'none',
              width: '100%', marginBottom: '12px',
              background: '#fffbeb',
              border: '1.5px solid #fde68a',
              borderRadius: '10px', padding: '10px 16px',
              fontFamily: "'Sora', sans-serif",
              fontSize: '13px', fontWeight: 600,
              color: '#92400e', cursor: 'pointer',
              justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            <span>{showFilter ? '▲' : '▼'}</span>
          </button>

          {/* Mobile filter panel */}
          {showFilter && (
            <div
              id="mobile-filter-panel"
              style={{
                background: '#fffbeb', border: '1.5px solid #fde68a',
                borderRadius: '16px', padding: '16px',
                marginBottom: '16px',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <p style={sectionHeadingStyle}>Categories</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {JobCategories.map((category, index) => (
                    <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#44403c', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        style={{ accentColor: '#f59e0b', width: '15px', height: '15px' }}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p style={sectionHeadingStyle}>Locations</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {JobLocations.map((location, index) => (
                    <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#44403c', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location)}
                        onChange={() => handleLocationChange(location)}
                        style={{ accentColor: '#f59e0b', width: '15px', height: '15px' }}
                      />
                      {location}
                    </label>
                  ))}
                </div>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setSelectedCategories([]); setSelectedLocations([]) }}
                  style={{
                    marginTop: '14px', width: '100%',
                    background: 'transparent', border: '1.5px solid #fca5a5',
                    borderRadius: '10px', padding: '8px',
                    fontSize: '13px', fontWeight: 600, color: '#b91c1c', cursor: 'pointer',
                  }}
                >
                  Clear All ({activeFilterCount})
                </button>
              )}
            </div>
          )}

          {/* Heading */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 700, color: '#1c1917', margin: '0 0 4px',
            }}>
              Latest Jobs
            </h3>
            <p style={{ fontSize: '14px', color: '#78716c', margin: 0 }}>
              {filteredJobs.length > 0
                ? `${filteredJobs.length} opportunities found`
                : 'No jobs match your current filters'}
            </p>
          </div>

          {/* Job grid */}
          {filteredJobs.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 20px',
              border: '1.5px dashed #fde68a', borderRadius: '16px',
              background: '#fffbeb',
            }}>
              <p style={{ fontSize: '40px', margin: '0 0 12px' }}>🔍</p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: '#78716c', margin: '0 0 6px' }}>
                No jobs found
              </p>
              <p style={{ fontSize: '13px', color: '#a8a29e', margin: 0 }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {filteredJobs.slice((currentPage - 1) * 9, currentPage * 9).map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredJobs.length > 9 && (
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              marginTop: '40px', flexWrap: 'wrap',
            }}>
              <a href="#job-list">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    border: '1.5px solid #fde68a', background: '#fffbeb',
                    cursor: 'pointer', fontSize: '16px', color: '#92400e',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >‹</button>
              </a>

              {Array.from({ length: Math.ceil(filteredJobs.length / 9) }).map((_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      border: '1.5px solid',
                      borderColor: currentPage === index + 1 ? '#f59e0b' : '#fde68a',
                      background: currentPage === index + 1 ? '#f59e0b' : '#fffbeb',
                      color: currentPage === index + 1 ? '#1c1007' : '#92400e',
                      fontFamily: "'Sora', sans-serif",
                      fontSize: '13px', fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                  >
                    {index + 1}
                  </button>
                </a>
              ))}

              <a href="#job-list">
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredJobs.length / 9)))}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    border: '1.5px solid #fde68a', background: '#fffbeb',
                    cursor: 'pointer', fontSize: '16px', color: '#92400e',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >›</button>
              </a>
            </div>
          )}
        </section>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          #sidebar-desktop    { display: none !important; }
          #mobile-filter-btn  { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

export default JobListing