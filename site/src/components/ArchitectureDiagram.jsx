import React from 'react'
import { motion } from 'motion/react'
import { Monitor, Network, Cpu, Radio, Code2, Activity, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { guideUrl, guideBaseUrl } from '../lib/guideUrl'

const LAYERS = [
  {
    id: 'hmi',
    label: 'HMI / SCADA',
    sublabel: 'Ignition SCADA Platform',
    icon: Monitor,
    accentColor: '#a855f7',
    url: guideBaseUrl('ignition'),
  },
  {
    id: 'opcua',
    label: 'OPC UA / Gateway Layer',
    sublabel: 'Unified Architecture · Secure Channels · Session Management',
    icon: Network,
    accentColor: '#8b5cf6',
    url: guideBaseUrl('opcua'),
  },
  {
    id: 'rtac',
    label: 'SEL RTAC / Protocol Concentrator',
    sublabel: 'SEL-3530/3555 · Multi-protocol gateway · IEC 61850 GOOSE',
    icon: Cpu,
    accentColor: '#6366f1',
    url: guideBaseUrl('rtac'),
  },
  {
    id: 'protocols',
    label: 'Field Protocols',
    sublabel: 'DNP3 · Modbus RTU/TCP · IEC 61850 · Serial & Ethernet',
    icon: Radio,
    accentColor: '#3b82f6',
    urls: [
      { label: 'DNP3', url: guideBaseUrl('dnp3') },
      { label: 'Modbus', url: guideBaseUrl('modbus') },
    ],
  },
  {
    id: 'iec',
    label: 'IEC 61131-3 Controllers',
    sublabel: 'Structured Text · Ladder · Function Block · SFC',
    icon: Code2,
    accentColor: '#14b8a6',
    url: guideBaseUrl('iec61131'),
  },
  {
    id: 'pid',
    label: 'PID Control Loops',
    sublabel: 'Proportional · Integral · Derivative · Process Dynamics',
    icon: Activity,
    accentColor: '#10b981',
    url: guideBaseUrl('pid'),
  },
  {
    id: 'field',
    label: 'Field Devices',
    sublabel: 'RTUs · PLCs · IEDs · Sensors · Transducers · Actuators',
    icon: Settings,
    accentColor: '#64748b',
    url: null,
  },
]

function FlowConnector() {
  return (
    <div className="flex justify-center h-5 ml-6" aria-hidden="true">
      <svg width="2" height="20" viewBox="0 0 2 20">
        <line
          x1="1" y1="0" x2="1" y2="20"
          stroke="var(--color-phosphor-dim)"
          strokeWidth="2"
          strokeDasharray="4 3"
          className="flow-dash"
        />
      </svg>
    </div>
  )
}

function RackUnit({ layer, index, session }) {
  const Icon = layer.icon
  const href = layer.url ? guideUrl(layer.url, session) : null

  const inner = (
    <>
      {/* Rack ear */}
      <span
        className="hidden sm:flex flex-col justify-center gap-1.5 border-r border-line px-2.5"
        aria-hidden="true"
      >
        <span className="led" style={{ '--led-color': layer.accentColor }} />
      </span>

      <span className="w-10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <Icon size={18} strokeWidth={1.5} style={{ color: layer.accentColor }} />
      </span>

      <span className="flex-1 min-w-0 py-3 pr-3">
        <span className="block font-mono text-xs sm:text-sm font-bold tracking-[0.08em] uppercase text-ink leading-tight">
          {layer.label}
        </span>
        <span className="block text-[11px] text-ink-dim mt-0.5 truncate">{layer.sublabel}</span>
      </span>

      {href && (
        <span className="readout pr-4 hidden sm:block group-hover:text-phosphor transition-colors">
          OPEN →
        </span>
      )}
      {layer.urls && (
        <span className="flex gap-2 pr-4">
          {layer.urls.map((u) => (
            <a
              key={u.label}
              href={guideUrl(u.url, session)}
              target="_blank"
              rel="noopener noreferrer"
              className="readout hover:text-phosphor transition-colors"
            >
              {u.label} →
            </a>
          ))}
        </span>
      )}
    </>
  )

  const className =
    'group panel flex items-stretch w-full text-left transition-colors duration-200 hover:border-line-bright'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {inner}
        </a>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </motion.div>
  )
}

export default function ArchitectureDiagram() {
  const { session } = useAuth()

  return (
    <section className="py-24 px-4 sm:px-6 border-t border-line" id="architecture">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="readout text-phosphor mb-3">// Stack Architecture</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">The full SCADA stack.</h2>
            <p className="text-ink-dim text-sm max-w-xs sm:text-right">
              Data flows from field devices up to the HMI. Click a layer to open its guide.
            </p>
          </div>
        </motion.div>

        {/* Rack */}
        <div className="flex flex-col">
          {LAYERS.map((layer, i) => (
            <React.Fragment key={layer.id}>
              <RackUnit layer={layer} index={i} session={session} />
              {i < LAYERS.length - 1 && <FlowConnector />}
            </React.Fragment>
          ))}
        </div>

        <p className="readout mt-8">DATA FLOW: FIELD → HMI · ALL CHANNELS NOMINAL</p>
      </div>
    </section>
  )
}
