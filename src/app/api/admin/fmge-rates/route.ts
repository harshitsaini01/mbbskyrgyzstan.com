import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const universityId = searchParams.get("universityId");

    const rates = await prisma.universityFmgeRate.findMany({
        where: universityId ? { universityId: Number(universityId) } : undefined,
        include: { university: { select: { id: true, name: true } } },
        orderBy: [{ year: "desc" }],
    });

    return NextResponse.json(rates);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { universityId, year, appeared, passed, passPercentage, firstAttemptPassRate, rank, notes, source } = body;

    if (!universityId || !year) return NextResponse.json({ error: "universityId and year required" }, { status: 400 });

    const rate = await prisma.universityFmgeRate.create({
        data: {
            universityId: Number(universityId),
            year: Number(year),
            appeared: appeared ? Number(appeared) : null,
            passed: passed ? Number(passed) : null,
            passPercentage: passPercentage ?? null,
            firstAttemptPassRate: firstAttemptPassRate ?? null,
            rank: rank ? Number(rank) : null,
            notes: notes ?? null,
            source: source ?? null,
        },
        include: { university: { select: { id: true, name: true } } },
    });

    return NextResponse.json(rate, { status: 201 });
}
