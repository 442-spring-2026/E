import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

function Onboarding() {
  const [age, setAge] = useState('')
  const [screenTime, setScreenTime] = useState('')
  const [interests, setInterests] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!age || !screenTime || !interests.trim()) {
      setError('* Please complete all required fields')
      return
    }

    setLoading(true)

    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        age,
        screenTime,
        interests: interests.trim()
      })
      navigate('/dashboard')
    } catch (err) {
      setError('* Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5', padding: '40px 20px' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '600px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '2rem' }}>Set Up Your Preferences</h2>
        <p style={{ color: '#666', marginBottom: '32px' }}>Tell us a little about your family so we can personalize activity suggestions and screen time goals.</p>

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Child's Age</label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '24px', fontSize: '1rem', backgroundColor: 'white' }}
          >
            <option value="">Select age range</option>
            <option value="2-5">2–5 years old</option>
            <option value="6-8">6–8 years old</option>
            <option value="9-12">9–12 years old</option>
          </select>

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Screen Time Limit</label>
          <select
            value={screenTime}
            onChange={(e) => setScreenTime(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '24px', fontSize: '1rem', backgroundColor: 'white' }}
          >
            <option value="">Select limit</option>
            <option value="30">30 minutes per day</option>
            <option value="60">1 hour per day</option>
            <option value="90">1.5 hours per day</option>
            <option value="120">2 hours per day</option>
            <option value="180">3 hours per day</option>
          </select>

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Interests</label>
          <input
            type="text"
            placeholder="Drawing, Sports, Cooking"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '28px', boxSizing: 'border-box', fontSize: '1rem' }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ padding: '12px 28px', backgroundColor: '#3a7d44', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}
          >
            {loading ? 'Saving...' : 'Continue to Dashboard'}
          </button>

          {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Onboarding
