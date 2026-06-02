import React, { useState } from 'react'
import { motion } from 'framer-motion'

// All skills from both matrices, organized by track and week
const SCADA_SKILLS = [
  {
    week: 1,
    category: 'Ignition Gateway Setup & Licensing',
    skills: [
      'Install Ignition Gateway on Windows or Linux',
      'Configure Gateway options — ports, JVM, backups',
      'Apply, update & troubleshoot Ignition license keys',
      'Understand module licensing and activation',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 1,
    category: 'Modbus OPC Device Configuration',
    skills: [
      'Configure Modbus TCP devices in Ignition',
      'Understand addressing — coils, discrete inputs, holding registers',
      'Troubleshoot Modbus communication issues',
    ],
    guide: 'Modbus + Ignition SCADA',
  },
  {
    week: 1,
    category: 'Designer Navigation',
    skills: [
      'Launch and log into the Ignition Designer',
      'Navigate the project browser efficiently',
      'Understand project scopes — Designer, Gateway, Client/Session',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 1,
    category: 'Console & Tag Browsing',
    skills: [
      'Use the Gateway Console for logs and diagnostics',
      'Understand log levels and filtering',
      'Browse OPC and internal tags',
      'Understand tag providers and folder structure',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 2,
    category: 'DNP3 OPC Device Configuration',
    skills: [
      'Configure a DNP3 OPC device in Ignition',
      'Understand polling, unsolicited messaging & time sync',
      'Diagnose common DNP3 communication problems',
    ],
    guide: 'DNP3 + Ignition SCADA',
  },
  {
    week: 2,
    category: 'Connecting to OPC Servers',
    skills: [
      'Connect Ignition to external OPC servers (e.g., Kepware)',
      'Understand OPC UA security settings and certificates',
      'Browse and import OPC tags successfully',
    ],
    guide: 'OPC UA + Ignition SCADA',
  },
  {
    week: 2,
    category: 'Programmable Device Simulator',
    skills: [
      'Configure and use device simulators for testing',
      'Simulate realistic tag behavior for development',
      'Understand simulator limitations vs. real devices',
    ],
    guide: 'Ignition SCADA',
    gap: true,
  },
  {
    week: 2,
    category: 'Vision & Perspective Clients',
    skills: [
      'Launch and configure Vision Clients',
      'Understand Vision Client scopes and limitations',
      'Launch and manage Perspective Sessions',
      'Understand session properties and device responsiveness',
      'Troubleshoot Perspective session issues',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 3,
    category: 'Creating & Editing Tags',
    skills: [
      'Create memory, OPC, and derived tags',
      'Bulk-edit tags efficiently',
      'Understand key tag properties — value, quality, timestamp',
      'Configure scaling, alarms, history & security on tags',
      'Understand atomic tags, folders & reference tags',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 3,
    category: 'UDTs & Tag Groups',
    skills: [
      'Create and edit UDT definitions',
      'Diagnose UDT inheritance and overrides',
      'Apply UDTs consistently across projects',
      'Understand scan classes and execution rates',
      'Configure tag groups for performance optimization',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 3,
    category: 'Tag History & Alarming',
    skills: [
      'Configure tag history providers',
      'Understand deadband, sampling & storage settings',
      'Configure an alarm journal',
      'Create and configure alarms on tags',
      'Understand alarm states, priorities & deadbands',
      'Configure Alarm Status Tables',
      'Configure notification profiles — Email, SMS',
      'Understand rosters, schedules & escalation',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 4,
    category: 'Perspective Visualization',
    skills: [
      'Create Perspective pages and views',
      'Understand container types and layout behavior',
      'Configure Perspective component bindings',
      'Understand transform scripts and property paths',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 4,
    category: 'Vision Visualization',
    skills: [
      'Create and manage Vision windows',
      'Understand docking, navigation & templates',
      'Configure Vision component bindings',
      'Understand expression vs. SQL vs. tag bindings',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 4,
    category: 'Scripting & Databases',
    skills: [
      'Write Python scripts in Ignition',
      'Understand scope — Gateway, Client, Session',
      'Debug scripts effectively',
      'Write basic SQL queries for Ignition',
      'Understand named queries and security best practices',
      'Configure JDBC database connections',
      'Understand connection pooling and failover basics',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 5,
    category: 'Store & Forward / Gateway Network',
    skills: [
      'Understand how Store and Forward works in Ignition',
      'Configure buffering and recovery options',
      'Diagnose data gaps and recovery behavior',
      'Configure Gateway Network connections',
      'Understand Edge vs. Full Gateway architecture',
      'Troubleshoot Gateway Network communication issues',
    ],
    guide: 'Ignition SCADA',
  },
  {
    week: 5,
    category: 'Security, History & Advanced',
    skills: [
      'Understand authentication and authorization concepts',
      'Configure roles, zones & permissions',
      'Understand how Ignition stores historical data',
      'Query historical data using bindings and SQL',
      'Troubleshoot missing or inaccurate history',
      'Understand performance considerations for large datasets',
      'Understand the purpose of the Tag Splitter',
    ],
    guide: 'Ignition SCADA',
  },
]

const RTAC_SKILLS = [
  {
    week: 1,
    category: 'Modbus Client Channel Config',
    skills: [
      'Interpret comm parameters from vendor specs and populate RTAC channel',
      'Create registers from vendor point maps',
      'Configure polls — polling requirements from specs',
      'Troubleshoot Modbus communications',
      'Troubleshoot register discrepancies and conduct P2P',
    ],
    guide: 'Modbus + SEL RTAC',
  },
  {
    week: 1,
    category: 'Tags & Data Mapping',
    skills: [
      'Understand global vs. local variable declarations',
      'Understand variable declaration types — IN/OUT/RETAIN etc.',
      'Assign variables using different list types in projects',
    ],
    guide: 'IEC 61131-3 + SEL RTAC',
  },
  {
    week: 1,
    category: 'SEL Tag Data Types',
    skills: [
      'Effectively use datatypes for Digital Inputs in RTACs',
      'Effectively use datatypes for Digital Outputs in RTACs',
      'Effectively use datatypes for Analog Inputs in RTACs',
      'Effectively use datatypes for Analog Outputs in RTACs',
      'Use timers, counters, data quality & timestamps in RTACs',
    ],
    guide: 'SEL RTAC',
  },
  {
    week: 2,
    category: 'OPC-UA Client Channel Config',
    skills: [
      'Interpret OPC-UA comm parameters and populate RTAC channel',
      'Assign OPC-UA tags from vendor specs',
      'Troubleshoot OPC-UA communications',
      'Conduct P2P for OPC-UA channels',
    ],
    guide: 'OPC UA + SEL RTAC',
  },
  {
    week: 2,
    category: 'Modbus Server Channel Config',
    skills: [
      'Interpret comm parameters for Modbus server channel',
      'Create registers from third-party maps / system requirements',
      'Troubleshoot Modbus server communications',
      'Troubleshoot register discrepancies and conduct P2P',
    ],
    guide: 'Modbus + SEL RTAC',
  },
  {
    week: 2,
    category: 'OPC-UA Server Channel Config',
    skills: [
      'Interpret OPC-UA server comm parameters',
      'Assign OPC-UA server tags',
      'Troubleshoot OPC-UA server communications',
      'Conduct P2P for OPC-UA server channel',
    ],
    guide: 'OPC UA + SEL RTAC',
  },
  {
    week: 3,
    category: 'DNP3 Client Channel Config',
    skills: [
      'Interpret DNP3 comm parameters and populate RTAC channel',
      'Create tags from vendor point maps',
      'Configure custom polls',
      'Troubleshoot DNP3 communications',
      'Troubleshoot tag discrepancies and conduct P2P',
    ],
    guide: 'DNP3 + SEL RTAC',
  },
  {
    week: 3,
    category: 'DNP3 Server Channel Config',
    skills: [
      'Interpret DNP3 server comm parameters',
      'Create tags from third-party maps / system requirements',
      'Troubleshoot DNP3 server communications and P2P',
    ],
    guide: 'DNP3 + SEL RTAC',
  },
  {
    week: 3,
    category: 'C37.118 Client & Server Config',
    skills: [
      'Understand PMU comm parameters and populate RTAC channel',
      'Populate tags from vendor point maps',
      'Troubleshoot C37.118 communications and P2P',
    ],
    guide: 'SEL RTAC',
  },
  {
    week: 3,
    category: 'P2P Channel Configs (NGVL & MirroredBits)',
    skills: [
      'Understand NGVL comm parameters and populate RTAC channel',
      'Assign NGVL tags; troubleshoot NGVL comms and P2P',
      'Understand MirroredBits comm parameters',
      'Assign MirroredBits tags; troubleshoot comms and P2P',
    ],
    guide: 'SEL RTAC',
  },
  {
    week: 4,
    category: 'Program Creation from Scratch',
    skills: [
      'Understand ST, LD, and CFC languages',
      'Call function blocks, functions & variables to write programs',
      'Test programs for desired functionality',
    ],
    guide: 'IEC 61131-3 + SEL RTAC',
  },
  {
    week: 4,
    category: 'FB & FN Development from Scratch',
    skills: [
      'Determine when to write a Function Block',
      'Script FBs and call them in programs',
      'Test FBs for desired functionality',
      'Determine when to write a Function',
      'Script FNs and call them in programs; test FN functionality',
    ],
    guide: 'IEC 61131-3 + SEL RTAC',
  },
  {
    week: 4,
    category: 'FB/PRG Import/Export Integration',
    skills: [
      'Determine when to import/export settings in XML format',
      'Import/export settings and modify for project-specific needs',
      'Test the success of import/export tasks',
    ],
    guide: 'SEL RTAC',
  },
  {
    week: 5,
    category: 'Tag Processor Functions',
    skills: [
      'Use Tag Processor for data mapping, troubleshooting & verification',
      'Use Tag Processor for live data, troubleshooting & verification',
      'Use Tag Processor for SOE creation, troubleshooting & verification',
      'Use Tag Processor for data logging, troubleshooting & verification',
    ],
    guide: 'SEL RTAC',
  },
]

const SCADA_COLOR = '#fb923c'
const RTAC_COLOR = '#818cf8'

function SkillCategory({ item, color }) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: `${color}18`, color }}
          >
            Wk {item.week}
          </span>
          <h4 className="text-white text-xs font-bold leading-tight">{item.category}</h4>
        </div>
        {item.gap && (
          <span className="text-[10px] font-semibold text-amber-500 flex-shrink-0">⚠ Gap</span>
        )}
      </div>
      <ul className="space-y-1">
        {item.skills.map((s) => (
          <li key={s} className="flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: `${color}80` }} />
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10px] text-slate-600 font-medium">→ {item.guide}</p>
    </div>
  )
}

export default function SkillsRoadmap() {
  const [activeTrack, setActiveTrack] = useState('scada')

  const skills = activeTrack === 'scada' ? SCADA_SKILLS : RTAC_SKILLS
  const color = activeTrack === 'scada' ? SCADA_COLOR : RTAC_COLOR

  const weeks = [...new Set(skills.map((s) => s.week))].sort((a, b) => a - b)
  const gapCount = skills.filter((s) => s.gap).length

  return (
    <section className="py-24 px-6 bg-navy-800" id="skills-roadmap">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-3">
            Skills Breakdown
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Every skill.<br className="hidden sm:block" /> Mapped to a week.
            </h2>
            <p className="text-slate-500 text-sm max-w-xs sm:text-right">
              Pulled directly from the company skills matrices. ⚠ flags indicate content not yet in any existing guide.
            </p>
          </div>

          {/* Track toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTrack('scada')}
              className="text-xs font-semibold px-3 py-1.5 rounded transition-all duration-150"
              style={
                activeTrack === 'scada'
                  ? { background: `${SCADA_COLOR}18`, color: SCADA_COLOR, border: `1px solid ${SCADA_COLOR}40` }
                  : { background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.06)' }
              }
            >
              SCADA Operations
            </button>
            <button
              onClick={() => setActiveTrack('rtac')}
              className="text-xs font-semibold px-3 py-1.5 rounded transition-all duration-150"
              style={
                activeTrack === 'rtac'
                  ? { background: `${RTAC_COLOR}18`, color: RTAC_COLOR, border: `1px solid ${RTAC_COLOR}40` }
                  : { background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.06)' }
              }
            >
              RTAC Automation
            </button>
          </div>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          className="flex flex-wrap gap-x-8 gap-y-2 mb-8 pb-8 border-b text-sm"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>
            <strong className="text-white font-bold">{skills.length}</strong>{' '}
            <span className="text-slate-500">skill categories</span>
          </span>
          <span>
            <strong className="text-white font-bold">{skills.reduce((a, s) => a + s.skills.length, 0)}</strong>{' '}
            <span className="text-slate-500">individual competencies</span>
          </span>
          <span>
            <strong className="text-white font-bold">{weeks.length}</strong>{' '}
            <span className="text-slate-500">weeks to proficiency</span>
          </span>
          {gapCount > 0 && (
            <span>
              <strong className="text-amber-500 font-bold">{gapCount}</strong>{' '}
              <span className="text-slate-500">content gaps (guide in development)</span>
            </span>
          )}
        </motion.div>

        {/* Skills by week */}
        <div className="space-y-10">
          {weeks.map((week) => {
            const weekSkills = skills.filter((s) => s.week === week)
            return (
              <motion.div
                key={week}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4 }}
              >
                {/* Week divider */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="px-3 py-1 rounded font-black text-sm"
                    style={{ background: `${color}15`, color }}
                  >
                    Week {week}
                  </div>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                  <span className="text-xs text-slate-600">{weekSkills.length} categories</span>
                </div>

                {/* Categories grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {weekSkills.map((item) => (
                    <SkillCategory key={item.category} item={item} color={color} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
