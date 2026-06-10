import React from 'react'
import { guideBaseUrl } from '../lib/guideUrl'

const GUIDE_LINKS = [
  { name: 'Modbus', url: guideBaseUrl('modbus') },
  { name: 'OPC UA', url: guideBaseUrl('opcua') },
  { name: 'DNP3', url: guideBaseUrl('dnp3') },
  { name: 'IEC 61131-3', url: guideBaseUrl('iec61131') },
  { name: 'PID Controllers', url: guideBaseUrl('pid') },
  { name: 'SEL RTAC', url: guideBaseUrl('rtac') },
  { name: 'Ignition SCADA', url: guideBaseUrl('ignition') },
  { name: 'Wireshark', url: guideBaseUrl('wireshark') },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Guide links */}
        <nav aria-label="Guides" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
          {GUIDE_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="readout hover:text-phosphor transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Attribution */}
        <div className="text-center">
          <p className="readout flex items-center justify-center gap-2">
            <span className="led" style={{ '--led-color': '#4ade80' }} aria-hidden="true" />
            SCADA AUTOMATION ENGINEER TRAINING PROGRAM © {year}
          </p>
          <p className="font-mono text-xs text-ink-faint mt-4">
            &gt; if (!studying) {'{'} goto bed; {'}'}
          </p>
        </div>
      </div>
    </footer>
  )
}
