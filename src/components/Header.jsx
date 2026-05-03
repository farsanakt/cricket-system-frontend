import { Bell, Search, Settings } from 'lucide-react'

export default function Header({ title }) {
  return (
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
      {/* Page title */}
      <div>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#333333',
            lineHeight: 1,
          }}
        >
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
            type="text"
            placeholder="Search..."
            style={{
              border: 'none',
              background: 'none',
              outline: 'none',
              fontSize: '13px',
              color: '#555',
              width: '160px',
            }}
          />
        </div>

        <button
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Bell size={18} style={{ color: '#666' }} />
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              backgroundColor: '#e87722',
              borderRadius: '50%',
              border: '1.5px solid white',
            }}
          />
        </button>

        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Settings size={18} style={{ color: '#666' }} />
        </button>
      </div>
    </header>
  )
}
