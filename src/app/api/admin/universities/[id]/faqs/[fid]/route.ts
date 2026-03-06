import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string; fid: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { fid } = await params;
    const body = await req.json();
    const item = await prisma.universityFaq.update({ where: { id: parseInt(fid) }, data: body });
    return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { fid } = await params;
    await prisma.universityFaq.delete({ where: { id: parseInt(fid) } });
    return NextResponse.json({ success: true });
}
