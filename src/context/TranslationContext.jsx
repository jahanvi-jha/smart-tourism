"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { translateText } from "../services/translator"
import { speechToText, textToSpeech } from "../services/speech"

const TranslationContext = createContext()

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem("preferredLanguage") || "en")
  const [cache, setCache] = useState({})

  useEffect(() => {
    localStorage.setItem("preferredLanguage", language)
  }, [language])

  // ✅ synchronous t so React can render safely
  const t = (text) => {
    if (language === "en") return text

    const key = `${language}-${text}`
    if (cache[key]) return cache[key]

    // async translation in background
    translateText(text, language).then((translated) => {
      setCache((prev) => ({ ...prev, [key]: translated }))
    })

    // fallback: show original until translation arrives
    return text
  }

  const speak = async (text) => {
    await textToSpeech(text, language)
  }

  const listen = async () => {
    return await speechToText(language)
  }
  const preload = async (text) => {
  await t(text) // triggers translation and caches result
}


  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, speak, listen, preload }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  return useContext(TranslationContext)
}
