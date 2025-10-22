"use client"

import { useTranslations } from "@/components/shared/translations-provider"
import { motion } from "framer-motion"
import { Wrench, Shield, Factory, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function WhyUsSection() {
  const t = useTranslations("whyUs")

  const features = [
    {
      icon: Wrench,
      title: t("fullCycle.title"),
      description: t("fullCycle.description"),
    },
    {
      icon: Shield,
      title: t("design.title"),
      description: t("design.description"),
    },
    {
      icon: Factory,
      title: t("production.title"),
      description: t("production.description"),
    },
    {
      icon: ShoppingCart,
      title: t("geography.title"),
      description: t("geography.description"),
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

