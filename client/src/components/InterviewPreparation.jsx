import React, { useState, useMemo } from 'react';
import Navbar from './Navbar';
import Footer from "../components/Footer"

const interviewData = [
  {
    category: "General Questions",
    questions: [
      { question: "Tell me about yourself", tip: "Keep it professional. Structure: Present (current role/skills) → Past (relevant experience) → Future (goals). Limit to 2 minutes." },
      { question: "Why do you want to work here?", tip: "Research the company thoroughly. Mention specific projects, values, or goals that align with yours. Show genuine enthusiasm." },
      { question: "What are your greatest strengths?", tip: "Pick 2-3 strengths relevant to the job. Back each with a specific example. Avoid generic answers like 'hardworking'." },
      { question: "What is your greatest weakness?", tip: "Choose a real weakness but one you're actively improving. Show self-awareness and the steps you're taking to overcome it." },
    ],
  },
  {
    category: "Behavioral Questions",
    questions: [
      { question: "Tell me about a time you handled a conflict at work", tip: "Use the STAR method: Situation, Task, Action, Result. Focus on how you resolved it professionally and what you learned." },
      { question: "Describe a challenging project you completed", tip: "Highlight your problem-solving skills. Quantify the result where possible — 'improved efficiency by 30%' is stronger than 'made it better'." },
      { question: "Give an example of when you showed leadership", tip: "Leadership isn't just about managing people. Mention initiatives, mentoring a colleague, or driving a project forward independently." },
      { question: "Tell me about a time you failed", tip: "Be honest but strategic. Describe what went wrong, what you did to fix it, and — most importantly — what you learned." },
    ],
  },
  {
    category: "Technical & Role-Specific",
    questions: [
      { question: "How do you stay updated with industry trends?", tip: "Mention specific sources: blogs, newsletters, courses, communities. Shows you're proactive and passionate about your field." },
      { question: "Walk me through your most impactful project", tip: "Pick something relevant to this role. Cover: the problem, your approach, the tech/methods used, and measurable outcomes." },
      { question: "How do you prioritize tasks when everything is urgent?", tip: "Mention frameworks like Eisenhower Matrix or MoSCoW. Show you communicate with stakeholders and manage expectations." },
    ],
  },
  {
    category: "Career & Motivation",
    questions: [
      { question: "Where do you see yourself in 5 years?", tip: "Align your answer with realistic growth at this company. Show ambition but also commitment to the role you're applying for." },
      { question: "Why are you leaving your current job?", tip: "Stay positive. Focus on growth, learning, or new challenges — never badmouth your previous employer." },
      { question: "What motivates you?", tip: "Be genuine. Connect your motivators (impact, problem-solving, collaboration) to what this role offers." },
    ],
  },
];

const interviewTips = [
  {
    title: "Before the Interview",
    icon: "/documents.png",
    tips: [
      "Research the company, its culture, recent news, and competitors",
      "Review the job description and prepare examples matching each requirement",
      "Prepare 5-7 thoughtful questions to ask the interviewer",
      "Plan your route and arrive 10-15 minutes early",
      "Bring multiple copies of your resume and a notepad",
      "Get a good night's sleep and eat a proper meal beforehand",
    ],
  },
  {
    title: "During the Interview",
    icon: "/before.png",
    tips: [
      "Maintain good eye contact and confident body language",
      "Listen actively — don't interrupt, ask for clarification if needed",
      "Use the STAR method for behavioral questions",
      "Quantify your achievements with numbers where possible",
      "Stay positive when discussing previous experiences",
      "Take brief notes to show engagement and recall details later",
    ],
  },
  {
    title: "After the Interview",
    icon: "/after.png",
    tips: [
      "Send a personalized thank-you email within 24 hours",
      "Reiterate your interest and one key point from the conversation",
      "Address any concerns or questions you fumbled during the interview",
      "Follow up politely after the stated decision timeline",
      "Reflect on what went well and what to improve for next time",
    ],
  },
];

