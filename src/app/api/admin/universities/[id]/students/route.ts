import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const universityId = parseInt(id);
    const students = await prisma.universityStudent.findMany({
        where: { universityId },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(students);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const universityId = parseInt(id);
    const body = await req.json();
    const student = await prisma.universityStudent.create({
        data: { ...body, universityId },
    });
    return NextResponse.json(student, { status: 201 });
}
