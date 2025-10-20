"use client"

import { createContext, useContext } from "react"

type Messages = Record<string, any>

const TranslationsContext = createContext<{
  locale: string
  messages: Messages
  t: (key: string) => string
}>({
  locale: "ru",
  messages: {},
  t: (key) => key,
})

export function TranslationsProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: Messages
}) {
  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = messages
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <TranslationsContext.Provider value={{ locale, messages, t }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export function useTranslations(namespace?: string) {
  const { messages } = useContext(TranslationsContext)
  
  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    const keys = fullKey.split(".")
    let value: any = messages
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }
}

export function useLocale() {
  const { locale } = useContext(TranslationsContext)
  return locale
}


