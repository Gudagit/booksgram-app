import { createClient } from '@supabase/supabase-js'

// Both values come from app\.env (never committed). The publishable key is meant
// to be public; what the data allows is decided by rules on the Supabase side.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null while the project is not set up, so the app still runs as a demo
export const supabase = url && key ? createClient(url, key) : null
