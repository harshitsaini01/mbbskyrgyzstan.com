import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string; tid: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { tid } = await params;
    const body = await req.json();
    const item = await prisma.universityTestimonial.update({ where: { id: parseInt(tid) }, data: body });
    return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { tid } = await params;
    await prisma.universityTestimonial.delete({ where: { id: parseInt(tid) } });
    return NextResponse.json({ success: true });
}
