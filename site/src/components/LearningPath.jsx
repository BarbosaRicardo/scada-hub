import React from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  {
    step: 1,
    name: 'Modbus',
    emoji: '📡',
    desc: 'Start here. The protocol that started it all. Binary framing, registers, RTU/TCP.',
    url: 'https://barbosaricardo.github.io/modbus-study-guide/',
    color: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/50',
    ring: 'bg-blue-500',
  },
  {
    step: 2,
    name: 'OPC UA',
    emoji: '🔌',
    desc: 'The universal translator. How modern devices talk to SCADA.',
    url: 'https://barbosaricardo.github.io/opcua-study-guide/',
    color: 'from-violet-500 to-purple-500',
    border: 'border-violet-500/50',
    ring: 'bg-violet-500',
  },
  {
    step: 3,
    name: 'DNP3',
    emoji: '⚡',
    desc: 'Power utility protocol. Events, unsolicited responses, Secure Auth.',
    url: 'https://barbosaricardo.github.io/dnp3-study-guide/',
    color: 'from-yellow-500 to-orange-500',
    border: 'border-yellow-500/50',
    ring: 'bg-yellow-500',
  },
  {
    step: 4,
    name: 'IEC 61131-3',
    emoji: '💻',
    desc: 'Write the logic. ST, LD, FBD — how controllers are programmed.',
    url: 'https://barbosaricardo.github.io/iec61131-study-guide/',
    color: 'from-teal-500 to-emerald-500',
    border: 'border-teal-500/50',
    ring: 'bg-teal-500',
  },
  {
    step: 5,
    name: 'PID Controllers',
    emoji: '🎛️',
    desc: 'Control the process. P, I, D — close the loop.',
    url: 'https://barbosaricardo.github.io/pid-study-guide/',
    color: 'from-green-500 to-teal-500',
    border: 'border-green-500/50',
    ring: 'bg-green-500',
  },
  {
    step: 6,
    name: 'SEL RTAC',
    emoji: '🏭',
    desc: 'Put it all together. Protocol gateway, concentrator, controller.',
    url: 'https://barbosaricardo.github.io/rtac-study-guide/',
    color: 'from-indigo-500 to-blue-500',
    border: 'border-indigo-500/50',
    ring: 'bg-indigo-500',
  },
  {
    step: 7,
    name: 'Ignition SCADA',
    emoji: '🖥️',
    desc: 'The crown jewel. Tags, Perspective, alarming, historian.',
    url: 'https://barbosaricardo.github.io/ignition-study-guide/',
    color: 'from-orange-500 to-red-500',
    border: 'border-orange-500/50',
    ring: 'bg-orange-500',
  },
]

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function LearningPath() {
  return (
    <section className="py-20 px-4 bg-navy-800" id="learning-path">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide mb-4">
            RECOMMENDED STUDY ORDER
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Learning Path
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Follow this sequence for maximum knowledge retention. Each guide builds on the last.
          </p>
        </motion.div>

        {/* Desktop: horizontal scroll / grid. Mobile: vertical */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch lg:items-start overflow-x-auto pb-4">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.step}>
              {/* Card */}
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex-1 min-w-[180px] max-w-full lg:max-w-none"
              >
                <motion.div
                  className={`h-full flex flex-col p-4 rounded-2xl border ${step.border} bg-slate-800/60 backdrop-blur-sm`}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Step circle + emoji */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-8 h-8 rounded-full ${step.ring} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}
                    >
                      {step.step}
                    </div>
                    <span className="text-2xl leading-none">{step.emoji}</span>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-white text-sm leading-tight mb-2">
                    {step.name}
                  </h3>

                  {/* Desc */}
                  <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-4">
                    {step.desc}
                  </p>

                  {/* CTA */}
                  <a
                    href={step.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-xs font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                  >
                    Start Guide →
                  </a>
                </motion.div>
              </motion.div>

              {/* Connector arrow (not after last item) */}
              {i < STEPS.length - 1 && (
                <div className="flex lg:flex-col items-center justify-center px-1 lg:px-0 py-0 lg:py-2 self-center">
                  {/* Desktop: right arrow */}
                  <motion.div
                    className="hidden lg:block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  >
                    <svg width="20" height="16" viewBox="0 0 20 16">
                      <line x1="0" y1="8" x2="12" y2="8" stroke="rgba(34,211,238,0.4)" strokeWidth="2" strokeDasharray="3 2" />
                      <polygon points="20,8 12,4 12,12" fill="rgba(34,211,238,0.4)" />
                    </svg>
                  </motion.div>
                  {/* Mobile: down arrow */}
                  <motion.div
                    className="block lg:hidden"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  >
                    <svg width="16" height="20" viewBox="0 0 16 20">
                      <line x1="8" y1="0" x2="8" y2="12" stroke="rgba(34,211,238,0.4)" strokeWidth="2" strokeDasharray="3 2" />
                      <polygon points="8,20 4,12 12,12" fill="rgba(34,211,238,0.4)" />
                    </svg>
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
