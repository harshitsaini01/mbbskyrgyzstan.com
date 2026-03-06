import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = await prisma.officialGovernmentLink.findMany({ orderBy: { position: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    if (!body.name || !body.url) return NextResponse.json({ error: "Name and URL required" }, { status: 400 });
    const item = await prisma.officialGovernmentLink.create({
        data: { name: body.name, url: body.url, description: body.description || null, logoPath: body.logoPath || null, category: body.category || null, position: body.position ? parseInt(body.position) : 1, status: body.status ?? true },
    });
    return NextResponse.json(item, { status: 201 });
}
