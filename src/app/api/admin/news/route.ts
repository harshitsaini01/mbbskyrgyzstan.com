import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;
    const where = search ? {
        OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { slug: { contains: search, mode: "insensitive" as const } },
        ],
    } : {};
    const [items, total] = await Promise.all([
        prisma.news.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: "desc" }, include: { category: { select: { name: true } } } }),
        prisma.news.count({ where }),
    ]);
    return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const body = await req.json();
    if (!body.title || !body.slug) return NextResponse.json({ error: "Title and slug required" }, { status: 400 });
    const item = await prisma.news.create({
        data: {
            title: body.title,
            slug: body.slug,
            shortnote: body.shortnote || null,
            description: body.description || null,
            thumbnailPath: body.thumbnailPath || null,
            imagePath: body.imagePath || null,
            categoryId: body.categoryId ? parseInt(body.categoryId) : 1,
            authorId: parseInt(session.user?.id as string) || 1,
            status: body.status ?? true,
            homeView: body.homeView ?? false,
            trending: body.trending ?? false,
            metaTitle: body.metaTitle || null,
            metaKeyword: body.metaKeyword || null,
            metaDescription: body.metaDescription || null,
        },
    });
    return NextResponse.json(item, { status: 201 });
}
