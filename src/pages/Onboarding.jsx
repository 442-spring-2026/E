import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const emptyChild = () => ({ id: Date.now(), age: '', screenTime: '', interests: '' })

function Onboarding() {
  const [children, setChildren] = useState([emptyChild()])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleAddChild() {
    setChildren([...children, emptyChild()])
  }

  function handleRemoveChild(id) {
    setChildren(children.filter((child) => child.id !== id))
  }

  function handleChange(id, field, value) {
    setChildren(children.map((child) =>
      child.id === id ? { ...child, [field]: value } : child
    ))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    for (const child of children) {
      if (!child.age || !child.screenTime || !child.interests.trim()) {
        setError('* Please complete all required fields')
        return
      }
      if (!/[a-zA-Z]/.test(child.interests)) {
        setError('* Interests must include letters, not just numbers')
        return
      }
    }

    setLoading(true)

    try {
      const childrenData = children.map(({ id, ...rest }) => rest)
      await setDoc(doc(db, 'users', auth.currentUser.uid), { children: childrenData })
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
          {children.map((child, index) => (
            <div key={child.id} style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Child {index + 1}</h3>
                {children.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveChild(child.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e53e3e', fontWeight: 'bold' }}
                  >
                    Remove
                  </button>
                )}
              </div>

              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Child's Age</label>
              <select
                value={child.age}
                onChange={(e) => handleChange(child.id, 'age', e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '16px', fontSize: '1rem', backgroundColor: 'white' }}
              >
                <option value="">Select age range</option>
                <option value="2-5">2-5 years old</option>
                <option value="6-8">6-8 years old</option>
                <option value="9-11">9-11 years old</option>
                <option value="12+">12+ years old</option>
              </select>

              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Screen Time Limit</label>
              <select
                value={child.screenTime}
                onChange={(e) => handleChange(child.id, 'screenTime', e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '16px', fontSize: '1rem', backgroundColor: 'white' }}
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
                placeholder="e.g. Drawing, Sports, Cooking"
                value={child.interests}
                onChange={(e) => handleChange(child.id, 'interests', e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddChild}
            style={{ padding: '10px 20px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', marginBottom: '20px' }}
          >
            + Add Another Child
          </button>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '12px 28px', backgroundColor: '#3a7d44', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}
            >
              {loading ? 'Saving...' : 'Continue to Dashboard'}
            </button>
          </div>

          {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Onboarding
