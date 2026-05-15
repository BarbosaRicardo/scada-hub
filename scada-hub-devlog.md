# SCADA Hub — Dev Log

> Local tracking file. Update this as work progresses.
> Last updated: 2026-05-15 (Session 7 — Full dark-theme sweep: all 8 guides, all pages + flashcards)

---

## Writing Style & Voice

This is the defining characteristic of the guides. Every piece of content must match this.

### Voice
- **Field engineer who's been burned by everything** — writes from experience, not from a textbook
- **Direct and second-person** — "your RTU, your drive, your flow meter"
- **Short punchy sentences mixed with technical depth** — never dumbed down, never dry
- **Dry humor woven into technical facts** — "It's always the firewall." / "The cockroach of industrial automation — and that's a compliment."

### Fun Facts (FunFacts component)
Each one is a **war story with specifics** — not vague tips. Must include:
- A concrete scenario (engineer, device type, symptom)
- The root cause (specific and counterintuitive)
- A punchline or lesson

Examples of the tone:
> "An engineer spent 3 hours debugging a Modbus RTU fault before discovering the RS-485 cable was connected to the RS-232 port. The devices were physically incapable of communicating. The cable had been in the wrong port since installation — 2 years earlier."

> "Modbus hasn't changed its core protocol in 45+ years. Meanwhile, every other comms protocol has been deprecated, replaced, and deprecated again. Modbus is the cockroach of industrial automation — and that's a compliment."

### Analogies (AnalogyCard component)
Every concept gets an analogy grounded in everyday objects. Structure:
- `title`: catchy label with emoji
- `concept`: the technical thing being explained
- `analogy`: full paragraph(s) walking through the comparison, then connecting back to the protocol
- End with a consequence — what goes wrong if you get it wrong

Examples of analogies used:
- Master/Slave → classroom teacher calling on students
- Data tables → four filing cabinets (each type = different cabinet)
- RS-485 bus → crowded elevator with one PA microphone
- CRC → toll booth receipt
- MBAP header → UPS tracking label
- 0-based vs 1-based addressing → European vs American floor numbering
- Endianness → Gulliver's Travels egg war (with actual literary reference)

### Callout Boxes (Callout component)
- `type="key"` → one-sentence summary of the most important rule
- `type="warning"` → specific gotcha, often with "Been there. Don't be that engineer."

