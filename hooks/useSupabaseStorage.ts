import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-5d4be467`;

interface UseSupabaseStorageOptions<T> {
  key: string;
  defaultValue: T;
  autoSync?: boolean; // Auto-sync with server
}

export function useSupabaseStorage<T>(options: UseSupabaseStorageOptions<T>) {
  const { key, defaultValue, autoSync = true } = options;
  
  // Memoize defaultValue to prevent infinite loops
  const stableDefaultValue = useMemo(() => defaultValue, []);
  
  const [data, setData] = useState<T>(stableDefaultValue);
  const [loading, setLoading] = useState(autoSync);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  // Fetch data from server
  const fetchData = useCallback(async () => {
    if (!isMountedRef.current) return stableDefaultValue;
    
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/${key}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Don't log errors for user preferences - they might not exist yet
        if (!key.includes('preferences')) {
          console.warn(`Server returned ${response.status} for ${key}`);
        }
        
        // Return default value instead of throwing
        if (isMountedRef.current) {
          setData(stableDefaultValue);
          setLoading(false);
        }
        return stableDefaultValue;
      }

      const result = await response.json();
      
      if (isMountedRef.current) {
        setData(result);
        setLoading(false);
      }
      return result;
    } catch (err: any) {
      // Only log if it's not a network error (server might not be deployed yet)
      if (!err.message.includes('Failed to fetch')) {
        console.error(`Error fetching ${key}:`, err);
      }
      
      if (isMountedRef.current) {
        setError(err.message);
        setLoading(false);
        // Return default value on error
        setData(stableDefaultValue);
      }
      return stableDefaultValue;
    }
  }, [key, stableDefaultValue]);

  // Update data on server
  const updateData = useCallback(async (newData: Partial<T>) => {
    try {
      setError(null);

      const response = await fetch(`${API_BASE}/${key}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        // For preferences, silently fall back to local-only update
        if (key.includes('preferences')) {
          if (isMountedRef.current) {
            setData((prev) => ({ ...prev, ...newData }));
          }
          return true;
        }
        throw new Error(`Failed to update: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        if (isMountedRef.current) {
          setData((prev) => ({ ...prev, ...newData }));
        }
        return true;
      } else {
        throw new Error(result.error || 'Update failed');
      }
    } catch (err: any) {
      // For preferences or network errors, silently apply locally
      if (key.includes('preferences') || err.message.includes('Failed to fetch')) {
        if (isMountedRef.current) {
          setData((prev) => ({ ...prev, ...newData }));
        }
        return true;
      }
      console.error(`Error updating ${key}:`, err);
      if (isMountedRef.current) {
        setError(err.message);
      }
      return false;
    }
  }, [key]);

  // Load data on mount - only when key changes
  useEffect(() => {
    isMountedRef.current = true;
    
    if (autoSync) {
      fetchData();
    } else {
      setLoading(false);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [key]); // Only trigger when key changes

  return {
    data,
    setData,
    loading,
    error,
    refetch: fetchData,
    update: updateData,
  };
}

// Specialized hook for user preferences
export function useUserPreferences(userId: string | null) {
  const enabled = !!userId;
  
  const {
    data: preferences,
    loading,
    error,
    update,
    refetch,
  } = useSupabaseStorage({
    key: userId ? `users/${userId}/preferences` : 'users/guest/preferences',
    defaultValue: {
      theme: 'light' as 'light' | 'dark',
      language: 'en' as 'en' | 'es' | 'fr' | 'de' | 'zh',
      tradingMode: 'live' as 'live',
    },
    autoSync: enabled,
  });

  const updatePreference = useCallback(async (key: string, value: any) => {
    return await update({ [key]: value });
  }, [update]);

  return {
    preferences,
    loading,
    error,
    updatePreference,
    refetch,
  };
}

// Hook for platform settings (admin)
export function usePlatformSettings(settingType: string) {
  return useSupabaseStorage({
    key: `settings/${settingType}`,
    defaultValue: [],
    autoSync: true,
  });
}

// Hook for bulk data storage
export function useBulkData<T>(dataType: string, defaultValue: T = [] as any) {
  return useSupabaseStorage({
    key: `data/${dataType}`,
    defaultValue,
    autoSync: true,
  });
}

// Hook for trading data
export function useTradingData(userId: string | null) {
  const enabled = !!userId;
  
  return useSupabaseStorage({
    key: userId ? `trading/${userId}/live` : `trading/guest/live`,
    defaultValue: {
      balance: 0,
      equity: 0,
      margin: 0,
      freeMargin: 0,
      marginLevel: 0,
      positions: [],
      orders: [],
      history: [],
    },
    autoSync: enabled,
  });
}

// Hook for investment data
export function useInvestmentData(userId: string | null) {
  const enabled = !!userId;
  
  return useSupabaseStorage({
    key: userId ? `investments/${userId}` : 'investments/guest',
    defaultValue: {
      wallet: 0,
      ecn: 0,
      ipo: 0,
    },
    autoSync: enabled,
  });
}