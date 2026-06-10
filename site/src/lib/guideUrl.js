// Single source of truth for guide URLs.
// When an operator is signed in, their Supabase session rides along in the URL
// hash so the guide (a separate origin) can adopt the same session.
export const guideBaseUrl = (slug) => `https://${slug}-study-guide.vercel.app/`

export function guideUrl(url, session) {
  if (!session) return url
  const { access_token, refresh_token } = session
  return `${url}#access_token=${access_token}&refresh_token=${refresh_token}&expires_in=3600&token_type=bearer&type=recovery`
}

export const GUIDE_URLS = {
  Modbus: guideBaseUrl('modbus'),
  'OPC UA': guideBaseUrl('opcua'),
  DNP3: guideBaseUrl('dnp3'),
  'IEC 61131-3': guideBaseUrl('iec61131'),
  'PID Controllers': guideBaseUrl('pid'),
  'SEL RTAC': guideBaseUrl('rtac'),
  'Ignition SCADA': guideBaseUrl('ignition'),
  Wireshark: guideBaseUrl('wireshark'),
}
