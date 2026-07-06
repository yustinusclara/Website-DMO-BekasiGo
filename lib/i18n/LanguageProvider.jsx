'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import en from '@/locales/en.json'
import id from '@/locales/id.json'

const LanguageContext = createContext(null)
const dictionaries = { en, id }

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('id')

  useEffect(() => {
    // Read locale from cookie on mount
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1]
    
    if (cookieLocale === 'en' || cookieLocale === 'id') {
      setLocale(cookieLocale)
    }
  }, [])

  const changeLocale = (newLocale) => {
    if (newLocale === 'en' || newLocale === 'id') {
      setLocale(newLocale)
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    }
  }

  const t = (keyPath) => {
    const dictionary = dictionaries[locale] || dictionaries['id']
    return keyPath.split('.').reduce((acc, key) => acc && acc[key], dictionary) || keyPath
  }

  return (
    <LanguageContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within a LanguageProvider')
  return ctx
}
