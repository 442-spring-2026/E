import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Activities from './pages/Activities'
import DailyPlan from './pages/DailyPlan'
import Profile from './pages/Profile'

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const prevUid = localStorage.getItem('nestly_uid')
      const newUid = currentUser?.uid || null

      if (prevUid && newUid !== prevUid) {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('screenTime-') || key.startsWith('dailyPlan-') || key.startsWith('rewardPoints-')) {
            localStorage.removeItem(key)
          }
        })
      }

      if (newUid) {
        localStorage.setItem('nestly_uid', newUid)
      } else {
        localStorage.removeItem('nestly_uid')
      }

      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  function handleLogout() {
    signOut(auth)
  }

  if (loading) return null

  return (
    <HashRouter>
      <AppContent user={user} onLogout={handleLogout} />
    </HashRouter>
  )
}

function AppContent({ user, onLogout }) {
  const location = useLocation()
  const hideNav = location.pathname === '/onboarding'

  return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {!hideNav && <Navbar isLoggedIn={!!user} onLogout={onLogout} />}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
            <Route path="/activities" element={<ProtectedRoute user={user}><Activities /></ProtectedRoute>} />
            <Route path="/daily-plan" element={<ProtectedRoute user={user}><DailyPlan /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
  )
}

export default App
