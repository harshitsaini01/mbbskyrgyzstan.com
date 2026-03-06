import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const images = await prisma.defaultOgImage.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const img = await prisma.defaultOgImage.create({ data: body });
    return NextResponse.json(img, { status: 201 });
}
