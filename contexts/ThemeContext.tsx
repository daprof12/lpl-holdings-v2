import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUserPreferences } from '../hooks/useSupabaseStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

import { useAuth } from './AuthContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { currentUser, userPreferences, updatePreferences } = useAuth();
  
  const [theme, setTheme] = useState<Theme>(() => {
    // Immediate load from localStorage fallback
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  // Sync theme from AuthContext preferences
  useEffect(() => {
    if (userPreferences?.theme) {
      setTheme(userPreferences.theme);
    }
  }, [userPreferences?.theme]);
  
  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (currentUser) {
      await updatePreferences({ theme: newTheme });
    }
    
    // Fallback for immediate load on next refresh
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loading: false }}>
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