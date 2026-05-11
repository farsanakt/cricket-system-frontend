import { useState, useEffect } from 'react';
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
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [ /* ... your existing NAV_ITEMS unchanged ... */ ];

export default function Sidebar({ activePath, onNavigate, role }) {
  const [expanded, setExpanded] = useState({ physio: true });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setMobileOpen(false); // Auto close mobile menu on resize to desktop
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (path) => activePath === path;
  const isGroupActive = (item) =>
    item.children?.some((c) => activePath === c.path);

  const filteredItems = NAV_ITEMS.filter((item) => {
    if (role === 'admin') return true;
    if (role === 'trainer') return item.path === '/trainer';
    if (role === 'physio') return item.id === 'physio';
    if (role === 'nutrition') return item.path === '/nutrition';
    if (role === 'coach') return item.path === '/coach';
    return false;
  });

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* 🔥 MOBILE HAMBURGER BUTTON */}
      {!isDesktop && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            position: 'fixed',
            top: '18px',
            left: '18px',
            zIndex: 1000,
            padding: '10px',
            backgroundColor: '#e87722',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(232, 119, 34, 0.3)',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* 🔥 SIDEBAR */}
      <aside
        style={{
          width: isDesktop ? '260px' : '280px',
          minWidth: isDesktop ? '260px' : undefined,
          backgroundColor: '#e8e8e8',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderRight: isDesktop ? '1px solid #d0d0d0' : 'none',
          position: isDesktop ? 'relative' : 'fixed',
          left: 0,
          top: 0,
          zIndex: 999,
          transform: isDesktop
            ? 'translateX(0)'
            : mobileOpen
            ? 'translateX(0)'
            : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: !isDesktop && mobileOpen ? '4px 0 15px rgba(0,0,0,0.2)' : 'none',
          overflowY: 'auto',
        }}
      >
        {/* 🔥 LOGO */}
        <div
          style={{
            padding: '22px 28px 18px 28px',
            borderBottom: '1px solid #d0d0d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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

          {!isDesktop && (
            <button
              onClick={closeMobile}
              style={{ background: 'none', border: 'none', padding: '4px' }}
            >
              <X size={22} color="#666" />
            </button>
          )}
        </div>

        {/* 🔥 NAVIGATION */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isOpen = expanded[item.id];
            const groupActive = isGroupActive(item);
            const itemActive = !hasChildren && isActive(item.path);

            return (
              <div key={item.id}>
                {/* MAIN ITEM */}
                <div
                  onClick={() => {
                    if (hasChildren) {
                      toggle(item.id);
                      if (item.path) onNavigate(item.path);
                    } else {
                      onNavigate(item.path);
                      closeMobile(); // Close mobile menu on navigation
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
                      e.currentTarget.style.backgroundColor = '#d8d8d8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!itemActive && !(groupActive && isOpen)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon
                    size={18}
                    style={{
                      color: groupActive || itemActive ? '#e87722' : '#777777',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontSize: '14px',
                      fontWeight: groupActive || itemActive ? '600' : '400',
                      color: groupActive || itemActive ? '#e87722' : '#555555',
                    }}
                  >
                    {item.label}
                  </span>

                  {hasChildren &&
                    (isOpen ? (
                      <ChevronUp size={14} style={{ color: '#e87722' }} />
                    ) : (
                      <ChevronDown size={14} style={{ color: '#888888' }} />
                    ))}
                </div>

                {/* CHILD ITEMS */}
                {hasChildren && isOpen && (
                  <div style={{ backgroundColor: '#e0e0e0' }}>
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = isActive(child.path);

                      return (
                        <div
                          key={child.id}
                          onClick={() => {
                            onNavigate(child.path);
                            closeMobile();
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '9px 20px 9px 54px',
                            cursor: 'pointer',
                            backgroundColor: childActive ? '#ffffff' : 'transparent',
                            borderLeft: childActive
                              ? '3px solid #e87722'
                              : '3px solid transparent',
                          }}
                        >
                          <ChildIcon
                            size={15}
                            style={{
                              color: childActive ? '#e87722' : '#777777',
                            }}
                          />
                          <span
                            style={{
                              fontSize: '13.5px',
                              fontWeight: childActive ? '600' : '400',
                              color: childActive ? '#e87722' : '#555555',
                            }}
                          >
                            {child.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
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
            <div style={{ fontSize: '11px', color: '#888' }}>
              cricket@system.com
            </div>
          </div>
        </div>
      </aside>

      {/* 🔥 MOBILE BACKDROP */}
      {!isDesktop && mobileOpen && (
        <div
          onClick={closeMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998,
          }}
        />
      )}
    </>
  );
}