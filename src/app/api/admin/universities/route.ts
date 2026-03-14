import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

function mapPrismaError(err: unknown): { status: number; message: string } {
    const prismaErr = err as { code?: string; message?: string; meta?: { target?: string[] } };

    if (prismaErr?.code === "P2022") {
        return {
            status: 500,
            message:
                "Database schema is out of sync with Prisma schema. Run `npx prisma db push` and restart the dev server.",
        };
    }

    if (prismaErr?.code === "P2002") {
        const target = prismaErr.meta?.target?.join(", ") || "unique field";
        return {
            status: 409,
            message: `Duplicate value for ${target}. Please use a different value.`,
        };
    }

    return {
        status: 500,
        message: err instanceof Error ? err.message : "Failed to process university request",
    };
}

// GET /api/admin/universities
export async function GET(req: NextRequest) {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    try {
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
    } catch (err) {
        console.error("University list error:", err);
        const mapped = mapPrismaError(err);
        return NextResponse.json({ error: mapped.message }, { status: mapped.status });
    }
}

// POST /api/admin/universities
export async function POST(req: NextRequest) {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();

        // Helper to extract filename from URL
        const filename = (url: string | null | undefined) =>
            url ? url.split("/").pop() ?? null : null;

        // Only allow local uploads (stored under /uploads/). External/public URLs are rejected.
        const localUpload = (url: string | null | undefined) =>
            typeof url === "string" && (url.startsWith("/uploads/") || url.startsWith("uploads/"))
                ? url
                : null;

        const {
            name, slug, city, state, rating, establishedYear, students,
            tuitionFee, seatsAvailable, fmgePassRate, courseDuration,
            mediumOfInstruction, eligibility, neetRequirement,
            shortnote, aboutNote,
            isFeatured, homeView, status,
            embassyVerified, whoListed, nmcApproved,
            ministryLicensed, faimerListed, mciRecognition, ecfmgEligible,
            applyNowUrl,
            thumbnail, brochure, banner, embassyLetter, universityLicense, aggregationLetter, nmcGuidelines,
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
                students: students || null,
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
                applyNowUrl: applyNowUrl || null,
                thumbnailPath: localUpload(thumbnail) || null,
                thumbnailName: filename(localUpload(thumbnail)),
                brochurePath: localUpload(brochure),
                brochureName: filename(localUpload(brochure)),
                bannerPath: localUpload(banner) || null,
                bannerName: filename(localUpload(banner)),
                embassyLetterPath: localUpload(embassyLetter),
                universityLicensePath: localUpload(universityLicense),
                aggregationLetterPath: localUpload(aggregationLetter),
                nmcGuidelinesPath: localUpload(nmcGuidelines),
                metaTitle: metaTitle || null,
                metaKeyword: metaKeyword || null,
                metaDescription: metaDescription || null,
                ...(schemaField ? { ogImagePath: schemaField } : {}),
                globalRanking: body.globalRanking || null,
                ...(instituteTypeId ? { instituteType: { connect: { id: Number(instituteTypeId) } } } : {}),
                ...(provinceId ? { province: { connect: { id: Number(provinceId) } } } : {}),
            },
        });

        try {
            revalidatePath("/universities");
        } catch (e) {
            console.error("Revalidation error:", e);
        }

        return NextResponse.json(university, { status: 201 });
    } catch (err) {
        console.error("University create error:", err);
        const mapped = mapPrismaError(err);
        return NextResponse.json({ error: mapped.message }, { status: mapped.status });
    }
}
