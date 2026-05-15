import React from 'react'
import { motion } from 'framer-motion'

const GUIDE_LINKS = [
  { name: 'Modbus', url: 'https://modbus-study-guide.vercel.app/' },
  { name: 'OPC UA', url: 'https://opcua-study-guide.vercel.app/' },
  { name: 'DNP3', url: 'https://dnp3-study-guide.vercel.app/' },
  { name: 'IEC 61131-3', url: 'https://iec61131-study-guide.vercel.app/' },
  { name: 'PID Controllers', url: 'https://pid-study-guide.vercel.app/' },
  { name: 'SEL RTAC', url: 'https://rtac-study-guide.vercel.app/' },
  { name: 'Ignition SCADA', url: 'https://ignition-study-guide.vercel.app/' },
  { name: 'Wireshark', url: 'https://wireshark-study-guide.vercel.app/' },
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