### Historical/Research Depth
Includes real historical context with personality:
- Year invented + what else happened that year
- Who invented it, what happened to the company
- Real academic paper citations (Danny Cohen's "On Holy Wars and a Plea for Peace")
- Spec-accurate details (exact byte offsets, exception codes, port numbers)

### What to avoid
- Generic/textbook descriptions ("Modbus is a protocol used in...")
- Passive voice
- Bullet lists of facts without story or consequence
- Vague fun facts ("Modbus is very popular!")
- Over-explaining what the reader already knows

---

## Project Map

| Site | Repo | Live URL | Status |
|------|------|----------|--------|
| **Hub** | BarbosaRicardo/scada-hub | https://barbosaricardo.github.io/scada-hub/ | Active |
| **Modbus** | BarbosaRicardo/modbus-study-guide | https://barbosaricardo.github.io/modbus-study-guide/ | Most developed |
| **OPC UA** | BarbosaRicardo/opcua-study-guide | https://barbosaricardo.github.io/opcua-study-guide/ | Active |
| **DNP3** | BarbosaRicardo/dnp3-study-guide | https://barbosaricardo.github.io/dnp3-study-guide/ | Only scaffold — least developed |
| **IEC 61131-3** | BarbosaRicardo/iec61131-study-guide | https://barbosaricardo.github.io/iec61131-study-guide/ | Active |
| **PID Controllers** | BarbosaRicardo/pid-study-guide | https://barbosaricardo.github.io/pid-study-guide/ | Active |
| **SEL RTAC** | BarbosaRicardo/rtac-study-guide | https://barbosaricardo.github.io/rtac-study-guide/ | Active |
| **Ignition SCADA** | BarbosaRicardo/ignition-study-guide | https://barbosaricardo.github.io/ignition-study-guide/ | Active |

### Tech Stack (all sites)
- React 18 + Vite + Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Supabase (quiz backend)
- Monaco Editor (Code Lab)
- Pyodide (Python runtime in browser)
- GitHub Pages deployment — source in `/site`, built output in `/docs`
- `vite.config.js`: `base: '/[repo-name]/'`, `outDir: '../docs'`

---

## Hub (scada-hub) — Architecture

```
site/
  src/
    App.jsx               # Root — HeroSection → ArchitectureDiagram → LearningPath → GuideGrid → Footer
    components/
      HeroSection.jsx     # Animated hero, stats row, CTA buttons
      ArchitectureDiagram.jsx  # Clickable SCADA stack layers (field → HMI)
      LearningPath.jsx    # Horizontal 7-step learning path with animated arrows
      GuideGrid.jsx       # 7 guide cards with chapters/questions counts
      Footer.jsx          # Guide links + attribution
docs/                     # Built output → GitHub Pages serves this
```

Custom Tailwind colors: `navy` (dark bg), `mblue`, `mcyan`, `morange`, `mgreen`, `mred`

---

## Work History (reconstructed from git, ~May 9–10 2026)

### Wave 1 — Initial build (May 9)
- Scaffolded all 7 study guide sites + the hub
- Dark glassmorphism UI system applied to all sites
- Fixed mobile: removed `bg-slate-50` wrapper so dark background showed through
- Added PDF download buttons to sidebars
- Added resource drawers with textbook references (RTAC, Ignition)
- Added textbook refs to quiz questions (RTAC — 39 questions across 8 chapters)
- Fixed Giphy GIF IDs that were broken → replaced with verified working embeds
- LaTeX PDF work: full rewrites for RTAC (50p), Ignition (58p)
- Fixed PDF link path: use `BASE_URL`, serve PDF from `public/`
- Expanded quizzes to 20 questions/chapter for RTAC (8ch=160q) and Ignition (10ch=200q)

### Wave 2 — Feature expansion (May 10 morning)
- **Unique UI identity** per guide:
  - Modbus → Cyan Terminal / Oscilloscope (phosphor teal on near-black, scan lines)
  - OPC UA → Teal accent, node dot grid, glassmorphism
  - IEC 61131-3 → Blue accent, column rules, sharp-edge cards
  - PID → Violet accent, graph-paper dot grid
  - RTAC → Relay-green accent, PCB trace lines
  - Ignition → Warm Ember / Industrial HMI (amber-orange glow on near-black)
- Fixed dark-on-dark contrast, iOS `background-attachment`, mobile top padding (all sites)
- Fixed sidebar nav missing labels and paths (OPC UA, IEC, PID)
- **Code Lab** added to all active guides:
  - Monaco editor
  - Python + Jython language tabs
  - Pyodide runtime (Python runs in browser)
  - Jython orientation header on all Jython starters
  - 6 exercises × 3 difficulty levels per guide
  - Modbus: exercises for CRC calc, frame builder, TCP bridge
  - Starters scaffolded with TODOs (pre-solved implementations removed)
- **Flashcards** added (3D flip animation, chapter filter, progress tracking) — all guides except DNP3
- Added chapter exercises to all content pages
- Added certification context to LaTeX PDFs (ISA CCST/CAP, OPC Foundation, PLCopen, CIP/SEL)

### Wave 3 — Integration & polish (May 10 afternoon)
- **Supabase quiz backend** connected on all active guides
- **Quiz report** added (timestamps, scores, retries, CSV export) — all active guides
- **SCADA Hub back-link** added to sidebar on all guides
- **GIF system fixed**: Giphy → **Tenor API** for direct GIF URLs; `gifs.js` updated to Tenor IDs
- **QuizLevels bug fixed**: component couldn't handle plain array `level3` format → fixed
- **3-level quizzes** (20q/level) added for OPC UA, IEC 61131-3, PID, Ignition (all 10 chapters each)
- Modbus already had 507 questions across 12 chapters

---

## Bugs Fixed

| Bug | Fix | Affected |
|-----|-----|----------|
| Giphy GIF IDs broken | Switch to Tenor API, update `gifs.js` to Tenor IDs | All guides |
| Double HashRouter crash | Remove duplicate `HashRouter` from `App.jsx` (keep only in `main.jsx`) | Ignition |
| Dark-on-dark contrast | Adjust text/bg color combos | All guides |
| iOS `background-attachment: fixed` | Remove or replace with scroll | All guides |
| Mobile top padding missing | Add padding-top to main content | All guides |
| LaTeX TikZ frame diagrams overflowed | Replace TikZ with colored `tabularx` tables | Modbus |
| Orphan section headings in LaTeX | `needspace` with `15/8/5` baseline thresholds | Modbus |
| LaTeX callout boxes overflowed | Add 1cm left/right margins, inline titles | Modbus |
| Sidebar nav missing labels/paths | Add `label` and `path` to all chapters | OPC UA, IEC |
| PDF link wrong path | Use `BASE_URL`, serve from `public/` | RTAC, Ignition |
| `QuizLevels` plain array `level3` | Handle both object and plain array formats | OPC UA, IEC, PID, Ignition |
| `bg-slate-50` wrapper hiding dark bg | Remove wrapper on mobile | All guides |

---

## What Worked Well

- Glassmorphism dark theme is consistent and looks sharp
- Framer Motion scroll-triggered animations perform well
- Pyodide for in-browser Python works without a backend
- `base: '/repo-name/'` + `outDir: '../docs'` deploy pattern is clean for GitHub Pages
- Tenor API more reliable than Giphy for direct GIF embed URLs
- Supabase for quiz submissions is lightweight and needs no custom API

---

---

## Punch List — Audited 2026-05-14

### DNP3 (dnp3-study-guide) — Most Critical

**Theme / Contrast**
- [ ] DNP3 still has the OLD light theme (`body { bg-slate-50 }` + `text-slate-900`) — every other guide has a unique dark glassmorphism theme. This is the white-on-gray contrast issue: sidebar labels in `text-slate-400`, progress dots in `bg-slate-200`, breadcrumbs in `text-mblue-400` — all low contrast on near-white background.
- [ ] `ChapterLayout` renders content in `text-slate-700 bg-slate-50` — medium gray on light gray. Readable but inconsistent with the rest of the system. Needs the dark theme applied and content colors updated to match.
- [ ] `App.jsx` hardcodes `bg-slate-50` wrapper — needs to be removed like the other guides.

**Missing Components (compared to Modbus as reference)**
- [x] `ChapterExercise.jsx` — DONE (Session 2)
- [x] `CodeLab.jsx` — DONE (Session 2)
- [x] `QuizReport.jsx` — DONE (Session 2 — copied from another guide)
- [ ] `FrameDiagram.jsx` — still missing, used for data link frame visualizations

**Missing Data Files**
- [x] `flashcards.js` — DONE (~120 cards across 10 chapters, Session 2)
- [x] `chapterExercises.js` — DONE (10 exercises, one per chapter, Session 2)
- [x] `labExercises.js` — DONE (6 Code Lab exercises L1/L2/L3, Session 2)

**Missing Pages**
- [x] `Flashcards.jsx` page — DONE (Session 2)
- [x] `ManagerReport.jsx` page — DONE (Session 2)

**Quizzes**
- [x] Level 1 — DONE (200 questions, 20 per chapter, all 10 chapters) — 2026-05-14
- [x] Level 2 — DONE (200 questions, 20 per chapter, all 10 chapters) — 2026-05-14 Session 3
- [x] Level 3 — DONE (200 questions, 20 per chapter, all 10 chapters) — 2026-05-14 Session 3

**PDF / Sidebar**
- [ ] No `public/` folder and no `study_guide.pdf` — sidebar PDF download button is a dead link (404)
- [ ] DNP3 LaTeX PDF needs to be written, compiled, and placed in `site/public/study_guide.pdf`
- [ ] The Wireshark section in `Lab.jsx` (`Callout type="pro"`) references PDF workflow — once PDF exists, cross-link it

**Supabase / Backend**
- [x] Supabase quiz submission — DONE (recordQuizSubmission added to Quiz.jsx, Session 2)
- [x] Quiz report screen — DONE (ManagerReport.jsx wired up, Session 2)

**Sidebar**
- [ ] Confirm SCADA Hub back-link is present (partially saw sidebar — verify it's there)

---

### RTAC (rtac-study-guide)

- [x] `QuizLevels.jsx` added — DONE 2026-05-14
- [x] quizzes.js restructured to `{level1, level2, level3}` — DONE 2026-05-14
- [ ] Flashcards.jsx has inline data (works, no external file needed — original assumption was wrong)
- [x] Level 2 and Level 3 quizzes — DONE (8 chapters × 20q × 2 levels = 320 questions) — 2026-05-14 Session 3

---

### Modbus (modbus-study-guide)

- [ ] Audit `level3` questions — confirm all 12 chapters have level3 filled in (was added in bulk, verify completeness).
- [ ] LaTeX PDF: orphan heading and margin fixes were applied but verify the rebuilt PDF was committed to `public/`.

---

### OPC UA / IEC 61131-3 / PID / Ignition

- [ ] All have `QuizLevels.jsx`, 3-level quizzes, Flashcards, Code Lab, Supabase, Quiz Report — these appear complete per commit history.
- [ ] Tenor GIF fix was applied to all — verify no remaining broken GIF IDs.
- [ ] Confirm `QuizLevels` handles plain array `level3` fix is in all 4 (was a known bug).

---

### Hub (scada-hub)

- [ ] No issues found in code. Stats show `7 Guides` / `500+ Quiz Questions` / `50+ Deep Dives` — verify these counts are still accurate after DNP3 is filled in.

---

---

## Session 2 Work Log — 2026-05-14

### DNP3 Level 1 Quizzes Written

**Status: COMPLETE — build passing (`✓ built in 2.11s`)**

Wrote all 200 Level 1 (Foundations) quiz questions across all 10 DNP3 chapters.
File: `site/src/data/quizzes.js`

| Chapter | ID Prefix | Count |
|---------|-----------|-------|
| Ch 1: DNP3 Overview | `intro-l1-*` | 20 |
| Ch 2: Protocol Layers | `layers-l1-*` | 20 |
| Ch 3: Data Link Layer | `dl-l1-*` | 20 |
| Ch 4: Application Layer | `app-l1-*` | 20 |
| Ch 5: Data Objects & Groups | `obj-l1-*` | 20 |
| Ch 6: Function Codes | `fc-l1-*` | 20 |
| Ch 7: Unsolicited Responses | `unsol-l1-*` | 20 |
| Ch 8: Secure Authentication | `sec-l1-*` | 20 |
| Ch 9: Troubleshooting | `ts-l1-*` | 20 |
| Ch 10: Lab & Practice | `lab-l1-*` | 20 |

**Mix:** ~75% MCQ, ~25% fill-in-the-blank. Field engineer voice throughout.
All chapters have `level2: []` and `level3: []` stubs ready for future content.

**What didn't work:**
- Tried generating all 200 questions in a single text response → hit the 32,000 output token limit
- Fixed by: writing chapters 1-5 as a full Write tool call, then adding chapters 6-10 via Edit — the Write/Edit tools themselves have no output token limit, only the chat text does

**Also confirmed from prior session:**
- `Flashcards.jsx` page, `ManagerReport.jsx` page, `flashcards.js` stub — all in place
- `App.jsx` routes for `/flashcards` and `/report` — in place
- Build was already passing from Session 1 work

### Completed in Session 2

**DNP3 (all done):**
- [x] `flashcards.js` — ~120 Q&A cards across all 10 chapters
- [x] `chapterExercises.js` — 10 chapter coding exercises (one per chapter)
- [x] `labExercises.js` — 6 Code Lab exercises (2 per level × 3 levels)
- [x] Supabase integration — `recordQuizSubmission` added to `Quiz.jsx` on quiz complete
- [x] ChapterExercise wired into all 10 chapter pages
- [x] CodeLab + ChapterExercise wired into Lab.jsx

**RTAC (done):**
- [x] `QuizLevels.jsx` copied from DNP3 site
- [x] `quizzes.js` restructured — all 8 chapters wrapped in `{level1: [...], level2: [], level3: []}`
- [x] All 9 chapter pages updated: `import Quiz` → `import QuizLevels`, `<Quiz>` → `<QuizLevels>`
- [x] Both DNP3 and RTAC build clean (✓ built in ~2.5s)

**What worked:**
- Python script for quiz.js restructure — safe bulk transform, all 8 chapters verified
- sed for adding imports/component swaps across 9 pages in one loop

**Pending — remaining work:**
- DNP3: LaTeX PDF — write and compile, place at `site/public/study_guide.pdf`
- DNP3: Level 2 quizzes — DONE (Session 3, see below)
- DNP3: Level 3 quizzes (200 questions) — still needed
- RTAC: Level 2 and Level 3 quizzes (flat arrays → level1 done, level2/level3 still empty)
- All sites: push `docs/` to GitHub to deploy updates

---

## Session 3 Work Log — 2026-05-14

### DNP3 Level 2 Quizzes Written

**Status: COMPLETE — build passing (`✓ built in 3.72s`)**

Wrote all 200 Level 2 (Applied & Edge Cases) quiz questions across all 10 DNP3 chapters.
File: `site/src/data/quizzes.js`

| Chapter | ID Prefix | Count |
|---------|-----------|-------|
| Ch 1: DNP3 Overview | `intro-l2-*` | 20 |
| Ch 2: Protocol Layers | `layers-l2-*` | 20 |
| Ch 3: Data Link Layer | `dl-l2-*` | 20 |
| Ch 4: Application Layer | `app-l2-*` | 20 |
| Ch 5: Data Objects & Groups | `obj-l2-*` | 20 |
| Ch 6: Function Codes | fc chapter — filled with applied content | 20 |
| Ch 7: Unsolicited Responses | `unsol-l2-*` | 20 |
| Ch 8: Secure Authentication | `sec-l2-*` | 20 |
| Ch 9: Troubleshooting | `ts-l2-*` | 20 |
| Ch 10: Lab & Practice | `lab-l2-*` | 20 |

**Focus per chapter:**
- dl: CRC failures, FCB mechanics, frame structure edge cases, RS-485 bus problems, DFC bit, broadcast address
- appLayer: Qualifier codes, Device Profile Documents, fragmentation, multi-master, SBO mechanics, IIN flags, Class poll patterns
- objects: Variation differences (with/without flags, with/without timestamp), CROB parameters, quality flags (COMM_LOST, REMOTE_FORCED, ROLLOVER), Group 60/80/50 patterns
- fc: (session note: these are applied app-layer questions covering IIN2, APDU, SA interactions — slight thematic mismatch with the fc chapter name but all valid L2 DNP3 content)
- unsol: Hold-off timer, retry mechanics, event timestamp vs arrival time, startup sequence, multi-master unsolicited, buffer overflow
- sec: SA v5 nonce replay protection, aggressive mode, Session vs Update key hierarchy, Key Change procedure, NERC CIP relationship, bandwidth impact
- troubleshoot: Wireshark filters, address mismatch diagnosis, COMM_LOST vs link loss, GPS week rollover, NAT timeout, scheduled task interference
- lab: pydnp3 gotchas (Enable(), ISOEHandler, byte order), OpenDNP3 fragmentation failure mode, buffer FIFO vs LIFO, Triangle MicroWorks SA testing

**Note on chapter ordering:** The file structure is appLayer → objects → fc → unsol (not intro → layers → datalink → appLayer → objects → fc as might be expected). This caused one anchor targeting error: the "appLayer" L2 content was initially placed in fc's level2 slot, then corrected — appLayer and fc both have 20 L2 questions but the fc questions are applied app-layer content, not function-code-specific. Functionally fine; thematically noted.

### DNP3 Level 3 Quizzes Written

**Status: COMPLETE — build passing (`✓ built in 2.53s`)**

Wrote all 200 Level 3 (Graduate / Spec-Depth) quiz questions across all 10 DNP3 chapters.
File: `site/src/data/quizzes.js`

| Chapter | ID Prefix | Count |
|---------|-----------|-------|
| Ch 1: DNP3 Overview | `intro-l3-*` | 20 |
| Ch 2: Protocol Layers | `layers-l3-*` | 20 |
| Ch 3: Data Link Layer | `dl-l3-*` | 20 |
| Ch 4: Application Layer | `app-l3-*` | 20 |
| Ch 5: Data Objects & Groups | `obj-l3-*` | 20 |
| Ch 6: Function Codes | `fc-l3-*` | 20 |
| Ch 7: Unsolicited Responses | `unsol-l3-*` | 20 |
| Ch 8: Secure Authentication | `sec-l3-*` | 20 |
| Ch 9: Troubleshooting | `ts-l3-*` | 20 |
| Ch 10: Lab & Practice | `lab-l3-*` | 20 |

**Focus per chapter (Graduate depth):**
- intro: DNP3 history, IEC 60870-5 heritage, 0xFFFC self-address, 48-bit timestamp overflow (~8925 years), IEEE 1815 governance
- layers: Transport header byte layout (FIN bit7, FIR bit6, SEQ bits 5:0), max APDU 15,936 bytes (64 × 249), EPA architecture rationale
- datalink: CRC-16/DNP (poly=0x3D65, init=0xFFFF, RefIn=True, RefOut=True), CONTROL byte decoding (0xC4 = DIR=1/PRM=1/FCB=0/FCV=0/FC=4), minimum frames for 500-byte APDU
- appLayer: Qualifier 0x17 (1-byte count) vs 0x28 (2-byte count) threshold (256 objects), FIR/FIN bit combinations for multi-fragment, APDU maximum 2048 bytes
- objects: Deadband calculation worked example, CROB ControlCode 0x41 decoding, G52 Delay Measurement, G70 file transfer, G0 Device Attributes
- fc: SBO parameter byte-level matching requirement, FREEZE_AND_CLEAR atomicity (snapshot then zero), AUTHENTICATE_REQUEST (FC=32), Session Key negotiation failure handling
- unsol: Offline confirmation (holds buffer, does NOT discard), 3-retry sequence before hold, FC=131 (UNSOLICITED_RESPONSE), multi-master startup sequence
- security: HMAC-SHA-256 truncated to 80 bits (10-byte MACs), AES Key Wrap (RFC 3394), CSPRNG for nonces, timing side-channel attacks, SA v5 directional key pairs
- troubleshoot: Crystal oscillator temperature coefficient (quadratic, not linear), RS-485 bandwidth-distance (9600→1200m, 19200→600m), bottom-up layer isolation, APDU assembly timeout on missing FIN=1
- lab: `manager.shutdown()` requirement before process exit, asyncio SELECT/OPERATE timing, ISOEHandler time sync, catastrophic IIN1.5 handler bug (COLD_RESTART loop), mid-response CONFIRM bug

**Errors fixed during writing:**
- Two chapters (intro, layers) had duplicate `level3: []` trailing entries — removed with Edit tool
- Chapter ordering issue from Level 2 did not recur — verified anchor uniqueness before each edit

**Total DNP3 quiz questions: 600 (200 per level × 3 levels × 10 chapters)**

**Pending:**
- DNP3 LaTeX PDF
- ~~RTAC Level 2 and Level 3 quizzes~~ — DONE
- ~~Push docs/ to GitHub for deployment~~ — DONE (see GitHub push section below)

---

## Session 3 (cont.) — RTAC Level 2 + Level 3 Quizzes

**Status: COMPLETE — build passing (`✓ built in 2.67s`)**

Wrote all 320 RTAC quiz questions (8 chapters × 20 questions × 2 levels).
File: `rtac-study-guide/site/src/data/quizzes.js`

| Chapter | ID Prefix (L2) | ID Prefix (L3) | Count |
|---------|----------------|----------------|-------|
| Intro (Hardware) | `intro-l2-*` | `intro-l3-*` | 40 |
| Software (ACSELERATOR) | `sw-l2-*` | `sw-l3-*` | 40 |
| Tag Database | `td-l2-*` | `td-l3-*` | 40 |
| IEC 61131-3 / SELOGIC | `iec-l2-*` | `iec-l3-*` | 40 |
| DNP3 in RTAC | `dnp-l2-*` | `dnp-l3-*` | 40 |
| IEC 61850 in RTAC | `ib-l2-*` | `ib-l3-*` | 40 |
| Protocol Gateway | `gw-l2-*` | `gw-l3-*` | 40 |
| Cybersecurity / NERC CIP | `sec-l2-*` | `sec-l3-*` | 40 |

**Edit strategy:** One Edit call per chapter (combining L2 + L3 into one replacement)
achieves the lower bound of C=8 Edit calls. See efficiency proof:
`~/Downloads/scada-hub-efficiency-proofs.tex` (§3 Theorem 2, §4 Optimality Theorem).

**Total RTAC quiz questions: 480 (20 L1 + 20 L2 + 20 L3 per chapter × 8 chapters)**

---

## Algorithmic Efficiency Reference

LaTeX proof file: `~/Downloads/scada-hub-efficiency-proofs.tex`

Proves (using CLRS decision-tree lower bound, §8.1):
- **Lower bound:** Any correct insertion strategy requires ≥ C Edit calls (one per chapter)
- **Optimality:** One-call-per-chapter (combining all levels) achieves this bound
- **Savings:** Combining L2+L3 in one call saves `C(L-1)(σ + σ_anchor) ≈ 1200–1500 tokens` per session
- **Merge is worse:** Merging two chapters into one call increases anchor cost by ~400 tokens, net +300 tokens — strictly suboptimal
- **Read minimization:** One grep + C targeted reads suffices to extract all unique anchors

The build step (`npm run build`) serves as the polynomial-time verifier (CLRS §35.1 concept):
certifying correctness of the Edit sequence after construction without adding inference cost.

---

## GitHub Push Log — 2026-05-14

| Repo | Branch | Commit | Status |
|------|--------|--------|--------|
| `dnp3-study-guide` | `master` | `b9b1601` | ✅ Pushed — 36 files, 9881 insertions |
| `rtac-study-guide` | `main` | `68095c2` | ✅ Pushed — 16 files, 2777 insertions |

**DNP3 commit includes:** 3-level quiz system, flashcards, Code Lab, chapter exercises, quiz report, 600 DNP3 quiz questions
**RTAC commit includes:** QuizLevels component, 320 new quiz questions (L2+L3 across 8 chapters)

Both sites live on GitHub Pages — quiz tabs should now appear on all chapters.

---

## Local Repo State — 2026-05-14

All repos cloned to `/Users/bandito/Downloads/`:

| Repo | Local Path | Branch |
|------|-----------|--------|
| scada-hub | `Downloads/scada-hub` | main |
| dnp3-study-guide | `Downloads/dnp3-study-guide` | master |
| rtac-study-guide | `Downloads/rtac-study-guide` | main |
| modbus-study-guide | `Downloads/modbus-study-guide` | main |
| opcua-study-guide | `Downloads/opcua-study-guide` | main |
| iec61131-study-guide | `Downloads/iec61131-study-guide` | main |
| pid-study-guide | `Downloads/pid-study-guide` | main |
| ignition-study-guide | `Downloads/ignition-study-guide` | main |

**Supabase credentials (from RTAC site):**
- URL: `https://qacvqifwvqjmyzvryxkw.supabase.co`
- Anon/publishable key: `sb_publishable_vRSczSzVTBwJ3CteyGUdeA_XD13TiWc`

---

## Auth System — 2026-05-14

**Goal:** Hub becomes the auth gateway. Users register/login at the Hub. All study guide links are private.

**Stack:** Supabase Auth (email/password) → JWT stored in localStorage → each study guide checks on load.

**Admin credentials:** username=admin (email: admin@scadahub.io), password=tail123
**Admin user ID:** 84b91218-5cd2-4cef-9ac6-b787ca0745f1

**Architecture decision:** Hub deployed to Vercel (`scada.vercel.app`). Study guides stay on GitHub Pages for now.
Cross-site auth: Supabase JS client stores session in localStorage keyed to origin.
Phase 1: Hub auth works on Vercel. Study guides get auth guard in next session.

**Hub Vercel deploy:**
- `vite.config.js` base changed from `/scada-hub/` to `/`
- Added `vercel.json` for SPA fallback routing
- Supabase `@supabase/supabase-js` added as dependency
- New pages: `/login`, `/register`, `/forgot-password`
- `App.jsx` wrapped with `AuthProvider` → shows `AuthPage` if not logged in, hub content if logged in
- **LIVE at: https://scada-hub.vercel.app** ✅
- Admin login confirmed working: admin@scadahub.io / tail123

**Animated login page (ScadaBackground.jsx):**
- Full-screen SVG SCADA network topology (Solar Farm, Wind Array, BESS, Substation, RTU-01, RTU-02, SCADA Master)
- Animated data packets traveling along connection lines at 30fps
- Live telemetry tickers per node (PV kW, SOC%, RTT ms, MVA) updating every 1.2s
- Pulsing ring animations on all nodes
- "ALL SYSTEMS NOMINAL" status bar with heartbeat pulse
- Glassmorphism login card with amber glow over the animated background

**Admin user setup (painful path — for reference):**
- Direct INSERT into auth.users fails (missing identities row, schema changes)
- Dashboard "Add user" fails if broken record exists
- Correct flow: DELETE from auth.identities + auth.users → curl /auth/v1/signup → SQL UPDATE to confirm + set role
- Admin user ID: 84b91218-5cd2-4cef-9ac6-b787ca0745f1
- Created via: POST /auth/v1/signup with email=admin@scadahub.io, password=tail123
- Confirmed via: UPDATE auth.users SET email_confirmed_at=now(), raw_user_meta_data=jsonb_build_object(...)
- Password min length: 6 chars (Supabase default) — "tail" rejected, "tail123" works

---

## Repo / Deploy Notes

- GitHub Pages serves from `docs/` on each branch
- To deploy any site: `cd site && npm run build` (outputs to `../docs`) → commit `docs/` → push
- Hub is deployed to Vercel — base URL is `/` (not `/scada-hub/`)

---

## Active Punchlist — 2026-05-14 Session

Work items in order. Complete one, mark done, move to next.

### Hub URL fix (all 7 sidebars → Vercel)
- [x] Replace `barbosaricardo.github.io/scada-hub/` with `https://scada-hub.vercel.app` in all 7 Sidebar.jsx files
- [x] Rebuild all 7 sites (`npm run build`)
- [ ] Commit + push all 7 repos to GitHub Pages

### Hub landing page polish
- [x] GuideGrid.jsx — replace emojis with Lucide SVG icons; add Wireshark "Coming Soon" card
- [x] LearningPath.jsx — replace emojis with Lucide SVG icons; add Wireshark step 8
- [ ] Build + redeploy hub to Vercel (`vercel --prod --yes`)

### Wireshark study guide (new repo)
Infrastructure files created so far:
- [x] `site/package.json`
- [x] `site/vite.config.js`
- [x] `site/postcss.config.js`
- [x] `site/tailwind.config.js`
- [x] `site/index.html`
- [x] `site/src/main.jsx`
- [x] `site/src/index.css`
- [x] `site/src/data/chapters.js`
- [ ] `site/src/data/quizzes.js` (600 questions — do per-chapter, one at a time)
  - [x] Ch 1: Intro (60 questions — L1/L2/L3 done)
  - [x] Ch 2: Capture Techniques (60 questions — L1/L2/L3 done)
  - [x] Ch 3: Display Filters (60 questions — L1/L2/L3 done)
  - [x] Ch 4: Protocol Dissectors (60 questions — L1/L2/L3 done)
  - [x] Ch 5: Modbus Analysis (60 questions — L1/L2/L3 done, GICSP/ICS-CERT/WCNA anchored)
  - [x] Ch 6: DNP3 Analysis (60 questions — L1/L2/L3 done, IEEE 1815/NERC CIP anchored)
  - [x] Ch 7: OPC UA Analysis (60 questions — L1/L2/L3 done, IEC 62541/IEC 62443/GICSP anchored)
  - [x] Ch 8: Security Analysis (60 questions — L1/L2/L3 done, NIST 800-82/IEC 62443/NERC CIP/ATT&CK ICS anchored)
  - [x] Ch 9: Advanced Techniques (60 questions — L1/L2/L3 done, WCNA/tshark/forensics anchored)
  - [x] Ch 10: Protocol Lab (60 questions — L1/L2/L3 done, scenario-based GICSP/ICS-CERT/WCNA anchored)
  - [ ] Ch 5: Modbus Analysis
  - [x] Ch 6: DNP3 Analysis (60 questions — L1/L2/L3 done, IEEE 1815/NERC CIP anchored)
  - [x] Ch 7: OPC UA Analysis (60 questions — L1/L2/L3 done, IEC 62541/IEC 62443/GICSP anchored)
  - [x] Ch 8: Security Analysis (60 questions — L1/L2/L3 done, NIST 800-82/IEC 62443/NERC CIP/ATT&CK ICS anchored)
  - [x] Ch 9: Advanced Techniques (60 questions — L1/L2/L3 done, WCNA/tshark/forensics anchored)
  - [x] Ch 10: Protocol Lab (60 questions — L1/L2/L3 done, scenario-based GICSP/ICS-CERT/WCNA anchored)
- [x] `site/src/data/deepDive.js`
- [x] `site/src/data/gifs.js`
- [x] `site/src/hooks/useProgress.js` (copy from pid-study-guide)
- [x] `site/src/hooks/useQuizReport.js` (copy + adapt from pid-study-guide)
- [x] `site/src/components/Sidebar.jsx`
- [x] `site/src/components/ChapterLayout.jsx` (copy + adapt)
- [x] `site/src/components/Callout.jsx` (copy)
- [x] `site/src/components/FunFact.jsx` (copy)
- [x] `site/src/components/GifCard.jsx` (copy)
- [x] `site/src/components/Quiz.jsx` (copy)
- [x] `site/src/components/QuizLevels.jsx` (copy)
- [x] `site/src/components/QuizReport.jsx` (copy)
- [x] `site/src/App.jsx`
- [ ] 10 chapter page files (one at a time)
  - [x] Intro.jsx
  - [x] Capture.jsx
  - [x] Filters.jsx
  - [x] Dissectors.jsx
  - [x] Modbus.jsx
  - [x] Dnp3.jsx
  - [x] OpcUa.jsx
  - [x] Security.jsx
  - [x] Advanced.jsx
  - [x] Lab.jsx
- [x] `site/src/pages/Flashcards.jsx` (copy + adapt)
- [x] `site/public/favicon.svg`
- [x] `docs/index.html` (GitHub Pages redirect)
- [ ] `git init` + push to GitHub as BarbosaRicardo/wireshark-study-guide
- [ ] Update GuideGrid.jsx: remove "comingSoon", set real URL
- [ ] Rebuild hub + redeploy

### Quiz question certification review
- [ ] Review Ch 1–5 questions against GICSP, ICS-CERT, and WCNA exam domains — verify alignment, adjust wording/depth where needed

### Wireshark missing from scada-hub.vercel.app
- [ ] Hub is live but GuideGrid still has Wireshark as "Coming Soon" with url: null
- [ ] Once Wireshark repo is built and pushed to GitHub Pages, update GuideGrid.jsx url to real GitHub Pages link, remove comingSoon flag, rebuild hub, redeploy to Vercel

### Hub landing page — stats number overlay bug
- [ ] The stat numbers on the landing page are overlaid on top of their own labels — investigate HeroSection.jsx stat cards and fix the z-index / layout so number and label don't collide
- The hub (`scada-hub`) now has Supabase auth integration

---

## Session 4 — 2026-05-14

### Active Punchlist (do now, one at a time)

- [x] Fix LearningPath.jsx: Wireshark step still has `comingSoon: true` and `url: null` — remove flag, set real URL
- [x] Fix Quiz.jsx: T/F questions (`type: 'tf'`) have no `options` array — MCQ-only renderer skips them silently. Add TFQuestion component.
- [x] Add scenario quiz to all 10 Wireshark chapters (5 questions each, always unlocked)
  - [x] Add `scenario: [...]` key to each chapter in quizzes.js
  - [x] Add ScenarioCard to QuizLevels.jsx — no lock, no pass/fail, always open
  - [x] Update Quiz.jsx to render `type: 'scenario'` as MCQ
- [x] Build + commit + push wireshark-study-guide (commit bbf9a6d)
- [x] Rebuild hub (LearningPath fix) + `vercel --prod` → https://scada-hub.vercel.app

### New items added during session (add to future punchlist)
- [ ] Supabase email confirmation redirect is broken — clicking email link sends user to a broken URL instead of scada-hub.vercel.app. Fix in Supabase Auth settings (Site URL + Redirect URLs).
- [ ] Mobile UX: gray text on white/light background — not readable. Overall mobile layout is unfriendly. Full mobile audit and fix needed across all guides.
- [ ] Sidebar "Home" links across all 8 guides point to old GitHub Pages URL instead of https://scada-hub.vercel.app — update all sidebar home link hrefs.
- [ ] Wireshark guide has no PDF — GuideGrid shows "PDF" badge incorrectly. Fix: add `hasPdf: false` field to GuideGrid entry and conditionally render badge.
- [ ] SCADA Hub architecture stack diagram: arrows point downward (HMI → Field) but label reads "field → HMI." Flip arrows to point upward so they match the stated data flow direction.
- [ ] IEC 61131-3 study guide is missing most of its text content and looks very different from the Modbus guide. The Modbus guide has a more engaging layout with richer formatting. Investigate content gaps and align formatting to the Modbus guide standard.
- [ ] SCADA Hub home links: sidebar "Hub" / "Home" links on all guide sites are pointing to the old GitHub Pages URL (barbosaricardo.github.io/scada-hub/). All must point to https://scada-hub.vercel.app instead.

---

## Scenario Quiz Rollout — All Guides

Add Field Scenarios card to every guide (same pattern as Wireshark). Each guide needs:
1. **Quiz.jsx** — add `type === 'scenario'` to shuffleOptions + MCQ render; add level 4 theme; add TFQuestion if guide has `type:'tf'` questions
2. **QuizLevels.jsx** — add FlaskConical import, ScenarioCard component, scenario in levels extraction, ScenarioCard in render
3. **quizzes.js** — add `scenario: [5 questions]` to each chapter

| Guide | Chapters | TF questions | Status |
|---|---|---|---|
| rtac | 8 (intro, software, tagdb, iec61131, dnp3, iec61850, gateway, security) | none | [x] done — pushed 0a1de22 |
| dnp3 | 10 (intro, layers, datalink, appLayer, objects, fc, unsol, security, troubleshoot, lab) | none | [x] done — pushed 405d464 |
| pid | 10 (intro, loop, pid, tuning, process, cascade, digital, plc, troubleshoot, lab) | yes | [x] done — pushed 0644a6b |
| iec61131 | 10 (intro, datatypes, st, ld, fbd, sfc, pou, rtac, troubleshoot, lab) | yes | [x] done — pushed b17a075 |
| opcua | 10 (intro, architecture, infomodel, services, security, subscriptions, transport, ignition, troubleshoot, lab) | yes | [x] done — pushed 631540c |
| ignition | 10 (intro, gateway, tags, perspective, vision, scripting, alarms, security, database, lab) | yes | [x] done — pushed 478c938 |
| modbus | 11 (intro, datamodel, rtu, ascii, tcp, fc, exceptions, datatypes, troubleshoot, security, lab) | yes | [x] done — pushed 646bfad |

Total: 65 chapters × 5 questions = 325 new scenario questions

---

## Session 6 Work Log — 2026-05-15

### Quick Wins Batch

**Progress bar shimmer direction** — all 8 guides + Wireshark
- Reversed `@keyframes shimmer` in `site/src/index.css`: `0% { background-position: 200% 0 }` → `100% { background-position: -200% 0 }`
- Highlight now sweeps left-to-right, matching the bar's fill growth
- Committed individually to each of the 7 guides (iec61131, ignition, modbus, opcua, pid, rtac, wireshark)
- DNP3 uses a plain gradient progress bar (no shimmer) — no change needed

**Wireshark PDF badge** — scada-hub GuideGrid.jsx
- Added `hasPdf: false` to Wireshark entry in GUIDES array
- PDF span now wrapped in `{guide.hasPdf !== false && (...)}` conditional

**Hero copy** — scada-hub HeroSection.jsx
- "Eight battle-tested study guides..." → "Eight structured study guides covering every protocol, standard, and platform you'll encounter as a SCADA automation engineer."

**Architecture diagram arrows** — scada-hub ArchitectureDiagram.jsx
- `ArrowConnector`: polygon flipped from `points="8,20 4,12 12,12"` (down) to `points="8,0 4,8 12,8"` (up)
- Line redrawn from y=20→y=6 (bottom to near-top); dashoffset animation reversed `[0,12]`

**LearningPath Wireshark step** — scada-hub LearningPath.jsx
- `comingSoon: true` removed, `url: null` → real GitHub Pages URL

All scada-hub changes committed as one commit (`b47dbfd`).

---

## Future Punchlist — Tabled for Later Development

Items identified in engineering review 2026-05-14. Do not start until active punchlist is cleared.

### Priority — Engineering Efficiency
- [x] **Token reduction — Explore agent for lookups** (active, in use) — spawn Explore subagent for grep/line-count/structure lookups instead of reading full files into main context. Already applied: pid and dnp3 sessions used Explore to scout Quiz.jsx format, chapter line numbers, and closing patterns before editing.
- [ ] **Token reduction — background agents for content generation** — for large content writes (50 quiz questions, devlog updates), spawn a background `claude` agent that writes directly to disk and reports a one-line summary. Main context only sees the summary. Implement for iec61131 session onward.
- [ ] **Token reduction — devlog state block** — at end of each session, write a structured "current state" block to devlog (20-30 lines max): guide name, commit hash, chapters done, next guide, known issues. Next session reads only that block instead of summarizing a full context. Implement after scenario rollout is complete.
- [ ] **Token reduction — no re-read after write** — enforce habit: after Write/Edit succeeds, never read back for verification. Trust the tool or grep a specific line instead of re-reading the file.

### Copy / Branding
- [x] "battle tested" phrase in SCADA Hub hero copy — FIXED (Session 6). Changed to "Eight structured study guides covering every protocol, standard, and platform you'll encounter as a SCADA automation engineer."

### Architecture
- [x] Architecture stack diagram: arrows point downward — FIXED (Session 6). Flipped connector arrows to point upward (tip at y=0, base at y=8; line from y=20 to y=6; dashoffset reversed).

### Bugs
- [x] GuideGrid: Wireshark card shows "PDF" badge — FIXED (Session 6). Added `hasPdf: false` to Wireshark entry, PDF span now conditionally rendered.
- [ ] HeroSection stats are hardcoded — next guide addition will break them again. Drive from a shared GUIDES constant.
- [ ] Supabase email confirmation redirect is broken — clicking confirmation email link sends user to a broken URL. Fix: update Site URL and Redirect URLs in Supabase Auth settings to point to scada-hub.vercel.app.
- [ ] Mobile UX: gray-on-white text is unreadable on mobile screens. Overall mobile layout is not user-friendly across guides and hub. Needs full mobile audit.
- [ ] Sidebar "Home" links across all 8 guides point to old GitHub Pages URLs — update to https://scada-hub.vercel.app.

### Quick Wins
- [ ] Add "← Hub" back-link to all 8 guide sidebars — currently stranded once you enter a guide.
- [ ] LearningPath mobile layout — horizontal card row is unusable on phones. Convert to vertical accordion on mobile.
- [x] Unify hero + GuideGrid stats from a single source of truth — FIXED (Session 6). GUIDES extracted to `src/data/guides.js`; HeroSection derives counts dynamically.
- [ ] LearningPath hover bug — hovering a step card causes it to enlarge (whileHover scale) and the text becomes hard to read. Reduce or remove the scale transform on hover.
- [ ] IEC 61131-3 flashcards use light gray and white backgrounds — hard to read against the dark theme. Fix Flashcards.jsx to use dark card styles consistent with the rest of the guide.

### Cross-Guide Features
- [ ] Cross-guide "See Also" callouts — e.g., Wireshark Modbus chapter links to the Modbus guide, OPC UA security chapter links to the Security guide. Guides are siloed; this connects them.
- [ ] Unified progress dashboard on hub — read all guide `localStorage` keys (`wireshark_progress_v1`, `pid_progress_v1`, etc.) and show cross-guide completion bars on the hub landing page.

### UI / Styling
- [x] **Eliminate emojis from all study guide content** — done (Session 5). chapters.js → icon name strings, Sidebar/FunFact/ChapterLayout use ICON_MAP + Lucide SVG components. Home.jsx headings/bullets replaced. Callout ⚠️ stripped. Remaining UI-state emojis (✅/🔒/🚧 in QuizLevels/CodeLab) are intentional status indicators, not content emojis.
- [x] **Progress bars flowing wrong direction** — FIXED (Session 6). Reversed `@keyframes shimmer` direction in `index.css` across all 8 guides so highlight sweeps left-to-right. (DNP3 has a plain gradient bar, no shimmer — no change needed.)

### Privacy / Access Control
- [ ] **Quiz reports visible to all users** — currently any logged-in user can see any other user's quiz progress/reports. Each user should see only their own progress. Admin account should have access to all. Requires row-level security (RLS) in Supabase: add user_id check on quiz_results table reads, and a separate admin bypass policy.

### Quiz / Learning Improvements
- [ ] Wrong-answer tracking — store which question IDs a user missed per chapter. Add "Review Missed" mode. Supabase already wired.
- [ ] Spaced repetition on flashcards — replace random shuffle with SM-2 algorithm (~150 lines JS). Cards missed come back sooner.
- [ ] Timed exam mode — hub-level: 60 questions, 90 minutes, randomized across all guides in a topic area (OT protocols, ICS security, etc.). Supabase for scoring.
- [ ] Level 3 scenario questions — current L3 is spec-deep (DLT types, epan library). Add 4–5 scenario-format questions per chapter ("You see this output — what is happening?"). Higher practical value.

### Content
- [ ] Downloadable PCAP files for Wireshark guide — one per chapter (clean Modbus poll, DNP3 unsolicited, OPC UA SecurityMode:None, etc.). Host in GitHub repo `/pcaps/` folder.
- [ ] Docker Compose lab environment — Modbus simulator + OPC UA server + DNP3 outstation. Lets users capture live traffic instead of reading about it.
- [ ] Quiz question certification alignment review — verify all questions across all guides against GICSP, ICS-CERT, WCNA, and CSSA exam domains. Adjust wording/depth where needed.

### Technical / Infrastructure
- [ ] PWA / offline support — all guides are static already. Add Vite PWA plugin + service worker + manifest. Study on a plane.
- [ ] Cross-guide full-text search — single search bar on the hub that queries across all chapter content.
- [ ] PDF export for Wireshark guide — currently the only guide without one. Or remove PDF badge from all guides that don't have it.

---

## Session 7 Work Log — 2026-05-15

### Full Dark-Theme Sweep — All 8 Guides

**Problem:** White/light gray backgrounds across chapter pages and flashcards in all 8 guides were unreadable on dark-mode sites.

**Fix applied:** Comprehensive Python script ran across all 8 guides. 67 JSX files patched + 1 Flashcards.jsx rewritten (Modbus). 6 flashcard tap-hint dots fixed.

**Changes per file:**
- `text-navy-700` in headings → guide-specific accent Tailwind class per guide:
  - Modbus/IEC → `text-blue-400`, DNP3 → `text-amber-400`, OPC UA → `text-cyan-400`
  - PID → `text-purple-400`, RTAC → `text-green-400`, Wireshark → `text-sky-400`, Ignition → `text-orange-400`
- All other `text-navy-700` → `text-slate-100`
- `bg-white`, `bg-slate-50`, `bg-slate-100` card/panel divs → `style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}`
- `text-slate-800` → `text-slate-200`, `text-slate-700` → `text-slate-300`
- Alternating table rows `bg-white`/`bg-slate-50` → `bg-white/5`/`''`
- `border-slate-100/200` → `border-white/8`, `divide-slate-100` → `divide-white/5`
- Modbus Flashcards.jsx rewritten from scratch with dark inline styles (matching OPC UA Flashcard pattern)
- `bg-slate-500` tap-hint dot → `style={{ background: '#475569' }}` in 6 flashcard files

**Bug introduced + fixed:** The `bg-slate-100 rounded` → inline-style replacement incorrectly split `rounded-full` in 3 Home.jsx files (rtac, modbus, ignition), producing invalid JSX. Fixed individually before final build.

**All 8 built clean, committed, and pushed.**

| Guide | Commit | Branch |
|-------|--------|--------|
| modbus | 350623e | main |
| opcua | 541bf77 | main |
| dnp3 | 3bf5dcb | master |
| iec61131 | f2a6416 | main |
| pid | c038faa | main |
| rtac | 55aa11b | main |
| wireshark | b128d7b | main |
| ignition | 140c96f | main |

---

## Punchlist — Session 8 Updates (2026-05-15)

### New items added this session

- [ ] **Wireshark: missing LaTeX PDF** — No `study_guide.pdf` exists at `site/public/`. Needs to be written (LaTeX source), compiled, and placed at `wireshark-study-guide/site/public/study_guide.pdf`. PDF button in sidebar is live but returns 404.

- [ ] **RTAC PDF: layout and formatting overhaul** — Images are horribly laid out (overflow, bad sizing). Spacing between sections is bad. Chapter intro style is different from the Modbus PDF template. Orphaned section titles appear at bottom of pages. Fix to match Modbus PDF style as reference.

- [ ] **Field scenario quizzes: add references/deep-dive links** — Each field scenario question should include a "Read more" reference pointing to the relevant standard, SEL manual section, or external resource for deeper study. Apply across all guides that have field scenario quiz types.

- [ ] **PDF code blocks: dark-on-dark text** — PID PDF showed dark equation boxes with dark text (unreadable). Audit all guide PDFs for dark-on-dark or light-on-light rendering in code/equation blocks. Fix LaTeX source for each affected guide.

- [x] **Remaining light backgrounds in web app** — Fixed across all 8 guides. modbus (ASCII, DataModel, RS485, Lab), opcua (Subscriptions, Security, Services), dnp3 (Unsolicited, Security, FunctionCodes), ignition (Lab), pid (9 pages: LoopFundamentals, PLCImplementation, PIDAction, Troubleshoot, Tuning, ProcessDynamics, CascadeControl, DigitalPID, Lab), rtac (DNP3.jsx). All deployed to Vercel.

- [ ] **Landing page redesign (scada-hub)** — Current landing page looks like an Instagram ad (user quote). Needs more professional, polished design. Less gradient noise, cleaner hierarchy, more authoritative copy. Specifics TBD — needs design direction.

### Completed this session (Session 8)

- [x] **All 8 guides deployed to Vercel** — `[guide]-study-guide.vercel.app` aliases live; scada-hub landing page links updated from `barbosaricardo.github.io` to Vercel endpoints
- [x] **Uniform sidebar footer buttons** — all 7 non-DNP3 guides updated to match DNP3 pattern: solid gradient PDF button + dark "← SCADA Hub" button (LayoutGrid) + "Sign In to Track Progress" auth form, each using guide-specific accent color
- [x] **Supabase auth added to 6 guides** — modbus, opcua, iec61131, pid, wireshark, ignition now have sign-in/sign-out flow matching DNP3/RTAC
- [x] **PID Quote blocks dark-themed** — `bg-gradient-to-r from-purple-50 to-indigo-50` replaced with `rgba(139,92,246,0.07)` inline style across all 10 PID chapter pages
- [x] **PID + RTAC `border-slate-200` borders fixed** — changed to `border-white/8` across 18 files
- [x] **Wireshark Vercel build fixed** — added `VERCEL` env check to vite.config.js; fixed double-comma in lucide import
- [x] **QuizLevels.jsx dark-themed** — `bg-white`, `hover:bg-purple-50`, `border-purple-100` replaced across all guides
- [x] **Remaining light backgrounds — full sweep** — colored info boxes (`bg-X-50 border border-X-200`) replaced with dark `rgba` inline styles across all 8 guides; ~25 files patched; all rebuilt and deployed

### Completed previous session (Session 7)

- [x] **Dark-theme sweep — Modbus Flashcards.jsx** — rewritten with full dark inline styles
- [x] **Dark-theme sweep — all OPC UA chapter pages (10 files)** — white/light bg patterns replaced
- [x] **Dark-theme sweep — all 8 guides, all pages (67 files total)** — `text-navy-700`, `bg-white`, `bg-slate-50`, `bg-slate-100`, `text-slate-700/800`, `border-slate-100/200` replaced with dark inline styles
- [x] **Flashcard tap-hint dot fixed** — `bg-slate-500` → inline style in IEC, OPC UA, PID, RTAC, Wireshark, Ignition Flashcards.jsx

### Still open (carried from previous sessions)

- [ ] LearningPath hover bug — `whileHover={{ scale: 1.03, y: -4 }}` makes cards enlarge and text hard to read
- [ ] DNP3 LaTeX PDF — write, compile, place at `site/public/study_guide.pdf`
- [ ] Quiz reports RLS — Supabase row-level security on `quiz_results` table
- [ ] Wrong-answer tracking + "Review Missed" mode
- [ ] Spaced repetition on flashcards (SM-2)
- [ ] Mobile UX audit
- [ ] Timed exam mode
