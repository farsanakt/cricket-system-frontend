import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

import Dashboard from './pages/Dashboard'
import Players from './pages/Players'
import Physio from './pages/Physio'
import TrainerDashboard from './pages/TrainerDashboard'
import NutritionDashboard from './pages/NutritionDashboard'
import Login from './pages/Login'
import SinglePlayer from './pages/SinglePlayer'

const USERS = {
  "assiscatetest@gmail.com": "admin",
  "trainer@gmail.com": "trainer",
  "physio@gmail.com": "physio",
  "player@gmail.com": "player",
  "nutrition@gmail.com": "nutrition",
}

export default function App() {
  const [activePath, setActivePath] = useState('/login')
  const [role, setRole] = useState(null)

  // 🔥 LOGIN
  const handleLogin = (email, password) => {
    const userRole = USERS[email]

    if (userRole && password === "1234") {
      setRole(userRole)

      switch (userRole) {
        case 'admin':
          setActivePath('/')
          break
        case 'trainer':
          setActivePath('/trainer')
          break
        case 'physio':
          setActivePath('/physio')
          break
        case 'nutrition':
          setActivePath('/nutrition')
          break
        case 'player':
          setActivePath('/single-player')
          break
        default:
          setActivePath('/')
      }
    } else {
      alert("Invalid login")
    }
  }

  // 🔥 LOGOUT
  const handleLogout = () => {
    setRole(null)
    setActivePath('/login')
  }

  // 🔥 ROUTES
  const renderPage = () => {
    switch (activePath) {
      case '/':
        return <Dashboard />
      case '/players':
        return <Players />
      case '/physio':
        return <Physio />
      case '/trainer':
        return <TrainerDashboard />
      case '/nutrition':
        return <NutritionDashboard />
      case '/single-player':
        return <SinglePlayer />
      case '/login':
        return <Login onLogin={handleLogin} />
      default:
        return <div>Page</div>
    }
  }

  const isLogin = activePath === '/login'
  const isPlayer = role === 'player'

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* Sidebar */}
      {!isLogin && !isPlayer && (
        <Sidebar
          activePath={activePath}
          onNavigate={setActivePath}
          role={role}
        />
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        {!isLogin && (
          <Header title={activePath} onLogout={handleLogout} />
        )}

        <main style={{ flex: 1 }}>
          {renderPage()}
        </main>

      </div>
    </div>
  )
}