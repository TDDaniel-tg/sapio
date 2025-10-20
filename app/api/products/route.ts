import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateSlug } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const slug = generateSlug(body.nameEn)

    const product = await prisma.product.create({
      data: {
        slug,
        nameRu: body.nameRu,
        nameEn: body.nameEn,
        descriptionRu: body.descriptionRu,
        descriptionEn: body.descriptionEn,
        shortDescRu: body.shortDescRu || null,
        shortDescEn: body.shortDescEn || null,
        category: body.category,
        materials: body.materials || [],
        dimensions: body.dimensions || null,
        weight: body.weight || null,
        price: body.price,
        priceOnRequest: body.priceOnRequest || false,
        currency: body.currency || "USD",
        images: body.mainImage ? [body.mainImage] : [],
        mainImage: body.mainImage || null,
        videos: [],
        published: body.published !== false,
        featured: body.featured || false,
      },
    })

    return NextResponse.json({ success: true, product }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}


