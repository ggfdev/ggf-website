'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './i18n';

type Language = 'tr' | 'en';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang] = useState<Language>('en');

    // Always use English, ignore local storage or browser settings for now
    const t = translations['en'];

    return (
        <LanguageContext.Provider value={{ lang, setLang: () => { }, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
