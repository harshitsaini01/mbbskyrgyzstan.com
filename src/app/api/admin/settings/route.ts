import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

// GET /api/admin/settings — returns the first (and only) WebsiteSetting row
export async function GET() {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const settings = await prisma.websiteSetting.findFirst();
    return NextResponse.json(settings ?? {});
}

// POST /api/admin/settings — upsert
export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const body = await req.json();
    const existing = await prisma.websiteSetting.findFirst();
    if (existing) {
        const updated = await prisma.websiteSetting.update({ where: { id: existing.id }, data: body });
        return NextResponse.json(updated);
    } else {
        const created = await prisma.websiteSetting.create({ data: body });
        return NextResponse.json(created, { status: 201 });
    }
}
