import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import './Profile.css'

const emptyChild = () => ({ id: Date.now(), age: '', screenTime: '', interests: '' })

function Profile() {
  const [children, setChildren] = useState([emptyChild()])
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      const profileDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
      if (profileDoc.exists()) {
        const data = profileDoc.data()
        if (data.children && data.children.length > 0) {
          setChildren(data.children.map((c, i) => ({ id: i, ...c })))
        } else if (data.age || data.screenTime || data.interests) {
          setChildren([{ id: 0, age: data.age || '', screenTime: data.screenTime || '', interests: data.interests || '' }])
        }
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

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

  async function handleSave() {
    setError('')
    setSuccessMessage('')

    for (const child of children) {
      if (!child.age || !child.screenTime || !child.interests.trim()) {
        setError('Please enter valid information')
        return
      }
    }

    try {
      const childrenData = children.map(({ id, ...rest }) => rest)
      await setDoc(doc(db, 'users', auth.currentUser.uid), { children: childrenData }, { merge: true })
      setSuccessMessage('Profile saved successfully.')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  if (loading) return null

  return (
    <main className="profile-page">
      <section className="profile-card">
        <h1>Profile</h1>

        <div className="child-profile-list">
          {children.map((child, index) => (
            <div className="child-profile-card" key={child.id}>
              <div className="child-profile-header">
                <h2>Child {index + 1}</h2>
                {children.length > 1 && (
                  <button
                    type="button"
                    className="remove-child-button"
                    onClick={() => handleRemoveChild(child.id)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <label>
                Child Age
                <select
                  value={child.age}
                  onChange={(e) => handleChange(child.id, 'age', e.target.value)}
                  style={{ width: '100%', marginTop: '6px', padding: '12px', border: '1px solid #ced4da', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white' }}
                >
                  <option value="">Select age range</option>
                  <option value="2-5">2-5 years old</option>
                  <option value="6-8">6-8 years old</option>
                  <option value="9-11">9-11 years old</option>
                  <option value="12+">12+ years old</option>
                </select>
              </label>

              <label>
                Screen Time Limit
                <select
                  value={child.screenTime}
                  onChange={(e) => handleChange(child.id, 'screenTime', e.target.value)}
                  style={{ width: '100%', marginTop: '6px', padding: '12px', border: '1px solid #ced4da', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white' }}
                >
                  <option value="">Select limit</option>
                  <option value="30">30 minutes per day</option>
                  <option value="60">1 hour per day</option>
                  <option value="90">1.5 hours per day</option>
                  <option value="120">2 hours per day</option>
                  <option value="180">3 hours per day</option>
                </select>
              </label>

              <label>
                Interests
                <input
                  type="text"
                  placeholder="e.g. Drawing, Sports, Cooking"
                  value={child.interests}
                  onChange={(e) => handleChange(child.id, 'interests', e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>

        <div className="profile-buttons">
          <button type="button" className="add-child-button" onClick={handleAddChild}>
            Add Child
          </button>
          <button type="button" className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>

        {error && <p className="profile-error">{error}</p>}
        {successMessage && <p className="profile-message">{successMessage}</p>}
      </section>
    </main>
  )
}

export default Profile
