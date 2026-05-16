import React from 'react'
import { motion } from 'framer-motion'

const isGH = import.meta.env.BASE_URL !== '/'
const guideUrl = (slug) => isGH
  ? `https://barbosaricardo.github.io/${slug}-study-guide/`
  : `https://${slug}-study-guide.vercel.app/`

const GUIDE_LINKS = [
  { name: 'Modbus', url: guideUrl('modbus') },
  { name: 'OPC UA', url: guideUrl('opcua') },
  { name: 'DNP3', url: guideUrl('dnp3') },
  { name: 'IEC 61131-3', url: guideUrl('iec61131') },
  { name: 'PID Controllers', url: guideUrl('pid') },
  { name: 'SEL RTAC', url: guideUrl('rtac') },
  { name: 'Ignition SCADA', url: guideUrl('ignition') },
  { name: 'Wireshark', url: guideUrl('wireshark') },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-800 border-t border-slate-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Guide links */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {GUIDE_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-150 font-medium"
            >
              {link.name}
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mx-auto mb-8" />

        {/* Attribution */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-slate-600 text-xs mt-1">
            SCADA Automation Engineer Training Program &copy; {year}
          </p>
          <p className="text-slate-700 text-xs mt-3 font-mono">
            &gt; if (!studying) { '{' } goto bed; { '}' }
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
