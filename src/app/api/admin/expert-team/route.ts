import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const items = await prisma.expertTeam.findMany({ orderBy: [{ position: "asc" }, { createdAt: "asc" }] });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const body = await req.json();
    const item = await prisma.expertTeam.create({ data: body });
    return NextResponse.json(item, { status: 201 });
}
