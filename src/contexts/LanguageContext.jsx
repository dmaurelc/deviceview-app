import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  es: {
    home: "Inicio",
    devices: "Dispositivos",
    preview: "Vista previa",
    enterUrl: "Ingresa la URL del sitio",
    startPreview: "Comienza tu previsualización",
    siteUrl: "URL del sitio:",
    mobile: "Móvil",
    tablet: "Tableta",
    desktop: "Escritorio",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
  en: {
    home: "Home",
    devices: "Devices",
    preview: "Preview",
    enterUrl: "Enter the site URL",
    startPreview: "Start your preview",
    siteUrl: "Site URL:",
    mobile: "Mobile",
    tablet: "Tablet",
    desktop: "Desktop",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};