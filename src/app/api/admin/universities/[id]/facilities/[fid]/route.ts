import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string; fid: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id, fid } = await params;
    await prisma.universityFacility.deleteMany({
        where: { universityId: parseInt(id), facilityId: parseInt(fid) },
    });
    return NextResponse.json({ success: true });
}
