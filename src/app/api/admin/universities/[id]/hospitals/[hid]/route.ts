import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string; hid: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id, hid } = await params;
    await prisma.universityHospital.deleteMany({
        where: { universityId: parseInt(id), hospitalId: parseInt(hid) },
    });
    return NextResponse.json({ success: true });
}
