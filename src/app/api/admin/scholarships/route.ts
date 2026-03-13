import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const { searchParams } = req.nextUrl;
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "25");
    const search = searchParams.get("search") ?? "";
    const sortDir = (searchParams.get("sortDir") as "asc" | "desc") ?? "desc";
    const where = search
        ? { OR: [{ title: { contains: search, mode: "insensitive" as const } }] }
        : { isActive: true };
    const [data, total] = await Promise.all([
        prisma.scholarship.findMany({ where, skip: (page - 1) * pageSize, take: pageSize, orderBy: { createdAt: sortDir }, include: { university: { select: { name: true } } } }),
        prisma.scholarship.count({ where }),
    ]);
    return NextResponse.json({ data, total });
}

export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const body = await req.json();
    const scholarship = await prisma.scholarship.create({ data: body });
    return NextResponse.json(scholarship, { status: 201 });
}
