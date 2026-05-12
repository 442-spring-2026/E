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
            <h3>1.5 hours remaining today</h3>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <p className="reward-text">Reward Points: 120 ⭐</p>
          </div>

          <div className="summary-card celebration-card">
            <h3>🎉 Great job!</h3>
            <h3>You earned points today.</h3>
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

                <div className="schedule-status planned">{item.status}</div>
              </div>
            ))
          )}

          <div className="reminder-box">
            Reminder: Family Cooking starts at 5:00 PM.
          </div>
        </section>
      </section>
    </main>
  )
}

export default DailyPlan