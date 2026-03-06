import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = await prisma.dynamicPageSeo.findMany({ orderBy: { page: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    if (!body.page) return NextResponse.json({ error: "Page slug required" }, { status: 400 });
    const item = await prisma.dynamicPageSeo.upsert({
        where: { page: body.page },
        create: { page: body.page, metaTitle: body.metaTitle, metaKeyword: body.metaKeyword, metaDescription: body.metaDescription, ogImagePath: body.ogImagePath, status: body.status ?? true },
        update: { metaTitle: body.metaTitle, metaKeyword: body.metaKeyword, metaDescription: body.metaDescription, ogImagePath: body.ogImagePath, status: body.status ?? true },
    });
    return NextResponse.json(item, { status: 201 });
}
