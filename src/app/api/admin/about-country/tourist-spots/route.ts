import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAGE_ID = 1;

export async function GET() {
    await prisma.aboutCountryPage.upsert({ where: { id: PAGE_ID }, create: { id: PAGE_ID, name: "Vietnam" }, update: {} });
    const items = await prisma.countryTouristAttraction.findMany({ where: { pageId: PAGE_ID, isActive: true }, orderBy: [{ ordering: "asc" }, { id: "asc" }] });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.attractionName?.trim()) return NextResponse.json({ error: "Name required" }, { status: 422 });
        const item = await prisma.countryTouristAttraction.create({
            data: { pageId: PAGE_ID, attractionName: body.attractionName.trim(), description: body.description || null, ordering: body.ordering ?? 0, isActive: body.isActive ?? true, image: body.image || null, iconClass: body.iconClass || null },
        });
        return NextResponse.json(item, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
