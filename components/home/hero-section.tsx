"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { CldVideoPlayer } from "next-cloudinary"
import "next-cloudinary/dist/cld-video-player.css"

interface HeroSectionProps {
  videoUrl?: string | null
  titleRu?: string | null
  titleEn?: string | null
  subtitleRu?: string | null
  subtitleEn?: string | null
  locale: string
}

export function HeroSection({ 
  videoUrl, 
  titleRu, 
  titleEn, 
  subtitleRu, 
  subtitleEn,
  locale 
}: HeroSectionProps) {
  const messages = locale === 'ru' 
    ? require('../../messages/ru.json')
    : require('../../messages/en.json')
  
  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = messages
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  // Use settings or fallback to translations
  const title = locale === 'ru' 
    ? (titleRu || t("hero.title"))
    : (titleEn || t("hero.title"))
  
  const subtitle = locale === 'ru'
    ? (subtitleRu || t("hero.subtitle"))
    : (subtitleEn || t("hero.subtitle"))

  // Use Cloudinary video if provided, otherwise fallback to local
  const shouldUseCloudinary = videoUrl && videoUrl.includes("cloudinary")
  const localVideoUrl = "/videos/hero-video.mp4"

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {shouldUseCloudinary && videoUrl ? (
          <div className="w-full h-full">
            <CldVideoPlayer
              src={videoUrl}
              width="1920"
              height="1080"
              autoplay="always"
              loop
              muted
              controls={false}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl || localVideoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="text-lg px-8">
            <Link href={`/${locale}/catalog`}>{t("hero.viewCatalog")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white hover:bg-white/20">
            <Link href={`/${locale}/contact`}>{t("hero.getConsultation")}</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">{t("hero.scrollDown")}</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}

