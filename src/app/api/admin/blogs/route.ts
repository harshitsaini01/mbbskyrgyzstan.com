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
    const sortBy = searchParams.get("sortBy") ?? "createdAt";
    const sortDir = (searchParams.get("sortDir") as "asc" | "desc") ?? "desc";

    const where = search ? { OR: [{ title: { contains: search, mode: "insensitive" as const } }, { slug: { contains: search, mode: "insensitive" as const } }] } : undefined;

    const [data, total] = await Promise.all([
        prisma.blog.findMany({ where, skip: (page - 1) * pageSize, take: pageSize, orderBy: { [sortBy]: sortDir }, include: { category: { select: { name: true } } } }),
        prisma.blog.count({ where }),
    ]);

    return NextResponse.json({ data, total });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const blog = await prisma.blog.create({ data: body });
    return NextResponse.json(blog, { status: 201 });
}
