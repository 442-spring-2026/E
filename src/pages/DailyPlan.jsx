import { useEffect, useState } from 'react'
import './DailyPlan.css'

function DailyPlan() {
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem('dailyPlan')) || []
    const sortedPlan = savedPlan.sort((a, b) => {
      return new Date(`2000/01/01 ${a.time}`) - new Date(`2000/01/01 ${b.time}`)
    })
    setSchedule(sortedPlan)
  }, [])

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

  return (
    <main className="daily-plan-page">
      <section className="daily-plan-container">
        <h1>Daily Plan</h1>

        <p className="subtitle">
          Organize activities throughout the day and track completed tasks.
        </p>

        <section className="summary-grid">
          <div className="summary-card progress-card">
            <h2>Today's Progress</h2>

            <h3>{schedule.length} activities planned today</h3>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(schedule.length * 25, 100)}%`,
                }}
              ></div>
            </div>

            <p className="reward-text">
              Reward Points: {schedule.filter(i => i.status === 'Completed').length * 5} ⭐
            </p>
          </div>

          <div className="summary-card celebration-card">
            <h3>🎉 Great job!</h3>
            <h3>Keep building healthy habits.</h3>
          </div>
        </section>

        <section className="schedule-card">
          <h2>Today's Schedule</h2>

          {schedule.length === 0 ? (
            <p className="empty-plan-message">
              No activities added yet. Go to Activities to add one.
            </p>
          ) : (
            schedule.map((item) => (
              <div className="schedule-row" key={item.time}>
                <div className="schedule-time">{item.time}</div>

                <div className="schedule-activity">
                  <h3>{item.title}</h3>
                  <p>{item.details}</p>
                </div>

                <div className={`schedule-status ${item.status === 'Completed' ? 'completed' : 'planned'}`}>
                  {item.status}
                </div>
                {item.status !== 'Completed' && (
                  <button
                    onClick={() => handleComplete(item.time)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2e8b3c', fontWeight: 'bold', fontSize: '0.9rem' }}
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => handleRemove(item.time)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e53e3e', fontWeight: 'bold', fontSize: '0.9rem' }}
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {schedule.length > 0 && (
            <div className="reminder-box">
              Reminder: {schedule[0].title} starts at {schedule[0].time}.
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default DailyPlan