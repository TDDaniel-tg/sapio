"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useLocale, useTranslations } from "@/components/shared/translations-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

export function CatalogFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locale = useLocale()
  const t = useTranslations("catalog.filters")

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === "all" || !value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete("page") // Reset to first page
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push(pathname)
  }

  const categories = [
    { value: "all", label: locale === "ru" ? "Все" : "All" },
    { value: "ROCKING_CHAIRS", label: locale === "ru" ? "Кресла-качалки" : "Rocking Chairs" },
    { value: "CHAIRS", label: locale === "ru" ? "Стулья" : "Chairs" },
    { value: "TABLES", label: locale === "ru" ? "Столы" : "Tables" },
    { value: "SHELVES", label: locale === "ru" ? "Стеллажи" : "Shelves" },
    { value: "OTHER", label: locale === "ru" ? "Другое" : "Other" },
  ]

  const materials = [
    { value: "Oak", label: locale === "ru" ? "Дуб" : "Oak" },
    { value: "Pine", label: locale === "ru" ? "Сосна" : "Pine" },
    { value: "Metal", label: locale === "ru" ? "Металл" : "Metal" },
    { value: "Fabric", label: locale === "ru" ? "С обивкой" : "With Upholstery" },
  ]

  const priceRanges = [
    { value: "all", label: locale === "ru" ? "Все" : "All" },
    { value: "0-500", label: locale === "ru" ? "До $500" : "Up to $500" },
    { value: "500-1000", label: "$500-$1000" },
    { value: "1000+", label: locale === "ru" ? "$1000+" : "$1000+" },
    { value: "on-request", label: locale === "ru" ? "По запросу" : "On Request" },
  ]

  const currentCategory = searchParams.get("category") || "all"
  const currentMaterial = searchParams.get("material") || ""
  const currentPrice = searchParams.get("price") || "all"

  const hasFilters = currentCategory !== "all" || currentMaterial || currentPrice !== "all"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          {locale === "ru" ? "Фильтры" : "Filters"}
        </h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            {locale === "ru" ? "Сбросить" : "Clear"}
          </Button>
        )}
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {locale === "ru" ? "Категории" : "Categories"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => updateFilter("category", category.value)}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                currentCategory === category.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {category.label}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Materials */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {locale === "ru" ? "Материалы" : "Materials"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {materials.map((material) => (
            <label key={material.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentMaterial === material.value}
                onChange={(e) => updateFilter("material", e.target.checked ? material.value : "")}
                className="rounded border-gray-300"
              />
              <span>{material.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Price */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {locale === "ru" ? "Цена" : "Price"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => updateFilter("price", range.value)}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                currentPrice === range.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {range.label}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

