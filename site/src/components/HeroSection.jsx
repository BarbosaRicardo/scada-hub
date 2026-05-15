import React from 'react'
import { motion } from 'framer-motion'
import { GUIDES } from '../data/guides'

const activeGuides = GUIDES.filter((g) => !g.comingSoon)
const totalQuestions = activeGuides.reduce((sum, g) => sum + (g.questions || 0), 0)
const totalChapters = activeGuides.reduce((sum, g) => sum + (g.chapters || 0), 0)

const STATS = [
  { value: String(activeGuides.length), label: 'Study Guides' },
  { value: `${(Math.floor(totalQuestions / 100) * 100).toLocaleString()}+`, label: 'Practice Questions' },
  { value: `${totalChapters}`, label: 'Chapters' },
  { value: 'Free', label: 'Always' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-800">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />

      {/* Single subtle gradient bloom — not pulsing, not floating */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(34,211,238,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Eyebrow label — plain, no glow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-6"
        >
          SCADA Automation Engineer Training
        </motion.p>

        {/* Headline — white text, one accent word */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-white mb-6"
        >
          Learn the full{' '}
          <span className="text-cyan-400">SCADA stack.</span>
          <br />
          From wire to HMI.
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-16 h-px bg-cyan-500/50 mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed"
        >
          Eight structured study guides — protocols, standards, and platforms.
          Everything you need to commission, configure, and troubleshoot industrial control systems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mb-16"
        >
          <a
            href="#guides"
            className="px-7 py-3 bg-cyan-500 hover:bg-cyan-400 text-navy-800 font-bold rounded-lg transition-colors duration-150"
          >
            Browse Guides
          </a>
          <a
            href="#learning-path"
            className="px-7 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-lg transition-colors duration-150"
          >
            View Learning Path
          </a>
        </motion.div>

        {/* Stats — plain text, no boxes, no glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-4"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl font-black text-white leading-none">{stat.value}</span>
              <span className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
