import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAGE_ID = 1;

export async function GET() {
    await prisma.aboutCountryPage.upsert({ where: { id: PAGE_ID }, create: { id: PAGE_ID, name: "Kyrgyzstan" }, update: {} });
    const items = await prisma.countryMajorCity.findMany({ where: { pageId: PAGE_ID }, orderBy: { id: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    try {
        const { cityName, description, population, highlights, cityImage } = await req.json();
        if (!cityName?.trim()) return NextResponse.json({ error: "City name required" }, { status: 422 });
        const item = await prisma.countryMajorCity.create({
            data: { pageId: PAGE_ID, cityName: cityName.trim(), description: description || null, population: population || null, highlights: highlights || null, cityImage: cityImage || null },
        });
        return NextResponse.json(item, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
