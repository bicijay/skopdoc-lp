import {createClient} from "@supabase/supabase-js";

const options = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
}

export const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_ANON_KEY, options)
