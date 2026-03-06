import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import UniversitySearch from "@/components/universities/UniversitySearch";

export const metadata: Metadata = {
    title: "MBBS Universities in Vietnam — All NMC Recognized Medical Colleges",
    description:
        "Browse all NMC & WHO recognized MBBS universities in Vietnam. Compare fees, intake, seats, and apply online. Updated 2025 admission details.",
};

export const revalidate = 3600;

export default async function UniversitiesPage() {
    const universities = await prisma.university.findMany({
        where: { status: true },
        select: {
            id: true, name: true, slug: true, thumbnailPath: true, rating: true,
            city: true, establishedYear: true, students: true, tuitionFee: true,
            approvedBy: true, courseDuration: true, fmgePassRate: true,
            neetRequirement: true, mediumOfInstruction: true, globalRanking: true,
            whoListed: true, nmcApproved: true, ministryLicensed: true,
            faimerListed: true, mciRecognition: true,
            instituteType: { select: { name: true } },
            province: { select: { name: true } },
            cityRelation: { select: { name: true } },
            scholarships: {
                where: { isActive: true },
                select: { title: true },
                take: 1,
            },
        },
        orderBy: [{ id: "asc" }],
    }).catch(() => []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">MBBS Universities in Vietnam</h1>
                    <p className="text-xl text-red-100 max-w-3xl mx-auto">
                        Explore all NMC and WHO recognized medical universities in Vietnam. Compare programs, fees, and apply online.
                    </p>
                    <p className="mt-4 text-red-200 text-sm">{universities.length} universities listed</p>
                </div>
            </div>

            <UniversitySearch universities={universities.map(u => ({
                ...u,
                rating: u.rating ? Number(u.rating) : null,
                tuitionFee: u.tuitionFee ? Number(u.tuitionFee) : null,
                fmgePassRate: u.fmgePassRate ? Number(u.fmgePassRate) : null,
            }))} />
        </div>
    );
}
