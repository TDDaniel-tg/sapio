"use client"

import { Product } from "@prisma/client"
import { useLocale } from "@/components/shared/translations-provider"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { formatPrice } from "@/lib/utils"

interface FeaturedProductSectionProps {
  product: Product
}

export function FeaturedProductSection({ product }: FeaturedProductSectionProps) {
  const locale = useLocale()
  const name = locale === "ru" ? product.nameRu : product.nameEn
  const description = locale === "ru" ? product.descriptionRu : product.descriptionEn

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
          >
            {product.mainImage && (
              <Image
                src={product.mainImage}
                alt={name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge variant="default" className="text-sm">
              {locale === "ru" ? "ХИТ ПРОДАЖ" : "BESTSELLER"}
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold">{name}</h2>
            
            <p className="text-lg text-muted-foreground">
              {product.shortDescRu || description.substring(0, 150)}
            </p>

            <div className="space-y-2">
              {product.dimensions && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">
                    {locale === "ru" ? "Размеры:" : "Dimensions:"}
                  </span>
                  <span className="font-medium">{product.dimensions}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">
                    {locale === "ru" ? "Вес:" : "Weight:"}
                  </span>
                  <span className="font-medium">{product.weight}</span>
                </div>
              )}
              {product.materials.length > 0 && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">
                    {locale === "ru" ? "Материалы:" : "Materials:"}
                  </span>
                  <span className="font-medium">{product.materials.join(", ")}</span>
                </div>
              )}
            </div>

            <div className="text-3xl font-bold text-primary">
              {product.priceOnRequest
                ? (locale === "ru" ? "По запросу" : "On Request")
                : `${locale === "ru" ? "от" : "from"} ${formatPrice(product.price || 0, product.currency)}`
              }
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1">
                <Link href={`/${locale}/contact`}>
                  {locale === "ru" ? "Заказать" : "Order"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1">
                <Link href={`/${locale}/catalog/${product.slug}`}>
                  {locale === "ru" ? "Подробнее" : "View Details"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


