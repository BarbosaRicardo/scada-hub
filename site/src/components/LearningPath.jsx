import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Network, Globe, Zap, Code2, Sliders, Server, LayoutDashboard, ScanSearch,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const isGH = import.meta.env.BASE_URL !== '/'
const baseUrl = (slug) => isGH
  ? `https://barbosaricardo.github.io/${slug}-study-guide/`
  : `https://${slug}-study-guide.vercel.app/`

function guideUrl(url, session) {
  if (!session) return url
  const { access_token, refresh_token } = session
  return `${url}#access_token=${access_token}&refresh_token=${refresh_token}&expires_in=3600&token_type=bearer&type=recovery`
}

const GUIDE_URLS = {
  Modbus: baseUrl('modbus'),
  'OPC UA': baseUrl('opcua'),
  DNP3: baseUrl('dnp3'),
  'IEC 61131-3': baseUrl('iec61131'),
  'SEL RTAC': baseUrl('rtac'),
  'Ignition SCADA': baseUrl('ignition'),
  'PID Controllers': baseUrl('pid'),
  Wireshark: baseUrl('wireshark'),
}

const SCADA_TRACK = [
  {
    week: 1,
    title: 'Ignition Gateway Foundations',
    desc: 'Install, license, and navigate the platform. First Modbus OPC device connection.',
    skills: [
      'Gateway installation, licensing & JVM config',
      'Designer launch, navigation & project scopes',
      'Console logs & Gateway diagnostics',
      'Tag browsing — OPC & internal providers',
      'Modbus TCP OPC device configuration',
    ],
    guides: ['Modbus', 'Ignition SCADA'],
  },
  {
    week: 2,
    title: 'Device Integration & Clients',
    desc: 'Connect DNP3 and OPC servers. Launch Vision and Perspective clients.',
    skills: [
      'DNP3 OPC device config — polling, unsolicited, time sync',
      'External OPC server connections — certs & tag import',
      'Programmable Device Simulator for offline testing',
      'Vision Client scopes & launch',
      'Perspective Sessions & device responsiveness',
    ],
    guides: ['DNP3', 'OPC UA', 'Ignition SCADA'],
  },
  {
    week: 3,
    title: 'Tags & Alarming',
    desc: 'Build the full tag hierarchy. Configure history. Set up alarms end-to-end.',
    skills: [
      'Creating & editing memory, OPC, and derived tags',
      'UDTs — definitions, inheritance & overrides',
      'Tag Groups — scan classes & execution rates',
      'Configure Tag History (deadband, sampling, storage)',
      'Alarm creation, Alarm Status Tables, notification profiles (Email/SMS)',
    ],
    guides: ['Ignition SCADA'],
  },
  {
    week: 4,
    title: 'Visualization & Scripting',
    desc: 'Build Perspective dashboards. Write Python scripts. Query databases.',
    skills: [
      'Perspective Pages, Views & container layouts',
      'Perspective component bindings & transform scripts',
      'Vision Windows — docking, navigation & templates',
      'Python scripting (Gateway, Client & Session scope)',
      'SQL queries, named queries & JDBC database connections',
    ],
    guides: ['Ignition SCADA'],
  },
  {
    week: 5,
    title: 'Advanced Platform',
    desc: 'Store & Forward, Gateway Network, security, and historian performance.',
    skills: [
      'Store and Forward — buffering, recovery & data gap diagnosis',
      'Gateway Network — Edge vs. Full Gateway architecture',
      'Security — roles, zones, permissions & authentication',
      'Historical data querying, troubleshooting & performance',
      'Alarm Journal, Tag Splitter & localization',
    ],
    guides: ['Ignition SCADA'],
  },
]

const RTAC_TRACK = [
  {
    week: 1,
    title: 'RTAC Foundations',
    desc: 'Hardware architecture, Modbus client channels, and SEL data types.',
    skills: [
      'Modbus Client channel — comm params from spec to RTAC config',
      'Register creation from vendor point maps',
      'Configuring polls and response timeouts',
      'SEL tag data types — DI, DO, AI, AO structs',
      'Variable declarations — global/local, IN/OUT/RETAIN',
    ],
    guides: ['Modbus', 'SEL RTAC'],
  },
  {
    week: 2,
    title: 'OPC-UA & Server Channels',
    desc: 'Add OPC-UA client channels. Configure Modbus and OPC-UA server channels.',
    skills: [
      'OPC-UA Client channel — tag assignments & P2P confidence',
      'Modbus Server channel — third-party map interpretation',
      'OPC-UA Server channel — tag assignments & troubleshooting',
      'Variable type lists in projects (global vs. local scope)',
      'Comm and register discrepancy troubleshooting',
    ],
    guides: ['OPC UA', 'SEL RTAC'],
  },
  {
    week: 3,
    title: 'DNP3 & Advanced Channels',
    desc: 'DNP3 client and server. P2P protocols: NGVL and MirroredBits.',
    skills: [
      'DNP3 Client — polls, unsolicited, time sync & custom poll config',
      'DNP3 Server — third-party maps, tag troubleshooting & P2P',
      'C37.118/PMU — comm params & tag population',
      'P2P NGVL — RTAC-to-RTAC data sharing',
      'P2P MirroredBits — binary I/O mirroring',
    ],
    guides: ['DNP3', 'SEL RTAC'],
  },
  {
    week: 4,
    title: 'IEC 61131-3 Programming',
    desc: 'Write RTAC programs in Structured Text, Ladder, and CFC.',
    skills: [
      'Language fluency — ST, LD, CFC',
      'Calling function blocks, functions & variables in programs',
      'FB Development from scratch — design, write, test',
      'FN Development from scratch — design, write, test',
      'FB/PRG Import/Export via XML — modify & test',
    ],
    guides: ['IEC 61131-3', 'SEL RTAC'],
  },
  {
    week: 5,
    title: 'Tag Processor & Expert',
    desc: 'Tag Processor for data mapping, SOE, and logging. Advanced troubleshooting.',
    skills: [
      'Tag Processor — data mapping & live data verification',
      'Tag Processor — SOE (Sequence of Events) creation',
      'Tag Processor — log creation',
      'Timers, counters, data quality & timestamp handling',
      'Advanced P2P confidence & comm troubleshooting',
    ],
    guides: ['SEL RTAC'],
  },
]

