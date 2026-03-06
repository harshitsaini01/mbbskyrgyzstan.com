import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const university = await prisma.university.findUnique({ where: { id: parseInt(id) } });
    if (!university) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(university);
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    try {
        const body = await req.json();

        const filename = (url: string | null | undefined) =>
            url ? url.split("/").pop() ?? null : null;

        // Strip read-only / relational fields that come back from GET
        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            id: _id, createdAt, updatedAt, instituteType, province, cityRelation,
            programs, photos, rankings, studentRecords, fmgeRates, intakes,
            testimonials, reviews, faqs, facilities, hospitals, links, scholarships,
            // Remap image fields
            thumbnail, brochure,
            embassyLetter, universityLicense, aggregationLetter,
            // Strip raw path fields (already handled via the mapped variables above)
            embassyLetterPath: _embassyLetterPath, universityLicensePath: _universityLicensePath, aggregationLetterPath: _aggregationLetterPath,
            schema: schemaField,
            instituteTypeId, provinceId, cityId,
            ...rest
        } = body;

        void createdAt; void updatedAt;
        void _embassyLetterPath; void _universityLicensePath; void _aggregationLetterPath;

        const data: Record<string, unknown> = { ...rest };

        // Map thumbnail/brochure URL → path + name
        if ("thumbnail" in body) {
            data.thumbnailPath = thumbnail || null;
            data.thumbnailName = filename(thumbnail);
        }
        if ("brochure" in body) {
            data.brochurePath = brochure || null;
            data.brochureName = filename(brochure);
        }
        if ("embassyLetter" in body) data.embassyLetterPath = embassyLetter || null;
        if ("universityLicense" in body) data.universityLicensePath = universityLicense || null;
        if ("aggregationLetter" in body) data.aggregationLetterPath = aggregationLetter || null;
        if (schemaField !== undefined) data.ogImagePath = schemaField || null;
        if (instituteTypeId !== undefined) {
            data.instituteType = instituteTypeId ? { connect: { id: Number(instituteTypeId) } } : { disconnect: true };
        }
        if (provinceId !== undefined) {
            data.province = provinceId ? { connect: { id: Number(provinceId) } } : { disconnect: true };
        }
        if (cityId !== undefined) {
            data.cityRelation = cityId ? { connect: { id: Number(cityId) } } : { disconnect: true };
        }

        const university = await prisma.university.update({ where: { id: parseInt(id) }, data });
        return NextResponse.json(university);
    } catch (err) {
        console.error("University update error:", err);
        return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    await prisma.university.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
}
