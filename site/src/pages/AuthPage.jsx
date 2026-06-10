import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { supabase } from '../lib/supabase'

const tabLabel = { login: 'Sign In', register: 'Create Account', forgot: 'Reset Password' }

function FormInput({ label, type = 'text', value, onChange, placeholder, autoComplete }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="readout">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="bg-panel-2 border border-line px-4 py-3 text-ink placeholder-ink-faint text-sm font-mono
                   focus:outline-none focus:border-phosphor transition-colors"
      />
    </div>
  )
}

function Alert({ type, message }) {
  const color = type === 'error' ? 'var(--color-alarm)' : '#4ade80'
  return (
    <p
      className="border px-4 py-3 text-xs font-mono flex items-center gap-2"
      style={{ color, borderColor: `color-mix(in srgb, ${color} 40%, transparent)`, background: `color-mix(in srgb, ${color} 6%, transparent)` }}
      role="alert"
    >
      <span className="led" style={{ '--led-color': color }} aria-hidden="true" />
      {message}
    </p>
  )
}

function resolveEmail(input) {
  const trimmed = input.trim()
  return trimmed.includes('@') ? trimmed : `${trimmed}@scadahub.io`
}

function LoginForm({ onSwitch }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const email = resolveEmail(login)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <Alert type="error" message={error} />}
      <FormInput
        label="Username or Email"
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="username or email"
        autoComplete="username"
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        autoComplete="current-password"
      />
      <button type="submit" disabled={loading} className="btn-console btn-console-primary mt-2 disabled:opacity-40">
        {loading ? '[ Signing in… ]' : '[ Sign In ]'}
      </button>
      <div className="flex justify-between mt-1">
        <button type="button" onClick={() => onSwitch('register')} className="readout hover:text-phosphor transition-colors cursor-pointer">
          Create an account
        </button>
        <button type="button" onClick={() => onSwitch('forgot')} className="readout hover:text-phosphor transition-colors cursor-pointer">
          Forgot password?
        </button>
      </div>
    </form>
  )
}

function RegisterForm({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: 'https://scada-hub.vercel.app' },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Check your email for a confirmation link, then sign in.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Min 8 characters"
        autoComplete="new-password"
      />
      <FormInput
        label="Confirm Password"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="••••••••"
        autoComplete="new-password"
      />
      <button type="submit" disabled={loading} className="btn-console btn-console-primary mt-2 disabled:opacity-40">
        {loading ? '[ Creating account… ]' : '[ Create Account ]'}
      </button>
      <div className="text-center mt-1">
        <button type="button" onClick={() => onSwitch('login')} className="readout hover:text-phosphor transition-colors cursor-pointer">
          Already have an account? Sign in
        </button>
      </div>
    </form>
  )
}

function ForgotForm({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Password reset link sent. Check your email.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      <p className="text-sm text-ink-dim">
        Enter the email address for your account and we'll send you a reset link.
      </p>
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
      />
      <button type="submit" disabled={loading} className="btn-console btn-console-primary mt-2 disabled:opacity-40">
        {loading ? '[ Sending… ]' : '[ Send Reset Link ]'}
      </button>
      <div className="text-center mt-1">
        <button type="button" onClick={() => onSwitch('login')} className="readout hover:text-phosphor transition-colors cursor-pointer">
          Back to sign in
        </button>
      </div>
    </form>
  )
}

export default function AuthPage({ onBack }) {
  const [tab, setTab] = useState('login')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 scan-grid pointer-events-none opacity-40"
        style={{ maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Branding */}
        <div className="flex items-center justify-between mb-4">
          <span className="readout flex items-center gap-2">
            <span className="led led-blink" aria-hidden="true" />
            SCADA·HUB // Operator Access
          </span>
          {onBack && (
            <button onClick={onBack} className="readout hover:text-phosphor transition-colors cursor-pointer">
              ← BACK
            </button>
          )}
        </div>

        {/* Card */}
        <div className="panel panel-bracket p-8">
          {/* Tab selector */}
          <div className="flex border border-line mb-6" role="tablist" aria-label="Auth mode">
            {['login', 'register'].map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 font-mono text-[11px] font-bold tracking-[0.14em] uppercase transition-colors duration-150 cursor-pointer"
                style={
                  tab === t
                    ? { color: 'var(--color-phosphor)', background: 'color-mix(in srgb, var(--color-phosphor) 8%, transparent)' }
                    : { color: 'var(--color-ink-faint)' }
                }
              >
                {tabLabel[t]}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
            >
              <h2 className="font-mono text-sm font-bold tracking-[0.1em] uppercase text-ink mb-5">{tabLabel[tab]}</h2>
              {tab === 'login' && <LoginForm onSwitch={setTab} />}
              {tab === 'register' && <RegisterForm onSwitch={setTab} />}
              {tab === 'forgot' && <ForgotForm onSwitch={setTab} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center font-mono text-[10px] text-ink-faint mt-5">
          ⚡ Ohm my, that's a lot of protocols.
        </p>
      </motion.div>
    </div>
  )
}
