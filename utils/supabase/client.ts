import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const serverUrl = `${supabaseUrl}/functions/v1/make-server-5d4be467`;

/**
 * Helper to fetch data from the KV store via the Edge Function
 */
export async function getKV(key: string) {
  const response = await fetch(`${serverUrl}/kv/${key}`, {
    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.value;
}

/**
 * Helper to set data in the KV store via the Edge Function
 */
export async function setKV(key: string, value: any) {
  await fetch(`${serverUrl}/kv/${key}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value })
  });
}
