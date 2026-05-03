import { useState } from 'react';
import { Bell, Search, Settings, LogOut, AlertTriangle } from 'lucide-react';

export default function Header({ title, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <>
      <header
        style={{
          height: '60px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          flexShrink: 0,
        }}
      >
        {/* Title */}
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>
            {title}
          </h1>
          <div
            style={{
              width: '32px',
              height: '3px',
              backgroundColor: '#e87722',
              borderRadius: '2px',
              marginTop: '4px',
            }}
          />
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Search */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f4f4f4',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              padding: '6px 12px',
              gap: '8px',
            }}
          >
            <Search size={14} style={{ color: '#888' }} />
            <input
              placeholder="Search..."
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: '13px',
                width: '160px',
              }}
            />
          </div>

          {/* Bell */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Bell size={18} />
          </button>

          {/* Settings */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Settings size={18} />
          </button>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#e87722',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            width: '340px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '16px' }}>
              <AlertTriangle size={48} style={{ color: '#e87722', margin: '0 auto' }} />
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>
              Confirm Logout
            </h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
              Are you sure you want to logout?
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#f4f4f4',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleLogoutConfirm}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#e87722',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}