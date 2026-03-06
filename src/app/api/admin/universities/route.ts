import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/admin/universities
export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = req.nextUrl;
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "25");
    const search = searchParams.get("search") ?? "";
    const sortBy = searchParams.get("sortBy") ?? "createdAt";
    const sortDir = (searchParams.get("sortDir") as "asc" | "desc") ?? "desc";

    const where = search
        ? { OR: [{ name: { contains: search, mode: "insensitive" as const } }, { slug: { contains: search, mode: "insensitive" as const } }] }
        : undefined;

    const [data, total] = await Promise.all([
        prisma.university.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { [sortBy]: sortDir },
            include: { instituteType: { select: { name: true } }, province: { select: { name: true } } },
        }),
        prisma.university.count({ where }),
    ]);

    return NextResponse.json({ data, total });
}

// POST /api/admin/universities
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();

        // Helper to extract filename from URL
        const filename = (url: string | null | undefined) =>
            url ? url.split("/").pop() ?? null : null;

        const {
            name, slug, city, state, rating, establishedYear, students,
            tuitionFee, seatsAvailable, fmgePassRate, courseDuration,
            mediumOfInstruction, eligibility, neetRequirement,
            shortnote, aboutNote,
            isFeatured, homeView, status,
            embassyVerified, whoListed, nmcApproved,
            ministryLicensed, faimerListed, mciRecognition, ecfmgEligible,
            thumbnail, brochure,
            metaTitle, metaKeyword, metaDescription, schema: schemaField,
            instituteTypeId, provinceId,
        } = body;

        const university = await prisma.university.create({
            data: {
                name,
                slug,
                city: city || null,
                state: state || null,
                rating: rating ?? null,
                establishedYear: establishedYear ?? null,
                students: students ?? null,
                tuitionFee: tuitionFee ?? null,
                seatsAvailable: seatsAvailable ?? null,
                fmgePassRate: fmgePassRate ?? null,
                courseDuration: courseDuration || null,
                mediumOfInstruction: mediumOfInstruction || null,
                eligibility: eligibility || null,
                neetRequirement: neetRequirement || null,
                shortnote: shortnote || null,
                aboutNote: aboutNote || null,
                isFeatured: isFeatured ?? false,
                homeView: homeView ?? false,
                status: status ?? true,
                embassyVerified: embassyVerified ?? false,
                whoListed: whoListed ?? false,
                nmcApproved: nmcApproved ?? false,
                ministryLicensed: ministryLicensed ?? false,
                faimerListed: faimerListed ?? false,
                mciRecognition: mciRecognition ?? false,
                ecfmgEligible: ecfmgEligible ?? false,
                thumbnailPath: thumbnail || null,
                thumbnailName: filename(thumbnail),
                brochurePath: brochure || null,
                brochureName: filename(brochure),
                metaTitle: metaTitle || null,
                metaKeyword: metaKeyword || null,
                metaDescription: metaDescription || null,
                ...(schemaField ? { ogImagePath: schemaField } : {}),
                ...(instituteTypeId ? { instituteType: { connect: { id: Number(instituteTypeId) } } } : {}),
                ...(provinceId ? { province: { connect: { id: Number(provinceId) } } } : {}),
            },
        });
        return NextResponse.json(university, { status: 201 });
    } catch (err) {
        console.error("University create error:", err);
        const message = err instanceof Error ? err.message : "Failed to create university";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
