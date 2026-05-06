import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
    <BrowserRouter basename="/E">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar isLoggedIn={!!user} onLogout={handleLogout} />
        <main style={{ flex: 1 }}>
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
    </BrowserRouter>
  )
}

export default App
