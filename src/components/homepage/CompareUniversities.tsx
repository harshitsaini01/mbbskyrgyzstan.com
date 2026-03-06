import { prisma } from "@/lib/prisma";
import CompareUniversitiesClient from "./CompareUniversitiesClient";

export default async function CompareUniversities() {
    const universities = await prisma.university.findMany({
        where: { status: true },
        select: {
            id: true, name: true, slug: true, thumbnailPath: true,
            rating: true, city: true, students: true, tuitionFee: true,
            establishedYear: true, courseDuration: true, mediumOfInstruction: true,
            whoListed: true, nmcApproved: true, ministryLicensed: true,
            faimerListed: true, mciRecognition: true, ecfmgEligible: true,
            fmgePassRate: true, neetRequirement: true, eligibility: true,
            globalRanking: true, campusArea: true, labs: true, lectureHall: true,
            hostelBuilding: true, countriesRepresented: true,
            instituteType: { select: { name: true } },
            cityRelation: { select: { name: true } },
        },
        orderBy: { id: "asc" },
    }).catch(() => []);

    if (universities.length === 0) return null;

    return <CompareUniversitiesClient allUniversities={universities} />;
}
