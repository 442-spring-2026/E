import { Link, useNavigate } from 'react-router-dom'

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/')
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>Nestly</Link>
      <div style={{ display: 'flex', gap: '20px' }}>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/activities">Activities</Link>
            <Link to="/daily-plan">Daily Plan</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
