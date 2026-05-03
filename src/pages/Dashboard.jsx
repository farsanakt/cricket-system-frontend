import { Users, Activity, DollarSign, CalendarOff, TrendingUp, UserCheck } from 'lucide-react'

const stats = [
  { label: 'Total Patients', value: '1,284', icon: Users, change: '+12%', up: true },
  { label: 'Active Sessions', value: '47', icon: Activity, change: '+5%', up: true },
  { label: 'Monthly Revenue', value: '₹2,48,000', icon: DollarSign, change: '+8%', up: true },
  { label: 'Pending Leaves', value: '6', icon: CalendarOff, change: '-2', up: false },
]

const recentActivity = [
  { name: 'Arjun Menon', action: 'New Physio Session', time: '10 min ago', status: 'active' },
  { name: 'Priya Nair', action: 'Doctor Appointment', time: '32 min ago', status: 'completed' },
  { name: 'Rahul Das', action: 'Expense Filed', time: '1 hr ago', status: 'pending' },
  { name: 'Sneha Krishnan', action: 'Leave Request', time: '2 hrs ago', status: 'pending' },
  { name: 'Vikram Pillai', action: 'Physio Old Record', time: '3 hrs ago', status: 'completed' },
]

const statusColors = {
  active: { bg: '#fff3e8', text: '#e87722' },
  completed: { bg: '#e8f5e9', text: '#388e3c' },
  pending: { bg: '#fff8e1', text: '#f9a825' },
}

export default function Dashboard() {
  return (
    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '22px 24px',
                border: '1px solid #e8e8e8',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: '700', color: '#222', marginTop: '4px' }}>
                    {s.value}
                  </div>
                </div>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#fff3e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={20} style={{ color: '#e87722' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp
                  size={13}
                  style={{ color: s.up ? '#388e3c' : '#e53935', transform: s.up ? 'none' : 'scaleY(-1)' }}
                />
                <span style={{ fontSize: '12px', color: s.up ? '#388e3c' : '#e53935', fontWeight: '500' }}>
                  {s.change}
                </span>
                <span style={{ fontSize: '12px', color: '#aaa', marginLeft: '2px' }}>vs last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Recent Activity */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e8e8e8',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '18px 24px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontWeight: '600', fontSize: '15px', color: '#333' }}>Recent Activity</span>
            <span style={{ fontSize: '12px', color: '#e87722', cursor: 'pointer', fontWeight: '500' }}>View all</span>
          </div>
          <div>
            {recentActivity.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '13px 24px',
                  borderBottom: i < recentActivity.length - 1 ? '1px solid #f5f5f5' : 'none',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#fff3e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#e87722',
                    flexShrink: 0,
                  }}
                >
                  {item.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '1px' }}>{item.action}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '20px',
                      backgroundColor: statusColors[item.status].bg,
                      color: statusColors[item.status].text,
                      fontWeight: '500',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.status}
                  </span>
                  <span style={{ fontSize: '11px', color: '#bbb' }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e8e8e8',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ fontWeight: '600', fontSize: '15px', color: '#333' }}>Quick Overview</span>
          </div>
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Physio Utilization', value: 78, color: '#e87722' },
              { label: 'Doctor Bookings', value: 62, color: '#42a5f5' },
              { label: 'Patient Retention', value: 91, color: '#66bb6a' },
              { label: 'Staff Attendance', value: 85, color: '#ab47bc' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#555' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>{item.value}%</span>
                </div>
                <div
                  style={{
                    height: '7px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                      borderRadius: '4px',
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: '8px',
                padding: '16px',
                backgroundColor: '#fff3e8',
                borderRadius: '8px',
                border: '1px solid #ffd8b0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={16} style={{ color: '#e87722' }} />
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#e87722' }}>
                  3 patients need follow-up today
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#b05a00', marginTop: '4px', paddingLeft: '24px' }}>
                Check the Patients section to review
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
