import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { year, appeared, passed, passPercentage, firstAttemptPassRate, rank, notes, source, universityId } = body;

    const rate = await prisma.universityFmgeRate.update({
        where: { id: Number(id) },
        data: {
            ...(universityId && { universityId: Number(universityId) }),
            ...(year && { year: Number(year) }),
            appeared: appeared ? Number(appeared) : null,
            passed: passed ? Number(passed) : null,
            passPercentage: passPercentage ?? undefined,
            firstAttemptPassRate: firstAttemptPassRate ?? undefined,
            rank: rank ? Number(rank) : null,
            notes: notes ?? undefined,
            source: source ?? undefined,
        },
        include: { university: { select: { id: true, name: true } } },
    });

    return NextResponse.json(rate);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.universityFmgeRate.delete({ where: { id: Number(id) } });
    return NextResponse.json({ deleted: true });
}
