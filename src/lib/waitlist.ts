import { supabase } from '@/lib/supabase';

interface WaitlistParams {
  email: string;
  source: string;
  keywordSearched?: string;
  postUrl?: string;
}

export async function saveToWaitlist(params: WaitlistParams): Promise<{ success: boolean; duplicate: boolean }> {
  try {
    const { error } = await supabase.from('waitlist_signups').insert({
      email: params.email.trim().toLowerCase(),
      source: params.source,
      keyword_searched: params.keywordSearched ?? null,
      post_url: params.postUrl ?? null,
    });

    if (error) {
      // Postgres unique violation code
      if (error.code === '23505') {
        return { success: true, duplicate: true };
      }
      console.error('[waitlist]', error.message);
      return { success: false, duplicate: false };
    }

    return { success: true, duplicate: false };
  } catch (err) {
    console.error('[waitlist]', err);
    return { success: false, duplicate: false };
  }
}
