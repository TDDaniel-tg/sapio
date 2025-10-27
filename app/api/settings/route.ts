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

// POST (update) settings - works for both GET and UPDATE based on request body
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("Processing settings with:", body);
    
    // If only checking, return existing settings
    if (body._action === "get") {
      let settings = await prisma.settings.findUnique({
        where: { id: "singleton" },
      });

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
    }
    
    // Otherwise update settings
    console.log("Updating settings with:", body);

    // Build update object - only include defined fields
    const updateData: any = {};
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.whatsapp !== undefined) updateData.whatsapp = body.whatsapp;
    if (body.telegram !== undefined) updateData.telegram = body.telegram;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.instagram !== undefined) updateData.instagram = body.instagram;
    if (body.facebook !== undefined) updateData.facebook = body.facebook;
    if (body.youtube !== undefined) updateData.youtube = body.youtube;
    if (body.heroVideoUrl !== undefined) updateData.heroVideoUrl = body.heroVideoUrl;
    if (body.heroTitleRu !== undefined) updateData.heroTitleRu = body.heroTitleRu;
    if (body.heroTitleEn !== undefined) updateData.heroTitleEn = body.heroTitleEn;
    if (body.heroSubtitleRu !== undefined) updateData.heroSubtitleRu = body.heroSubtitleRu;
    if (body.heroSubtitleEn !== undefined) updateData.heroSubtitleEn = body.heroSubtitleEn;

    const settings = await prisma.settings.upsert({
      where: { id: "singleton" },
      update: updateData,
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

    console.log("Settings updated successfully");
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update settings" },
      { status: 500 }
    );
  }
}


