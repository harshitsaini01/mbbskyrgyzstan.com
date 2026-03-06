import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string; iid: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { iid } = await params;
    const body = await req.json();
    const item = await prisma.universityIntake.update({ where: { id: parseInt(iid) }, data: body });
    return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { iid } = await params;
    await prisma.universityIntake.delete({ where: { id: parseInt(iid) } });
    return NextResponse.json({ success: true });
}
