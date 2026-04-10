import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const serverUrl = `${supabaseUrl}/functions/v1/make-server-5d4be467`;
export { publicAnonKey };


/**
 * Helper to fetch data from the KV store via the Edge Function
 */
export async function getKV(key: string) {
  try {
    const response = await fetch(`${serverUrl}/kv/${key}`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    if (!response.ok) {
      console.warn(`GET KV failed for key "${key}": ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    return data.value;
  } catch (err) {
    console.error(`Error in getKV for "${key}":`, err);
    return null;
  }
}

/**
 * Helper to set data in the KV store via the Edge Function
 */
export async function setKV(key: string, value: any) {
  try {
    const response = await fetch(`${serverUrl}/kv/${key}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }
    
    return true;
  } catch (err) {
    console.error(`Error in setKV for "${key}":`, err);
    throw err;
  }
}
