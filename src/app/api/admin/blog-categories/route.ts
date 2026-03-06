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
    const where = search ? { name: { contains: search, mode: "insensitive" as const } } : undefined;
    const [data, total] = await Promise.all([
        prisma.blogCategory.findMany({ where, skip: (page - 1) * pageSize, take: pageSize, orderBy: { name: "asc" } }),
        prisma.blogCategory.count({ where }),
    ]);
    return NextResponse.json({ data, total });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const category = await prisma.blogCategory.create({ data: body });
    return NextResponse.json(category, { status: 201 });
}
