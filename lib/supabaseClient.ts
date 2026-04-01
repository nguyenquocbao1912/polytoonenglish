import { createBrowserClient } from '@supabase/ssr'

// Dùng createBrowserClient thay vì createClient để đọc session từ Cookie
// (session được lưu vào Cookie bởi auth callback dùng @supabase/ssr)
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)