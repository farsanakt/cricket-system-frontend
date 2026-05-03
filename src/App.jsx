import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

import Dashboard from './pages/Dashboard'
import Players from './pages/Players'
import Physio from './pages/Physio'
import TrainerDashboard from './pages/TrainerDashboard'   // your trainer page
import NutritionDashboard from './pages/NutritionDashboard'
import PlaceholderPage from './pages/PlaceholderPage'

const ROUTE_TITLES = {
  '/': 'Dashboard',
  '/players': 'Players',
  '/report-form': 'Daily Report',
  '/physio': 'Physio Dashboard',
  '/trainer': 'Trainer Dashboard',
  '/nutrition': 'Nutrition Dashboard',
  '/reports': 'Reports',
}

function renderPage(path) {
  switch (path) {
    case '/':
      return <Dashboard />

    case '/players':
      return <Players />

    case '/report-form':
      return <PlaceholderPage title="Daily Report" />

    case '/physio':
      return <Physio />

    case '/trainer':
      return <TrainerDashboard />

    case '/nutrition':
      return <NutritionDashboard />

    case '/reports':
      return <PlaceholderPage title="Reports" />

    default:
      return <PlaceholderPage title="Page" />
  }
}

export default function App() {
  const [activePath, setActivePath] = useState('/')

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f4f4f4',
      }}
    >
      {/* Sidebar */}
      <Sidebar activePath={activePath} onNavigate={setActivePath} />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Header title={ROUTE_TITLES[activePath] || 'Page'} />

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: '#f4f4f4',
          }}
        >
          {renderPage(activePath)}
        </main>
      </div>
    </div>
  )
}