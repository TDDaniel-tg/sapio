import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, type, productId, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        name,
        email,
        phone,
        company,
        type: type || "CONSULTATION",
        productId,
        message,
        status: "NEW",
      },
    })

    return NextResponse.json({ success: true, order }, { status: 200 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

