import { Product } from "@prisma/client"
import { ProductCard } from "./product-card"

interface RelatedProductsProps {
  products: Product[]
  locale: string
}

export function RelatedProducts({ products, locale }: RelatedProductsProps) {
  return (
    <section className="mt-16 pt-16 border-t">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        {locale === "ru" ? "Вам может понравиться" : "You May Also Like"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

