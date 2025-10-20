import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductEditForm } from "@/components/admin/product-edit-form"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>
      <ProductEditForm product={product} />
    </div>
  )
}


