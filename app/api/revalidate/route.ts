import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get('path')

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    return NextResponse.json({ error: "Path required" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}

