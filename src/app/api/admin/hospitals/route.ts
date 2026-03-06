import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const items = await prisma.hospital.findMany({
        where: search ? { name: { contains: search, mode: "insensitive" } } : undefined,
        orderBy: { name: "asc" },
    });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    if (!body.name || !body.slug) return NextResponse.json({ error: "Name and slug required" }, { status: 400 });
    const item = await prisma.hospital.create({
        data: {
            name: body.name,
            slug: body.slug,
            city: body.city || null,
            state: body.state || null,
            beds: body.beds ? parseInt(body.beds) : null,
            establishedYear: body.establishedYear ? parseInt(body.establishedYear) : null,
            accreditation: body.accreditation || null,
            status: body.status ?? true,
        },
    });
    return NextResponse.json(item, { status: 201 });
}
