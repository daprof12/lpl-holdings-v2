import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

export const getKV = async (key: string): Promise<any> => {
    const { data, error } = await supabase
        .from("kv_store_5d4be467")
        .select("value")
        .eq("key", key)
        .maybeSingle();

    if (error) {
        console.error(`[KV] Error getting key "${key}":`, error);
        throw error;
    }
    return data?.value;
};

export const setKV = async (key: string, value: any): Promise<void> => {
    const { error } = await supabase
        .from("kv_store_5d4be467")
        .upsert({ key, value });

    if (error) {
        console.error(`[KV] Error setting key "${key}":`, error);
        throw error;
    }
};

export const delKV = async (key: string): Promise<void> => {
    const { error } = await supabase
        .from("kv_store_5d4be467")
        .delete()
        .eq("key", key);

    if (error) {
        console.error(`[KV] Error deleting key "${key}":`, error);
        throw error;
    }
};

export const serverUrl = `${supabaseUrl}/functions/v1/make-server-5d4be467`;
export { publicAnonKey };
