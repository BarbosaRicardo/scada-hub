import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const TABS = ['login', 'register', 'forgot']

const tabLabel = { login: 'Sign In', register: 'Create Account', forgot: 'Reset Password' }

function FormInput({ label, type = 'text', value, onChange, placeholder, autoComplete }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500
                   text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition"
      />
    </div>
  )
}

function Alert({ type, message }) {
  const colors = type === 'error'
    ? 'bg-red-900/30 border-red-700/50 text-red-300'
    : 'bg-green-900/30 border-green-700/50 text-green-300'
  return (
    <div className={`border rounded-xl px-4 py-3 text-sm ${colors}`}>
      {message}
    </div>
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
        onChange={e => setLogin(e.target.value)}
        placeholder="admin or you@example.com"
        autoComplete="username"
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="••••••••"
        autoComplete="current-password"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/40 text-navy-900 font-bold
                   py-3 rounded-xl transition text-sm tracking-wide"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
      <div className="flex justify-between text-xs text-slate-500 mt-1">
        <button type="button" onClick={() => onSwitch('register')} className="hover:text-amber-400 transition">
          Create an account
        </button>
        <button type="button" onClick={() => onSwitch('forgot')} className="hover:text-amber-400 transition">
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
    const { error } = await supabase.auth.signUp({ email, password })
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
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Min 8 characters"
        autoComplete="new-password"
      />
      <FormInput
        label="Confirm Password"
        type="password"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        placeholder="••••••••"
        autoComplete="new-password"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/40 text-navy-900 font-bold
                   py-3 rounded-xl transition text-sm tracking-wide"
      >
        {loading ? 'Creating account…' : 'Create Account'}
      </button>
      <div className="text-center text-xs text-slate-500 mt-1">
        <button type="button" onClick={() => onSwitch('login')} className="hover:text-amber-400 transition">
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
      <p className="text-sm text-slate-400">
        Enter the email address for your account and we'll send you a reset link.
      </p>
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/40 text-navy-900 font-bold
                   py-3 rounded-xl transition text-sm tracking-wide"
      >
        {loading ? 'Sending…' : 'Send Reset Link'}
      </button>
      <div className="text-center text-xs text-slate-500 mt-1">
        <button type="button" onClick={() => onSwitch('login')} className="hover:text-amber-400 transition">
          Back to sign in
        </button>
      </div>
    </form>
  )
}

export default function AuthPage() {
  const [tab, setTab] = useState('login')

  return (
    <div className="min-h-screen bg-navy-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(8,24,41,0.9) 100%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo / branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <span className="text-amber-400 text-sm font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-slate-100">SCADA Hub</span>
          </div>
          <p className="text-slate-400 text-sm">Industrial Protocol Training Platform</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/70 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          {/* Tab selector */}
          <div className="flex gap-1 bg-slate-800/60 rounded-xl p-1 mb-6">
            {TABS.filter(t => t !== 'forgot').map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
                  tab === t
                    ? 'bg-amber-500 text-navy-900'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tabLabel[t]}
              </button>
            ))}
          </div>

          {/* Form area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-bold text-slate-100 mb-5">{tabLabel[tab]}</h2>
              {tab === 'login' && <LoginForm onSwitch={setTab} />}
              {tab === 'register' && <RegisterForm onSwitch={setTab} />}
              {tab === 'forgot' && <ForgotForm onSwitch={setTab} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          SCADA Hub Training — Field Engineer Edition
        </p>
      </motion.div>
    </div>
  )
}
