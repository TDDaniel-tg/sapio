"use client"

import { Product } from "@prisma/client"
import { useLocale } from "@/components/shared/translations-provider"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale()
  const name = locale === "ru" ? product.nameRu : product.nameEn
  const shortDesc = locale === "ru" ? product.shortDescRu : product.shortDescEn
  const imageUrl = product.mainImage || product.images[0] || "/images/placeholder-product.jpg"

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
        <Link href={`/${locale}/catalog/${product.slug}`}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {product.featured && (
              <Badge className="absolute top-4 right-4">
                {locale === "ru" ? "Популярное" : "Popular"}
              </Badge>
            )}
          </div>
        </Link>

        <CardContent className="p-4 space-y-3">
          <Link href={`/${locale}/catalog/${product.slug}`}>
            <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>

          {shortDesc && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {shortDesc}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-xl font-bold text-primary">
              {product.priceOnRequest 
                ? (locale === "ru" ? "По запросу" : "On Request")
                : formatPrice(product.price || 0, product.currency)
              }
            </div>

            <Button 
              asChild 
              variant="ghost" 
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Link href={`/${locale}/catalog/${product.slug}`}>
                {locale === "ru" ? "Подробнее" : "View"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

