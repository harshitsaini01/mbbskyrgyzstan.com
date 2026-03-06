import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function slugify(str: string) {
    return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = await prisma.level.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    if (!body.name) return NextResponse.json({ error: "Name required" }, { status: 400 });
    const slug = body.slug || slugify(body.name);
    const item = await prisma.level.create({ data: { name: body.name, slug, description: body.description || null, status: body.status ?? true } });
    return NextResponse.json(item, { status: 201 });
}
