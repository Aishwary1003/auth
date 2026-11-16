import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login({
  preview = false,
  initialPhone = '',
  initialPassword = '',
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [phone, setPhone] = useState(initialPhone || location.state?.phone || '')
  const [password, setPassword] = useState(initialPassword || location.state?.password || '')
  const [savePassword, setSavePassword] = useState(false)
  const [agree, setAgree] = useState(true)

  function handleLogin(e) {
    e.preventDefault()
    if (preview) return

    navigate('/otp', {
      state: {
        phone: phone.trim() || '895106750675',
        password,
      },
    })
  }

  return (
    <div className={`login-page ${preview ? 'login-page--preview' : ''}`}>
      <div className="login-shell">
        <img
          className="login-logo"
          src="/Login_Logo.png"
          alt="VIVI PAY"
        />

        <form className="login-form" onSubmit={handleLogin} noValidate>
          <label className="field">
            <span className="field-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="#2f7cf6" strokeWidth="1.8" />
                <circle cx="12" cy="17.8" r="1" fill="#2f7cf6" />
              </svg>
            </span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Enter phone number"
              value={phone}
              readOnly={preview}
              tabIndex={preview ? -1 : undefined}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="#2f7cf6" strokeWidth="1.8" />
                <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#2f7cf6" strokeWidth="1.8" />
                <circle cx="12" cy="15" r="1.2" fill="#2f7cf6" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              readOnly={preview}
              tabIndex={preview ? -1 : undefined}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="login-row">
            <label className="check-line">
              <input
                type="radio"
                checked={savePassword}
                disabled={preview}
                tabIndex={preview ? -1 : undefined}
                onChange={() => setSavePassword(true)}
                onClick={() => {
                  if (!preview) setSavePassword((v) => !v)
                }}
              />
              <span>Save Password</span>
            </label>
            <button type="button" className="link-btn" tabIndex={preview ? -1 : undefined}>
              Forgot password
            </button>
          </div>

          <button type="submit" className="login-btn" tabIndex={preview ? -1 : undefined}>
            Login
          </button>

          <label className="agree-line">
            <input
              type="checkbox"
              checked={agree}
              disabled={preview}
              tabIndex={preview ? -1 : undefined}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              Agree{' '}
              <button type="button" className="privacy-link" tabIndex={preview ? -1 : undefined}>
                &apos;User Privacy Agreement&apos;
              </button>
            </span>
          </label>
        </form>
      </div>
    </div>
  )
}
