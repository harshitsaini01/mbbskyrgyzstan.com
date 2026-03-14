import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Cuisine & Lifestyle items live under an AboutCountryPage record.
// We always work with page_id = 1 (the singleton Kyrgyzstan country page).

const PAGE_ID = 1;

export async function GET() {
    // Ensure page exists
    await prisma.aboutCountryPage.upsert({
        where: { id: PAGE_ID },
        create: { id: PAGE_ID, name: "Kyrgyzstan" },
        update: {},
    });
    const items = await prisma.countryCuisineLifestyle.findMany({
        where: { pageId: PAGE_ID },
        orderBy: { id: "asc" },
    });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // The instruction implies using new field names from the body directly
        // and updating the data object accordingly.
        // The original destructuring is no longer fully aligned with the new data structure.
        // We will use body.propertyName directly for clarity and to match the instruction's intent.
        if (!body.dishName?.trim()) return NextResponse.json({ error: "Dish name required" }, { status: 422 });
        const item = await prisma.countryCuisineLifestyle.create({
            data: {
                pageId: PAGE_ID,
                dishName: body.dishName.trim(),
                dishDescription: body.dishDescription ?? "", // Changed from 'description'
                dishImage: body.dishImage || null, // Combines 'imagePath' and 'imageName' into 'dishImage'
                iconClass: body.iconClass || null, // Changed from 'icon'
            },
        });
        return NextResponse.json(item, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
