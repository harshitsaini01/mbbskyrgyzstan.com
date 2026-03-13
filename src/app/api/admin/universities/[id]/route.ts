import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const { id } = await params;
    const university = await prisma.university.findUnique({ where: { id: parseInt(id) } });
    if (!university) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(university);
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const { id } = await params;
    try {
        const body = await req.json();

        const filename = (url: string | null | undefined) =>
            url ? url.split("/").pop() ?? null : null;

        const localUpload = (url: string | null | undefined) =>
            typeof url === "string" && (url.startsWith("/uploads/") || url.startsWith("uploads/"))
                ? url
                : null;

        // Strip read-only / relational fields that come back from GET
        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            id: _id, createdAt, updatedAt, instituteType, province, cityRelation,
            programs, photos, rankings, studentRecords, fmgeRates, intakes,
            testimonials, reviews, faqs, facilities, hospitals, links, scholarships,
            // Remap image fields
            thumbnail, brochure, banner,
            embassyLetter, universityLicense, aggregationLetter, nmcGuidelines,
            // Strip raw path fields (already handled via the mapped variables above)
            embassyLetterPath: _embassyLetterPath, universityLicensePath: _universityLicensePath, aggregationLetterPath: _aggregationLetterPath, nmcGuidelinesPath: _nmcGuidelinesPath,
            schema: schemaField,
            instituteTypeId, provinceId, cityId,
            ...rest
        } = body;

        void createdAt; void updatedAt;
        void _embassyLetterPath; void _universityLicensePath; void _aggregationLetterPath; void _nmcGuidelinesPath;

        const data: Record<string, unknown> = { ...rest };

        // Map thumbnail/brochure URL → path + name (only local uploads)
        if ("thumbnail" in body) {
            data.thumbnailPath = localUpload(thumbnail) || null;
            data.thumbnailName = filename(localUpload(thumbnail));
        }
        if ("brochure" in body) {
            data.brochurePath = localUpload(brochure);
            data.brochureName = filename(localUpload(brochure));
        }
        if ("banner" in body) {
            data.bannerPath = localUpload(banner) || null;
            data.bannerName = filename(localUpload(banner));
        }
        if ("embassyLetter" in body) data.embassyLetterPath = localUpload(embassyLetter);
        if ("universityLicense" in body) data.universityLicensePath = localUpload(universityLicense);
        if ("aggregationLetter" in body) data.aggregationLetterPath = localUpload(aggregationLetter);
        if ("nmcGuidelines" in body) data.nmcGuidelinesPath = localUpload(nmcGuidelines);
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
        try {
            if (university.slug) {
                revalidatePath(`/universities/${university.slug}`);
            }
            revalidatePath("/universities");
        } catch (e) {
            console.error("Revalidation error:", e);
        }
        return NextResponse.json(university);
    } catch (err) {
        console.error("University update error:", err);
        return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;
    const { id } = await params;
    await prisma.university.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
}
