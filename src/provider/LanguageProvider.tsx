import React, { useState, FC } from 'react';
import i18n from '../i18n';

interface LanguageContextProps {
    language: string;
    changeLanguage: (lng: string) => void;
}

export const LanguageContext = React.createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
    children: React.ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<string>(i18n.language);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};