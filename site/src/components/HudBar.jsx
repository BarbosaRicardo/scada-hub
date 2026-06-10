import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function useUtcClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now.toISOString().slice(11, 19)
}

const NAV = [
  { href: '#architecture', label: 'STACK' },
  { href: '#learning-path', label: 'TRACKS' },
  { href: '#skills-roadmap', label: 'SKILLS' },
  { href: '#guides', label: 'GUIDES' },
]

export default function HudBar({ onAuthClick }) {
  const clock = useUtcClock()
  const { session, signOut } = useAuth()

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 border-b border-line"
      style={{ background: 'color-mix(in srgb, var(--color-bg) 88%, transparent)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="led led-blink" aria-hidden="true" />
          <span className="font-mono text-sm font-bold tracking-[0.18em] text-ink group-hover:text-phosphor transition-colors">
            SCADA·HUB
          </span>
        </a>

        {/* Section nav */}
        <nav aria-label="Sections" className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="readout hover:text-phosphor transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Status cluster */}
        <div className="flex items-center gap-4">
          <span className="readout hidden sm:flex items-center gap-2" aria-label="System status: online">
            <span className="led" style={{ '--led-color': '#4ade80' }} aria-hidden="true" />
            ONLINE
          </span>
          <time className="readout tabular-nums hidden sm:block" aria-label="UTC time">
            {clock} UTC
          </time>
          {session ? (
            <button onClick={signOut} className="readout hover:text-alarm transition-colors cursor-pointer">
              SIGN OUT
            </button>
          ) : (
            <button onClick={onAuthClick} className="readout text-phosphor hover:text-ink transition-colors cursor-pointer">
              OPERATOR LOGIN
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
