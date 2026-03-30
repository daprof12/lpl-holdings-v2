import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUserPreferences } from '../hooks/useSupabaseStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Get current user from AuthContext if available (optional)
  const [userId, setUserId] = useState<string | null>(null);
  
  // Listen for auth changes from localStorage
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('gross_current_user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setUserId(user.id);
        } catch (e) {
          setUserId(null);
        }
      } else {
        setUserId(null);
      }
    };
    
    checkAuth();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);
  
  const { preferences, updatePreference, loading } = useUserPreferences(userId);
  const [theme, setTheme] = useState<Theme>(() => {
    // Try localStorage first for immediate load (before Supabase loads)
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  // Sync theme from Supabase preferences
  useEffect(() => {
    if (!loading && preferences.theme) {
      setTheme(preferences.theme);
    }
  }, [preferences.theme, loading]);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Also keep in localStorage for quick load
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update in Supabase if user is logged in
    if (userId) {
      await updatePreference('theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}