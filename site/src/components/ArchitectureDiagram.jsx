import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, Network, Cpu, Radio, Code2, Activity, Settings } from 'lucide-react'

const LAYERS = [
  {
    id: 'hmi',
    label: 'HMI / SCADA',
    sublabel: 'Ignition SCADA Platform',
    icon: Monitor,
    accentColor: 'rgba(168,85,247,0.8)',
    url: 'https://barbosaricardo.github.io/ignition-study-guide/',
    guide: 'Ignition SCADA Guide',
  },
  {
    id: 'opcua',
    label: 'OPC UA / Gateway Layer',
    sublabel: 'Unified Architecture · Secure Channels · Session Management',
    icon: Network,
    accentColor: 'rgba(139,92,246,0.8)',
    url: 'https://barbosaricardo.github.io/opcua-study-guide/',
    guide: 'OPC UA Guide',
  },
  {
    id: 'rtac',
    label: 'SEL RTAC / Protocol Concentrator',
    sublabel: 'SEL-3530/3555 · Multi-protocol gateway · IEC 61850 GOOSE',
    icon: Cpu,
    accentColor: 'rgba(99,102,241,0.8)',
    url: 'https://barbosaricardo.github.io/rtac-study-guide/',
    guide: 'SEL RTAC Guide',
  },
  {
    id: 'protocols',
    label: 'Field Protocols',
    sublabel: 'DNP3 · Modbus RTU/TCP · IEC 61850 · Serial & Ethernet',
    icon: Radio,
    accentColor: 'rgba(59,130,246,0.8)',
    urls: [
      { label: 'DNP3 Guide', url: 'https://barbosaricardo.github.io/dnp3-study-guide/' },
      { label: 'Modbus Guide', url: 'https://barbosaricardo.github.io/modbus-study-guide/' },
    ],
  },
  {
    id: 'iec',
    label: 'IEC 61131-3 Controllers',
    sublabel: 'Structured Text · Ladder · Function Block · SFC',
    icon: Code2,
    accentColor: 'rgba(20,184,166,0.8)',
    url: 'https://barbosaricardo.github.io/iec61131-study-guide/',
    guide: 'IEC 61131-3 Guide',
  },
  {
    id: 'pid',
    label: 'PID Control Loops',
    sublabel: 'Proportional · Integral · Derivative · Process Dynamics',
    icon: Activity,
    accentColor: 'rgba(16,185,129,0.8)',
    url: 'https://barbosaricardo.github.io/pid-study-guide/',
    guide: 'PID Controllers Guide',
  },
  {
    id: 'field',
    label: 'Field Devices',
    sublabel: 'RTUs · PLCs · IEDs · Sensors · Transducers · Actuators',
    icon: Settings,
    accentColor: 'rgba(100,116,139,0.6)',
    url: null,
    guide: null,
  },
]

function ArrowConnector({ index }) {
  return (
    <div className="flex items-center justify-center h-4 mx-auto w-8">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <motion.line
          x1="8" y1="0" x2="8" y2="10"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: index * 0.1 }}
        />
        <polygon points="8,16 4,9 12,9" fill="rgba(255,255,255,0.15)" />
      </svg>
    </div>
  )
}

function LayerCard({ layer, animIndex }) {
  const Icon = layer.icon

  const handleClick = () => {
    const target = layer.url || layer.urls?.[0]?.url
    if (target) window.open(target, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: animIndex * 0.07, ease: 'easeOut' }}
    >
      <div
        className="group relative flex items-center gap-4 px-4 py-3.5 rounded-lg cursor-pointer transition-colors duration-150"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderLeft: `3px solid ${layer.accentColor}`,
        }}
        onClick={handleClick}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        }}
      >
        <Icon size={16} strokeWidth={1.5} style={{ color: layer.accentColor, flexShrink: 0 }} />

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-200 text-sm leading-tight">{layer.label}</div>
          <div className="text-slate-500 text-xs mt-0.5 truncate">{layer.sublabel}</div>
        </div>

        {(layer.url || layer.urls) && (
          <span className="text-slate-700 group-hover:text-slate-400 transition-colors duration-150 text-xs flex-shrink-0">
            {layer.guide ? `${layer.guide} →` : '→'}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function ArchitectureDiagram() {
  return (
    <section className="py-24 px-6 bg-slate-900" id="architecture">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-3">
            System Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            The Full SCADA Stack
          </h2>
          <p className="text-slate-500 text-sm">
            Data flows from physical field devices up to the HMI. Click any layer to open its study guide.
          </p>
        </motion.div>

        {/* Stack */}
        <div className="flex flex-col">
          {LAYERS.map((layer, i) => (
            <React.Fragment key={layer.id}>
              <LayerCard layer={layer} animIndex={LAYERS.length - 1 - i} />
              {i < LAYERS.length - 1 && <ArrowConnector index={i} />}
            </React.Fragment>
          ))}
        </div>

        <motion.p
          className="text-xs text-slate-600 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Arrows show data flow direction (field → HMI). Hover a layer to see its study guide.
        </motion.p>
      </div>
    </section>
  )
}
