import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string; pid: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { pid } = await params;
    const body = await req.json();
    const item = await prisma.universityPhoto.update({ where: { id: parseInt(pid) }, data: body });
    return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { pid } = await params;
    await prisma.universityPhoto.delete({ where: { id: parseInt(pid) } });
    return NextResponse.json({ success: true });
}
