import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const portfolio = await prisma.portfolio.update({
      where: { id: params.id },
      data: {
        titleRu: body.titleRu,
        titleEn: body.titleEn,
        descriptionRu: body.descriptionRu,
        descriptionEn: body.descriptionEn,
        clientName: body.clientName,
        location: body.location,
        category: body.category,
        coverImage: body.coverImage,
        images: body.coverImage ? [body.coverImage] : [],
        published: body.published,
        featured: body.featured,
      },
    })

    return NextResponse.json({ success: true, portfolio })
  } catch (error) {
    console.error("Error updating portfolio:", error)
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.portfolio.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    )
  }
}


