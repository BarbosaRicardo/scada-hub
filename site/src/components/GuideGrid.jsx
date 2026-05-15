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
import { useAuth } from '../contexts/AuthContext'

function guideUrl(url, session) {
  if (!session) return url
  const { access_token, refresh_token } = session
  return `${url}#access_token=${access_token}&refresh_token=${refresh_token}&expires_in=3600&token_type=bearer&type=recovery`
}

const ICON_MAP = { Network, Globe, Zap, Code2, Sliders, Server, LayoutDashboard, ScanSearch }
const GUIDES = GUIDES_DATA.map((g) => ({ ...g, icon: ICON_MAP[g.iconName] }))

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' },
  }),
}

function GuideCard({ guide, index, session }) {
  const Icon = guide.icon
  const content = (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="group h-full"
    >
      <div
        className="h-full flex flex-col rounded-xl overflow-hidden transition-colors duration-200"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          opacity: guide.comingSoon ? 0.5 : 1,
        }}
      >
        {/* Accent top line — thin, one color */}
        <div className="h-px w-full" style={{ background: guide.iconColor, opacity: 0.6 }} />

        <div className="flex flex-col flex-1 p-5">
          {/* Icon + name row */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <Icon size={16} strokeWidth={1.5} style={{ color: guide.iconColor }} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">
                {guide.name}
              </h3>
              {guide.comingSoon && (
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                  Coming Soon
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-4">
            {guide.desc}
          </p>

          {/* Meta row */}
          {!guide.comingSoon && (
            <div className="flex items-center gap-3 text-[11px] text-slate-600 mb-4">
              <span>{guide.chapters} chapters</span>
              <span className="text-slate-700">·</span>
              <span>{guide.questions} questions</span>
              {guide.hasPdf !== false && (
                <>
                  <span className="text-slate-700">·</span>
                  <span>PDF</span>
                </>
              )}
            </div>
          )}

          {/* CTA */}
          {guide.comingSoon ? (
            <span className="text-xs text-slate-600 font-medium">In development</span>
          ) : (
            <a
              href={guideUrl(guide.url, session)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold transition-colors duration-150"
              style={{ color: guide.iconColor }}
            >
              Open guide →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )

  return content
}

const ACTIVE_GUIDES = GUIDES.filter((g) => !g.comingSoon)

export default function GuideGrid() {
  const { session } = useAuth()
  return (
    <section className="py-24 px-6 bg-navy-800" id="guides">
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
            Study Guides
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Eight deep dives.<br className="hidden sm:block" /> Pick your starting point.
            </h2>
            <p className="text-slate-500 text-sm max-w-xs sm:text-right">
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

        {/* Footer stats — simple, no boxes */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span>
            <strong className="text-slate-200 font-bold">
              {ACTIVE_GUIDES.reduce((a, g) => a + g.chapters, 0)}
            </strong>{' '}
            total chapters
          </span>
          <span>
            <strong className="text-slate-200 font-bold">
              {ACTIVE_GUIDES.reduce((a, g) => a + g.questions, 0).toLocaleString()}+
            </strong>{' '}
            practice questions
          </span>
          <span>
            <strong className="text-slate-200 font-bold">{ACTIVE_GUIDES.length}</strong>{' '}
            live guides
          </span>
        </motion.div>
      </div>
    </section>
  )
}
