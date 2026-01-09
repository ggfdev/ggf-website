import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const isValidUrl = (url: string) => {
    try { return Boolean(new URL(url)); } catch { return false; }
};

export const supabase = (isValidUrl(supabaseUrl) && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            insert: async () => {
                console.warn('Supabase not configured, returning mock success');
                return { error: null };
            }
        })
    } as any;
