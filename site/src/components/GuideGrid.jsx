import React from 'react'
import { motion } from 'framer-motion'

const GUIDES = [
  {
    name: 'Modbus',
    emoji: '📡',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'rgba(59,130,246,0.5)',
    glowColor: 'rgba(59,130,246,0.2)',
    url: 'https://barbosaricardo.github.io/modbus-study-guide/',
    desc: 'The grandfather of industrial protocols. Master RTU framing, TCP/IP encapsulation, register maps, and CRC.',
    chapters: 12,
    questions: 507,
  },
  {
    name: 'OPC UA',
    emoji: '🔌',
    color: 'from-violet-500 to-purple-500',
    borderColor: 'rgba(139,92,246,0.5)',
    glowColor: 'rgba(139,92,246,0.2)',
    url: 'https://barbosaricardo.github.io/opcua-study-guide/',
    desc: 'The universal industrial communication standard. Address space, secure channels, subscriptions, and certificates.',
    chapters: 10,
    questions: 150,
  },
  {
    name: 'DNP3',
    emoji: '⚡',
    color: 'from-yellow-500 to-orange-500',
    borderColor: 'rgba(234,179,8,0.5)',
    glowColor: 'rgba(234,179,8,0.15)',
    url: 'https://barbosaricardo.github.io/dnp3-study-guide/',
    desc: 'The power utility protocol. Event-driven, satellite-tolerant, and battle-tested in substations worldwide.',
    chapters: 10,
    questions: 150,
  },
  {
    name: 'IEC 61131-3',
    emoji: '💻',
    color: 'from-teal-500 to-emerald-500',
    borderColor: 'rgba(20,184,166,0.5)',
    glowColor: 'rgba(20,184,166,0.2)',
    url: 'https://barbosaricardo.github.io/iec61131-study-guide/',
    desc: 'Five programming languages for PLCs and RTACs. Structured Text, Ladder, FBD, SFC — one standard to rule them all.',
    chapters: 10,
    questions: 150,
  },
  {
    name: 'PID Controllers',
    emoji: '🎛️',
    color: 'from-green-500 to-teal-500',
    borderColor: 'rgba(34,197,94,0.5)',
    glowColor: 'rgba(34,197,94,0.2)',
    url: 'https://barbosaricardo.github.io/pid-study-guide/',
    desc: 'Close the loop. Understand P, I, and D action, tuning methods, and process dynamics before you touch a setpoint.',
    chapters: 10,
    questions: 150,
  },
  {
    name: 'SEL RTAC',
    emoji: '🏭',
    color: 'from-indigo-500 to-blue-500',
    borderColor: 'rgba(99,102,241,0.5)',
    glowColor: 'rgba(99,102,241,0.2)',
    url: 'https://barbosaricardo.github.io/rtac-study-guide/',
    desc: 'The SEL-3530/3555 protocol gateway and substation controller. IEC 61850, DNP3, Modbus — all in one box.',
    chapters: 9,
    questions: 180,
  },
  {
    name: 'Ignition SCADA',
    emoji: '🖥️',
    color: 'from-orange-500 to-red-500',
    borderColor: 'rgba(249,115,22,0.5)',
    glowColor: 'rgba(249,115,22,0.2)',
    url: 'https://barbosaricardo.github.io/ignition-study-guide/',
    desc: 'The platform that disrupted SCADA pricing. Unlimited tags, Perspective, scripting, alarming, and Gateway architecture.',
    chapters: 10,
    questions: 200,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

function GuideCard({ guide }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="h-full flex flex-col rounded-2xl bg-slate-800/80 backdrop-blur-sm overflow-hidden"
        style={{
          border: `1px solid ${guide.borderColor}`,
        }}
      >
        {/* Gradient top bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${guide.color}`} />

        <div className="flex flex-col flex-1 p-5">
          {/* Emoji + name */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl leading-none">{guide.emoji}</span>
            <h3
              className={`font-black text-lg text-transparent bg-clip-text bg-gradient-to-r ${guide.color}`}
            >
              {guide.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
            {guide.desc}
          </p>

          {/* Progress indicator */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              {guide.chapters} chapters
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              {guide.questions} quiz questions
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              LaTeX PDF
            </span>
          </div>

          {/* CTA */}
          <a
            href={guide.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-2.5 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r ${guide.color} hover:opacity-90 active:scale-95 transition-all duration-150 shadow-md`}
            style={{ boxShadow: `0 4px 16px ${guide.glowColor}` }}
          >
            Open Guide →
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function GuideGrid() {
  return (
    <section className="py-20 px-4 bg-slate-900" id="guides">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide mb-4">
            ALL 7 STUDY GUIDES
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Your Complete Library
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Each guide is a standalone deep dive. Start anywhere, but{' '}
            <span className="text-cyan-400">Modbus first</span> — always.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {GUIDES.map((guide) => (
            <GuideCard key={guide.name} guide={guide} />
          ))}
        </motion.div>

        {/* Total stats bar */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            {
              value: GUIDES.reduce((a, g) => a + g.chapters, 0),
              label: 'Total Chapters',
            },
            {
              value: GUIDES.reduce((a, g) => a + g.questions, 0) + '+',
              label: 'Quiz Questions',
            },
            { value: '7', label: 'LaTeX PDFs' },
            { value: '7', label: 'GitHub Pages Sites' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-800/50"
            >
              <div className="text-2xl font-black text-cyan-400">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
