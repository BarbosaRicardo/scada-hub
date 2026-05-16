// One-time seed: populate training_events with verified 2026 data.
// Run: node scripts/seed-training.js
// Requires SUPABASE_URL and SUPABASE_SERVICE_KEY in environment (or .env.local).

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
)

const events = [
  // ── MODBUS ──────────────────────────────────────────────────────────────────
  { course: 'modbus', provider: 'Learni Group', title: 'Mastering the Modbus Protocol for Industrial Automation', format: 'in-person', start_date: '2026-07-01', end_date: '2026-07-31', url: 'https://learni-group.com/en/training/training-mastering-modbus-protocol-industrial-automation-g8hy1z', is_cert: false, cert_name: null },
  { course: 'modbus', provider: 'PLC Dojo', title: 'Mastering Modbus TCP/IP Network Communication', format: 'self-paced', start_date: null, end_date: null, url: 'https://www.plcdojo.com/courses/mastering-modbus-tcp-ip-network-communication', is_cert: false, cert_name: null },
  { course: 'modbus', provider: 'Udemy', title: 'Mastering Modbus RS485 Network Communication', format: 'self-paced', start_date: null, end_date: null, url: 'https://www.udemy.com/course/mastering-modbus-rs485-network-communication/', is_cert: false, cert_name: null },

  // ── OPC UA ───────────────────────────────────────────────────────────────────
  { course: 'opcua', provider: 'OPC Training Institute', title: 'Remote Training Level 3: OPC Unified Architecture', format: 'online', start_date: null, end_date: null, url: 'https://www.opcti.com/remote-training-opc-ua.aspx', is_cert: false, cert_name: null },
  { course: 'opcua', provider: 'OPC Foundation', title: 'OPC Interoperability Workshop — North America (Calgary)', format: 'in-person', start_date: '2026-03-16', end_date: '2026-03-18', url: 'https://opcfoundation.org/event-detail/opc-interoperability-workshop-2026-north-america/', is_cert: false, cert_name: null },
  { course: 'opcua', provider: 'OPC Foundation', title: 'OPC Interoperability Workshop — Europe', format: 'in-person', start_date: '2026-09-28', end_date: '2026-10-02', url: 'https://opcfoundation.org/event-detail/opc-interoperability-workshop-2026-europe/', is_cert: false, cert_name: null },
  { course: 'opcua', provider: 'Unified Automation', title: 'OPC UA Introduction Seminar and Developer Workshop', format: 'hybrid', start_date: null, end_date: null, url: 'https://www.unified-automation.com/services/training/schedule-locations.html', is_cert: false, cert_name: null },

  // ── DNP3 ─────────────────────────────────────────────────────────────────────
  { course: 'dnp3', provider: 'DISTRIBUTECH 2026', title: 'Introduction to IEEE 1815 (DNP3)', format: 'in-person', start_date: '2026-02-03', end_date: '2026-02-03', url: 'https://www.distributech.com/2026-event-schedule/introduction-to-ieee-1815-dnp3', is_cert: false, cert_name: null },
  { course: 'dnp3', provider: 'DISTRIBUTECH 2026', title: 'IEEE 1815 (DNP3) Advanced Topics', format: 'in-person', start_date: '2026-02-03', end_date: '2026-02-03', url: 'https://www.distributech.com/2026-event-schedule/ieee-1815-dnp3-advanced-topics', is_cert: false, cert_name: null },
  { course: 'dnp3', provider: 'EPIC Training', title: 'DNP3 Protocol for SCADA Systems', format: 'online', start_date: '2026-12-09', end_date: '2026-12-09', url: 'https://www.epictraining.ca/online-courses/electrical-engineering/dnp3-protocol-for-scada-systems/22699/', is_cert: false, cert_name: null },
  { course: 'dnp3', provider: 'SEL University', title: 'eCOM 205: Introduction to DNP3 Protocol and Troubleshooting', format: 'self-paced', start_date: null, end_date: null, url: 'https://selinc.com/selu/courses/ecom/205/', is_cert: false, cert_name: null },

  // ── IEC 61131-3 ───────────────────────────────────────────────────────────────
  { course: 'iec61131', provider: 'CODESYS Group', title: 'CODESYS V3 Essentials Training — Live Online', format: 'online', start_date: null, end_date: null, url: 'https://www.codesys.com/ecosystem/services/academy-training/training/v3-essentials-usa/', is_cert: false, cert_name: null },
  { course: 'iec61131', provider: 'CODESYS Group', title: 'CODESYS Basic Training Course (PLCopen certified, 47 modules)', format: 'self-paced', start_date: null, end_date: null, url: 'https://us.store.codesys.com/elearning-codesys-v3.html', is_cert: false, cert_name: null },
  { course: 'iec61131', provider: 'RealPars', title: 'IEC 61131 Programming Using LAD, ST, and FB', format: 'self-paced', start_date: null, end_date: null, url: 'https://www.realpars.com/courses/iec-61131-programming-using-lad-st-and-fb', is_cert: false, cert_name: null },
  { course: 'iec61131', provider: 'ISA', title: 'ISA CAP — Certified Automation Professional', format: 'self-paced', start_date: null, end_date: null, url: 'https://programs.isa.org/isa-certification', is_cert: true, cert_name: 'CAP' },

  // ── PID CONTROLLERS ───────────────────────────────────────────────────────────
  { course: 'pid', provider: 'Control Station', title: 'Process Control & PID Tuning Workshop (June)', format: 'online', start_date: '2026-06-02', end_date: '2026-06-05', url: 'https://controlstation.com/process-control-and-pid-tuning-training/#june', is_cert: false, cert_name: null },
  { course: 'pid', provider: 'Control Station', title: 'Process Control & PID Tuning Workshop (September)', format: 'online', start_date: '2026-09-01', end_date: '2026-09-04', url: 'https://controlstation.com/process-control-and-pid-tuning-training/#sep', is_cert: false, cert_name: null },
  { course: 'pid', provider: 'Control Station', title: 'Non-Steady-State Modeling for PID Tuning (Webinar)', format: 'online', start_date: '2026-10-20', end_date: '2026-10-20', url: 'https://controlstation.com/events/2026-10-20/', is_cert: false, cert_name: null },
  { course: 'pid', provider: 'PiControl Solutions', title: 'PID100: PID Tuning Certification & Primary Process Control', format: 'hybrid', start_date: null, end_date: null, url: 'https://www.picontrolsolutions.com/live-training-pid-tuning-training-and-certification-course-houston/', is_cert: false, cert_name: null },
  { course: 'pid', provider: 'ISA', title: 'ISA CCST — Certified Control Systems Technician', format: 'self-paced', start_date: null, end_date: null, url: 'https://www.isa.org/certification/ccst', is_cert: true, cert_name: 'CCST' },

  // ── SEL RTAC ─────────────────────────────────────────────────────────────────
  { course: 'rtac', provider: 'SEL University', title: 'APP RTAC: SEL Real-Time Automation Controller', format: 'in-person', start_date: null, end_date: null, url: 'https://selinc.com/selu/courses/app/rtac/', is_cert: false, cert_name: null },
  { course: 'rtac', provider: 'SEL University', title: 'APP RTAC ADV-1: Introduction to IEC 61131 in the RTAC', format: 'in-person', start_date: null, end_date: null, url: 'https://selinc.com/selu/courses/app/rtacadv1/', is_cert: false, cert_name: null },
  { course: 'rtac', provider: 'SEL University', title: 'eAPP 3530: SEL-3530 RTAC (Online, ~24 hours)', format: 'online', start_date: null, end_date: null, url: 'https://selinc.com/selu/courses/eapp/3530/', is_cert: false, cert_name: null },

  // ── IGNITION SCADA ────────────────────────────────────────────────────────────
  { course: 'ignition', provider: 'Inductive Automation', title: 'Ignition Core Training (Perspective Version)', format: 'in-person', start_date: '2026-06-01', end_date: '2026-06-05', url: 'https://inductiveautomation.com/training/course/details/1990', is_cert: false, cert_name: null },
  { course: 'ignition', provider: 'Inductive Automation', title: 'Ignition Community Conference (ICC) 2026', format: 'in-person', start_date: '2026-09-22', end_date: '2026-09-24', url: 'https://icc.inductiveautomation.com/', is_cert: false, cert_name: null },
  { course: 'ignition', provider: 'Inductive University', title: 'Ignition Full Self-Paced Course Library (Free)', format: 'self-paced', start_date: null, end_date: null, url: 'https://inductiveuniversity.com/', is_cert: false, cert_name: null },
  { course: 'ignition', provider: 'Inductive Automation', title: 'Ignition Core Certification', format: 'self-paced', start_date: null, end_date: null, url: 'https://inductiveautomation.com/training/certification-tests#core', is_cert: true, cert_name: 'Ignition Core' },
  { course: 'ignition', provider: 'Inductive Automation', title: 'Ignition Gold Certification (requires Core)', format: 'self-paced', start_date: null, end_date: null, url: 'https://inductiveautomation.com/training/certification-tests#gold', is_cert: true, cert_name: 'Ignition Gold' },

  // ── WIRESHARK ─────────────────────────────────────────────────────────────────
  { course: 'wireshark', provider: 'Wireshark Foundation', title: 'SharkFest US 2026 (Nashville, TN)', format: 'in-person', start_date: '2026-07-18', end_date: '2026-07-23', url: 'https://sharkfest.wireshark.org/sfus/', is_cert: false, cert_name: null },
  { course: 'wireshark', provider: 'SANS Institute', title: 'ICS515: ICS Visibility, Detection, and Response (SANS ICS Summit)', format: 'in-person', start_date: '2026-06-08', end_date: '2026-06-16', url: 'https://www.sans.org/cyber-security-training-events/ics-security-summit-2026', is_cert: false, cert_name: null },
  { course: 'wireshark', provider: 'Packet Pioneer', title: 'Wireshark Certified Analyst (WCA) — Complete Hands-On Course', format: 'self-paced', start_date: null, end_date: null, url: 'https://packetpioneer.com/courses/wca/', is_cert: false, cert_name: null },
  { course: 'wireshark', provider: 'CBT Nuggets', title: 'WCA-101 Wireshark Certified Analyst', format: 'self-paced', start_date: null, end_date: null, url: 'https://www.cbtnuggets.com/it-training/networking/wca-101', is_cert: false, cert_name: null },
  { course: 'wireshark', provider: 'Wireshark Foundation', title: 'WCA-101 Wireshark Certified Analyst Exam', format: 'self-paced', start_date: null, end_date: null, url: 'https://www.wireshark.org/certifications/', is_cert: true, cert_name: 'WCA-101' },
  { course: 'wireshark', provider: 'GIAC / SANS', title: 'GICSP — Global Industrial Cyber Security Professional', format: 'self-paced', start_date: null, end_date: null, url: 'https://www.giac.org/certifications/global-industrial-cyber-security-professional-gicsp', is_cert: true, cert_name: 'GICSP' },
]

const { data, error } = await supabase
  .from('training_events')
  .upsert(events, { onConflict: 'url' })

if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${events.length} training events.`)
