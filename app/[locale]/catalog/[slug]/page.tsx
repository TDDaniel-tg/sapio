import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductGallery } from "@/components/catalog/product-gallery"
import { ProductInfo } from "@/components/catalog/product-info"
import { ProductTabs } from "@/components/catalog/product-tabs"
import { RelatedProducts } from "@/components/catalog/related-products"

interface ProductPageProps {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  if (!product) return {}

  const name = params.locale === "ru" ? product.nameRu : product.nameEn
  const description = params.locale === "ru" ? product.shortDescRu : product.shortDescEn

  return {
    title: `${name} | Furniture Studio`,
    description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  if (!product || !product.published) {
    notFound()
  }

  // Increment views
  await prisma.product.update({
    where: { id: product.id },
    data: { views: { increment: 1 } },
  })

  // Get related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      published: true,
      id: { not: product.id },
    },
    take: 4,
  })

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <a href={`/${params.locale}`} className="hover:text-primary">
            {params.locale === "ru" ? "Главная" : "Home"}
          </a>
          {" > "}
          <a href={`/${params.locale}/catalog`} className="hover:text-primary">
            {params.locale === "ru" ? "Каталог" : "Catalog"}
          </a>
          {" > "}
          <span className="text-foreground">
            {params.locale === "ru" ? product.nameRu : product.nameEn}
          </span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery product={product} />
          <ProductInfo product={product} locale={params.locale} />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} locale={params.locale} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} locale={params.locale} />
        )}
      </div>
    </div>
  )
}

