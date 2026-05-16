# Modbus Study Guide — Sources Log

Authoritative references for each major topic in the Modbus protocol study guide.
All URLs verified as of May 2026.

---

## 1. Modbus Protocol Specification (RTU, ASCII, TCP)

### 1a. Modbus Application Protocol Specification V1.1b3
- **Author/Org:** Modbus Organization
- **Published:** April 26, 2012
- **URL:** https://www.modbus.org/file/secure/modbusprotocolspecification.pdf
- **Covers:** Full application-layer spec — all function codes (FC01–FC43), exception codes, PDU structure, data model, object types (coils, discrete inputs, holding/input registers). The definitive reference for everything above the physical layer.
- **Access:** Free (requires accepting a license agreement on modbus.org before downloading; direct PDF link bypasses this)

### 1b. Modbus over Serial Line Specification and Implementation Guide V1.02
- **Author/Org:** Modbus Organization (formerly Modbus-IDA)
- **Published:** December 20, 2006
- **URL:** https://www.modbus.org/file/secure/modbusoverserial.pdf
- **Covers:** RTU and ASCII transmission modes, framing, timing, LRC (ASCII) and CRC (RTU) error checking, multi-drop wiring topology, master/slave roles on RS-232 and RS-485.
- **Access:** Free (same license agreement as above)

### 1c. Modicon Modbus Protocol Reference Guide (PI-MBUS-300 Rev. J)
- **Author/Org:** Modicon, Inc. (now Schneider Electric)
- **Published:** June 1996
- **URL:** http://web.eecs.umich.edu/~modbus/documents/PI_MBUS_300.pdf
- **Covers:** Original Modbus specification as published by the protocol's inventor. Authoritative source for CRC-16 algorithm (Appendix B), function codes FC01–FC16, and the original register map model. Important for historical context and CRC derivation.
- **Access:** Free (hosted publicly; original Modicon document)

---

## 2. RS-485 Electrical Standard

### 2a. ANSI/TIA-485-A — Electrical Characteristics of Generators and Receivers for Use in Balanced Digital Multipoint Systems
- **Author/Org:** Telecommunications Industry Association (TIA) / ANSI
- **Published:** March 1998 (reaffirmed December 7, 2012)
- **Document ID:** ANSI/TIA/EIA-485-A-1998
- **Purchase URL:** https://store.accuristech.com/standards/tia-ansi-tia-eia-485-a?product_id=2592098
- **Covers:** Electrical characteristics of RS-485 differential drivers and receivers, voltage thresholds, driver output impedance, fail-safe biasing, maximum bus load (32 unit loads), maximum cable length vs. baud rate. Governs the physical layer used by Modbus RTU.
- **Access:** Purchase required (~$82–$100 USD)

### 2b. RS-485 — Wikipedia / Analog Devices Technical Article (Free Reference)
- **Author/Org:** Analog Devices (formerly Maxim Integrated)
- **URL:** https://www.analog.com/en/resources/technical-articles/rs485-eiatia485-differential-data-transmission-system-basics.html
- **Covers:** Practical summary of EIA/TIA-485 electrical characteristics, differential signaling, bus termination, and multi-drop topology. Suitable for study guide explanatory content without purchase of the formal standard.
- **Access:** Free

---

## 3. CRC-16 Polynomial Used in Modbus RTU

### 3a. Modbus Application Protocol Specification V1.1b3 (Section 2.6 / Appendix)
- **Author/Org:** Modbus Organization
- **URL:** https://www.modbus.org/file/secure/modbusprotocolspecification.pdf
- **Covers:** CRC-16 algorithm definition: polynomial x¹⁶ + x¹⁵ + x² + 1 (0x8005), reflected as 0xA001 for LSB-first computation, initial value 0xFFFF, no final XOR, low byte transmitted first. Includes both the algorithmic description and a lookup-table implementation.
- **Access:** Free

