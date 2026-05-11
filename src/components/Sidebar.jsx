import { useState } from 'react'
import {
  LayoutDashboard,
  Activity,
  Users,
  UserCog,
  BookOpen,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Shield,
  ClipboardList,
  Dumbbell,
  FileText,
} from 'lucide-react'

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },

  {
    id: 'players',
    label: 'Players',
    icon: Users,
    path: '/players',
  },

  {
    id: 'daily-report',
    label: 'Daily Report',
    icon: BookOpen,
    path: '/report-form',
  },

  // 🔥 PHYSIO SECTION
  {
    id: 'physio',
    label: 'Physio',
    icon: Activity,

    // ✅ MAIN PHYSIO DASHBOARD
    path: '/physio',

    // ✅ MINI SIDEBAR ITEMS
    children: [
      {
        id: 'physio-consultation',
        label: 'Consultation',
        icon: ClipboardList,
        path: '/consultation',
      },

      {
        id: 'physio-rehab',
        label: 'Rehab Program',
        icon: Dumbbell,
        path: '/rehab',
      },

      {
        id: 'physio-assessment',
        label: 'Assessment',
        icon: Activity,
        path: '/physio/assessment',
      },

      {
        id: 'physio-reports',
        label: 'Reports',
        icon: FileText,
        path: '/physio/reports',
      },
    ],
  },

  {
    id: 'nutrition',
    label: 'Nutrition',
    icon: BookOpen,
    path: '/nutrition',
  },

  {
    id: 'coach',
    label: 'Coach',
    icon: Shield,
    path: '/coach',
  },

  {
    id: 'trainer',
    label: 'Trainer',
    icon: UserCog,
    path: '/trainer',
  },

  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart2,
    path: '/reports',
  },
]

export default function Sidebar({
  activePath,
  onNavigate,
  role,
}) {
  const [expanded, setExpanded] = useState({
    physio: true,
  })

  const toggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const isActive = (path) => activePath === path

  const isGroupActive = (item) =>
    item.children?.some((c) => activePath === c.path)

  // 🔥 ROLE FILTER
  const filteredItems = NAV_ITEMS.filter((item) => {
    if (role === 'admin') return true

    if (role === 'trainer') {
      return item.path === '/trainer'
    }

    if (role === 'physio') {
      return item.id === 'physio'
    }

    if (role === 'nutrition') {
      return item.path === '/nutrition'
    }

    if (role === 'coach') {
      return item.path === '/coach'
    }

    return false
  })

  return (
    <aside
      style={{
        width: '260px',
        minWidth: '260px',
        backgroundColor: '#e8e8e8',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #d0d0d0',
        userSelect: 'none',
      }}
    >
      {/* 🔥 LOGO */}
      <div
        style={{
          padding: '22px 28px 18px 28px',
          borderBottom: '1px solid #d0d0d0',
        }}
      >
        <span
          style={{
            fontSize: '26px',
            fontWeight: '800',
            letterSpacing: '2px',
            color: '#e87722',
            fontFamily: "'Georgia', serif",
          }}
        >
          CRICKET
        </span>
      </div>

      {/* 🔥 NAVIGATION */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 0',
        }}
      >
        {filteredItems.map((item) => {
          const Icon = item.icon
          const hasChildren = !!item.children
          const isOpen = expanded[item.id]

          const groupActive = isGroupActive(item)
          const itemActive = !hasChildren && isActive(item.path)

          return (
            <div key={item.id}>
              {/* 🔥 MAIN ITEM */}
              <div
                onClick={() => {
                  if (hasChildren) {
                    toggle(item.id)

                    // ✅ OPEN MAIN PAGE ALSO
                    if (item.path) {
                      onNavigate(item.path)
                    }
                  } else {
                    onNavigate(item.path)
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px 10px 24px',
                  cursor: 'pointer',

                  backgroundColor:
                    itemActive || (groupActive && isOpen)
                      ? '#ffffff'
                      : 'transparent',

                  borderLeft:
                    groupActive || itemActive
                      ? '3px solid #e87722'
                      : '3px solid transparent',

                  transition: 'background 0.15s',
                  gap: '10px',
                }}
                onMouseEnter={(e) => {
                  if (!itemActive && !(groupActive && isOpen)) {
                    e.currentTarget.style.backgroundColor = '#d8d8d8'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!itemActive && !(groupActive && isOpen)) {
                    e.currentTarget.style.backgroundColor =
                      'transparent'
                  }
                }}
              >
                <Icon
                  size={18}
                  style={{
                    color:
                      groupActive || itemActive
                        ? '#e87722'
                        : '#777777',

                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    flex: 1,
                    fontSize: '14px',

                    fontWeight:
                      groupActive || itemActive
                        ? '600'
                        : '400',

                    color:
                      groupActive || itemActive
                        ? '#e87722'
                        : '#555555',
                  }}
                >
                  {item.label}
                </span>

                {hasChildren &&
                  (isOpen ? (
                    <ChevronUp
                      size={14}
                      style={{ color: '#e87722' }}
                    />
                  ) : (
                    <ChevronDown
                      size={14}
                      style={{ color: '#888888' }}
                    />
                  ))}
              </div>

              {/* 🔥 CHILD ITEMS */}
              {hasChildren && isOpen && (
                <div
                  style={{
                    backgroundColor: '#e0e0e0',
                  }}
                >
                  {item.children.map((child) => {
                    const ChildIcon = child.icon
                    const childActive = isActive(child.path)

                    return (
                      <div
                        key={child.id}
                        onClick={() => onNavigate(child.path)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',

                          padding: '9px 20px 9px 54px',

                          cursor: 'pointer',

                          backgroundColor: childActive
                            ? '#ffffff'
                            : 'transparent',

                          borderLeft: childActive
                            ? '3px solid #e87722'
                            : '3px solid transparent',
                        }}
                      >
                        <ChildIcon
                          size={15}
                          style={{
                            color: childActive
                              ? '#e87722'
                              : '#777777',
                          }}
                        />

                        <span
                          style={{
                            fontSize: '13.5px',

                            fontWeight:
                              childActive ? '600' : '400',

                            color:
                              childActive
                                ? '#e87722'
                                : '#555555',
                          }}
                        >
                          {child.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* 🔥 FOOTER */}
      <div
        style={{
          padding: '14px 24px',
          borderTop: '1px solid #d0d0d0',

          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',

            backgroundColor: '#e87722',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            color: 'white',
            fontSize: '14px',
            fontWeight: '700',
          }}
        >
          {role?.charAt(0)?.toUpperCase() || 'A'}
        </div>

        <div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#333',
              textTransform: 'capitalize',
            }}
          >
            {role || 'Admin'}
          </div>

          <div
            style={{
              fontSize: '11px',
              color: '#888',
            }}
          >
            cricket@system.com
          </div>
        </div>
      </div>
    </aside>
  )
}