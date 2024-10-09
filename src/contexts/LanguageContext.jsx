import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  es: {
    home: "Inicio",
    devices: "Dispositivos",
    preview: "Vista previa",
    enterUrl: "Ingresa la URL del sitio",
    startPreview: "Comienza tu previsualización",
    enterUrlDescription: "Ingresa la URL del sitio que deseas previsualizar y agregaremos automáticamente un dispositivo para ti.",
    siteUrl: "URL del sitio:",
    mobile: "Móvil",
    tablet: "Tableta",
    desktop: "Escritorio",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
    invalidUrl: "URL inválida",
    pleaseEnterUrl: "Por favor, ingresa una URL válida",
    createdWithAI: "Creado con IA"
  },
  en: {
    home: "Home",
    devices: "Devices",
    preview: "Preview",
    enterUrl: "Enter the site URL",
    startPreview: "Start your preview",
    enterUrlDescription: "Enter the URL of the site you want to preview and we'll automatically add a device for you.",
    siteUrl: "Site URL:",
    mobile: "Mobile",
    tablet: "Tablet",
    desktop: "Desktop",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    invalidUrl: "Invalid URL",
    pleaseEnterUrl: "Please enter a valid URL",
    createdWithAI: "Created with AI"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language.split('-')[0];
      return translations[browserLang] ? browserLang : 'es';
    };

    setLanguage(detectLanguage());
  }, []);

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