"use client"

import { Portfolio } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface PortfolioCardProps {
  project: Portfolio
  locale: string
}

export function PortfolioCard({ project, locale }: PortfolioCardProps) {
  const title = locale === "ru" ? project.titleRu : project.titleEn
  const description = locale === "ru" ? project.descriptionRu : project.descriptionEn
  const coverImage = project.coverImage || project.images[0] || "/images/placeholder-portfolio.jpg"

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
        <Link href={`/${locale}/portfolio/${project.slug}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {project.featured && (
              <Badge className="absolute top-4 right-4">
                {locale === "ru" ? "Рекомендуем" : "Featured"}
              </Badge>
            )}
          </div>
        </Link>

        <CardContent className="p-6 space-y-3">
          <Link href={`/${locale}/portfolio/${project.slug}`}>
            <h3 className="font-bold text-xl line-clamp-1 hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {project.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
            )}
            {project.completedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(project.completedAt, locale)}</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground line-clamp-2">{description}</p>

          <Link
            href={`/${locale}/portfolio/${project.slug}`}
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all pt-2"
          >
            {locale === "ru" ? "Смотреть кейс" : "View Case"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

