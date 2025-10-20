import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateSlug } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const slug = generateSlug(body.titleEn)

    const portfolio = await prisma.portfolio.create({
      data: {
        slug,
        titleRu: body.titleRu,
        titleEn: body.titleEn,
        descriptionRu: body.descriptionRu,
        descriptionEn: body.descriptionEn,
        clientName: body.clientName || null,
        location: body.location || null,
        category: body.category || null,
        images: body.coverImage ? [body.coverImage] : [],
        coverImage: body.coverImage || null,
        videos: [],
        published: body.published !== false,
        featured: body.featured || false,
      },
    })

    return NextResponse.json({ success: true, portfolio }, { status: 201 })
  } catch (error) {
    console.error("Error creating portfolio:", error)
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const projects = await prisma.portfolio.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    )
  }
}


