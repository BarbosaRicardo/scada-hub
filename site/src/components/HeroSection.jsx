import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { GUIDES } from '../data/guides'

const activeGuides = GUIDES.filter((g) => !g.comingSoon)
const totalQuestions = activeGuides.reduce((sum, g) => sum + (g.questions || 0), 0)
const totalChapters = activeGuides.reduce((sum, g) => sum + (g.chapters || 0), 0)

const STATS = [
  { value: String(activeGuides.length).padStart(2, '0'), label: 'Study Guides' },
  { value: `${(Math.floor(totalQuestions / 100) * 100).toLocaleString()}+`, label: 'Questions' },
  { value: String(totalChapters), label: 'Chapters' },
  { value: '2×5', label: 'Tracks × Weeks' },
]

const BOOT_LINES = [
  '> init training.hub --rev 2.0',
  '> loading skills matrices ... OK [scada_ops] [rtac_auto]',
  '> 8 guides online · all channels nominal',
]

function BootLog() {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? BOOT_LINES.length : 0)

  useEffect(() => {
    if (reduced || shown >= BOOT_LINES.length) return
    const id = setTimeout(() => setShown((n) => n + 1), 420)
    return () => clearTimeout(id)
  }, [shown, reduced])

  return (
    <div className="font-mono text-[11px] sm:text-xs leading-relaxed text-left text-ink-dim" aria-hidden="true">
      {BOOT_LINES.slice(0, shown).map((line) => (
        <div key={line}>{line}</div>
      ))}
      {shown >= BOOT_LINES.length && (
        <div>
          <span className="text-phosphor">&gt; ready_</span>
          <span className="cursor-blink text-phosphor">█</span>
        </div>
      )}
    </div>
  )
}

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-12">
      {/* Scan grid backdrop, faded toward the bottom */}
      <div
        className="absolute inset-0 scan-grid pointer-events-none opacity-40"
        style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)' }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="panel panel-bracket p-6 sm:p-10"
        >
          {/* Panel header strip */}
          <div className="flex items-center justify-between border-b border-line pb-3 mb-8">
            <span className="readout flex items-center gap-2">
              <span className="led" aria-hidden="true" />
              Operator Training System
            </span>
            <span className="readout hidden sm:block">REV 2.0</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-white mb-5">
            Learn the full <span className="text-phosphor">SCADA stack.</span>
            <br />
            From wire to HMI.
          </h1>

          <p className="text-base sm:text-lg text-ink-dim max-w-xl leading-relaxed mb-8">
            Two tracks — SCADA Operations and RTAC Automation — built from the company
            skills matrices. Five weekly levels each, from foundation to expert.
          </p>

          {/* Boot log */}
          <div className="mb-8">
            <BootLog />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a href="#learning-path" className="btn-console btn-console-primary text-center">
              [ View Curriculum ]
            </a>
            <a href="#skills-roadmap" className="btn-console text-center">
              [ Skills Breakdown ]
            </a>
            <a href="#guides" className="btn-console text-center">
              [ All Guides ]
            </a>
          </div>

          {/* Stat readouts */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-panel px-4 py-3">
                <dd className="font-mono text-2xl font-bold text-white leading-none">{stat.value}</dd>
                <dt className="readout mt-1.5">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
