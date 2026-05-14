import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qacvqifwvqjmyzvryxkw.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_vRSczSzVTBwJ3CteyGUdeA_XD13TiWc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
