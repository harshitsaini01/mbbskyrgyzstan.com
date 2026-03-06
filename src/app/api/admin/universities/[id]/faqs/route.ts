import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const items = await prisma.universityFaq.findMany({
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
    if (!body.question || !body.answer) return NextResponse.json({ error: "Question and answer required" }, { status: 400 });
    const count = await prisma.universityFaq.count({ where: { universityId: parseInt(id) } });
    const item = await prisma.universityFaq.create({
        data: {
            universityId: parseInt(id),
            question: body.question,
            answer: body.answer,
            position: count + 1,
            status: body.status ?? true,
        },
    });
    return NextResponse.json(item, { status: 201 });
}