### 3b. Modicon Modbus Protocol Reference Guide (PI-MBUS-300 Rev. J) — Appendix B
- **Author/Org:** Modicon, Inc.
- **URL:** http://web.eecs.umich.edu/~modbus/documents/PI_MBUS_300.pdf
- **Covers:** Original CRC-16 specification and example code as defined by the protocol's inventor. Cross-reference for CRC parameters: poly 0x8005, init 0xFFFF, reflected I/O, XOR-out 0x0000.
- **Access:** Free

---

## 4. MBAP Header / Modbus TCP Specification

### 4a. MODBUS Messaging on TCP/IP Implementation Guide V1.0b
- **Author/Org:** Modbus Organization
- **URL:** https://www.modbus.org/file/secure/messagingimplementationguide.pdf
- **Covers:** Full Modbus TCP specification — MBAP header fields (Transaction ID, Protocol ID, Length, Unit ID), port 502 assignment, connection management, and how the 7-byte header replaces the RTU address and CRC. The definitive TCP/IP layer reference.
- **Access:** Free

### 4b. IANA Service Name and Transport Protocol Port Number Registry — Port 502
- **Author/Org:** Internet Assigned Numbers Authority (IANA)
- **URL:** https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=modbus
- **Covers:** Official IANA registration of TCP/UDP port 502 under service name "mbap" (Modbus Application Protocol). Also registers port 802 for Modbus/TCP Security (MBAPS). Authoritative confirmation of port assignments.
- **Access:** Free

---

## 5. Function Codes FC01–FC16, FC08, FC43

### Primary Reference: Modbus Application Protocol Specification V1.1b3
- **Author/Org:** Modbus Organization
- **URL:** https://www.modbus.org/file/secure/modbusprotocolspecification.pdf
- **Covers:**
  - FC01 (Read Coils), FC02 (Read Discrete Inputs), FC03 (Read Holding Registers), FC04 (Read Input Registers) — Section 6.1–6.4
  - FC05 (Write Single Coil), FC06 (Write Single Register) — Section 6.5–6.6
  - FC08 (Diagnostics) — Section 6.8; defines all sub-function codes (00–18, 20) for loopback tests, counter reads, and bus diagnostic utilities
  - FC15 (Write Multiple Coils), FC16 (Write Multiple Registers) — Section 6.11–6.12
  - FC43 (Read Device Identification / MEI Transport) — Section 6.21; defines object codes 00–FF for device identification strings
- **Access:** Free

---

## 6. Exception Codes 01–11 (Including Gateway Codes 10–11)

### Primary Reference: Modbus Application Protocol Specification V1.1b3 — Section 7
- **Author/Org:** Modbus Organization
- **URL:** https://www.modbus.org/file/secure/modbusprotocolspecification.pdf
- **Covers:** All defined exception codes:
  - 01 (Illegal Function), 02 (Illegal Data Address), 03 (Illegal Data Value), 04 (Server Device Failure)
  - 05 (Acknowledge), 06 (Server Device Busy), 08 (Memory Parity Error)
  - 0A/10 (Gateway Path Unavailable), 0B/11 (Gateway Target Device Failed to Respond)
  - Full description of how exception responses are framed (function code + 0x80, exception code byte)
- **Access:** Free

---

## 7. IEEE 754 Floating Point (for Data Type Encoding)

### 7a. IEEE 754-2019 — IEEE Standard for Floating-Point Arithmetic
- **Author/Org:** IEEE Standards Association
- **Published:** July 22, 2019 (approved June 13, 2019)
- **Document ID:** IEEE Std 754-2019 (ANSI/IEEE Std 754-2019)
- **IEEE SA URL:** https://standards.ieee.org/standard/754-2019.html
- **IEEE Xplore URL:** https://ieeexplore.ieee.org/document/8766229
- **Covers:** Binary32 (single precision) and Binary64 (double precision) formats, sign/exponent/mantissa layout, NaN and infinity encoding, rounding modes. Binary32 is the format used in Modbus register pairs for 32-bit float values.
- **Access:** Purchase required (~$60–$100 USD via IEEE Xplore). The 1985 edition is informally available via academic mirrors.

### 7b. IEEE 754 — Wikipedia (Free Reference Summary)
- **URL:** https://en.wikipedia.org/wiki/IEEE_754
- **Covers:** Detailed explanation of binary32/64 formats, bit layout diagrams, example encodings, and history. Suitable for study guide explanatory content.
- **Access:** Free

