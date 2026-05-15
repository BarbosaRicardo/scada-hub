import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import ScadaBackground from '../components/ScadaBackground'

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
        placeholder="username or email"
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
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      {/* Animated SCADA network background */}
      <ScadaBackground />

      {/* Login card — sits above the SVG */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
        style={{ zIndex: 10 }}
      >
        {/* Branding */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="inline-flex items-center gap-3 mb-2"
          >
            {/* Logo mark — pulsing ring */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-xl border border-amber-500/40"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40
                              flex items-center justify-center backdrop-blur-sm">
                <span className="text-amber-400 text-base font-black tracking-tighter">SH</span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-slate-100 leading-none tracking-tight">SCADA Hub</div>
              <div className="text-[10px] text-amber-500/70 font-mono tracking-widest uppercase">
                Training Platform
              </div>
            </div>
          </motion.div>

          {/* Live status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mt-1"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[10px] font-mono text-emerald-400/80 tracking-wider">
              ALL SYSTEMS NOMINAL
            </span>
          </motion.div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 backdrop-blur-md shadow-2xl"
          style={{
            background: 'rgba(8, 20, 40, 0.82)',
            border: '1px solid rgba(251,191,36,0.12)',
            boxShadow: '0 0 40px rgba(251,191,36,0.06), 0 25px 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* Tab selector */}
          <div className="flex gap-1 rounded-xl p-1 mb-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {TABS.filter(t => t !== 'forgot').map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                  tab === t
                    ? 'bg-amber-500 text-slate-900 shadow-lg'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tabLabel[t]}
              </button>
            ))}
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
            >
              <h2 className="text-base font-bold text-slate-100 mb-5 tracking-wide">{tabLabel[tab]}</h2>
              {tab === 'login'    && <LoginForm onSwitch={setTab} />}
              {tab === 'register' && <RegisterForm onSwitch={setTab} />}
              {tab === 'forgot'   && <ForgotForm onSwitch={setTab} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-[10px] font-mono text-slate-600 mt-5 tracking-widest uppercase">
          Field Engineer Edition · Temecula, CA
        </p>
      </motion.div>
    </div>
  )
}
