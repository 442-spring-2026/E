import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import './DailyPlan.css'

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM']

function DailyPlan() {
  const [schedule, setSchedule] = useState([])
  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState(0)
  const [draggedActivity, setDraggedActivity] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [reminderMessage, setReminderMessage] = useState('')

  useEffect(() => {
    async function loadChildren() {
      const profileDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))

      if (profileDoc.exists()) {
        const data = profileDoc.data()

        if (data.children && data.children.length > 0) {
          setChildren(data.children)
        } else if (data.age) {
          setChildren([
            {
              name: data.name || '',
              age: data.age,
              screenTime: data.screenTime,
              interests: data.interests,
            },
          ])
        }
      }
    }

    loadChildren()
  }, [])

  useEffect(() => {
    loadSchedule()
  }, [selectedChild])

  function getPlanKey() {
    return `dailyPlan-${selectedChild}`
  }

  function loadSchedule() {
    const savedPlan = JSON.parse(localStorage.getItem(getPlanKey())) || []

    const sortedPlan = savedPlan.sort((a, b) => {
      return new Date(`2000/01/01 ${a.time}`) - new Date(`2000/01/01 ${b.time}`)
    })

    setSchedule(sortedPlan)
  }

  function saveSchedule(updatedSchedule) {
    const sortedPlan = [...updatedSchedule].sort((a, b) => {
      return new Date(`2000/01/01 ${a.time}`) - new Date(`2000/01/01 ${b.time}`)
    })

    localStorage.setItem(getPlanKey(), JSON.stringify(sortedPlan))
    setSchedule(sortedPlan)
  }

  function handleRemove(id) {
    const updated = schedule.filter((item) => item.id !== id)
    saveSchedule(updated)
    setErrorMessage('')
  }

  function handleComplete(id) {
    const updated = schedule.map((item) =>
      item.id === id ? { ...item, status: 'Completed' } : item
    )

    saveSchedule(updated)
  }

  function handleReminder(id) {
    const updated = schedule.map((item) =>
      item.id === id
        ? {
            ...item,
            reminderSet: true,
            reminderTime: getReminderTime(item.time),
          }
        : item
    )

    const activity = schedule.find((item) => item.id === id)

    if (activity) {
      setReminderMessage(
        `Reminder set for ${activity.title} at ${getReminderTime(activity.time)}.`
      )
    }

    saveSchedule(updated)
  }

  function getReminderTime(time) {
    const date = new Date(`2000/01/01 ${time}`)
    date.setMinutes(date.getMinutes() - 10)

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  function handleDragStart(activity) {
    setDraggedActivity(activity)
    setErrorMessage('')
  }

  function handleDragOver(event) {
    event.preventDefault()
  }

  function handleDrop(targetTime) {
    if (!draggedActivity) {
      return
    }

    const targetOccupied = schedule.some(
      (item) => item.time === targetTime && item.id !== draggedActivity.id
    )

    if (targetOccupied) {
      setErrorMessage('This time slot is already occupied.')
      setDraggedActivity(null)
      return
    }

    const updated = schedule.map((item) =>
      item.id === draggedActivity.id
        ? {
            ...item,
            time: targetTime,
            reminderTime: item.reminderSet ? getReminderTime(targetTime) : item.reminderTime,
          }
        : item
    )

    saveSchedule(updated)

    if (draggedActivity.reminderSet) {
      setReminderMessage(
        `Reminder updated for ${draggedActivity.title} at ${getReminderTime(targetTime)}.`
      )
    }

    setDraggedActivity(null)
    setErrorMessage('')
  }

  const selectedChildData = children[selectedChild]
  const screenTimeLimit = Number(selectedChildData?.screenTime || 120)
  const d = new Date()
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const storedSessions = JSON.parse(localStorage.getItem(`screenTime-${selectedChild}-${today}`)) || []
  const usedScreenTime = storedSessions.reduce((sum, s) => sum + s.minutes, 0)
  const remainingScreenTime = Math.max(screenTimeLimit - usedScreenTime, 0)
  const screenTimePercent = Math.min((remainingScreenTime / screenTimeLimit) * 100, 100)

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

        <p className="subtitle">
          Organize activities throughout the day and track completed tasks.
        </p>

        {children.length > 0 && (
          <section className="child-selector-card">
            <label>
              Viewing plan for
              <select
                value={selectedChild}
                onChange={(e) => {
                  setSelectedChild(Number(e.target.value))
                  setErrorMessage('')
                  setReminderMessage('')
                }}
              >
                {children.map((child, index) => (
                  <option key={index} value={index}>
                    {child.name || `Child ${index + 1}`} {child.age ? `(${child.age} years old)` : ''}
                  </option>
                ))}
              </select>
            </label>
          </section>
        )}

        {reminderMessage && (
          <div className="reminder-banner">
            {reminderMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-banner">
            {errorMessage}
          </div>
        )}

        <section className="summary-grid">
          <div className="summary-card progress-card">
            <h2>Remaining Screen Time</h2>
            <h3>{remainingScreenTime} minutes remaining today</h3>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${screenTimePercent}%` }}
              ></div>
            </div>

            <p className="reward-text">Reward Points: {rewardPoints} ⭐</p>
          </div>

          <div className="summary-card celebration-card">
            <h3>🎉 Great job!</h3>
            <h3>{schedule.length} activities planned today.</h3>
          </div>
        </section>

        <section className="schedule-card">
          <h2>Today's Timeline</h2>

          {schedule.length === 0 && (
            <p className="empty-plan-message">
              No activities in your daily plan. Go to Activities to add one.
            </p>
          )}

          <div className="timeline">
            {TIME_SLOTS.map((slot) => {
              const activity = schedule.find((item) => item.time === slot)

              return (
                <div
                  className="timeline-row"
                  key={slot}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(slot)}
                >
                  <div className="timeline-time">{slot}</div>

                  <div className="timeline-content">
                    {activity ? (
                      <div
                        className={`schedule-activity ${
                          activity.status === 'Completed' ? 'completed-activity' : ''
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(activity)}
                      >
                        <div className="activity-row-top">
                          <div>
                            <h3>{activity.title}</h3>
                            <p>{activity.details}</p>

                            {activity.reminderSet && (
                              <p className="reminder-note">
                                Reminder at {activity.reminderTime}
                              </p>
                            )}
                          </div>

                          <span
                            className={`schedule-status ${
                              activity.status === 'Completed' ? 'completed' : 'planned'
                            }`}
                          >
                            {activity.status}
                          </span>
                        </div>

                        <div className="activity-actions">
                          {activity.status !== 'Completed' && (
                            <button
                              type="button"
                              className="complete-button"
                              onClick={() => handleComplete(activity.id)}
                            >
                              Complete
                            </button>
                          )}

                          <button
                            type="button"
                            className="reminder-button"
                            onClick={() => handleReminder(activity.id)}
                          >
                            Reminder
                          </button>

                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => handleRemove(activity.id)}
                          >
                            Remove
                          </button>
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