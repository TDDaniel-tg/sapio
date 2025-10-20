"use client"

import { useState } from "react"
import { Portfolio } from "@prisma/client"
import { PortfolioCard } from "./portfolio-card"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

interface PortfolioGridProps {
  projects: Portfolio[]
  locale: string
}

export function PortfolioGrid({ projects, locale }: PortfolioGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  const categories = [
    { value: "all", label: locale === "ru" ? "Все проекты" : "All Projects" },
    { value: "cafe", label: locale === "ru" ? "Кафе/Рестораны" : "Cafes/Restaurants" },
    { value: "office", label: locale === "ru" ? "Офисы" : "Offices" },
    { value: "retail", label: locale === "ru" ? "Магазины" : "Retail" },
    { value: "residential", label: locale === "ru" ? "Жилые интерьеры" : "Residential" },
  ]

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      router.push(`/${locale}/portfolio`)
    } else {
      router.push(`/${locale}/portfolio?category=${category}`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={currentCategory === category.value ? "default" : "outline"}
            onClick={() => handleCategoryChange(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {locale === "ru" ? "Проекты не найдены" : "No projects found"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}