---

## 8. NERC CIP-005, CIP-007, CIP-010, CIP-013 (Security Chapter)

All NERC reliability standards are freely available as PDFs directly from nerc.com.

### 8a. CIP-005-7 — Cyber Security: Electronic Security Perimeter(s)
- **Author/Org:** North American Electric Reliability Corporation (NERC)
- **URL:** https://www.nerc.com/globalassets/standards/reliability-standards/cip/cip-005-7.pdf
- **Standards page:** https://www.nerc.com/standards/reliability-standards/cip/cip-005-7
- **Covers:** Requirements for defining and protecting Electronic Security Perimeters (ESPs), Interactive Remote Access (IRA) controls, and intermediary devices. Directly relevant to Modbus TCP exposure on OT networks.
- **Access:** Free

### 8b. CIP-007-6 — Cyber Security: Systems Security Management
- **Author/Org:** NERC
- **URL:** https://www.nerc.com/globalassets/standards/reliability-standards/cip/cip-007-6.pdf
- **Standards page:** https://www.nerc.com/standards/reliability-standards/cip/cip-007-6
- **Covers:** Port and service management (disable unused TCP/UDP ports including unneeded Modbus port 502 exposure), security patch management, malicious code prevention, and system access control for BES Cyber Systems.
- **Access:** Free

### 8c. CIP-010-5 — Cyber Security: Configuration Change Management and Vulnerability Assessments
- **Author/Org:** NERC
- **URL:** https://www.nerc.com/globalassets/standards/reliability-standards/cip/cip-010-5.pdf
- **Covers:** Baseline configuration documentation, change management processes, vulnerability assessments, and active vulnerability scanning. Relevant to maintaining Modbus device firmware baselines.
- **Access:** Free

### 8d. CIP-013-1 — Cyber Security: Supply Chain Risk Management
- **Author/Org:** NERC
- **URL:** https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-013-1.pdf
- **Standards page:** https://www.nerc.com/standards/reliability-standards/cip/cip-013-3
- **Covers:** Supply chain risk management plans for vendor software, hardware, and services for medium and high-impact BES assets. Relevant to Modbus RTU/TCP device procurement security.
- **Access:** Free

### 8e. NERC CIP Standards Index (Overview)
- **Author/Org:** NERC
- **URL:** https://www.nerc.com/standards/reliability-standards/cip
- **Covers:** Landing page for all active CIP standards with links to current approved versions. Use as the canonical index to confirm current version numbers.
- **Access:** Free

---

## 9. Modbus Security / TLS Extension

### 9a. MODBUS/TCP Security Protocol Specification (MB-TCP-Security-v36)
- **Author/Org:** Modbus Organization
- **Published:** July 30, 2021 (v3.6)
- **URL:** https://assets.noviams.com/novi-file-uploads/modbus/pdfs-and-documents/MB-TCP-Security-v36_2021-07-30.pdf
- **Modbus Specifications page:** https://www.modbus.org/modbus-specifications
- **Covers:** Modbus/TCP Security (MBAPS) using TLS 1.2 (RFC 5246) to encapsulate standard Modbus PDUs; X.509v3 certificate-based authentication; role-based authorization extension in certificates; IANA-assigned port 802; differences from standard port 502 MBAP.
- **Access:** Free

---

## 10. IEC 61158 (Modbus as Fieldbus Standard)

### 10a. IEC 61158 Series — Industrial Communication Networks: Fieldbus Specifications
- **Author/Org:** International Electrotechnical Commission (IEC)
- **Document ID:** IEC 61158 (multiple parts; Modbus defined in Communication Profile Family 15)
- **IEC Webstore:** https://webstore.iec.ch/publication/63420 (IEC 61158-1 overview — search "61158" on webstore.iec.ch)
- **Covers:** Modbus is specified as CPF 15 (MODBUS-RTPS and MODBUS-TCP legacy profile) within the IEC 61158/61784 framework. Defines application layer service definition and protocol specification as an international fieldbus standard. Current edition (2019+) covers 26 protocol types.
- **Access:** Purchase required (IEC standards typically CHF 200–400 per part)

