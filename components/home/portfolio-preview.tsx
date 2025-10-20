"use client"

import { Portfolio } from "@prisma/client"
import { useLocale } from "@/components/shared/translations-provider"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface PortfolioPreviewProps {
  projects: Portfolio[]
}

export function PortfolioPreview({ projects }: PortfolioPreviewProps) {
  const locale = useLocale()

  if (projects.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {locale === "ru" ? "Наши проекты" : "Our Projects"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => {
            const title = locale === "ru" ? project.titleRu : project.titleEn
            const description = locale === "ru" ? project.descriptionRu : project.descriptionEn
            const coverImage = project.coverImage || "/images/placeholder-portfolio.jpg"

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={coverImage}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {description}
                    </p>
                    <Link
                      href={`/${locale}/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
                    >
                      {locale === "ru" ? "Смотреть кейс" : "View Case"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline">
            <Link href={`/${locale}/portfolio`}>
              {locale === "ru" ? "Все проекты" : "All Projects"} 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}


