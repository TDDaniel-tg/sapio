import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { CatalogFilters } from "@/components/catalog/catalog-filters"
import { ProductGrid } from "@/components/catalog/product-grid"
import { useTranslations } from "next-intl"

interface CatalogPageProps {
  searchParams: {
    category?: string
    material?: string
    price?: string
    page?: string
  }
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const page = Number(searchParams.page) || 1
  const limit = 12
  const skip = (page - 1) * limit

  // Build filter conditions
  const where: any = { published: true }
  
  if (searchParams.category && searchParams.category !== "all") {
    where.category = searchParams.category.toUpperCase()
  }

  if (searchParams.material) {
    where.materials = {
      has: searchParams.material
    }
  }

  if (searchParams.price) {
    if (searchParams.price === "on-request") {
      where.priceOnRequest = true
    } else if (searchParams.price === "0-500") {
      where.price = { lte: 500 }
      where.priceOnRequest = false
    } else if (searchParams.price === "500-1000") {
      where.price = { gte: 500, lte: 1000 }
      where.priceOnRequest = false
    } else if (searchParams.price === "1000+") {
      where.price = { gte: 1000 }
      where.priceOnRequest = false
    }
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Catalog</h1>
          <p className="text-muted-foreground">
            Reliable furniture for everyday use. Wholesale from 5 units.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="mb-8 lg:mb-0">
            <CatalogFilters />
          </aside>

          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductGrid 
                products={products} 
                currentPage={page}
                totalPages={totalPages}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

