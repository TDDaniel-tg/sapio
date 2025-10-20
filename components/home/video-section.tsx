"use client"

import { useLocale } from "@/components/shared/translations-provider"
import { motion } from "framer-motion"
import ReactPlayer from "react-player/lazy"

export function VideoSection() {
  const locale = useLocale()

  const videos = [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: locale === "ru" ? "Как мы делаем кресло" : "How we make chairs",
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: locale === "ru" ? "Наш цех" : "Our workshop",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
        >
          {locale === "ru" ? "Производство изнутри" : "Inside Our Production"}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold">{video.title}</h3>
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height="100%"
                  controls
                  light
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