const questionsToAsk = [
  { q: "What does success look like in this role after 90 days?", why: "Shows you're results-oriented" },
  { q: "What are the biggest challenges facing the team right now?", why: "Demonstrates strategic thinking" },
  { q: "How would you describe the team culture?", why: "Shows you care about fit" },
  { q: "What opportunities are there for professional development?", why: "Shows ambition and growth mindset" },
  { q: "What's the next step in the interview process?", why: "Shows initiative and enthusiasm" },
  { q: "How do you measure performance in this position?", why: "Shows accountability" },
  { q: "What do you enjoy most about working here?", why: "Builds rapport with interviewer" },
  { q: "Where do you see the company heading in the next 3-5 years?", why: "Shows long-term thinking" },
];

const TABS = [
  { id: 'questions',        label: 'Common Questions'  },
  { id: 'tips',             label: 'Interview Tips'    },
  { id: 'questions-to-ask', label: 'Questions to Ask'  },
];

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(0deg, rgb(255,250,230) 0%, rgb(254,245,205) 50%, rgb(255,255,255) 100%)',
    display: 'flex', flexDirection: 'column',
    fontFamily: "'DM Sans', sans-serif",
  },
  wrap: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(16px, 4vw, 48px) 80px',
    flex: 1,
    width: '100%',
    boxSizing: 'border-box',
  },
  pill: (bg = '#fef3c7', border = '#fde68a', color = '#92400e') => ({
    display: 'inline-block',
    fontFamily: "'Sora', sans-serif",
    fontSize: '11px', fontWeight: 700,
    letterSpacing: '.12em', textTransform: 'uppercase',
    color, background: bg, border: `1.5px solid ${border}`,
    padding: '4px 14px', borderRadius: '999px',
  }),
  card: (extra = {}) => ({
    background: 'rgba(255,255,255,0.78)',
    border: '1.5px solid #fde68a',
    borderRadius: '18px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 12px rgba(180,140,0,.08)',
    ...extra,
  }),
  h1: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700,
    color: '#1c1917', margin: '0 0 12px', lineHeight: 1.2,
  },
  h2: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 700,
    color: '#1c1917', margin: '0 0 20px',
  },
  h3: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '15px', fontWeight: 700, color: '#1c1917', margin: 0,
  },
  muted: { fontSize: '14px', color: '#a8a29e', lineHeight: 1.75 },
  amberBtn: {
    background: '#f59e0b', color: '#fff',
    border: 'none', borderRadius: '10px',
    padding: '10px 20px',
    fontFamily: "'Sora', sans-serif",
    fontSize: '13px', fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(245,158,11,.3)',
    transition: 'background .2s, transform .2s',
    textDecoration: 'none', display: 'inline-block',
  },
};

function StatChips({ answered, total }) {
  const pct = total ? Math.round((answered / total) * 100) : 0;
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
      {[
        { num: total,                    label: 'Questions'  },
        { num: answered,                 label: 'Reviewed'   },
        { num: `${pct}%`,               label: 'Progress'   },
        { num: interviewData.length,     label: 'Categories' },
      ].map(({ num, label }) => (
        <div key={label} style={{ ...S.card({ padding: '10px 22px', textAlign: 'center' }) }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '17px', fontWeight: 700, color: '#92400e', margin: 0 }}>{num}</p>
          <p style={{ fontSize: '11px', color: '#a8a29e', margin: 0 }}>{label}</p>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div style={{ background: '#fde68a', borderRadius: '999px', height: '6px', overflow: 'hidden', marginBottom: '28px' }}>
      <div style={{
        width: `${value}%`, height: '100%',
        background: 'linear-gradient(90deg, #f59e0b, #d97706)',
        borderRadius: '999px', transition: 'width .4s ease',
      }} />
    </div>
  );
}

function SearchBox({ value, onChange }) {
  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      <span style={{
        position: 'absolute', left: '14px', top: '50%',
        transform: 'translateY(-50%)', fontSize: '16px',
        pointerEvents: 'none', color: '#b45309',
      }}><img src="/magnify.png" className="w-4 h-4 inline-block mr-2 relative -top-0.5" /> </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search questions..."
        style={{
          width: '100%', boxSizing: 'border-box',
          background: 'rgba(255,255,255,0.9)',
          border: '1.5px solid #fde68a',
          borderRadius: '12px',
          padding: '12px 14px 12px 40px',
          fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
          color: '#1c1917', outline: 'none',
          boxShadow: '0 2px 8px rgba(180,140,0,.06)',
          transition: 'border-color .2s',
        }}
        onFocus={e => e.target.style.borderColor = '#f59e0b'}
        onBlur={e  => e.target.style.borderColor = '#fde68a'}
      />
      {value && (
        <button onClick={() => onChange('')} style={{
          position: 'absolute', right: '12px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'none', border: 'none',
          cursor: 'pointer', fontSize: '16px', color: '#a8a29e',
        }}>✕</button>
      )}
    </div>
  );
}

