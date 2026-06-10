import React from 'react'
import { motion } from 'motion/react'
import {
  Network, Globe, Zap, Code2, Sliders, Server, LayoutDashboard, ScanSearch,
} from 'lucide-react'
import { GUIDES as GUIDES_DATA } from '../data/guides'
import { useAuth } from '../contexts/AuthContext'
import { guideUrl } from '../lib/guideUrl'

const ICON_MAP = { Network, Globe, Zap, Code2, Sliders, Server, LayoutDashboard, ScanSearch }
const GUIDES = GUIDES_DATA.map((g) => ({ ...g, icon: ICON_MAP[g.iconName] }))

const TRACK_BADGE = {
  both: { label: 'BOTH TRACKS', color: '#2ce8c8' },
  scada: { label: 'SCADA OPS', color: '#fb923c' },
  rtac: { label: 'RTAC AUTO', color: '#818cf8' },
  tool: { label: 'FIELD TOOL', color: '#7b8fa1' },
}

function GuideCard({ guide, index, session }) {
  const Icon = guide.icon
  const badge = TRACK_BADGE[guide.track] || TRACK_BADGE.tool

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      className="group h-full"
    >
      <div
        className="panel h-full flex flex-col transition-colors duration-200"
        style={{ '--guide-color': guide.iconColor }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = guide.iconColor }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}
      >
        {/* Device header strip */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="led" style={{ '--led-color': guide.iconColor }} aria-hidden="true" />
          <h3 className="font-mono text-xs font-bold tracking-[0.14em] uppercase text-ink flex-1 truncate">
            {guide.name}
          </h3>
          <Icon size={14} strokeWidth={1.5} style={{ color: guide.iconColor }} aria-hidden="true" />
        </div>

        <div className="flex flex-col flex-1 p-4">
          {/* Track badge */}
          <span
            className="self-start font-mono text-[10px] font-bold tracking-[0.14em] px-1.5 py-0.5 mb-3"
            style={{ color: badge.color, border: `1px solid color-mix(in srgb, ${badge.color} 35%, transparent)` }}
          >
            {badge.label}
          </span>

          {/* Description */}
          <p className="text-ink-dim text-xs leading-relaxed flex-1 mb-4">
            {guide.desc}
          </p>

          {/* Meta readout */}
          <p className="readout mb-4">
            CH {guide.chapters} · Q {guide.questions}
            {guide.hasPdf !== false && ' · PDF'}
          </p>

          {/* CTA */}
          <a
            href={guideUrl(guide.url, session)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-console text-center group-hover:border-(--guide-color) group-hover:text-(--guide-color)"
          >
            [ Open ]
          </a>
        </div>
      </div>
    </motion.article>
  )
}

const ACTIVE_GUIDES = GUIDES.filter((g) => !g.comingSoon)

export default function GuideGrid() {
  const { session } = useAuth()
  return (
    <section className="py-24 px-4 sm:px-6 border-t border-line" id="guides">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="readout text-phosphor mb-3">// Study Guides</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Eight deep dives.<br className="hidden sm:block" /> Pick your starting point.
            </h2>
            <p className="text-ink-dim text-sm max-w-xs sm:text-right">
              Start with Modbus. Each guide builds on the last, but any entry point works.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GUIDES.map((guide, i) => (
            <GuideCard key={guide.name} guide={guide} index={i} session={session} />
          ))}
        </div>

        {/* Totals readout */}
        <motion.p
          className="readout mt-12 pt-6 border-t border-line"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          SYS TOTAL: {ACTIVE_GUIDES.length} GUIDES · {ACTIVE_GUIDES.reduce((a, g) => a + g.chapters, 0)} CHAPTERS ·{' '}
          {ACTIVE_GUIDES.reduce((a, g) => a + g.questions, 0).toLocaleString()}+ QUESTIONS
        </motion.p>
      </div>
    </section>
  )
}
