import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { GUIDES } from '../data/guides'
import { guideUrl } from '../lib/guideUrl'

// quiz_submissions.app values map to the guide URL slug
const slugFromUrl = (url) => new URL(url).hostname.split('-study-guide')[0]
const GUIDE_BY_SLUG = Object.fromEntries(GUIDES.map((g) => [slugFromUrl(g.url), g]))

// Each chapter has 3 quiz levels; mastery = passed (chapter, level) pairs / (chapters × 3)
function computeMastery(rows) {
  const byApp = {}
  for (const row of rows) {
    if (!row.passed) continue
    const app = byApp[row.app] || (byApp[row.app] = new Set())
    app.add(`${row.chapter}:${row.level}`)
  }
  return Object.entries(GUIDE_BY_SLUG).map(([slug, guide]) => {
    const passed = byApp[slug]?.size || 0
    const total = guide.chapters * 3
    return { slug, guide, passed, total, pct: Math.min(100, Math.round((passed / total) * 100)) }
  })
}

function computeStreak(rows) {
  const days = new Set(rows.map((r) => (r.created_at || '').slice(0, 10)))
  let streak = 0
  const cursor = new Date()
  // A streak survives if today has no activity yet — start counting from yesterday
  if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setUTCDate(cursor.getUTCDate() - 1)
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }
  return streak
}

function MasteryRow({ entry }) {
  const { guide, pct, passed, total } = entry
  return (
    <div className="flex items-center gap-3">
      <span className="led" style={{ '--led-color': guide.iconColor }} aria-hidden="true" />
      <span className="font-mono text-xs font-bold tracking-[0.1em] uppercase text-ink w-32 sm:w-40 truncate">
        {guide.name}
      </span>
      <span
        className="flex-1 h-2 bg-panel-2 border border-line overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${guide.name} mastery`}
      >
        <span
          className="block h-full transition-[width] duration-700"
          style={{ width: `${pct}%`, background: guide.iconColor }}
        />
      </span>
      <span className="readout w-20 text-right tabular-nums">
        {passed}/{total} · {pct}%
      </span>
    </div>
  )
}

export default function OperatorConsole() {
  const { session } = useAuth()
  const [rows, setRows] = useState(null) // null = loading
  const [allRows, setAllRows] = useState(null) // admin only
  const [error, setError] = useState(null)

  const isAdmin = session?.user?.user_metadata?.role === 'admin'
  const userLabel = session?.user?.email?.split('@')[0] || 'operator'

  useEffect(() => {
    if (!session) return
    let cancelled = false

    supabase
      .from('quiz_submissions')
      .select('app, chapter, level, pct, passed, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(2000)
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) setError(error.message)
        else setRows(data || [])
      })

    if (isAdmin) {
      supabase
        .from('quiz_submissions')
        .select('app, chapter, level, pct, passed, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(25)
        .then(({ data }) => {
          if (!cancelled && data) setAllRows(data)
        })
    }

    return () => { cancelled = true }
  }, [session, isAdmin])

  const mastery = useMemo(() => (rows ? computeMastery(rows) : []), [rows])
  const streak = useMemo(() => (rows ? computeStreak(rows) : 0), [rows])
  const overall = mastery.length
    ? Math.round(mastery.reduce((a, m) => a + m.pct, 0) / mastery.length)
    : 0
  const latest = rows?.[0]
  const latestGuide = latest ? GUIDE_BY_SLUG[latest.app] : null

  if (!session) return null

  return (
    <section className="py-16 px-4 sm:px-6 border-t border-line" id="console" aria-label="Operator console">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="panel panel-bracket p-6 sm:p-8"
        >
          {/* Console header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3 mb-6">
            <span className="readout flex items-center gap-2">
              <span className="led led-blink" aria-hidden="true" />
              Operator Console — {userLabel}
            </span>
            <span className="readout tabular-nums">
              STREAK {streak}D · OVERALL {overall}%
            </span>
          </div>

          {error && (
            <p className="readout mb-6" style={{ color: 'var(--color-alarm)' }}>
              UPLINK FAULT: {error}
            </p>
          )}

          {rows === null && !error && <p className="readout">POLLING TELEMETRY…</p>}

          {rows !== null && rows.length === 0 && (
            <p className="text-ink-dim text-sm leading-relaxed">
              <span className="readout block mb-2" style={{ color: 'var(--color-amber)' }}>
                ⚠ NO SYNCED TELEMETRY
              </span>
              Quiz results from the study guides are not yet linked to your operator account —
              guide telemetry uplink is pending a guide-side update. Your progress inside each
              guide is still tracked locally on that guide's site.
            </p>
          )}

          {rows !== null && rows.length > 0 && (
            <div className="flex flex-col gap-6">
              {/* Continue readout */}
              {latestGuide && (
                <a
                  href={guideUrl(latestGuide.url, session)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel flex items-center gap-3 px-4 py-3 hover:border-line-bright transition-colors"
                >
                  <span className="readout text-phosphor">▶ CONTINUE</span>
                  <span className="font-mono text-xs text-ink uppercase tracking-[0.1em]">
                    {latestGuide.name} — CH {latest.chapter} · L{latest.level} · {latest.pct}%
                  </span>
                </a>
              )}

              {/* Mastery panel */}
              <div className="flex flex-col gap-2.5">
                {mastery.map((entry) => (
                  <MasteryRow key={entry.slug} entry={entry} />
                ))}
              </div>
            </div>
          )}

          {/* Admin: recent activity across all operators */}
          {isAdmin && allRows && allRows.length > 0 && (
            <div className="mt-8 pt-6 border-t border-line">
              <p className="readout mb-3" style={{ color: 'var(--color-amber)' }}>
                ADMIN // RECENT ACTIVITY (ALL OPERATORS)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-[11px] text-ink-dim">
                  <thead>
                    <tr className="text-left text-ink-faint uppercase tracking-[0.1em]">
                      <th className="py-1.5 pr-4 font-normal">TIME</th>
                      <th className="py-1.5 pr-4 font-normal">GUIDE</th>
                      <th className="py-1.5 pr-4 font-normal">CH</th>
                      <th className="py-1.5 pr-4 font-normal">LVL</th>
                      <th className="py-1.5 pr-4 font-normal">PCT</th>
                      <th className="py-1.5 pr-4 font-normal">RESULT</th>
                      <th className="py-1.5 font-normal">OPERATOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRows.map((r, i) => (
                      <tr key={i} className="border-t border-line">
                        <td className="py-1.5 pr-4 whitespace-nowrap">{(r.created_at || '').slice(0, 16).replace('T', ' ')}</td>
                        <td className="py-1.5 pr-4 uppercase">{r.app}</td>
                        <td className="py-1.5 pr-4">{r.chapter}</td>
                        <td className="py-1.5 pr-4">L{r.level}</td>
                        <td className="py-1.5 pr-4">{r.pct}%</td>
                        <td className="py-1.5 pr-4" style={{ color: r.passed ? '#4ade80' : 'var(--color-alarm)' }}>
                          {r.passed ? 'PASS' : 'FAIL'}
                        </td>
                        <td className="py-1.5">{r.user_id ? r.user_id.slice(0, 8) : 'ANON'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
