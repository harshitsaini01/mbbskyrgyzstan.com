import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const items = await prisma.gallery.findMany({ orderBy: { position: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const body = await req.json();
    if (!body.imagePath) return NextResponse.json({ error: "Image path required" }, { status: 400 });
    const item = await prisma.gallery.create({
        data: { title: body.title || null, imageName: body.imageName || "", imagePath: body.imagePath, position: body.position ? parseInt(body.position) : 1, status: body.status ?? true },
    });
    return NextResponse.json(item, { status: 201 });
}
