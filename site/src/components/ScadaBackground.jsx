import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Network nodes: id, label, x%, y%, type
const NODES = [
  { id: 'solar',  label: 'SOLAR FARM',    x: 12,  y: 18,  type: 'solar'  },
  { id: 'wind',   label: 'WIND ARRAY',    x: 82,  y: 14,  type: 'wind'   },
  { id: 'bess',   label: 'BESS',          x: 20,  y: 72,  type: 'bess'   },
  { id: 'sub',    label: 'SUBSTATION',    x: 78,  y: 70,  type: 'sub'    },
  { id: 'rtu1',   label: 'RTU-01',        x: 38,  y: 38,  type: 'rtu'    },
  { id: 'rtu2',   label: 'RTU-02',        x: 64,  y: 42,  type: 'rtu'    },
  { id: 'scada',  label: 'SCADA MASTER',  x: 50,  y: 58,  type: 'scada'  },
]

const EDGES = [
  { from: 'solar', to: 'rtu1',  delay: 0 },
  { from: 'wind',  to: 'rtu2',  delay: 0.4 },
  { from: 'bess',  to: 'scada', delay: 0.8 },
  { from: 'sub',   to: 'scada', delay: 0.2 },
  { from: 'rtu1',  to: 'scada', delay: 0.6 },
  { from: 'rtu2',  to: 'scada', delay: 1.0 },
  { from: 'rtu1',  to: 'rtu2',  delay: 1.4 },
]

const NODE_COLORS = {
  solar:  { ring: '#fbbf24', fill: '#78350f', dot: '#f59e0b' },
  wind:   { ring: '#34d399', fill: '#064e3b', dot: '#10b981' },
  bess:   { ring: '#60a5fa', fill: '#1e3a5f', dot: '#3b82f6' },
  sub:    { ring: '#f87171', fill: '#450a0a', dot: '#ef4444' },
  rtu:    { ring: '#a78bfa', fill: '#2e1065', dot: '#8b5cf6' },
  scada:  { ring: '#fbbf24', fill: '#451a03', dot: '#f59e0b' },
}

// Telemetry tickers near each node
const INIT_TICKERS = {
  solar: [{ k: 'PV',  v: 2847, u: 'kW' }, { k: 'V',   v: 480,  u: 'V'  }],
  wind:  [{ k: 'GEN', v: 1240, u: 'kW' }, { k: 'RPM', v: 14,   u: 'rpm'}],
  bess:  [{ k: 'SOC', v: 74,   u: '%'  }, { k: 'P',   v: -320, u: 'kW' }],
  sub:   [{ k: 'MVA', v: 12.4, u: 'MVA'}, { k: 'kV',  v: 115,  u: 'kV' }],
  rtu1:  [{ k: 'AI',  v: 3,    u: 'pts'}, { k: 'DI',  v: 12,   u: 'pts'}],
  rtu2:  [{ k: 'AI',  v: 5,    u: 'pts'}, { k: 'DI',  v: 8,    u: 'pts'}],
  scada: [{ k: 'TAGS',v: 4096, u: 'pts'}, { k: 'RTT', v: 42,   u: 'ms' }],
}

function useTickers() {
  const [tickers, setTickers] = useState(INIT_TICKERS)
  useEffect(() => {
    const id = setInterval(() => {
      setTickers(prev => {
        const next = { ...prev }
        next.solar = [{ k: 'PV', v: +(prev.solar[0].v + (Math.random() - 0.5) * 40).toFixed(0), u: 'kW' }, prev.solar[1]]
        next.wind  = [{ k: 'GEN', v: +(prev.wind[0].v + (Math.random() - 0.5) * 30).toFixed(0), u: 'kW' }, prev.wind[1]]
        next.bess  = [{ k: 'SOC', v: Math.min(100, Math.max(0, +(prev.bess[0].v + (Math.random() - 0.5) * 0.5).toFixed(1))), u: '%' }, prev.bess[1]]
        next.sub   = [{ k: 'MVA', v: +(prev.sub[0].v + (Math.random() - 0.5) * 0.2).toFixed(1), u: 'MVA' }, prev.sub[1]]
        next.scada = [prev.scada[0], { k: 'RTT', v: Math.max(1, +(prev.scada[1].v + (Math.random() - 1) * 4).toFixed(0)), u: 'ms' }]
        return next
      })
    }, 1200)
    return () => clearInterval(id)
  }, [])
  return tickers
}

