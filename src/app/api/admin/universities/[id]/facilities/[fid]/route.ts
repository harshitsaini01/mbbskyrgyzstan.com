import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string; fid: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const { id, fid } = await params;
    await prisma.universityFacility.deleteMany({
        where: { universityId: parseInt(id), facilityId: parseInt(fid) },
    });
    return NextResponse.json({ success: true });
}
