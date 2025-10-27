import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET settings
export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: "singleton" },
    });

    // Create default settings if not exists
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: "singleton",
          email: "info@furniture-studio.com",
          phone: "+7 (700) 123-45-67",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT (update) settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const settings = await prisma.settings.upsert({
      where: { id: "singleton" },
      update: {
        email: body.email,
        phone: body.phone,
        whatsapp: body.whatsapp,
        telegram: body.telegram,
        address: body.address,
        instagram: body.instagram,
        facebook: body.facebook,
        youtube: body.youtube,
        heroVideoUrl: body.heroVideoUrl,
        heroTitleRu: body.heroTitleRu,
        heroTitleEn: body.heroTitleEn,
        heroSubtitleRu: body.heroSubtitleRu,
        heroSubtitleEn: body.heroSubtitleEn,
      },
      create: {
        id: "singleton",
        email: body.email || "info@furniture-studio.com",
        phone: body.phone || "+7 (700) 123-45-67",
        whatsapp: body.whatsapp,
        telegram: body.telegram,
        address: body.address,
        instagram: body.instagram,
        facebook: body.facebook,
        youtube: body.youtube,
        heroVideoUrl: body.heroVideoUrl,
        heroTitleRu: body.heroTitleRu,
        heroTitleEn: body.heroTitleEn,
        heroSubtitleRu: body.heroSubtitleRu,
        heroSubtitleEn: body.heroSubtitleEn,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}


