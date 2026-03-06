import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/scholarships/[id]/faqs
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const scholarshipId = parseInt(id);
    const faqs = await prisma.scholarshipFaq.findMany({
        where: { scholarshipId },
        orderBy: { position: "asc" },
    });
    return NextResponse.json(faqs);
}

// POST /api/admin/scholarships/[id]/faqs
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const scholarshipId = parseInt(id);
    const body = await req.json();
    if (!body.question || !body.answer) {
        return NextResponse.json({ error: "Question and answer required" }, { status: 400 });
    }
    const faq = await prisma.scholarshipFaq.create({
        data: { question: body.question, answer: body.answer, position: body.position ?? 1, status: body.status ?? true, scholarshipId },
    });
    return NextResponse.json(faq, { status: 201 });
}
