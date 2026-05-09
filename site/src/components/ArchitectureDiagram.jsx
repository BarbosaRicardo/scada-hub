import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Network, Cpu, Radio, Code2, Activity, Settings } from 'lucide-react'

const LAYERS = [
  {
    id: 'hmi',
    label: 'HMI / SCADA',
    sublabel: 'Ignition SCADA Platform',
    icon: Monitor,
    bg: 'bg-purple-700',
    border: 'border-purple-500',
    glow: 'rgba(168,85,247,0.4)',
    url: 'https://barbosaricardo.github.io/ignition-study-guide/',
    guide: 'Ignition SCADA Guide',
  },
  {
    id: 'opcua',
    label: 'OPC UA / Gateway Layer',
    sublabel: 'Unified Architecture, Secure Channels',
    icon: Network,
    bg: 'bg-violet-700',
    border: 'border-violet-500',
    glow: 'rgba(139,92,246,0.4)',
    url: 'https://barbosaricardo.github.io/opcua-study-guide/',
    guide: 'OPC UA Guide',
  },
  {
    id: 'rtac',
    label: 'SEL RTAC / Protocol Gateway',
    sublabel: 'SEL-3530/3555 — Concentrator & Controller',
    icon: Cpu,
    bg: 'bg-indigo-700',
    border: 'border-indigo-500',
    glow: 'rgba(99,102,241,0.4)',
    url: 'https://barbosaricardo.github.io/rtac-study-guide/',
    guide: 'SEL RTAC Guide',
  },
  {
    id: 'protocols',
    label: 'DNP3  ·  Modbus  ·  IEC 61850',
    sublabel: 'Field Protocols & Communication Standards',
    icon: Radio,
    bg: 'bg-blue-700',
    border: 'border-blue-500',
    glow: 'rgba(59,130,246,0.4)',
    urls: [
      { label: 'DNP3', url: 'https://barbosaricardo.github.io/dnp3-study-guide/' },
      { label: 'Modbus', url: 'https://barbosaricardo.github.io/modbus-study-guide/' },
    ],
    guide: 'DNP3 + Modbus Guides',
  },
  {
    id: 'iec',
    label: 'IEC 61131-3 Controllers',
    sublabel: 'ST · LD · FBD · SFC · IL — Five PLC Languages',
    icon: Code2,
    bg: 'bg-teal-700',
    border: 'border-teal-500',
    glow: 'rgba(20,184,166,0.4)',
    url: 'https://barbosaricardo.github.io/iec61131-study-guide/',
    guide: 'IEC 61131-3 Guide',
  },
  {
    id: 'pid',
    label: 'PID Control Loops',
    sublabel: 'Proportional · Integral · Derivative',
    icon: Activity,
    bg: 'bg-emerald-700',
    border: 'border-emerald-500',
    glow: 'rgba(16,185,129,0.4)',
    url: 'https://barbosaricardo.github.io/pid-study-guide/',
    guide: 'PID Controllers Guide',
  },
  {
    id: 'field',
    label: 'Field Devices / Sensors',
    sublabel: 'RTUs · PLCs · IEDs · Transducers',
    icon: Settings,
    bg: 'bg-slate-600',
    border: 'border-slate-400',
    glow: 'rgba(100,116,139,0.4)',
    url: null,
    guide: null,
  },
]

// Layers rendered bottom → top for animation order, but displayed top → bottom
const LAYERS_DISPLAY = [...LAYERS] // top to bottom = HMI first
const LAYERS_ANIM_ORDER = [...LAYERS].reverse() // bottom to top for animation

function ArrowConnector({ index }) {
  return (
    <div className="relative flex items-center justify-center h-5 mx-auto w-8">
      <svg width="16" height="20" viewBox="0 0 16 20" className="overflow-visible">
        <motion.line
          x1="8" y1="0" x2="8" y2="14"
          stroke="rgba(34,211,238,0.6)"
          strokeWidth="2"
          strokeDasharray="4 3"
          animate={{ strokeDashoffset: [12, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: index * 0.15 }}
        />
        <polygon points="8,20 4,12 12,12" fill="rgba(34,211,238,0.6)" />
      </svg>
    </div>
  )
}

function LayerCard({ layer, index, animIndex }) {
  const [hovered, setHovered] = useState(false)
  const Icon = layer.icon

  const handleClick = () => {
    if (layer.url) {
      window.open(layer.url, '_blank', 'noopener,noreferrer')
    } else if (layer.urls) {
      window.open(layer.urls[0].url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: animIndex * 0.1, ease: 'easeOut' }}
    >
      <motion.div
        className={`relative flex items-center gap-4 px-5 py-4 rounded-xl border ${layer.bg} ${layer.border} border-opacity-60 cursor-pointer select-none transition-colors duration-200`}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.015 }}
        onClick={handleClick}
        style={
          hovered
            ? { boxShadow: `0 0 0 2px ${layer.glow}, 0 8px 32px ${layer.glow}` }
            : {}
        }
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center">
          <Icon size={20} className="text-white/90" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-sm sm:text-base leading-tight">
            {layer.label}
          </div>
          <div className="text-white/60 text-xs mt-0.5 truncate">{layer.sublabel}</div>
        </div>

        {/* Tooltip */}
        {hovered && layer.guide && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 text-xs font-semibold text-cyan-300 whitespace-nowrap"
          >
            {layer.guide} →
          </motion.div>
        )}

        {/* Multi-link badges */}
        {layer.urls && hovered && (
          <div className="absolute top-full left-0 mt-1 flex gap-2 z-20">
            {layer.urls.map((u) => (
              <a
                key={u.label}
                href={u.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-lg"
              >
                {u.label} →
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function ArchitectureDiagram() {
  return (
    <section className="py-20 px-4 bg-slate-900" id="architecture">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide mb-4">
            SCADA STACK ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            The Full SCADA Stack
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Data flows from physical field devices all the way up to the HMI. Click any layer
            to open its study guide.
          </p>
        </motion.div>

        {/* Stack diagram */}
        <div className="flex flex-col gap-0">
          {LAYERS_DISPLAY.map((layer, i) => (
            <React.Fragment key={layer.id}>
              <LayerCard
                layer={layer}
                index={i}
                animIndex={LAYERS_DISPLAY.length - 1 - i} /* bottom layers animate first */
              />
              {i < LAYERS_DISPLAY.length - 1 && <ArrowConnector index={i} />}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <motion.p
          className="text-center text-xs text-slate-500 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Arrows show data flow direction (field → HMI). Hover a layer to see its guide.
        </motion.p>
      </div>
    </section>
  )
}
