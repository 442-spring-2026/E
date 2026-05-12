import { useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { seedActivities } from '../utils/seedActivities'
import './Activities.css'

const timeSlots = [
  { time: '9:00 AM', availableMinutes: 60 },
  { time: '10:00 AM', availableMinutes: 60 },
  { time: '12:00 PM', availableMinutes: 60 },
  { time: '3:00 PM', availableMinutes: 60 },
  { time: '5:00 PM', availableMinutes: 60 },
  { time: '7:00 PM', availableMinutes: 60 },
]

function Activities() {
  const [activities, setActivities] = useState([])
  const [loadingActivities, setLoadingActivities] = useState(true)
  const [filtersApplied, setFiltersApplied] = useState(false)
  const activitiesRef = useRef([])
  const [ageFilter, setAgeFilter] = useState('')
  const [timeFilter, setTimeFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [filteredActivities, setFilteredActivities] = useState([])

  useEffect(() => {
    async function loadActivities() {
      await seedActivities()
      const snapshot = await getDocs(collection(db, 'activities'))
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      activitiesRef.current = data
      setActivities(data)
      setFilteredActivities([])
      setLoadingActivities(false)
    }
    loadActivities()
  }, [])

  const [selectedActivity, setSelectedActivity] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [confirmedActivity, setConfirmedActivity] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function getDurationNumber(duration) {
    return parseInt(duration)
  }

  function handleApplyFilters() {
    let results = activitiesRef.current

    if (ageFilter) {
      results = results.filter((activity) => activity.age === ageFilter)
    }

    if (typeFilter) {
      results = results.filter((activity) => activity.type === typeFilter)
    }

    if (timeFilter) {
      results = results.filter((activity) => {
        const duration = getDurationNumber(activity.duration)

        if (timeFilter === '20 minutes') {
          return duration <= 20
        }

        if (timeFilter === '20-40 minutes') {
          return duration >= 20 && duration <= 40
        }

        if (timeFilter === '40+ minutes') {
          return duration >= 40
        }

        return true
      })
    }

    setFilteredActivities(results)
    setFiltersApplied(true)
  }

  function handleResetFilters() {
    setAgeFilter('')
    setTimeFilter('')
    setTypeFilter('')
    setFilteredActivities([])
    setFiltersApplied(false)
  }

  function handleAddToPlan(activity) {
    setSelectedActivity(activity)
    setSelectedTime('')
    setConfirmedActivity('')
    setErrorMessage('')
  }

  function handleConfirm() {
    if (!selectedTime) {
      setErrorMessage('Please select a time slot.')
      return
    }

    const currentPlan = JSON.parse(localStorage.getItem('dailyPlan')) || []
    const slotTaken = currentPlan.some((item) => item.time === selectedTime)

    if (slotTaken) {
      setErrorMessage('This time slot is already occupied.')
      return
    }

    const newPlanItem = {
      time: selectedTime,
      title: selectedActivity.name,
      details: `${selectedActivity.duration} · ${selectedActivity.type}`,
      status: 'Planned',
    }

    localStorage.setItem('dailyPlan', JSON.stringify([...currentPlan, newPlanItem]))

    setConfirmedActivity(selectedActivity.name)
    setSelectedActivity(null)
    setSelectedTime('')
    setErrorMessage('')
  }

  return (
    <main className="activities-page">
      <section className="activities-header">
        <h1>Activity Suggestion</h1>
        <p>Choose meaningful activities to replace screen time</p>
      </section>

      <section className="filters-card">
        <h2>Filters</h2>

        <div className="filter-row">
          <label>
            Age Group
            <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
              <option value="">All ages</option>
              <option value="6-8 years old">6-8 years old</option>
              <option value="9-11 years old">9-11 years old</option>
              <option value="12+ years old">12+ years old</option>
            </select>
          </label>

          <label>
            Available Time
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="">Any time</option>
              <option value="20 minutes">20 minutes</option>
              <option value="20-40 minutes">20-40 minutes</option>
              <option value="40+ minutes">40+ minutes</option>
            </select>
          </label>

          <label>
            Activity Type
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All types</option>
              <option value="Family Bonding">Family Bonding</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="primary-button" onClick={handleApplyFilters}>
            Apply Filters
          </button>
          <button
            onClick={handleResetFilters}
            style={{ padding: '10px 18px', backgroundColor: '#888', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}
          >
            Reset
          </button>
        </div>
      </section>

      {selectedActivity && (
        <section className="time-select-card">
          <h2>Add {selectedActivity.name} to Daily Plan</h2>

          <label>
            Choose a time slot
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select a time</option>
              {timeSlots
                .filter(
                  (slot) =>
                    slot.availableMinutes >= getDurationNumber(selectedActivity.duration)
                )
                .map((slot) => (
                  <option key={slot.time} value={slot.time}>
                    {slot.time}
                  </option>
                ))}
            </select>
          </label>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button className="primary-button" onClick={handleConfirm}>
              Confirm Time
            </button>
            <button
              onClick={() => { setSelectedActivity(null); setErrorMessage('') }}
              style={{ padding: '10px 18px', backgroundColor: '#888', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}
            >
              Cancel
            </button>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </section>
      )}

      {confirmedActivity && (
        <p className="success-message">
          {confirmedActivity} was added to the Daily Plan.
        </p>
      )}

      <section>
        <h2 className="section-title">Recommended Activities</h2>

        {filteredActivities.length === 0 ? (
          <p className="no-activities-message">
            {!filtersApplied
              ? loadingActivities
                ? 'Loading activities...'
                : 'Please select filters to show personalized recommended activities.'
              : 'No activities found. Try adjusting filters.'}
          </p>
        ) : (
          <div className="activity-grid">
            {filteredActivities.map((activity) => (
              <article className="activity-card" key={activity.name}>
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
                <p>Duration: {activity.duration}</p>
                <p>Type: {activity.type}</p>
                <p>Age: {activity.age}</p>
                <p className="points">{activity.points}</p>

                <button
                  className="primary-button"
                  onClick={() => handleAddToPlan(activity)}
                >
                  Add to Plan
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Activities