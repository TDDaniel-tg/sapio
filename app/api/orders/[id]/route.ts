import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: {
    id: string
  }
}

// Update order status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const body = await request.json()
    const { status, notes } = body

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    )
  }
}

// Delete order
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    await prisma.order.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    )
  }
}

// Get single order
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    const order = await prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    )
  }
}


