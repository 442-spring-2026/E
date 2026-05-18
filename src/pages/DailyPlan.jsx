import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import './DailyPlan.css'

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM']

function DailyPlan() {
  const [schedule, setSchedule] = useState([])
  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState(0)

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
    }
    loadChildren()
  }, [])

  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem('dailyPlan')) || []
    const sortedPlan = savedPlan.sort((a, b) => {
      return new Date(`2000/01/01 ${a.time}`) - new Date(`2000/01/01 ${b.time}`)
    })
    setSchedule(sortedPlan)
  }, [selectedChild])

  function handleRemove(time) {
    const updated = schedule.filter((item) => item.time !== time)
    localStorage.setItem('dailyPlan', JSON.stringify(updated))
    setSchedule(updated)
  }

  function handleComplete(time) {
    const updated = schedule.map((item) =>
      item.time === time ? { ...item, status: 'Completed' } : item
    )
    localStorage.setItem('dailyPlan', JSON.stringify(updated))
    setSchedule(updated)
  }

  const completedCount = schedule.filter(i => i.status === 'Completed').length
  const rewardPoints = schedule.reduce((total, item) => {
    if (item.status === 'Completed' && item.points) {
      return total + parseInt(item.points)
    }
    return total
  }, 0)

  return (
    <main className="daily-plan-page">
      <section className="daily-plan-container">
        <h1>Daily Plan</h1>
        <p className="subtitle">Organize activities throughout the day and track completed tasks.</p>

        {children.length > 1 && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: '600', marginRight: '12px' }}>Viewing plan for:</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(Number(e.target.value))}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
            >
              {children.map((child, index) => (
                <option key={index} value={index}>Child {index + 1} ({child.age} years old)</option>
              ))}
            </select>
          </div>
        )}

        <section className="summary-grid">
          <div className="summary-card progress-card">
            <h2>Today's Progress</h2>
            <h3>{schedule.length} activities planned today</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(schedule.length * 25, 100)}%` }}
              ></div>
            </div>
            <p className="reward-text">Reward Points: {rewardPoints} ⭐</p>
          </div>

          <div className="summary-card celebration-card">
            <h3>🎉 Great job!</h3>
            <h3>Keep building healthy habits.</h3>
          </div>
        </section>

        <section className="schedule-card">
          <h2>Today's Schedule</h2>

          {schedule.length === 0 && (
            <p className="empty-plan-message">No activities in your daily plan. Go to Activities to add one.</p>
          )}

          <div className="timeline">
            {TIME_SLOTS.map((slot) => {
              const activity = schedule.find((item) => item.time === slot)
              return (
                <div className="timeline-row" key={slot}>
                  <div className="timeline-time">{slot}</div>
                  <div className="timeline-content">
                    {activity ? (
                      <div className="schedule-activity">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h3>{activity.title}</h3>
                            <p>{activity.details}</p>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span className={`schedule-status ${activity.status === 'Completed' ? 'completed' : 'planned'}`}>
                              {activity.status}
                            </span>
                            {activity.status !== 'Completed' && (
                              <button
                                onClick={() => handleComplete(slot)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2e8b3c', fontWeight: 'bold', fontSize: '0.9rem' }}
                              >
                                Complete
                              </button>
                            )}
                            <button
                              onClick={() => handleRemove(slot)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e53e3e', fontWeight: 'bold', fontSize: '0.9rem' }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="empty-slot">Open</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </section>
    </main>
  )
}

export default DailyPlan
