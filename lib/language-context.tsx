"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

export type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (en: string, es: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {},
  t: (en: string) => en,
})

function getInitialLanguage(): Language {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("portfolio-lang")
    if (stored === "en" || stored === "es") return stored
  }
  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem("portfolio-lang", language)
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }, [])

  const t = useCallback(
    (en: string, es: string) => (language === "en" ? en : es),
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
