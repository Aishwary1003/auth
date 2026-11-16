import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import './Otp.css'

const OTP_LENGTH = 4
const RESEND_SECONDS = 120

function maskPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.length < 7) return '895****0675'
  return `${digits.slice(0, 3)}****${digits.slice(-4)}`
}

export default function Otp() {
  const navigate = useNavigate()
  const location = useLocation()
  const phone = location.state?.phone || '895106750675'
  const password = location.state?.password || ''
  const masked = useMemo(() => maskPhone(phone), [phone])

  const [otp, setOtp] = useState('')
  const [seconds, setSeconds] = useState(RESEND_SECONDS)

  useEffect(() => {
    if (seconds <= 0) return undefined
    const id = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => window.clearInterval(id)
  }, [seconds])

  function pressKey(key) {
    if (key === 'del') {
      setOtp((value) => value.slice(0, -1))
      return
    }
    setOtp((value) => (value.length >= OTP_LENGTH ? value : value + key))
  }

  function handleClose() {
    navigate('/', {
      state: {
        phone,
        password,
      },
    })
  }

  function handleResend() {
    if (seconds > 0) return
    setOtp('')
    setSeconds(RESEND_SECONDS)
  }

  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => otp[i] || '')

  return (
    <div className="otp-page">
      <div className="otp-bg" aria-hidden="true">
        <Login
          preview
          initialPhone={phone}
          initialPassword={password}
        />
      </div>

      <div className="otp-overlay">
        <div className="otp-modal" role="dialog" aria-modal="true" aria-labelledby="otp-title">
          <button type="button" className="otp-close" onClick={handleClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <h1 id="otp-title">Please enter OTP</h1>
          <p className="otp-sub">OTP sent to {masked}</p>

          <div className="otp-slots" aria-label="OTP input">
            {digits.map((digit, index) => (
              <div
                key={index}
                className={`otp-slot ${index === otp.length ? 'otp-slot--active' : ''}`}
              >
                {digit}
              </div>
            ))}
          </div>

          {seconds > 0 ? (
            <p className="otp-timer">Resend in {seconds} seconds</p>
          ) : (
            <button type="button" className="otp-resend" onClick={handleResend}>
              Resend OTP
            </button>
          )}
        </div>

        <div className="otp-keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((key, index) => {
            if (key === '') {
              return <div key={`empty-${index}`} className="otp-key otp-key--empty" />
            }

            if (key === 'del') {
              return (
                <button
                  key="del"
                  type="button"
                  className="otp-key"
                  onClick={() => pressKey('del')}
                  aria-label="Delete"
                >
                  <svg viewBox="0 0 28 20" width="28" height="20" fill="none">
                    <path
                      d="M9.5 2.5h15.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9.5L2.5 10 9.5 2.5Z"
                      stroke="#333"
                      strokeWidth="1.5"
                    />
                    <path d="M14 7l6 6M20 7l-6 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )
            }

            return (
              <button
                key={key}
                type="button"
                className="otp-key"
                onClick={() => pressKey(key)}
              >
                {key}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
