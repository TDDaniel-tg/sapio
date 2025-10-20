import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { ProductDeleteButton } from "@/components/admin/product-delete-button"

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your furniture catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="relative aspect-square bg-muted">
              {product.mainImage && (
                <Image
                  src={product.mainImage}
                  alt={product.nameEn}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{product.nameEn}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{product.category}</span>
                <span className="font-bold">${product.price || "On Request"}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                </Button>
                <ProductDeleteButton productId={product.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

