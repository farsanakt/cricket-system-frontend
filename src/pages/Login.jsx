import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [pwFocus, setPwFocus]       = useState(false)

  const validate = () => {
    const e = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Enter a valid email.'
    }
    if (!password) {
      e.password = 'Password is required.'
    }
    return e
  }

  const handleSubmit = () => {
    const errs = validate()
    setErrors(errs)

    if (Object.keys(errs).length) return

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // 🔥 IMPORTANT: call parent login
      onLogin(email, password)

    }, 1200)
  }

  const inputStyle = (focused, hasErr) => ({
    width: '100%',
    padding: '11px 12px 11px 38px',
    border: `1.5px solid ${hasErr ? '#e53935' : focused ? '#e87722' : '#e8e8e8'}`,
    borderRadius: '9px',
    fontSize: '14px',
    color: '#222',
    background: '#fafafa',
    outline: 'none',
    boxShadow: focused && !hasErr
      ? '0 0 0 3px rgba(232,119,34,0.10)'
      : hasErr
      ? '0 0 0 3px rgba(229,57,53,0.08)'
      : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '40px 36px', border: '1px solid #e8e8e8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fff3e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={22} style={{ color: '#e87722' }} />
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '4px' }}>Welcome back</div>
          <div style={{ fontSize: '13px', color: '#888' }}>Sign in to your account</div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
            Email Address
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: emailFocus ? '#e87722' : '#bbb', display: 'flex', pointerEvents: 'none' }}>
              <Mail size={15} />
            </span>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              style={inputStyle(emailFocus, !!errors.email)}
            />
          </div>
          {errors.email && <div style={{ fontSize: '12px', color: '#e53935', marginTop: '4px' }}>{errors.email}</div>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: pwFocus ? '#e87722' : '#bbb', display: 'flex', pointerEvents: 'none' }}>
              <Lock size={15} />
            </span>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              placeholder="Enter your password"
              onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '' })) }}
              onFocus={() => setPwFocus(true)}
              onBlur={() => setPwFocus(false)}
              style={{ ...inputStyle(pwFocus, !!errors.password), paddingRight: '40px' }}
            />
            <button
              onClick={() => setShowPw(v => !v)}
              type="button"
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: showPw ? '#e87722' : '#bbb', display: 'flex', padding: 0 }}
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && <div style={{ fontSize: '12px', color: '#e53935', marginTop: '4px' }}>{errors.password}</div>}
        </div>

        {/* Forgot */}
        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
          <span style={{ fontSize: '12px', color: '#e87722', fontWeight: '500', cursor: 'pointer' }}>
            Forgot password?
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          type="button"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: success ? '#388e3c' : '#e87722',
            color: 'white',
            border: 'none',
            borderRadius: '9px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 3px 12px rgba(232,119,34,0.28)',
            transition: 'background 0.3s'
          }}
        >
          {loading ? 'Signing in…' : success ? '✓ Signed In' : 'Sign In'}
        </button>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#aaa', marginTop: '20px' }}>
          Don't have an account?{' '}
          <span style={{ color: '#e87722', fontWeight: '600', cursor: 'pointer' }}>
            Contact admin
          </span>
        </div>
      </div>
    </div>
  )
}