function AccordionItem({ item, isOpen, onToggle, isDone, onMarkDone }) {
  return (
    <div style={{
      ...S.card({ borderRadius: '14px', overflow: 'hidden', marginBottom: '10px' }),
      borderColor: isOpen ? '#f59e0b' : isDone ? '#bbf7d0' : '#fde68a',
      transition: 'border-color .2s',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '14px 18px',
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
          <span>
  {isDone ? (
    <img
      src="/right.png"
      alt="Done"
      className="w-4 h-4 inline-block"
    />
  ) : null}
</span>
          <span style={{
            fontFamily: "'Sora', sans-serif", fontSize: 'clamp(12px, 1.5vw, 14px)',
            fontWeight: 600, color: '#1c1917', lineHeight: 1.4,
          }}>{item.question}</span>
        </div>
        <span style={{
          fontSize: '20px', color: '#b45309', flexShrink: 0,
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform .2s', lineHeight: 1,
        }}>+</span>
      </button>

      {isOpen && (
        <div style={{
          padding: '0 18px 16px',
          borderTop: '1.5px solid #fde68a',
          background: 'rgba(254,243,199,0.4)',
        }}>
          <p style={{ ...S.muted, marginTop: '12px', marginBottom: '14px' }}>
            <span style={{ color: '#b45309', fontWeight: 700 }}><img src="/tips.png"  className="w-5 h-5 inline-block mr-2 align-middle" /> Expert Tip Expert Tip — </span>
            {item.tip}
          </p>
          <button
            onClick={onMarkDone}
            style={{
              ...S.amberBtn,
              background: isDone ? '#22c55e' : '#f59e0b',
              boxShadow: isDone ? '0 2px 10px rgba(34,197,94,.25)' : '0 2px 10px rgba(245,158,11,.3)',
              fontSize: '12px', padding: '7px 16px',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {isDone ? '✓ Marked as Reviewed' : 'Mark as Reviewed'}
          </button>
        </div>
      )}
    </div>
  );
}

const InterviewPreparation = () => {
  const [activeTab, setActiveTab]   = useState('questions');
  const [openIndex, setOpenIndex]   = useState(null);
  const [doneSet, setDoneSet]       = useState(new Set());
  const [search, setSearch]         = useState('');
  const [filterDone, setFilterDone] = useState('all');

  const allQuestions = useMemo(() =>
    interviewData.flatMap((cat, ci) =>
      cat.questions.map((q, qi) => ({ ...q, key: `${ci}-${qi}`, category: cat.category }))
    ), []);

  const totalQ    = allQuestions.length;
  const doneCount = doneSet.size;

  const toggleDone = key => {
    setDoneSet(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const filteredData = useMemo(() => {
    if (!search && filterDone === 'all') return interviewData;
    return interviewData.map(cat => ({
      ...cat,
      questions: cat.questions.filter((q, qi) => {
        const key = `${interviewData.indexOf(cat)}-${qi}`;
        const matchSearch = !search || q.question.toLowerCase().includes(search.toLowerCase());
        const matchDone   = filterDone === 'all' ? true
          : filterDone === 'done' ? doneSet.has(key) : !doneSet.has(key);
        return matchSearch && matchDone;
      }),
    })).filter(cat => cat.questions.length > 0);
  }, [search, filterDone, doneSet]);

  return (
    <div style={S.page}>
      <Navbar />

      {/* ── Page Header ── */}
      <div style={{ padding: 'clamp(32px, 5vw, 52px) clamp(16px, 4vw, 24px) 36px', textAlign: 'center' }}>
        <span style={S.pill()}>Interview Prep</span>
        <h1 style={{ ...S.h1, marginTop: '14px' }}>Interview Preparation Guide</h1>
        <p style={{ ...S.muted, maxWidth: '440px', margin: '0 auto' }}>
          Everything you need to walk into your next interview with confidence.
        </p>
      </div>

      <div style={S.wrap}>

        {/* Stats */}
        <StatChips answered={doneCount} total={totalQ} />

        {/* Progress bar */}
        <ProgressBar value={totalQ ? (doneCount / totalQ) * 100 : 0} />

        {/* External links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
          {[
            { label: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/interview-questions/' },
            { label: 'Glassdoor',     url: 'https://www.glassdoor.co.in/Interview/index.htm' },
            { label: 'Indeed Q&A',   url: 'https://in.indeed.com/career-advice/interviewing/top-interview-questions-and-answers' },
            { label: 'PrepInsta',    url: 'https://prepinsta.com/interview-preparation/' },
          ].map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
              style={S.amberBtn}
              onMouseEnter={e => { e.currentTarget.style.background = '#d97706'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f59e0b'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {link.label} 
            </a>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{
          display: 'flex', gap: '8px',
          overflowX: 'auto', WebkitOverflowScrolling: 'touch',
          background: 'rgba(255,255,255,0.7)',
          border: '1.5px solid #fde68a',
          borderRadius: '14px', padding: '6px',
          marginBottom: '20px',
          backdropFilter: 'blur(8px)',
        }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, minWidth: 'max-content',
              padding: 'clamp(8px, 1.5vw, 10px) clamp(10px, 2vw, 18px)',
              borderRadius: '10px', border: 'none',
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'background .2s, color .2s, box-shadow .2s',
              background: activeTab === tab.id ? '#f59e0b' : 'transparent',
              color:      activeTab === tab.id ? '#fff'    : '#92400e',
              boxShadow:  activeTab === tab.id ? '0 2px 10px rgba(245,158,11,.3)' : 'none',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Content Panel ── */}
        <div style={S.card({ padding: 'clamp(16px, 3vw, 28px) clamp(14px, 3vw, 24px)' })}>

          {/* Common Questions */}
          {activeTab === 'questions' && (
            <div>
              <h2 style={S.h2}>Common Interview Questions</h2>
              <SearchBox value={search} onChange={setSearch} />

              {/* Filter pills + reset */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                {[
                  { val: 'all',     label: 'All'      },
                  { val: 'pending', label: 'Pending'  },
                  { val: 'done',    label: 'Reviewed' },
                ].map(f => (
                  <button key={f.val} onClick={() => setFilterDone(f.val)} style={{
                    padding: '6px 16px', borderRadius: '999px',
                    border: `1.5px solid ${filterDone === f.val ? '#f59e0b' : '#fde68a'}`,
                    background: filterDone === f.val ? '#fef3c7' : 'transparent',
                    color: filterDone === f.val ? '#92400e' : '#a8a29e',
                    fontFamily: "'Sora', sans-serif", fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', transition: 'all .2s',
                  }}>{f.label}</button>
                ))}
                {doneCount > 0 && (
                  <button onClick={() => setDoneSet(new Set())} style={{
                    marginLeft: 'auto', padding: '6px 16px', borderRadius: '999px',
                    border: '1.5px solid #fca5a5', background: 'transparent',
                    color: '#ef4444', fontFamily: "'Sora', sans-serif",
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  }}>↺ Reset</button>
                )}
              </div>

              {filteredData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#a8a29e' }}>
                  <p style={{ fontSize: '32px', margin: '0 0 10px' }}><img src="/magnify.png"  className="w-8 h-8 inline-block mr-2 align-middle" /> </p>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>No questions found</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {filteredData.map((cat) => {
                    const ci = interviewData.findIndex(c => c.category === cat.category);
                    return (
                      <div key={cat.category}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                          <div style={{
                            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                            background: '#f59e0b', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: "'Sora', sans-serif", fontSize: '13px', fontWeight: 700,
                          }}>{ci + 1}</div>
                          <h3 style={S.h3}>{cat.category}</h3>
                          <span style={S.pill('#fef3c7', '#fde68a', '#92400e')}>
                            {cat.questions.filter((_, qi) =>
                              doneSet.has(`${ci}-${interviewData[ci].questions.indexOf(cat.questions[qi])}`)
                            ).length}/{cat.questions.length}
                          </span>
                        </div>
                        <div className="accordion-indent">
                          {cat.questions.map((item) => {
                            const qi  = interviewData[ci].questions.indexOf(item);
                            const key = `${ci}-${qi}`;
                            return (
                              <AccordionItem
                                key={key} item={item}
                                isOpen={openIndex === key}
                                onToggle={() => setOpenIndex(openIndex === key ? null : key)}
                                isDone={doneSet.has(key)}
                                onMarkDone={() => toggleDone(key)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Interview Tips */}
          {activeTab === 'tips' && (
            <div>
              <h2 style={S.h2}>Interview Tips & Best Practices</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {interviewTips.map((section, i) => (
                  <div key={i} style={{
                    ...S.card({
                      padding: 'clamp(14px, 2vw, 20px) clamp(14px, 2vw, 22px)',
                      borderLeft: '4px solid #f59e0b',
                      borderRadius: '14px',
                    }),
                    background: 'rgba(254,243,199,0.35)',
                  }}>
                    <h3
  style={{
    ...S.h3,
    marginBottom: '14px',
    fontSize: 'clamp(14px, 2vw, 16px)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}
>
  <img src={section.icon} alt="" className="w-5 h-5" />
  {section.title}
</h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {section.tips.map((tip, ti) => (
                        <li key={ti} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{
                            width: '8px', height: '8px', borderRadius: '50%',
                            background: '#f59e0b', flexShrink: 0, marginTop: '6px',
                          }} />
                          <span style={{ ...S.muted, color: '#57534e' }}>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions to Ask */}
          {activeTab === 'questions-to-ask' && (
            <div>
              <h2 style={S.h2}>Smart Questions to Ask Interviewers</h2>
              <p style={{ ...S.muted, marginBottom: '22px' }}>
                Asking thoughtful questions shows genuine interest and helps you evaluate if this is the right company for you.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                gap: '12px', marginBottom: '24px',
              }}>
                {questionsToAsk.map((item, i) => (
                  <div key={i} style={{
                    ...S.card({ padding: '16px 18px', borderRadius: '14px' }),
                    transition: 'transform .2s, box-shadow .2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(180,140,0,.14)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 2px 12px rgba(180,140,0,.08)' }}
                  >
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '13px', fontWeight: 600, color: '#1c1917', margin: '0 0 8px', lineHeight: 1.5 }}>
                      "{item.q}"
                    </p>
                    <p style={{ fontSize: '12px', color: '#b45309', margin: 0, fontWeight: 600 }}>✓ {item.why}</p>
                  </div>
                ))}
              </div>

              {/* Avoid section */}
              <div style={{
                background: 'rgba(254,226,226,0.5)',
                border: '1.5px solid #fca5a5',
                borderRadius: '14px',
                padding: 'clamp(14px, 2vw, 20px) clamp(14px, 2vw, 22px)',
              }}>
                <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#b91c1c', margin: '0 0 14px', fontSize: 'clamp(13px, 2vw, 15px)' }}>
                  <div className="flex items-center gap-2 text-red-700 font-semibold">
  <img src="/avoid.png" className="w-5 h-5" />
  <span>Questions to Avoid</span>
</div>
                </h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { q: '"What does your company do?"',       r: "Shows you didn't research" },
                    { q: '"How much vacation time do I get?"', r: "Save for after the offer" },
                    { q: '"Can I work from home?"',            r: "Ask about flexibility more tactfully" },
                    { q: '"How quickly can I get promoted?"',  r: "Sounds impatient" },
                  ].map(({ q, r }, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
<img
  src="/cross.png"

  style={{
    width: '18px',
    height: '18px',
    flexShrink: 0
  }}
/>
                      <span style={{ fontSize: '13px', color: '#7f1d1d', lineHeight: 1.6 }}>
                        <strong>{q}</strong> — {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .accordion-indent { padding-left: 44px; }
        @media (max-width: 480px) {
          .accordion-indent { padding-left: 0; }
        }
        div[style*="overflowX"]::-webkit-scrollbar { display: none; }
      `}</style>

      <Footer />
    </div>
  );
};

export default InterviewPreparation;