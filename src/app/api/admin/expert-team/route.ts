import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = await prisma.expertTeam.findMany({ orderBy: [{ position: "asc" }, { createdAt: "asc" }] });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const item = await prisma.expertTeam.create({ data: body });
    return NextResponse.json(item, { status: 201 });
}
