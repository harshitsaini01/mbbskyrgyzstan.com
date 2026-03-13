import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const images = await prisma.defaultOgImage.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const body = await req.json();
    const img = await prisma.defaultOgImage.create({ data: body });
    return NextResponse.json(img, { status: 201 });
}
