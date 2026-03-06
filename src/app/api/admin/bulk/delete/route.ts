import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/admin/bulk/delete
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { model, ids } = body as { model: string; ids: string[] };

    if (!model || !ids?.length) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Map model name to prisma client property
    const modelMap: Record<string, keyof typeof prisma> = {
        university: "university",
        blog: "blog",
        blogCategory: "blogCategory",
        news: "news",
        newsCategory: "newsCategory",
        article: "article",
        articleCategory: "articleCategory",
        scholarship: "scholarship",
        faq: "faq",
        faqCategory: "faqCategory",
        testimonial: "testimonial",
        lead: "lead",
        province: "province",
        city: "city",
        instituteType: "instituteType",
        office: "office",
        user: "user",
        gallery: "gallery",
    };

    const prismaModel = modelMap[model];
    if (!prismaModel) {
        return NextResponse.json({ error: "Unknown model" }, { status: 400 });
    }

    // Type-safe bulk delete
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma[prismaModel] as any).deleteMany({ where: { id: { in: ids } } });
    return NextResponse.json({ success: true, deleted: ids.length });
}
