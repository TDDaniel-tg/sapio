import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        nameRu: body.nameRu,
        nameEn: body.nameEn,
        descriptionRu: body.descriptionRu,
        descriptionEn: body.descriptionEn,
        shortDescRu: body.shortDescRu,
        shortDescEn: body.shortDescEn,
        category: body.category,
        materials: body.materials || [],
        dimensions: body.dimensions,
        weight: body.weight,
        price: body.price,
        priceOnRequest: body.priceOnRequest,
        currency: body.currency,
        mainImage: body.mainImage,
        images: body.mainImage ? [body.mainImage] : [],
        published: body.published,
        featured: body.featured,
      },
    })

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}


