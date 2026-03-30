import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUserPreferences } from '../hooks/useSupabaseStorage';

type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  loading: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'hero.headline': 'Trade 3,000+ Assets with Confidence',
    'hero.subheadline': 'Experience professional-grade trading with real-time data, AI automation, and bank-level security',
    'hero.cta.primary': 'Create Free Account',
    'hero.cta.secondary': 'View Dashboard',
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.assets': 'Assets',
    'nav.pricing': 'Pricing',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
  },
  es: {
    'hero.headline': 'Opere más de 3,000 activos con confianza',
    'hero.subheadline': 'Experimente el trading de nivel profesional con datos en tiempo real, automatización AI y seguridad bancaria',
    'hero.cta.primary': 'Crear cuenta gratis',
    'hero.cta.secondary': 'Ver tablero',
    'nav.home': 'Inicio',
    'nav.features': 'Características',
    'nav.assets': 'Activos',
    'nav.pricing': 'Precios',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar sesión',
    'nav.register': 'Registrarse',
  },
  fr: {
    'hero.headline': 'Tradez plus de 3 000 actifs en toute confiance',
    'hero.subheadline': 'Profitez d\'un trading de niveau professionnel avec des données en temps réel, l\'automatisation IA et une sécurité bancaire',
    'hero.cta.primary': 'Créer un compte gratuit',
    'hero.cta.secondary': 'Voir le tableau de bord',
    'nav.home': 'Accueil',
    'nav.features': 'Fonctionnalités',
    'nav.assets': 'Actifs',
    'nav.pricing': 'Tarifs',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
  },
  de: {
    'hero.headline': 'Handeln Sie über 3.000 Vermögenswerte mit Zuversicht',
    'hero.subheadline': 'Erleben Sie professionelles Trading mit Echtzeitdaten, KI-Automatisierung und Banksicherheit',
    'hero.cta.primary': 'Kostenloses Konto erstellen',
    'hero.cta.secondary': 'Dashboard ansehen',
    'nav.home': 'Startseite',
    'nav.features': 'Funktionen',
    'nav.assets': 'Vermögenswerte',
    'nav.pricing': 'Preise',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.login': 'Anmelden',
    'nav.register': 'Registrieren',
  },
  zh: {
    'hero.headline': '自信交易3000+资产',
    'hero.subheadline': '体验专业级交易，实时数据、AI自动化和银行级安全',
    'hero.cta.primary': '创建免费账户',
    'hero.cta.secondary': '查看仪表板',
    'nav.home': '首页',
    'nav.features': '功能',
    'nav.assets': '资产',
    'nav.pricing': '定价',
    'nav.about': '关于我们',
    'nav.contact': '联系',
    'nav.login': '登录',
    'nav.register': '注册',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get current user from localStorage (optional, doesn't depend on AuthContext)
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
  const [language, setLanguageState] = useState<Language>(() => {
    // Try localStorage first for immediate load (before Supabase loads)
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  // Sync language from Supabase preferences
  useEffect(() => {
    if (!loading && preferences.language) {
      setLanguageState(preferences.language);
    }
  }, [preferences.language, loading]);

  // Keep localStorage in sync for quick load
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    
    // Update in Supabase if user is logged in
    if (userId) {
      await updatePreference('language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}