"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useTranslations } from "./translations-provider"

interface FooterProps {
  locale: string
}

interface Settings {
  phone?: string | null
  email?: string | null
  address?: string | null
  whatsapp?: string | null
  telegram?: string | null
  instagram?: string | null
  facebook?: string | null
  youtube?: string | null
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
  const [settings, setSettings] = useState<Settings | null>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    // Загружаем настройки с сервера
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => setSettings(null))
  }, [])

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-lg">Furniture Studio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">{t("navigation")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalog`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {tNav("catalog")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/portfolio`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {tNav("portfolio")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold mb-4">{t("contacts")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{settings?.phone || "+7 (XXX) XXX-XX-XX"}</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{settings?.email || "info@furniture-studio.com"}</span>
              </li>
              {settings?.address && (
                <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">{t("social")}</h3>
            <div className="flex space-x-3">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Furniture Studio. {t("rights")}.</p>
        </div>
      </div>
    </footer>
  )
}

