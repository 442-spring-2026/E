import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

function Authentication() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('* Email is required')
      return
    }
    if (!password) {
      setError('* Password is required')
      return
    }

    setLoading(true)

    try {
      if (mode === 'login') {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const profileDoc = await getDoc(doc(db, 'users', result.user.uid))
        if (profileDoc.exists()) {
          navigate('/dashboard')
        } else {
          navigate('/onboarding')
        }
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
        navigate('/onboarding')
      }
    } catch (err) {
      setError('* Invalid email or password')
    }

    setLoading(false)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginBottom: '8px' }}>Welcome Back</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Log in or create an account to start building healthier family habits.</p>

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Email</label>
          <input
            type="email"
            placeholder="parent@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '16px', boxSizing: 'border-box', fontSize: '1rem' }}
          />

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '20px', boxSizing: 'border-box', fontSize: '1rem' }}
          />

          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '10px 24px', backgroundColor: '#3a7d44', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}
            >
              {loading ? 'Logging in...' : mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              style={{ padding: '10px 24px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}
            >
              {mode === 'login' ? 'Sign Up' : 'Back to Login'}
            </button>
          </div>

          {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Authentication
