import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = await prisma.articleCategory.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    if (!body.name) return NextResponse.json({ error: "Name required" }, { status: 400 });
    const item = await prisma.articleCategory.create({
        data: { name: body.name, slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), status: body.status ?? true },
    });
    return NextResponse.json(item, { status: 201 });
}