const SCADA_COLOR = '#fb923c'
const RTAC_COLOR = '#818cf8'

function WeekCard({ level, color, session }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: level.week * 0.05 }}
      className="relative flex flex-col gap-3 p-5 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Week badge */}
      <div className="flex items-center gap-2">
        <span
          className="text-[10px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded"
          style={{ background: `${color}18`, color }}
        >
          Week {level.week}
        </span>
        {level.comingSoon && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 px-2 py-0.5 rounded bg-slate-800">
            In Development
          </span>
        )}
      </div>

      {/* Title + desc */}
      <div>
        <h4 className="font-bold text-white text-sm leading-tight mb-1">{level.title}</h4>
        <p className="text-slate-500 text-xs leading-relaxed">{level.desc}</p>
      </div>

      {/* Skills list */}
      <ul className="space-y-1">
        {level.skills.map((skill) => (
          <li key={skill} className="flex items-start gap-2 text-xs text-slate-400">
            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
            {skill}
          </li>
        ))}
      </ul>

      {/* Guide links */}
      <div className="flex flex-wrap gap-2 pt-1">
        {level.guides.map((g) => (
          <a
            key={g}
            href={guideUrl(GUIDE_URLS[g], session)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold px-2 py-0.5 rounded transition-opacity duration-150 hover:opacity-80"
            style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
          >
            {g} →
          </a>
        ))}
      </div>
    </motion.div>
  )
}

function TrackColumn({ title, subtitle, color, levels, icon: Icon, session }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Track header */}
      <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15` }}
        >
          <Icon size={18} strokeWidth={1.5} style={{ color }} />
        </div>
        <div>
          <p className="font-black text-white text-base leading-tight">{title}</p>
          <p className="text-xs text-slate-500 leading-tight mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Level cards */}
      {levels.map((level) => (
        <WeekCard key={level.week} level={level} color={color} session={session} />
      ))}
    </div>
  )
}

export default function LearningPath() {
  const { session } = useAuth()
  const [activeTrack, setActiveTrack] = useState('both')

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
            Structured Curriculum
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Two tracks.<br className="hidden sm:block" /> One stack.
            </h2>
            <p className="text-slate-500 text-sm max-w-xs sm:text-right">
              Complete either track in 5–6 weeks. Each week builds directly on the last.
            </p>
          </div>

          {/* Track toggle */}
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'both', label: 'Both Tracks' },
              { id: 'scada', label: 'SCADA Operations' },
              { id: 'rtac', label: 'RTAC Automation' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTrack(t.id)}
                className="text-xs font-semibold px-3 py-1.5 rounded transition-all duration-150"
                style={
                  activeTrack === t.id
                    ? { background: 'rgba(34,211,238,0.15)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.3)' }
                    : { background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.06)' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Two-column track layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(activeTrack === 'both' || activeTrack === 'scada') && (
            <TrackColumn
              title="SCADA Operations"
              subtitle="Ignition Gateway · T1-S Historian · Vantage"
              color={SCADA_COLOR}
              levels={SCADA_TRACK}
              icon={LayoutDashboard}
              session={session}
            />
          )}
          {(activeTrack === 'both' || activeTrack === 'rtac') && (
            <TrackColumn
              title="RTAC Automation"
              subtitle="SEL RTAC · IEC 61131-3 · Channel Configs"
              color={RTAC_COLOR}
              levels={RTAC_TRACK}
              icon={Server}
              session={session}
            />
          )}
        </div>

        <motion.p
          className="mt-8 text-xs text-slate-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Protocol guides (Modbus, DNP3, OPC UA) are shared prerequisites — referenced by both tracks at the levels where each protocol appears.
        </motion.p>
      </div>
    </section>
  )
}
