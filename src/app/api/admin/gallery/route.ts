import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = await prisma.gallery.findMany({ orderBy: { position: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    if (!body.imagePath) return NextResponse.json({ error: "Image path required" }, { status: 400 });
    const item = await prisma.gallery.create({
        data: { title: body.title || null, imageName: body.imageName || "", imagePath: body.imagePath, position: body.position ? parseInt(body.position) : 1, status: body.status ?? true },
    });
    return NextResponse.json(item, { status: 201 });
}
