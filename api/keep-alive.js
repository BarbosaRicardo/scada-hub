// Vercel cron: daily Supabase keep-alive ping.
// Schedule defined in vercel.json → crons[1] (0 12 * * * — every day at 12:00 UTC).
//
// Why this exists: Supabase free-tier projects auto-pause after ~7 days with no
// activity, which drops the project off DNS and silently breaks More Training,
// auth, quiz sync, and the Operator Console across all 8 guides + the hub.
// A cheap daily read resets that inactivity timer so the project never pauses.
//
// Auth: Vercel injects `Authorization: Bearer <CRON_SECRET>` into scheduled
// invocations when CRON_SECRET is set. We honor that guard (matching
// refresh-training.js) but also allow Vercel's own cron requests through, so the
// ping keeps working even if CRON_SECRET is ever unset.
//
// Keys: uses the PUBLIC project URL + publishable key (the same values already
// shipped in every guide's client bundle — not secrets), with env overrides.
// A read against the public-read `training_events` table is enough to count as
// activity; no service key or write access needed.

const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://qacvqifwvqjmyzvryxkw.supabase.co'
const SUPABASE_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_vRSczSzVTBwJ3CteyGUdeA_XD13TiWc'

export default async function handler(req, res) {
  // Allow real Vercel cron invocations (header set automatically) OR a matching
  // CRON_SECRET. If no CRON_SECRET is configured, allow the ping through.
  const auth = req.headers['authorization']
  const isVercelCron = req.headers['x-vercel-cron'] !== undefined
  const secretOk =
    !process.env.CRON_SECRET || auth === `Bearer ${process.env.CRON_SECRET}`
  if (!isVercelCron && !secretOk) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const startedAt = Date.now()
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/training_events?select=id&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    )
    const ok = r.ok
    return res.status(200).json({
      ok,
      supabase_status: r.status,
      ms: Date.now() - startedAt,
      pinged_at: new Date().toISOString(),
    })
  } catch (err) {
    // Surface the failure but still return 200 so the cron isn't marked failed
    // on a transient network blip — the next daily run will catch a real outage.
    return res.status(200).json({
      ok: false,
      error: String(err && err.message ? err.message : err),
      ms: Date.now() - startedAt,
      pinged_at: new Date().toISOString(),
    })
  }
}
