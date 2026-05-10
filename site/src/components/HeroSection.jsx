import React from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '8', label: 'Study Guides' },
  { value: '500+', label: 'Quiz Questions' },
  { value: '3', label: 'Difficulty Levels' },
  { value: '8', label: 'LaTeX PDFs' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(6,14,26,0.9) 100%)',
        }}
      />

      {/* Subtle accent orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/8 text-cyan-400/80 text-xs font-semibold tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          SCADA Automation Engineer Training
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 leading-none text-white"
        >
          The SCADA{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
            Engineer
          </span>
          {' '}Training Hub
        </motion.h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          className="w-24 h-px mb-6 rounded-full origin-left"
          style={{ background: 'linear-gradient(90deg, #22d3ee, #6366f1)' }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          Eight structured study guides covering every protocol, standard, and platform
          in the industrial control stack — from field devices to HMI.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mb-14 w-full sm:w-auto"
        >
          <a
            href="#guides"
            className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-opacity duration-200 text-sm tracking-wide"
          >
            Browse All Guides
          </a>
          <a
            href="#learning-path"
            className="px-7 py-3 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200 text-sm tracking-wide"
          >
            Learning Path
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm"
            >
              <span className="text-2xl font-black text-cyan-400 leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide text-center leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="text-xs uppercase tracking-widest font-medium">scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
