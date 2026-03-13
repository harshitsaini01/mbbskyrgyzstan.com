import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const items = await prisma.office.findMany({ orderBy: { position: "asc" } });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const body = await req.json();
    if (!body.name || !body.address) return NextResponse.json({ error: "Name and address required" }, { status: 400 });
    const item = await prisma.office.create({
        data: {
            name: body.name,
            address: body.address,
            city: body.city || null,
            state: body.state || null,
            country: body.country || null,
            phone: body.phone || null,
            email: body.email || null,
            mapEmbed: body.mapEmbed || null,
            imagePath: body.imagePath || null,
            position: body.position ? parseInt(body.position) : 1,
            status: body.status ?? true,
        },
    });
    return NextResponse.json(item, { status: 201 });
}
