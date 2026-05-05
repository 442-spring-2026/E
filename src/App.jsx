import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Activities from './pages/Activities'
import DailyPlan from './pages/DailyPlan'
import Profile from './pages/Profile'

function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter basename="/E">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Authentication onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>} />
            <Route path="/activities" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Activities /></ProtectedRoute>} />
            <Route path="/daily-plan" element={<ProtectedRoute isLoggedIn={isLoggedIn}><DailyPlan /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