### 10b. IEC 61784-2 — Industrial Communication Networks: Profiles (Real-Time Ethernet)
- **Author/Org:** IEC
- **Covers:** MODBUS-TCP is included as a Communication Profile Family under the real-time Ethernet (RTE) profiles. This is the companion to IEC 61158 that maps Modbus to specific communication profiles.
- **Access:** Purchase required

### 10c. "IEC 61158: The Fieldbus Standard. Its Influence and Present Status" (IEEE Xplore)
- **Author/Org:** IEC / Published in IET Conference Proceedings; indexed by IEEE Xplore
- **URL:** https://ieeexplore.ieee.org/document/705761
- **Covers:** Technical overview of the IEC 61158 standard structure, history, and how Modbus fits within it. Useful free reference for study guide context on the international standardization of Modbus.
- **Access:** Free abstract; full paper may require IEEE membership or purchase

---

## Quick Reference Table

| # | Topic | Primary Source | URL | Free? |
|---|-------|---------------|-----|-------|
| 1a | Modbus App Protocol (FC, exceptions, data model) | Modbus Org — App Protocol Spec V1.1b3 | https://www.modbus.org/file/secure/modbusprotocolspecification.pdf | Yes |
| 1b | Modbus RTU/ASCII framing | Modbus Org — Serial Line Spec V1.02 | https://www.modbus.org/file/secure/modbusoverserial.pdf | Yes |
| 1c | Original Modbus spec + CRC | Modicon PI-MBUS-300 Rev. J (1996) | http://web.eecs.umich.edu/~modbus/documents/PI_MBUS_300.pdf | Yes |
| 2 | RS-485 electrical standard | ANSI/TIA-485-A-1998 | https://store.accuristech.com/standards/tia-ansi-tia-eia-485-a | Purchase |
| 3 | CRC-16 polynomial | App Protocol Spec V1.1b3 + PI-MBUS-300 | (same as 1a + 1c) | Yes |
| 4a | MBAP header / Modbus TCP | Modbus Org — Messaging on TCP/IP V1.0b | https://www.modbus.org/file/secure/messagingimplementationguide.pdf | Yes |
| 4b | Port 502/802 IANA registration | IANA Port Registry | https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=modbus | Yes |
| 5-6 | FC01–FC16, FC08, FC43, Exception codes 01–11 | App Protocol Spec V1.1b3 (Sections 6–7) | https://www.modbus.org/file/secure/modbusprotocolspecification.pdf | Yes |
| 7 | IEEE 754 floating point | IEEE 754-2019 | https://ieeexplore.ieee.org/document/8766229 | Purchase |
| 8a | NERC CIP-005-7 (ESP) | NERC | https://www.nerc.com/globalassets/standards/reliability-standards/cip/cip-005-7.pdf | Yes |
| 8b | NERC CIP-007-6 (ports/services) | NERC | https://www.nerc.com/globalassets/standards/reliability-standards/cip/cip-007-6.pdf | Yes |
| 8c | NERC CIP-010-5 (config mgmt) | NERC | https://www.nerc.com/globalassets/standards/reliability-standards/cip/cip-010-5.pdf | Yes |
| 8d | NERC CIP-013-1 (supply chain) | NERC | https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-013-1.pdf | Yes |
| 9 | Modbus Security / TLS (MBAPS) | Modbus Org — MB-TCP-Security-v36 | https://assets.noviams.com/novi-file-uploads/modbus/pdfs-and-documents/MB-TCP-Security-v36_2021-07-30.pdf | Yes |
| 10 | IEC 61158 / Modbus as fieldbus | IEC 61158 series (CPF 15) | https://webstore.iec.ch (search 61158) | Purchase |

---

*Note on IEC and IEEE standards: These are formal international standards sold through standards bodies. For study guide purposes, freely available references (Wikipedia summaries, conference papers, manufacturer technical articles) can supplement purchased standards for explanatory content. The purchased standards are the authoritative normative references.*
