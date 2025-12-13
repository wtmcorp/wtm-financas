import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Client for use in browser (with RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for use in API routes (no RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Realtime subscription helper
export function subscribeToChats(userId: string, callback: (data: any) => void) {
  return supabase
    .channel(`chats:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chats",
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
}

export function subscribeToMessages(
  chatId: string,
  callback: (data: any) => void
) {
  return supabase
    .channel(`messages:${chatId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `chat_id=eq.${chatId}`,
      },
      callback
    )
    .subscribe();
}
