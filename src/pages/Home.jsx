import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import './Home.css'

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
    <main className="home-page">
      <section className="home-card">
        <div className="home-intro">
          <h1>Reduce Screen Time, Build Better Habits</h1>

          <p>
          Nestly helps families build healthier screen time habits by suggesting
          fun indoor, outdoor, and family activities. Discover meaningful activity
          ideas, create daily plans, and earn rewards along the way.
          </p>

          <button className="get-started-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        <div className="home-features">
          <h2>What you can do</h2>

          <div className="feature-card">
            <h3>View screen time usage</h3>
            <p>Check daily screen time usage and remaining allowed screen time.</p>
          </div>

          <div className="feature-card">
            <h3>Discover activities</h3>
            <p>Browse activities based on age, time, and activity type.</p>
          </div>

          <div className="feature-card">
            <h3>Build a daily plan</h3>
            <p>Turn healthy habits into a simple daily routine.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
