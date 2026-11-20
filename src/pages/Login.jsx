import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login({
  preview = false,
  initialPhone = '',
  initialPassword = '',
}) {
  const navigate = useNavigate()
  const [phone, setPhone] = useState(preview ? initialPhone : '')
  const [password, setPassword] = useState(preview ? initialPassword : '')
  const [savePassword, setSavePassword] = useState(false)
  const [agree, setAgree] = useState(true)
  const [phoneError, setPhoneError] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    if (preview || loading) return

    const phoneEmpty = !phone.trim()
    const passwordEmpty = !password.trim()

    // Direct click / no phone → show validation, no loader, no OTP
    if (phoneEmpty) {
      setPhoneError(true)
      return
    }

    setPhoneError(false)

    // Phone only → brief button loader, do not open OTP
    if (passwordEmpty) {
      setLoading(true)
      window.setTimeout(() => {
        setLoading(false)
      }, 600)
      return
    }

    // Phone + password → open OTP
    setLoading(true)
    window.setTimeout(() => {
      navigate('/otp', {
        state: {
          phone: phone.trim(),
          password,
        },
      })
    }, 700)
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
          <label className={`field ${phoneError ? 'field--error' : ''}`}>
            <span className="field-icon" aria-hidden="true">
              <img src="/icon/phone.png" alt="" />
            </span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter phone number"
              value={phone}
              readOnly={preview}
              tabIndex={preview ? -1 : undefined}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
                setPhone(digits)
                if (phoneError) setPhoneError(false)
              }}
            />
          </label>
          {phoneError && (
            <p className="field-error">The phone field is required</p>
          )}

          <label className="field">
            <span className="field-icon" aria-hidden="true">
              <img src="/icon/password.png" alt="" />
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

          <div className="login-action">
            <button
              type="submit"
              className={`login-btn ${loading ? 'login-btn--loading' : ''}`}
              disabled={loading}
              tabIndex={preview ? -1 : undefined}
            >
              {loading ? <span className="login-spinner" aria-label="Loading" /> : 'Login'}
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
          </div>
        </form>
      </div>
    </div>
  )
}
