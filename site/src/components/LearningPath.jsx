import React from 'react'
import { motion } from 'framer-motion'
import {
  Network, Globe, Zap, Code2, Sliders, Server, LayoutDashboard, ScanSearch,
} from 'lucide-react'

const STEPS = [
  {
    step: 1,
    name: 'Modbus',
    icon: Network,
    iconColor: '#60a5fa',
    desc: 'The foundation. Binary framing, coils, registers, RTU vs TCP. Start here regardless of your background.',
    url: 'https://barbosaricardo.github.io/modbus-study-guide/',
  },
  {
    step: 2,
    name: 'OPC UA',
    icon: Globe,
    iconColor: '#a78bfa',
    desc: 'The universal interface layer. Address space, sessions, subscriptions, security modes.',
    url: 'https://barbosaricardo.github.io/opcua-study-guide/',
  },
  {
    step: 3,
    name: 'DNP3',
    icon: Zap,
    iconColor: '#fbbf24',
    desc: 'Power utility protocol. Event-driven, unsolicited responses, Secure Authentication v5.',
    url: 'https://barbosaricardo.github.io/dnp3-study-guide/',
  },
  {
    step: 4,
    name: 'IEC 61131-3',
    icon: Code2,
    iconColor: '#2dd4bf',
    desc: 'Write the control logic. Structured Text, Ladder, Function Blocks — five PLC languages.',
    url: 'https://barbosaricardo.github.io/iec61131-study-guide/',
  },
  {
    step: 5,
    name: 'PID Controllers',
    icon: Sliders,
    iconColor: '#4ade80',
    desc: 'Close the loop. Tuning, process dynamics, cascade control, digital implementation.',
    url: 'https://barbosaricardo.github.io/pid-study-guide/',
  },
  {
    step: 6,
    name: 'SEL RTAC',
    icon: Server,
    iconColor: '#818cf8',
    desc: 'The platform that ties it together. Protocol gateway, concentrator, IEC 61850 mapping.',
    url: 'https://barbosaricardo.github.io/rtac-study-guide/',
  },
  {
    step: 7,
    name: 'Ignition SCADA',
    icon: LayoutDashboard,
    iconColor: '#fb923c',
    desc: 'The HMI layer. Tags, Perspective, scripting, alarming, historian, database integration.',
    url: 'https://barbosaricardo.github.io/ignition-study-guide/',
  },
  {
    step: 8,
    name: 'Wireshark',
    icon: ScanSearch,
    iconColor: '#38bdf8',
    desc: 'Verify everything. Capture frames, dissect protocols, confirm your config at the wire level.',
    url: 'https://barbosaricardo.github.io/wireshark-study-guide/',
  },
]

export default function LearningPath() {
  return (
    <section className="py-24 px-6 bg-slate-900" id="learning-path">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-3">
            Recommended Order
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Learning Path
            </h2>
            <p className="text-slate-500 text-sm max-w-xs sm:text-right">
              Each guide builds on the last. Follow the sequence for maximum depth.
            </p>
          </div>
        </motion.div>

        {/* Steps grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: 'rgba(255,255,255,0.05)' }}>
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.a
                key={step.step}
                href={step.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex items-start gap-4 p-6 transition-colors duration-150"
                style={{ background: '#0d1929' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = '#0d1929'}
              >
                {/* Step number */}
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-black"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#475569' }}
                >
                  {step.step}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} strokeWidth={1.5} style={{ color: step.iconColor }} />
                    <span className="font-bold text-white text-sm">{step.name}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>

                {/* Arrow — appears on hover */}
                <span
                  className="text-slate-700 group-hover:text-slate-400 transition-colors duration-150 flex-shrink-0 self-center text-sm"
                >
                  →
                </span>
              </motion.a>
            )
          })}
        </div>

        <motion.p
          className="mt-6 text-xs text-slate-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          All guides are free and open. No account required to access study material.
        </motion.p>
      </div>
    </section>
  )
}
