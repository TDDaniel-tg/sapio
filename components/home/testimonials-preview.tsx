"use client"

import { Testimonial } from "@prisma/client"
import { useLocale } from "@/components/shared/translations-provider"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialsPreviewProps {
  testimonials: Testimonial[]
}

export function TestimonialsPreview({ testimonials }: TestimonialsPreviewProps) {
  const locale = useLocale()

  if (testimonials.length === 0) {
    return null
  }

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
          {locale === "ru" ? "Отзывы клиентов" : "Client Reviews"}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const text = locale === "ru" ? testimonial.textRu : testimonial.textEn

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{text}"</p>
                    <div className="flex items-center gap-4 pt-4 border-t">
                      {testimonial.avatar && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.position}
                          {testimonial.company && `, ${testimonial.company}`}
                        </div>
                      </div>
                    </div>
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


