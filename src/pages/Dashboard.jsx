import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import './Dashboard.css'

function getToday() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getDateKey(childIndex, date) {
  return `screenTime-${childIndex}-${date}`
}

function getPlanKey(childIndex) {
  return `dailyPlan-${childIndex}`
}

function getRewardKey(childIndex) {
  return `rewardPoints-${childIndex}`
}

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    days.push(key)
  }
  return days
}

function Dashboard() {
  const navigate = useNavigate()
  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState(0)
  const [sessions, setSessions] = useState([])
  const [hoursInput, setHoursInput] = useState('')
  const [minutesInput, setMinutesInput] = useState('')
  const [rewardPoints, setRewardPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadChildren() {
      const profileDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
      if (profileDoc.exists()) {
        const data = profileDoc.data()
        if (data.children && data.children.length > 0) {
          setChildren(data.children)
        } else if (data.age) {
          setChildren([{ age: data.age, screenTime: data.screenTime, interests: data.interests }])
        }
      }
      setLoading(false)
    }
    loadChildren()
  }, [])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(getDateKey(selectedChild, getToday()))) || []
    setSessions(saved)
    const stored = parseInt(localStorage.getItem(getRewardKey(selectedChild))) || 0
    setRewardPoints(stored)
  }, [selectedChild])

  const selectedChildData = children[selectedChild]
  const screenTimeLimit = Number(selectedChildData?.screenTime || 120)
  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0)
  const remainingMinutes = Math.max(screenTimeLimit - totalMinutes, 0)
  const exceeded = totalMinutes > screenTimeLimit
  const hasData = sessions.length > 0

  const weeklyData = getLast7Days().map((date) => {
    const daySessions = JSON.parse(localStorage.getItem(getDateKey(selectedChild, date))) || []
    const totalHours = daySessions.reduce((sum, s) => sum + s.minutes, 0) / 60
    const label = new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })
    return { day: label, hours: totalHours }
  })

  const hasWeeklyData = weeklyData.some(d => d.hours > 0)

  function handleAddSession() {
    const h = parseInt(hoursInput) || 0
    const m = parseInt(minutesInput) || 0
    const totalMins = h * 60 + m
    if (totalMins <= 0) return

    const updated = [...sessions, { id: Date.now(), minutes: totalMins }]
    localStorage.setItem(getDateKey(selectedChild, getToday()), JSON.stringify(updated))
    setSessions(updated)
    setHoursInput('')
    setMinutesInput('')
  }

  function handleRemoveSession(id) {
    const updated = sessions.filter(s => s.id !== id)
    localStorage.setItem(getDateKey(selectedChild, getToday()), JSON.stringify(updated))
    setSessions(updated)
  }

  if (loading) return null

  return (
    <main className="dashboard-page">

      {children.length > 1 && (
        <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontWeight: '600', marginRight: '12px' }}>Viewing dashboard for:</label>
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(Number(e.target.value))}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
          >
            {children.map((child, index) => (
              <option key={index} value={index}>
                Child {index + 1} ({child.age} years old)
              </option>
            ))}
          </select>
        </div>
      )}

      <section className="dashboard-top">
        <div className="dashboard-card screen-time-card">
          <h1>Dashboard</h1>
          <h2>Today's Screen Time</h2>

          {hasData ? (
            <>
              <p className="screen-time-number">
                {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
              </p>
              <p>{Math.floor(remainingMinutes / 60)}h {remainingMinutes % 60}m remaining today</p>
              <div className="progress-bar" aria-label="Screen time progress">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min((totalMinutes / screenTimeLimit) * 100, 100)}%`,
                    backgroundColor: totalMinutes >= screenTimeLimit ? '#e53e3e' : '#4caf50'
                  }}
                ></div>
              </div>
            </>
          ) : (
            <p style={{ color: '#888', marginTop: '8px' }}>No screen time entered yet. Add a session below.</p>
          )}

          <div style={{ marginTop: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>Add Screen Time Session</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '12px' }}>
              Enter today’s screen time manually to track daily usage.
            </p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="number"
                min="0"
                max="23"
                placeholder="Hours"
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' }}
              />
              <input
                type="number"
                min="0"
                max="59"
                placeholder="Minutes"
                value={minutesInput}
                onChange={(e) => setMinutesInput(e.target.value)}
                style={{ width: '90px', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' }}
              />
              <button
                onClick={handleAddSession}
                style={{ padding: '8px 16px', backgroundColor: '#3a7d44', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}
              >
                Add Session
              </button>
            </div>

            {sessions.length > 0 && (
              <div style={{ marginTop: '14px' }}>
                <p style={{ fontWeight: '600', marginBottom: '8px' }}>Today's sessions:</p>
                {sessions.map((s, i) => (
                  <div key={s.id || i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <span style={{ color: '#555' }}>
                      Session {i + 1}: {Math.floor(s.minutes / 60)}h {s.minutes % 60}m
                    </span>
                    <button
                      onClick={() => handleRemoveSession(s.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e53e3e', fontWeight: 'bold', fontSize: '0.85rem' }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-card warning-card">
          {!hasData ? (
            <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', marginBottom: '8px' }}>📊</p>
            <p style={{ fontWeight: 'bold', color: '#888', fontSize: '1rem' }}>No data yet</p>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Enter today's screen time to see status.</p>
          </div>
          ) : totalMinutes >= screenTimeLimit ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', marginBottom: '8px' }}>⚠️</p>
              <p style={{ fontWeight: 'bold', color: '#e53e3e', fontSize: '1rem', marginBottom: '4px' }}>
                {exceeded ? 'Limit exceeded' : 'Daily limit reached'}
              </p>
              <p style={{ color: '#e53e3e', fontSize: '0.95rem' }}>
                {exceeded
                  ? `${Math.floor((totalMinutes - screenTimeLimit) / 60)}h ${(totalMinutes - screenTimeLimit) % 60}m over today's limit`
                  : 'You have reached today’s screen time limit.'}
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</p>
              <p style={{ fontWeight: 'bold', color: '#2e8b3c', fontSize: '1rem', marginBottom: '4px' }}>Within today's limit</p>
              <p style={{ color: '#2e8b3c', fontSize: '0.95rem' }}>
                {Math.floor(remainingMinutes / 60)}h {remainingMinutes % 60}m remaining
              </p>
            </div>
          )}
        </div>
      </section>

      {hasWeeklyData ? (
        <section className="dashboard-card">
          <h2>Weekly Screen Time</h2>
          <div className="weekly-chart" aria-label="Weekly screen time chart">
            {weeklyData.map((item) => (
              <div className="chart-column" key={item.day}>
                <div
                  className="chart-bar"
                  style={{ height: `${Math.max(item.hours * 35, 2)}px` }}
                ></div>
                <p>{item.day}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="dashboard-card reward-card">
        <h2>Reward Points</h2>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{rewardPoints} ⭐</p>
      </section>

      <button className="suggestions-button" type="button" onClick={() => navigate('/activities')}>
        View Suggestions
      </button>
    </main>
  )
}

export default Dashboard
