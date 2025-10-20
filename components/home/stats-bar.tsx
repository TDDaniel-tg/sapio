"use client"

import { useTranslations } from "@/components/shared/translations-provider"
import { motion } from "framer-motion"

export function StatsBar() {
  const t = useTranslations("stats")

  const stats = [
    { number: "50+", label: t("projects") },
    { number: "2", label: t("experience") },
    { number: "15+", label: t("clients") },
  ]

  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

