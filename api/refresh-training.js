// Vercel cron: runs every Monday at 6 AM UTC
// Schedule defined in vercel.json → crons[0]
//
// Required Vercel env vars (set via Dashboard or `vercel env add`):
//   CRON_SECRET          — any random string; Vercel sends as Authorization: Bearer
//   BRAVE_SEARCH_API_KEY — https://api.search.brave.com (free: 2000 queries/month)
//   SUPABASE_URL         — your project URL
//   SUPABASE_SERVICE_KEY — service role key (bypasses RLS for writes)
//   RESEND_API_KEY       — https://resend.com (free: 3000 emails/month); for broken-URL alerts
//   ALERT_EMAIL          — destination for broken-URL alerts (e.g. ric3639@gmail.com)
//
// AI auth: OIDC token auto-provisioned on Vercel deployments — no API key needed.
// For local dev: run `vercel env pull .env.local` to get a 24h VERCEL_OIDC_TOKEN.
//
// Total runtime: ~60s for 8 courses + URL checks — within Vercel's 300s limit.

import { generateText } from 'ai'
import { createClient } from '@supabase/supabase-js'

const COURSES = [
  { slug: 'modbus',    query: 'Modbus RTU TCP training course certification 2026' },
  { slug: 'opcua',     query: 'OPC UA training certification OPC Foundation 2026' },
  { slug: 'dnp3',      query: 'DNP3 SCADA protocol training utility certification 2026' },
  { slug: 'iec61131',  query: 'IEC 61131-3 PLC programming training certification 2026' },
  { slug: 'pid',       query: 'PID loop tuning process control training ISA 2026' },
  { slug: 'rtac',      query: 'SEL RTAC ACSELERATOR training course 2026' },
  { slug: 'ignition',  query: 'Ignition SCADA Inductive Automation training certification 2026' },
  { slug: 'wireshark', query: 'Wireshark network analysis ICS SCADA training SANS 2026' },
]

async function braveSearch(query, apiKey) {
  const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5&freshness=py`
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'X-Subscription-Token': apiKey },
  })
  if (!res.ok) throw new Error(`Brave search failed: ${res.status}`)
  const data = await res.json()
  return (data.web?.results || []).map(r => ({ title: r.title, url: r.url, description: r.description }))
}

async function parseResults(courseSlug, results) {
  if (!results.length) return []

  const prompt = `Extract structured training event data from these search results.
Course topic: ${courseSlug}
Today's date: ${new Date().toISOString().split('T')[0]}

Search results:
${results.map((r, i) => `${i + 1}. ${r.title}\n   URL: ${r.url}\n   ${r.description}`).join('\n\n')}

Return ONLY a JSON array. Each item must have exactly these keys:
  provider (string), title (string), format ("online"|"in-person"|"hybrid"|"self-paced"),
  start_date (ISO date string or null), end_date (ISO date string or null),
  url (string — only real URLs from the results above), is_cert (boolean), cert_name (string or null)

Rules:
- Only include future events, or self-paced courses where start_date is null
- is_cert: true only for certification exams (not training events)
- Skip any item without a verified URL from the results
- Return [] if nothing qualifies`

  const { text } = await generateText({
    model: 'anthropic/claude-haiku-4.5',
    prompt,
    providerOptions: {
      gateway: { tags: ['feature:training-refresh', 'env:cron'] },
    },
  })

  try {
    return JSON.parse(text)
  } catch {
    return []
  }
}

// HEAD-check every stored URL. Returns array of broken rows.
async function checkExistingUrls(supabase) {
  const { data: rows } = await supabase
    .from('training_events')
    .select('id, course, title, url, provider')

  const broken = []
  await Promise.all(
    (rows || []).map(async row => {
      try {
        const res = await fetch(row.url, { method: 'HEAD', signal: AbortSignal.timeout(8000) })
        if (!res.ok) broken.push({ ...row, status: res.status })
      } catch {
        broken.push({ ...row, status: 'timeout/unreachable' })
      }
    })
  )
  return broken
}

async function sendBrokenUrlAlert(broken, resendKey, alertEmail) {
  if (!broken.length || !resendKey) return

  const rows = broken
    .map(b => `• [${b.course}] ${b.title} — ${b.provider}\n  ${b.url}\n  Status: ${b.status}`)
    .join('\n\n')

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SCADA Hub <alerts@scada-hub.vercel.app>',
      to: [alertEmail],
      subject: `⚠️ ${broken.length} broken training URL${broken.length > 1 ? 's' : ''} detected`,
      text: `The weekly training event refresh found ${broken.length} broken URL(s):\n\n${rows}\n\nLog in to Supabase to review or remove these rows:\nhttps://supabase.com/dashboard/project/_/editor`,
    }),
  })
}

export default async function handler(req, res) {
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  const braveKey = process.env.BRAVE_SEARCH_API_KEY
  const summary = { inserted: 0, skipped: 0, broken: 0, errors: [] }

  // 1. Refresh: search + parse + upsert new/updated events
  for (const course of COURSES) {
    try {
      const results = await braveSearch(course.query, braveKey)
      const events = await parseResults(course.slug, results)

      for (const ev of events) {
        if (!ev.url || !ev.title || !ev.provider) { summary.skipped++; continue }
        const { error } = await supabase
          .from('training_events')
          .upsert({ course: course.slug, ...ev }, { onConflict: 'url' })
        if (error) { summary.errors.push(`${course.slug}: ${error.message}`); continue }
        summary.inserted++
      }

      // Rate limit: Brave free tier allows 1 req/s
      await new Promise(r => setTimeout(r, 1200))
    } catch (err) {
      summary.errors.push(`${course.slug}: ${err.message}`)
    }
  }

  // 2. Health check: HEAD every stored URL, alert on failures
  const broken = await checkExistingUrls(supabase)
  summary.broken = broken.length
  if (broken.length) {
    await sendBrokenUrlAlert(broken, process.env.RESEND_API_KEY, process.env.ALERT_EMAIL)
  }

  res.status(200).json({ ok: true, ...summary, ran_at: new Date().toISOString() })
}
