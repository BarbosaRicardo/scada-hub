import React from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '8', label: 'Guides' },
  { value: '500+', label: 'Quiz Questions' },
  { value: '50+', label: 'Deep Dives' },
  { value: '0', label: 'Excuses' },
]

const titleWords = ['SCADA', 'Engineer', 'Training', 'Hub']

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.85 } },
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 1.1 + i * 0.1, ease: 'backOut' },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-800">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(8,24,41,0.85) 100%)',
        }}
      />

      {/* Floating accent orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          SCADA Automation Engineer Training Program
        </motion.div>

        {/* Animated title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 leading-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={word}
              variants={wordVariants}
              className={`inline-block mr-4 last:mr-0 ${
                i === 2
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400'
                  : 'text-white'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Animated accent underline */}
        <div className="relative w-full max-w-lg mx-auto mb-6 h-1 overflow-hidden">
          <div className="accent-line h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
        </div>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed"
        >
          Master the full stack —{' '}
          <span className="text-cyan-400 font-semibold">from field devices to HMI</span>.
          Seven battle-tested study guides covering every protocol, standard, and platform
          you'll touch as a SCADA engineer.
        </motion.p>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm pulse-glow"
            >
              <span className="text-3xl font-black text-cyan-400 leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 mt-10"
        >
          <a
            href="#guides"
            className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-200"
          >
            Browse All Guides
          </a>
          <a
            href="#learning-path"
            className="px-7 py-3 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200"
          >
            View Learning Path
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs uppercase tracking-widest">scroll</span>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-slate-500 to-transparent rounded-full"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
