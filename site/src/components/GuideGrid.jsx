import React from 'react'
import { motion } from 'framer-motion'
import {
  Network,
  Globe,
  Zap,
  Code2,
  Sliders,
  Server,
  LayoutDashboard,
  ScanSearch,
} from 'lucide-react'
import { GUIDES as GUIDES_DATA } from '../data/guides'

const ICON_MAP = { Network, Globe, Zap, Code2, Sliders, Server, LayoutDashboard, ScanSearch }

const GUIDES = GUIDES_DATA.map((g) => ({ ...g, icon: ICON_MAP[g.iconName] }))

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
  const Icon = guide.icon
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
          opacity: guide.comingSoon ? 0.7 : 1,
        }}
      >
        {/* Gradient top bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${guide.color}`} />

        <div className="flex flex-col flex-1 p-5">
          {/* Icon + name */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${guide.glowColor}`, border: `1px solid ${guide.borderColor}` }}
            >
              <Icon size={18} strokeWidth={1.5} style={{ color: guide.iconColor }} />
            </div>
            <div className="flex flex-col min-w-0">
              <h3
                className={`font-black text-lg leading-tight text-transparent bg-clip-text bg-gradient-to-r ${guide.color}`}
              >
                {guide.name}
              </h3>
              {guide.comingSoon && (
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  Coming Soon
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
            {guide.desc}
          </p>

          {/* Progress indicator */}
          {!guide.comingSoon && (
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                {guide.chapters} chapters
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                {guide.questions} questions
              </span>
              {guide.hasPdf !== false && (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  PDF
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          {guide.comingSoon ? (
            <div
              className="w-full py-2.5 rounded-xl text-center text-sm font-bold text-slate-500 border border-slate-700"
            >
              In Development
            </div>
          ) : (
            <a
              href={guide.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2.5 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r ${guide.color} hover:opacity-90 active:scale-95 transition-all duration-150 shadow-md`}
              style={{ boxShadow: `0 4px 16px ${guide.glowColor}` }}
            >
              Open Guide &rarr;
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const ACTIVE_GUIDES = GUIDES.filter((g) => !g.comingSoon)

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
            {GUIDES.length} STUDY GUIDES
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
              value: ACTIVE_GUIDES.reduce((a, g) => a + g.chapters, 0),
              label: 'Total Chapters',
            },
            {
              value: ACTIVE_GUIDES.reduce((a, g) => a + g.questions, 0).toLocaleString() + '+',
              label: 'Quiz Questions',
            },
            { value: ACTIVE_GUIDES.length, label: 'Live Guides' },
            { value: ACTIVE_GUIDES.length, label: 'GitHub Pages Sites' },
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
