	
	
ÃäÇ

```jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LangContext = createContext(null);
const rtlLanguages = ['ar', 'fa', 'ur', 'he'];

export const languagesList = [
  { code: 'ar', name: 'ÇáÚÑÈíÉ' },
  { code: 'en', name: 'ÇáÅäÌáíÒíÉ' },
  { code: 'zh', name: 'ÇáÕíäíÉ ÇáãÈÓØÉ' },
  { code: 'zh-TW', name: 'ÇáÕíäíÉ ÇáÊÞáíÏíÉ' },
  { code: 'es', name: 'ÇáÅÓÈÇäíÉ' },
  { code: 'fr', name: 'ÇáÝÑäÓíÉ' },
  { code: 'de', name: 'ÇáÃáãÇäíÉ' },
  { code: 'it', name: 'ÇáÅíØÇáíÉ' },
  { code: 'pt', name: 'ÇáÈÑÊÛÇáíÉ' },
  { code: 'pt-BR', name: 'ÇáÈÑÊÛÇáíÉ ÇáÈÑÇÒíáíÉ' },
  { code: 'ru', name: 'ÇáÑæÓíÉ' },
  { code: 'ja', name: 'ÇáíÇÈÇäíÉ' },
  { code: 'ko', name: 'ÇáßæÑíÉ' },
  { code: 'tr', name: 'ÇáÊÑßíÉ' },
  { code: 'fa', name: 'ÇáÝÇÑÓíÉ' },
  { code: 'ur', name: 'ÇáÃÑÏíÉ' },
  { code: 'hi', name: 'ÇáåäÏíÉ' },
  { code: 'bn', name: 'ÇáÈäÛÇáíÉ' },
  { code: 'id', name: 'ÇáÅäÏæäíÓíÉ' },
  { code: 'ms', name: 'ÇáãÇáíÒíÉ' },
  { code: 'th', name: 'ÇáÊÇíáÇäÏíÉ' },
  { code: 'vi', name: 'ÇáÝíÊäÇãíÉ' },
  { code: 'fil', name: 'ÇáÝáÈíäíÉ' },
  { code: 'sw', name: 'ÇáÓæÇÍíáíÉ' },
  { code: 'nl', name: 'ÇáåæáäÏíÉ' },
  { code: 'sv', name: 'ÇáÓæíÏíÉ' },
  { code: 'no', name: 'ÇáäÑæíÌíÉ' },
  { code: 'da', name: 'ÇáÏäãÇÑßíÉ' },
  { code: 'fi', name: 'ÇáÝäáäÏíÉ' },
  { code: 'el', name: 'ÇáíæäÇäíÉ' },
  { code: 'he', name: 'ÇáÚÈÑíÉ' },
  { code: 'pl', name: 'ÇáÈæáäÏíÉ' },
  { code: 'cs', name: 'ÇáÊÔíßíÉ' },
  { code: 'sk', name: 'ÇáÓáæÝÇßíÉ' },
  { code: 'uk', name: 'ÇáÃæßÑÇäíÉ' },
  { code: 'ro', name: 'ÇáÑæãÇäíÉ' },
  { code: 'hu', name: 'ÇáãÌÑíÉ' },
  { code: 'bg', name: 'ÇáÈáÛÇÑíÉ' },
  { code: 'hr', name: 'ÇáßÑæÇÊíÉ' },
  { code: 'sr', name: 'ÇáÕÑÈíÉ' },
  { code: 'sl', name: 'ÇáÓáæÝíäíÉ' },
  { code: 'sq', name: 'ÇáÃáÈÇäíÉ' },
  { code: 'is', name: 'ÇáÂíÓáäÏíÉ' },
  { code: 'ga', name: 'ÇáÃíÑáäÏíÉ' },
  { code: 'lt', name: 'ÇááíÊæÇäíÉ' },
  { code: 'lv', name: 'ÇááÇÊÝíÉ' },
  { code: 'et', name: 'ÇáÅÓÊæäíÉ' },
  { code: 'kk', name: 'ÇáßÇÒÇÎíÉ' },
  { code: 'uz', name: 'ÇáÃæÒÈßíÉ' },
  { code: 'az', name: 'ÇáÃÐÑÈíÌÇäíÉ' },
  { code: 'hy', name: 'ÇáÃÑãäíÉ' },
  { code: 'ka', name: 'ÇáÌæÑÌíÉ' },
  { code: 'ne', name: 'ÇáäíÈÇáíÉ' },
  { code: 'si', name: 'ÇáÓäåÇáíÉ' },
  { code: 'ta', name: 'ÇáÊÇãíáíÉ' },
  { code: 'te', name: 'ÇáÊíáæÛæíÉ' },
  { code: 'mr', name: 'ÇáãÇÑÇËíÉ' },
  { code: 'am', name: 'ÇáÃãåÑíÉ' },
  { code: 'km', name: 'ÇáÎãíÑíÉ' },
  { code: 'my', name: 'ÇáÈæÑãíÉ' },
  { code: 'lo', name: 'ÇááÇæíÉ' }
];

const isSupported = (code) => languagesList.some((l) => l.code === code);

const getInitialLang = () => {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('trulyglobal_lang');
    if (saved && isSupported(saved)) return saved;
  } catch {}
  const full = typeof navigator !== 'undefined' ? navigator.language : 'en';
  if (isSupported(full)) return full;
  const base = full.split('-')[0];
  return isSupported(base) ? base : 'en';
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('trulyglobal_lang', lang);
    } catch {}
    const baseLang = lang.split('-')[0];
    document.documentElement.dir = rtlLanguages.includes(baseLang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, languagesList }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang íÌÈ ÇÓÊÎÏÇãå ÏÇÎá LangProvider');
  return ctx;
};

```

