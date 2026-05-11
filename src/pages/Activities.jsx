import { useState } from 'react'
import './Activities.css'

const activities = [
  {
    name: "Family Cooking",
    description: "Cook a simple meal together and encourage teamwork at home.",
    duration: "30 min",
    type: "Family Bonding",
    age: "6-8 years old",
    points: "+20 pts"
  },
  {
    name: "Drawing Time",
    description: "Spend time drawing, coloring, or making a small creative project.",
    duration: "20 min",
    type: "Indoor",
    age: "6-8 years old",
    points: "+15 pts"
  },
  {
    name: "Nature Walk",
    description: "Take a short walk outside together and explore the neighborhood.",
    duration: "25 min",
    type: "outdoor",
    age: "6-8 years old",
    points: "+20 pts"
  },
  {
    name: "Board Game Night",
    description: "Play a board game together to build connection and reduce screen time.",
    duration: "40 min",
    type: "Family Bonding",
    age: "6-8 years old",
    points: "+25 pts"
  }

]

function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [confirmedActivity, setConfirmedActivity] = useState('')

  function handleAddToPlan(activity) {
    setSelectedActivity(activity)
    setConfirmedActivity('')
  }

  function handleConfirm() {
    setConfirmedActivity(selectedActivity.name)
    setSelectedActivity(null)
  }

  return (
    <main className='activities-page'>
      <section className='activities-header'>
        <h1>Activity Suggestion</h1>
        <p>Choose meaningful activities to replace screen time</p>
      </section>

      <section className='filters-card'>
        <h2>Filters</h2>

        <div className='filter-row'>
          <label>
            Age Group
            <select>
              <option>6-8 years old</option>
              <option>9-11 years old</option>
              <option>12+ years old</option>
            </select>
          </label>

          <label>
            Available Time
            <select>
              <option>20 minutes</option>
              <option>20-40 minutes</option>
              <option>40+ minutes</option>
            </select>
          </label>

          <label>
            Activity Type
            <select>
              <option>Family Bonding</option>
              <option>Indoor</option>
              <option>Outdoor</option>
            </select>
          </label>
        </div>
        <button className='primary-button'>Apply Filters</button>
      </section>

      {selectedActivity && (
        <section className='time-select-card'>
          <h2>Add {selectedActivity.name} to Daily Plan</h2>
          <label>
            Choose a time slot
            <select>
              <option>10:00 AM</option>
              <option>1:00 PM</option>
              <option>5:00 PM</option>
              <option>7:30 AM</option>
            </select>
          </label>
          <button className='primary-button' onClick={handleConfirm}>
            Confirm Time
          </button>
        </section>
      )}

      {confirmedActivity && (
        <p className='success-message'>
          {confirmedActivity} was added to the Daily Plan.
        </p>
      )}

      <section>
        <h2 className='section-title'>Recommended Activities</h2>

        <div className='activity-grid'>
          {activities.map((activity) => (
            <article className='activity-card' key={activity.name}>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
              <p>Duration: {activity.duration}</p>
              <p>Type: {activity.type}</p>
              <p>Age: {activity.age}</p>
              <p className='points'>{activity.points}</p>
              <button
                className='primary-button'
                onClick={() => handleAddToPlan(activity)}
              >
                Add to Plan
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Activities