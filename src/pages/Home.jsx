import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Home({ user }) {
  const navigate = useNavigate()

  async function handleGetStarted() {
    if (!user) {
      navigate('/login')
    } else {
      const profileDoc = await getDoc(doc(db, 'users', user.uid))
      if (profileDoc.exists()) {
        navigate('/dashboard')
      } else {
        navigate('/onboarding')
      }
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1>Nestly</h1>
      <p style={{ maxWidth: '500px', margin: '20px auto', fontSize: '1.1rem', color: '#555' }}>
        Nestly helps parents manage their children's screen time by suggesting
        fun indoor, outdoor, and family activities to do instead. Build healthy
        habits, track daily usage, and earn rewards along the way.
      </p>
      <button
        onClick={handleGetStarted}
        style={{ padding: '12px 28px', backgroundColor: '#3a7d44', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}
      >
        Get Started
      </button>
    </div>
  )
}

export default Home
