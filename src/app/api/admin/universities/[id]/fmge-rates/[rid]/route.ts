import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string; rid: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { rid } = await params;
    const body = await req.json();
    const item = await prisma.universityFmgeRate.update({ where: { id: parseInt(rid) }, data: body });
    return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { rid } = await params;
    await prisma.universityFmgeRate.delete({ where: { id: parseInt(rid) } });
    return NextResponse.json({ success: true });
}
