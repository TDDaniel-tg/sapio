"use client"

import { useTranslations, useLocale } from "@/components/shared/translations-provider"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CategoriesSection() {
  const t = useTranslations("categories")
  const locale = useLocale()

  const categories = [
    {
      slug: "rocking-chairs",
      title: t("rockingChairs"),
      image: "/images/category-rocking-chairs.jpg",
      featured: true,
    },
    {
      slug: "chairs",
      title: t("chairs"),
      image: "/images/category-chairs.jpg",
    },
    {
      slug: "tables",
      title: t("tables"),
      image: "/images/category-tables.jpg",
    },
    {
      slug: "shelves",
      title: t("shelves"),
      image: "/images/category-shelves.jpg",
    },
    {
      slug: "other",
      title: t("other"),
      image: "/images/category-other.jpg",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={category.featured ? "md:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                href={`/${locale}/catalog?category=${category.slug}`}
                className="group block relative overflow-hidden rounded-2xl aspect-square hover:shadow-xl transition-shadow"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{locale === "ru" ? "Смотреть" : "View"}</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

