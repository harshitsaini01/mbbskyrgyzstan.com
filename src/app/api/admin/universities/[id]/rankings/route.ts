import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const items = await prisma.universityRanking.findMany({
        where: { universityId: parseInt(id) },
        orderBy: { position: "asc" },
    });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    if (!body.rankingBody) return NextResponse.json({ error: "Ranking body required" }, { status: 400 });
    const item = await prisma.universityRanking.create({
        data: {
            universityId: parseInt(id),
            rankingBody: body.rankingBody,
            rank: body.rank || null,
            year: body.year ? parseInt(body.year) : null,
            category: body.category || null,
            score: body.score || null,
            position: body.position || 1,
            status: body.status ?? true,
        },
    });
    return NextResponse.json(item, { status: 201 });
}
