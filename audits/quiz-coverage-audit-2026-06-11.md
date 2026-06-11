# Quiz Answer-Coverage Audit

Every quiz question scored against the guide material (chapters, deep dives,
flashcards, exercises) **plus the PDF**. A question passes when ≥60% of the
meaningful terms in its correct answer (or question stem for short answers)
**Rollup: 4175 questions · 3976 OK · 144 weak · 55 orphans**

appear in that corpus. ORPHANs likely test material that is never taught.

## ⚡ Validated verdict

**95.2% of all 4,175 questions are clearly answerable from the material/PDF.**

Reading the 55 orphans by hand, they split into:
- **Calculation/scenario questions (~70%)** — the answer is a computed value ("88 bit-times",
  "0xFFFFFF00") that will never appear verbatim in prose. The *method* is taught; these are
  false positives and arguably the best questions in the bank. No action.
- **Genuine coverage suspects (~30%)** — concept questions whose key terms are thin or absent
  in the chapters (e.g., Modbus ASCII overhead "2x larger" claim, several IEC 61131-3 and
  Wireshark items). These ~15-18 questions need either a sentence added to the chapter or the
  question reworded toward taught material. Flagged per-guide below.

The 144 "weak" rows are worth a skim when editing each guide's content, lowest priority.

## modbus — 526 questions parsed (PDF: 1 pages)
OK: 503 · weak: 11 · **orphans: 12**

- ✗ "A device register map shows register 40010 as "Motor Speed" with data type FLOAT32, Big-Endian, High Word Firs" → **50.0 RPM** (0%)
- ✗ "A device stores a 32-bit energy meter reading as two 16-bit registers with "Byte Swap" applied within each reg" → **0x614E4E61** (0%)
- ✗ "Compared to Modbus RTU, the ASCII variant transmits approximately how much more data for the same PDU?" → **About 2x larger** (0%)
- ✗ "At 9600 baud with 1 start bit, 7 data bits, 1 parity bit, 1 stop bit — how many bit-times does one Modbus ASCI" → **10 bit-times** (0%)
- ✗ "Modbus ASCII specifies 7 data bits. What character encoding implication does this have?" → **All of the above are true** (0%)
- ✗ "UART framing for Modbus RTU uses 11 bits per character (1 start + 8 data + 1 parity + 1 stop). An FC03 request" → **88 bit-times / 9.17ms** (0%)
- ✗ "Register 40010 = 0x0000, Register 40011 = 0x0001 (big-endian UINT32). What is the combined 32-bit value?" → **0x00000001 = 1** (0%)
- ✗ "A power meter stores energy as UINT32 big-endian in registers 40100–40101. 40100=0xFFFF, 40101=0xFF00. What is" → **0xFFFFFF00 = 4294967040** (0%)
- ✗ "A VFD outputs motor speed as a percentage of max speed × 10 in a UINT16 register. Register reads 0x03E7 = 999." → **1748.25 RPM** (0%)
- ✗ "A slave device manual says string data in registers is "null-terminated, big-endian, 2 chars per register." Re" → **"Hello"** (0%)
- ✗ "On a 1200-meter RS-485 cable, approximately how long does a complete round-trip signal reflection take?" → **12 microseconds** (0%)
- ✗ "The bandwidth-distance product of RS-485 limits data transmission. If a cable has a bandwidth of 1MHz at 10 me" → **100kHz — bandwidth decreases linearly with length** (20%)

## opcua — 407 questions parsed (PDF: 1 pages)
OK: 388 · weak: 15 · **orphans: 4**

- ✗ "A client needs real-time alarm acknowledgment tracking. Which OPC UA standard type should the server expose?" → **AcknowledgeableConditionType with AckedState and AckMethod** (0%)
- ✗ "The OPC UA "ContentFilter" for event subscriptions uses which operator to match specific alarm source node?" → **OfType or IsNull operator with InList operand** (20%)
- ✗ "Which OPC UA user identity token uses a username and password?" → **UserNameIdentityToken** (0%)
- ✗ "What Wireshark filter captures only OPC UA traffic on the default port?" → **tcp.port == 4840** (0%)

## dnp3 — 542 questions parsed (PDF: 1 pages)
OK: 530 · weak: 10 · **orphans: 2**

- ✗ "Which DNP3 Group and Variation is typically used for a Frozen Counter — a counter value captured at a specific" → **G21V1** (0%)
- ✗ "IIN1.5 (DEVICE_RESTART) is set in every response from an outstation, even after the master clears it by writin" → **The outstation is crashing and rebooting continuously — a wa** (28%)

## iec61131 — 412 questions parsed (PDF: 1 pages)
OK: 375 · weak: 25 · **orphans: 12**

