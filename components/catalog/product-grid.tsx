"use client"

import { Product } from "@prisma/client"
import { ProductCard } from "./product-card"
import { Pagination } from "@/components/shared/pagination"
import { useLocale } from "@/components/shared/translations-provider"

interface ProductGridProps {
  products: Product[]
  currentPage: number
  totalPages: number
}

export function ProductGrid({ products, currentPage, totalPages }: ProductGridProps) {
  const locale = useLocale()

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {locale === "ru" ? "Товары не найдены" : "No products found"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-sm text-muted-foreground">
        {locale === "ru" 
          ? `Найдено товаров: ${products.length}`
          : `Found ${products.length} products`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}

