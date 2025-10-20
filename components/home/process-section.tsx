"use client"

import { useTranslations } from "@/components/shared/translations-provider"
import { motion } from "framer-motion"
import { MessageSquare, Phone, Box, Factory, Truck } from "lucide-react"

export function ProcessSection() {
  const t = useTranslations("process")

  const steps = [
    {
      icon: MessageSquare,
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      icon: Phone,
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      icon: Box,
      title: t("step3.title"),
      description: t("step3.description"),
    },
    {
      icon: Factory,
      title: t("step4.title"),
      description: t("step4.description"),
    },
    {
      icon: Truck,
      title: t("step5.title"),
      description: t("step5.description"),
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
        >
          {t("title")}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex gap-6 pb-12"
              >
                {/* Timeline line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-border" />
                )}

                {/* Icon */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="text-sm text-muted-foreground mb-1">
                    {index + 1} {index < 10 ? "0" : ""}{index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

