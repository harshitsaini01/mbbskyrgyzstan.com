import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/scholarships/[id]/faqs/[fid]
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string; fid: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { fid } = await params;
    const body = await req.json();
    const updated = await prisma.scholarshipFaq.update({
        where: { id: parseInt(fid) },
        data: body,
    });
    return NextResponse.json(updated);
}

// DELETE /api/admin/scholarships/[id]/faqs/[fid]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string; fid: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { fid } = await params;
    await prisma.scholarshipFaq.delete({ where: { id: parseInt(fid) } });
    return NextResponse.json({ success: true });
}