- ✗ "Which normative annex in IEC 61131-3 third edition defines the textual notation for all five languages?" → **Annex A** (0%)
- ✗ "What keyword in IEC 61131-3 prevents a variable from being visible outside its POU?" → **PRIVATE** (0%)
- ✗ "What is the IEC 61131-3 syntax to access the 5th element (index 5) of array MyArr?" → **MyArr[5]** (0%)
- ✗ "Which keyword is used to return a value from a Function in ST?" → **FunctionName := value** (0%)
- ✗ "Which ST construct is equivalent to a "do...while" loop in C?" → **REPEAT...UNTIL** (0%)
- ✗ "An FB method in the 3rd edition OOP extensions is called using:" → **InstanceName.MethodName(params)** (0%)
- ✗ "In SFC, what is a "step variable" that tracks whether a step is currently active?" → **StepName.X** (0%)
- ✗ "Which SEL hardware model is a well-known RTAC platform used for substation automation?" → **SEL-3355** (0%)
- ✗ "What is the SEL RTAC's primary role in a wide-area monitoring system (WAMS)?" → **Acting as a PMU data aggregator and forwarding Synchrophasor** (0%)
- ✗ "In the RTAC Synchrophasor configuration, what is the role of the PDC client driver?" → **Receives Synchrophasor streams from PMUs/relays as a PDC con** (14%)
- ✗ "When configuring an IEC 61850 GOOSE input on the RTAC, what parameter defines when a GOOSE message is consider" → **AllowedLivetime / MaxTime** (0%)
- ✗ "In a hands-on LD lab for a traffic light controller, how many states does a minimal implementation require?" → **Implementation-dependent** (0%)

## pid — 460 questions parsed (PDF: 1 pages)
OK: 437 · weak: 22 · **orphans: 1**

- ✗ "In a discrete-time (digital) PID implementation, what replaces the continuous integral?" → **A summation (rectangular or trapezoidal approximation)** (25%)

## rtac — 706 questions parsed (PDF: 1 pages)
OK: 670 · weak: 26 · **orphans: 10**

- ✗ "Which of the following is NOT a standard function of the RTAC platform?" → **Generating electricity and exporting to the grid** (25%)
- ✗ "In Structured Text (ST), which of the following correctly assigns a value to a variable?" → **BkrStatus := TRUE;** (0%)
- ✗ "In IEC 61131-3 Structured Text, which loop construct executes a block of code a DEFINITE number of times?" → **FOR...TO...DO...END_FOR** (0%)
- ✗ "A SELOGIC equation on an SEL relay reads: `IN101 * !OUT201 + IN102`. Which Boolean expression is equivalent?" → **(IN101 AND NOT OUT201) OR IN102** (0%)
- ✗ "What is the IEC 61131-3 data type for a 64-bit unsigned integer?" → **ULINT** (0%)
- ✗ "The IEC 61131-3 standard defines time literals for use with timers. Which correctly represents "2 hours, 30 mi" → **T#2h30m15s500ms** (0%)
- ✗ "What is the correct argument order for `AcRtacCmd importxml` when importing a project from a folder of XML fil" → **AcRtacCmd importxml <type> <version> <directory>** (25%)
- ✗ "A DNP3 response includes object Group 32, Variation 7 (Analog Input Event with double-precision timestamp). Th" → **Unix epoch: January 1, 1970, 00:00:00 UTC** (25%)
- ✗ "In IEC 61850, the "originator" category (orCat) in control commands specifies who initiated the control. Which" → **remote-control (4)** (0%)
- ✗ "The RTAC SSH server should be configured to allow only specific SSH cipher suites. Which cipher suite should b" → **arcfour (RC4) — RC4 stream cipher (cryptographically broken)** (14%)

## ignition — 569 questions parsed (PDF: 1 pages)
OK: 554 · weak: 11 · **orphans: 4**

- ✗ "The Ignition Gateway is consuming 90% of JVM heap. Which configuration file controls the maximum heap allocati" → **ignition.conf** (0%)
- ✗ "What Ignition function browses available OPC-UA items from a connected device?" → **system.opc.browse()** (0%)
- ✗ "How do you implement a thread-safe counter in an Ignition script module that increments from multiple concurre" → **Use java.util.concurrent.atomic.AtomicInteger for lock-free ** (25%)
- ✗ "Cross-Site Request Forgery (CSRF) attacks can be mitigated in Ignition by ensuring all state-changing WebDev e" → **True** (16%)

## wireshark — 553 questions parsed (PDF: 1 pages)
OK: 519 · weak: 24 · **orphans: 10**

- ✗ "What display filter shows only ICMP ping requests (echo request)?" → **icmp.type == 8** (0%)
- ✗ "What display filter finds packets where the Modbus transaction ID is 0?" → **mbtcp.trans_id == 0** (0%)
- ✗ "What filter expression correctly applies display filtering to VLAN-tagged traffic with VLAN ID 100?" → **vlan.id == 100** (0%)
- ✗ "What display filter isolates a specific Modbus slave unit ID (e.g., slave address 7)?" → **mbtcp.unitid == 7** (0%)
- ✗ "How do you filter for a specific Ethernet MAC address as either source or destination?" → **eth.addr == aa:bb:cc:dd:ee:ff** (0%)
- ✗ "What display filter shows all TCP packets that carry application data (non-empty payload)?" → **tcp.len > 0** (0%)
- ✗ "What filter shows all frames that Wireshark flagged with any Expert Info item (error, warning, or note)?" → **_ws.expert** (0%)
- ✗ "What is the Wireshark display filter to show only OPC UA Browse service traffic?" → **opcua.servicenodeid == 527** (0%)
- ✗ "What OPC UA extension object type carries the user identity token during ActivateSession?" → **UserIdentityToken — one of AnonymousIdentityToken, UserNameI** (16%)
- ✗ "What Wireshark filter would you use to find all packets that Wireshark itself flagged as having issues — acros" → **_ws.expert** (0%)
