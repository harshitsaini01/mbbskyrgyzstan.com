import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAGE_ID = 1;

export async function GET() {
    await prisma.aboutCountryPage.upsert({ where: { id: PAGE_ID }, create: { id: PAGE_ID, name: "Kyrgyzstan" }, update: {} });
    const items = await prisma.countryLifestyleCulture.findMany({ where: { pageId: PAGE_ID }, orderBy: { id: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    try {
        const { title, description, iconClass, image } = await req.json();
        if (!title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 422 });
        const item = await prisma.countryLifestyleCulture.create({
            data: { pageId: PAGE_ID, title: title.trim(), description: description ?? "", iconClass: iconClass || null, image: image || null },
        });
        return NextResponse.json(item, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