function NodeIcon({ type, color }) {
  if (type === 'solar') return (
    <g>
      {/* Sun rays */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <motion.line key={i} x1="0" y1="-5" x2="0" y2="-9"
          stroke={color.dot} strokeWidth="1.5" strokeLinecap="round"
          transform={`rotate(${deg})`}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22 }}
        />
      ))}
      <circle r="4" fill={color.dot} />
      {/* Panel rows */}
      {[-4,-1,2].map((dy, i) => (
        <rect key={i} x="-6" y={10 + dy * 2.2} width="12" height="1.6" rx="0.5"
          fill={color.dot} opacity="0.7" />
      ))}
    </g>
  )
  if (type === 'wind') return (
    <g>
      <line x1="0" y1="0" x2="0" y2="10" stroke={color.dot} strokeWidth="1.5" />
      {[0, 120, 240].map((deg, i) => (
        <motion.ellipse key={i} cx="0" cy="-5" rx="2" ry="6"
          fill={color.dot} opacity="0.8"
          style={{ transformOrigin: '0 0' }}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 0 }}
        />
      ))}
    </g>
  )
  if (type === 'bess') return (
    <g>
      <rect x="-7" y="-9" width="14" height="18" rx="2" fill="none" stroke={color.dot} strokeWidth="1.5" />
      <rect x="-3" y="-11" width="6" height="3" rx="1" fill={color.dot} opacity="0.8" />
      <motion.rect x="-5" y="3" width="10" height="4" rx="1" fill={color.dot}
        animate={{ height: [2, 10, 2], y: [3, -3, 3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>
  )
  if (type === 'sub') return (
    <g>
      {/* Transformer symbol */}
      <circle cx="-3" cy="0" r="4" fill="none" stroke={color.dot} strokeWidth="1.5" />
      <circle cx="3"  cy="0" r="4" fill="none" stroke={color.dot} strokeWidth="1.5" />
      <line x1="-3" y1="-9" x2="-3" y2="-4" stroke={color.dot} strokeWidth="1.5" />
      <line x1="3"  y1="4"  x2="3"  y2="9"  stroke={color.dot} strokeWidth="1.5" />
    </g>
  )
  if (type === 'rtu') return (
    <g>
      <rect x="-7" y="-7" width="14" height="14" rx="2" fill="none" stroke={color.dot} strokeWidth="1.5" />
      {[[-3,-2],[0,-2],[3,-2],[-3,1],[0,1],[3,1]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.2" fill={color.dot}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.13 }}
        />
      ))}
    </g>
  )
  // scada
  return (
    <g>
      <rect x="-9" y="-7" width="18" height="13" rx="2" fill="none" stroke={color.dot} strokeWidth="1.8" />
      <rect x="-7" y="-5" width="14" height="8" rx="1" fill={color.fill} stroke={color.dot} strokeWidth="0.8" opacity="0.6" />
      {/* Screen scanline */}
      <motion.line x1="-7" y1="-5" x2="7" y2="-5" stroke={color.dot} strokeWidth="0.8" opacity="0.8"
        animate={{ y1: [-5, 3, -5], y2: [-5, 3, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <line x1="-3" y1="6" x2="3" y2="6" stroke={color.dot} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="6" x2="0" y2="9" stroke={color.dot} strokeWidth="1.5" />
    </g>
  )
}

function Ticker({ node, tickers, vw, vh }) {
  const t = tickers[node.id]
  if (!t) return null
  const isRight = node.x > 50
  const isBottom = node.y > 55
  const px = (node.x / 100) * vw
  const py = (node.y / 100) * vh
  const color = NODE_COLORS[node.type]

  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
      {t.map((row, i) => {
        const dy = isBottom ? -(i + 1) * 14 - 22 : (i + 1) * 14 + 18
        const dx = isRight ? -52 : 18
        return (
          <g key={i} transform={`translate(${px + dx}, ${py + dy})`}>
            <rect x="0" y="-9" width="48" height="12" rx="3"
              fill={color.fill} fillOpacity="0.85"
              stroke={color.ring} strokeWidth="0.5" strokeOpacity="0.5" />
            <text x="4" y="1" fontSize="7" fill={color.dot} fontFamily="monospace" fontWeight="bold">
              {row.k}
            </text>
            <text x="28" y="1" fontSize="7" fill="#e2e8f0" fontFamily="monospace" textAnchor="end">
              {row.v}
            </text>
            <text x="46" y="1" fontSize="6" fill={color.dot} fontFamily="monospace" textAnchor="end" opacity="0.7">
              {row.u}
            </text>
          </g>
        )
      })}
    </motion.g>
  )
}

export default function ScadaBackground() {
  const svgRef = useRef(null)
  const [dims, setDims] = useState({ w: 1440, h: 900 })
  const tickers = useTickers()
  const [packets, setPackets] = useState({})

  useEffect(() => {
    const update = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        setDims({ w: width, h: height })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Animate packet progress along each edge
  useEffect(() => {
    const init = {}
    EDGES.forEach((e, i) => { init[i] = Math.random() })
    setPackets(init)
    const id = setInterval(() => {
      setPackets(prev => {
        const next = { ...prev }
        EDGES.forEach((_, i) => {
          next[i] = (prev[i] + 0.004 + Math.random() * 0.003) % 1
        })
        return next
      })
    }, 30)
    return () => clearInterval(id)
  }, [])

  const nodePos = (id) => {
    const n = NODES.find(n => n.id === id)
    return { x: (n.x / 100) * dims.w, y: (n.y / 100) * dims.h }
  }

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <radialGradient id="vignet" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(8,24,41,0.92)" />
        </radialGradient>
        {/* Glow filters */}
        {Object.entries(NODE_COLORS).map(([type, c]) => (
          <filter key={type} id={`glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        ))}
      </defs>

      {/* Edges */}
      {EDGES.map((edge, i) => {
        const from = nodePos(edge.from)
        const to   = nodePos(edge.to)
        const color = NODE_COLORS[NODES.find(n => n.id === edge.from).type].dot
        const t = packets[i] ?? 0
        const px = from.x + (to.x - from.x) * t
        const py = from.y + (to.y - from.y) * t

        return (
          <g key={i}>
            {/* Static line */}
            <motion.line
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={color} strokeWidth="0.6" strokeOpacity="0.18"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: edge.delay }}
            />
            {/* Animated data packet */}
            <motion.circle
              cx={px} cy={py} r="2.5"
              fill={color}
              opacity="0.85"
              filter={`url(#glow-${NODES.find(n => n.id === edge.from).type})`}
            />
            {/* Trailing glow */}
            <circle
              cx={from.x + (to.x - from.x) * Math.max(0, t - 0.06)}
              cy={from.y + (to.y - from.y) * Math.max(0, t - 0.06)}
              r="1.5" fill={color} opacity="0.3"
            />
          </g>
        )
      })}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const x = (node.x / 100) * dims.w
        const y = (node.y / 100) * dims.h
        const color = NODE_COLORS[node.type]

        return (
          <motion.g key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            {/* Outer pulse ring */}
            <motion.circle cx={x} cy={y} r="22"
              fill="none" stroke={color.ring} strokeWidth="0.8" strokeOpacity="0.3"
              animate={{ r: [18, 28, 18], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            />
            {/* Inner ring */}
            <motion.circle cx={x} cy={y} r="14"
              fill="none" stroke={color.ring} strokeWidth="1" strokeOpacity="0.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            {/* Node background */}
            <circle cx={x} cy={y} r="10" fill={color.fill} fillOpacity="0.9" />

            {/* Icon */}
            <g transform={`translate(${x}, ${y})`} filter={`url(#glow-${node.type})`}>
              <NodeIcon type={node.type} color={color} />
            </g>

            {/* Label */}
            <motion.text
              x={x} y={y + 24} textAnchor="middle"
              fontSize="7.5" fontFamily="monospace" fontWeight="bold"
              fill={color.dot} fillOpacity="0.85" letterSpacing="0.08em"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
            >
              {node.label}
            </motion.text>
          </motion.g>
        )
      })}

      {/* Live ticker readouts */}
      {NODES.map(node => (
        <Ticker key={node.id} node={node} tickers={tickers} vw={dims.w} vh={dims.h} />
      ))}

      {/* Center vignette — keeps login card readable */}
      <rect x="0" y="0" width="100%" height="100%" fill="url(#vignet)" />
    </svg>
  )
}
