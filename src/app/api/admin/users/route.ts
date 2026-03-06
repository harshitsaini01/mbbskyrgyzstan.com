import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = req.nextUrl;
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "25");
    const search = searchParams.get("search") ?? "";
    const where = search ? { OR: [{ name: { contains: search, mode: "insensitive" as const } }, { email: { contains: search, mode: "insensitive" as const } }] } : undefined;
    const [data, total] = await Promise.all([
        prisma.user.findMany({ where, skip: (page - 1) * pageSize, take: pageSize, orderBy: { createdAt: "desc" }, select: { id: true, name: true, email: true, role: true, status: true, createdAt: true, photoPath: true } }),
        prisma.user.count({ where }),
    ]);
    return NextResponse.json({ data, total });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const bcrypt = await import("bcryptjs");
    const hashed = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({ data: { ...body, password: hashed } });
    return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 });
}
