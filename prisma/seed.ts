import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as dotenv from "dotenv";
import { hash } from "bcryptjs";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Starting full seed...");

    // ── Admin User ──────────────────────────────────────────
    const adminPassword = await hash(process.env.ADMIN_PASSWORD || "Admin@123", 12);
    const adminUser = await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL || "admin@mbbskyrgyzstan.com" },
        update: { role: "admin", status: true },
        create: {
            name: "Admin",
            email: process.env.ADMIN_EMAIL || "admin@mbbskyrgyzstan.com",
            password: adminPassword,
            role: "admin",
            phone: "+84000000000",
            designation: "Administrator",
            description: "Super admin account for mbbskyrgyzstan platform.",
            status: true,
        },
    });
    console.log("✅ Admin user seeded:", adminUser.email);

    // ── Institute Types ─────────────────────────────────────
    const publicType = await prisma.instituteType.upsert({ where: { id: 1 }, update: {}, create: { name: "Public", status: true } });
    await prisma.instituteType.upsert({ where: { id: 2 }, update: {}, create: { name: "Private", status: true } });
    console.log("✅ Institute types seeded");

    // ── Provinces & Cities ──────────────────────────────────
    const hanoiProv = await prisma.province.upsert({ where: { id: 1 }, update: {}, create: { name: "Hanoi", status: true } });
    const hcmProv = await prisma.province.upsert({ where: { id: 2 }, update: {}, create: { name: "Ho Chi Minh", status: true } });
    const hueProv = await prisma.province.upsert({ where: { id: 4 }, update: {}, create: { name: "Thua Thien Hue", status: true } });

    const hanoiCity = await prisma.city.upsert({ where: { id: 1 }, update: {}, create: { name: "Hanoi", provinceId: hanoiProv.id, status: true } });
    const hcmCity = await prisma.city.upsert({ where: { id: 2 }, update: {}, create: { name: "Ho Chi Minh City", provinceId: hcmProv.id, status: true } });
    const hueCity = await prisma.city.upsert({ where: { id: 4 }, update: {}, create: { name: "Hue", provinceId: hueProv.id, status: true } });
    console.log("✅ Provinces & cities seeded");

    // ── Level ───────────────────────────────────────────────
    const mbbsLevel = await prisma.level.upsert({
        where: { slug: "mbbs" },
        update: {},
        create: { name: "MBBS", slug: "mbbs", description: "Bachelor of Medicine and Bachelor of Surgery", status: true },
    });
    console.log("✅ Level seeded");

    // ── Reset sequences to avoid id conflicts ───────────────
    await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('hospitals', 'id'), COALESCE((SELECT MAX(id) FROM hospitals), 0) + 1, false)`);
    await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('facilities', 'id'), COALESCE((SELECT MAX(id) FROM facilities), 0) + 1, false)`);

    // ── Facilities ──────────────────────────────────────────
    const facilityNames = ["Library", "Hostel", "Laboratory", "Sports Complex", "Cafeteria", "WiFi Campus", "Hospital", "Simulation Lab"];
    await prisma.facility.createMany({
        data: facilityNames.map((name) => ({ name, status: true })),
        skipDuplicates: true,
    });
    const facilities = await prisma.facility.findMany({ where: { name: { in: facilityNames } } });
    console.log("✅ Facilities seeded");

    // ── Hospitals ───────────────────────────────────────────
    const hospitalData = [
        { name: "Bach Mai Hospital", slug: "bach-mai-hospital", city: "Hanoi", state: "Hanoi", beds: 3500, establishedYear: 1911, accreditation: "Ministry of Health", status: true },
        { name: "Cho Ray Hospital", slug: "cho-ray-hospital", city: "Ho Chi Minh City", state: "Ho Chi Minh", beds: 1800, establishedYear: 1900, accreditation: "Ministry of Health", status: true },
        { name: "Hue Central Hospital", slug: "hue-central-hospital", city: "Hue", state: "Thua Thien Hue", beds: 1200, establishedYear: 1894, accreditation: "Ministry of Health", status: true },
    ];
    for (const hd of hospitalData) {
        const existing = await prisma.hospital.findUnique({ where: { slug: hd.slug } });
        if (!existing) await prisma.hospital.create({ data: hd });
    }
    const hospitals = await prisma.hospital.findMany({ where: { slug: { in: hospitalData.map(h => h.slug) } } });
    console.log("✅ Hospitals seeded");

    // ── Universities ────────────────────────────────────────
    const uniSeed = [
        {
            name: "Hanoi Medical University",
            slug: "hanoi-medical-university",
            city: "Hanoi", state: "Hanoi",
            cityId: hanoiCity.id, provinceId: hanoiProv.id, instituteTypeId: publicType.id,
            establishedYear: 1902, rating: 4.8, students: 12000, tuitionFee: 4500,
            approvedBy: ["WHO", "NMC", "FAIMER", "MCI"],
            scholarshipName: "Merit Scholarship", scholarshipAmount: "20%", seatsAvailable: 150,
            isFeatured: true, homeView: true, status: true,
            nmcApproved: true, whoListed: true, faimerListed: true, mciRecognition: true,
            embassyVerified: true, ministryLicensed: true, ecfmgEligible: true,
            fmgePassRate: 78.5, courseDuration: "6 years", mediumOfInstruction: "English",
            eligibility: "10+2 with PCB, NEET qualified", neetRequirement: "Required",
            shortnote: "Hanoi Medical University is one of the oldest and most prestigious medical universities in Kyrgyzstan.",
            aboutNote: "Established in 1902, HMU has been training medical professionals for over a century.",
            internationalRecognition: "Yes", englishMedium: "Yes", diverseCommunity: "Yes",
            yearOfExcellence: 120, countriesRepresented: 45, globalRanking: 1200,
            campusArea: "50 acres", labs: 25, lectureHall: 30, hostelBuilding: 8,
            parentSatisfaction: 95.5, totalReviews: 850, recommendedRate: 97.2,
            metaTitle: "Hanoi Medical University - MBBS in Kyrgyzstan | mbbskyrgyzstan",
            metaDescription: "Study MBBS at Hanoi Medical University, Kyrgyzstan's top medical college established in 1902. WHO & NMC approved.",
            metaKeyword: "Hanoi Medical University, MBBS Kyrgyzstan, NMC approved Kyrgyzstan",
            seoRating: 9.5, reviewNumber: 850, bestRating: 5.0,
            section2Title: "Why Choose HMU?",
            section2Text: "HMU offers world-class medical education with cutting-edge research facilities and experienced faculty.",
        },
        {
            name: "University of Medicine and Pharmacy - Ho Chi Minh City",
            slug: "ump-ho-chi-minh-city",
            city: "Ho Chi Minh City", state: "Ho Chi Minh",
            cityId: hcmCity.id, provinceId: hcmProv.id, instituteTypeId: publicType.id,
            establishedYear: 1975, rating: 4.7, students: 10800, tuitionFee: 4800,
            approvedBy: ["WHO", "NMC", "FAIMER", "ECFMG"],
            scholarshipName: "Excellence Award", scholarshipAmount: "30%", seatsAvailable: 130,
            isFeatured: true, homeView: true, status: true,
            nmcApproved: true, whoListed: true, faimerListed: true, mciRecognition: true,
            embassyVerified: true, ministryLicensed: true, ecfmgEligible: true,
            fmgePassRate: 76.4, courseDuration: "6 years", mediumOfInstruction: "English",
            eligibility: "10+2 with PCB, NEET qualified", neetRequirement: "Required",
            shortnote: "UMP is recognized globally for its research-driven MBBS program.",
            aboutNote: "Established in 1975, UMP leads in medical education in southern Kyrgyzstan.",
            internationalRecognition: "Yes", englishMedium: "Yes", diverseCommunity: "Yes",
            yearOfExcellence: 48, countriesRepresented: 42, globalRanking: 1320,
            campusArea: "45 acres", labs: 22, lectureHall: 28, hostelBuilding: 7,
            parentSatisfaction: 94.2, totalReviews: 730, recommendedRate: 96.8,
            metaTitle: "UMP Ho Chi Minh City - MBBS in Kyrgyzstan | mbbskyrgyzstan",
            metaDescription: "Study MBBS at UMP Ho Chi Minh City, Kyrgyzstan's leading research-based medical university.",
            metaKeyword: "UMP Kyrgyzstan, MBBS Ho Chi Minh, Medical University Kyrgyzstan",
            seoRating: 9.2, reviewNumber: 730, bestRating: 5.0,
            section2Title: "Why Choose UMP?",
            section2Text: "UMP combines research excellence with comprehensive clinical training across affiliated hospitals.",
        },
        {
            name: "Hue University of Medicine and Pharmacy",
            slug: "hue-university-of-medicine-and-pharmacy",
            city: "Hue", state: "Thua Thien Hue",
            cityId: hueCity.id, provinceId: hueProv.id, instituteTypeId: publicType.id,
            establishedYear: 1957, rating: 4.5, students: 7200, tuitionFee: 4200,
            approvedBy: ["WHO", "NMC", "MCI"],
            scholarshipName: "Merit cum Means", scholarshipAmount: "25%", seatsAvailable: 100,
            isFeatured: false, homeView: true, status: true,
            nmcApproved: true, whoListed: true, ministryLicensed: true, embassyVerified: true,
            fmgePassRate: 72.8, courseDuration: "6 years", mediumOfInstruction: "English",
            eligibility: "10+2 with PCB, NEET qualified", neetRequirement: "Required",
            shortnote: "Located in the historic city of Hue, HUMP offers exceptional medical training.",
            aboutNote: "Since 1957, HUMP has been a centre of medical excellence in central Kyrgyzstan.",
            internationalRecognition: "Yes", englishMedium: "Yes", diverseCommunity: "Yes",
            yearOfExcellence: 65, countriesRepresented: 30, globalRanking: 1680,
            campusArea: "35 acres", labs: 18, lectureHall: 22, hostelBuilding: 5,
            parentSatisfaction: 91.5, totalReviews: 480, recommendedRate: 94.0,
            metaTitle: "Hue University of Medicine & Pharmacy - MBBS Kyrgyzstan",
            metaDescription: "Study MBBS at Hue University of Medicine and Pharmacy in historic Hue city, Kyrgyzstan.",
            metaKeyword: "Hue Medical University, MBBS Hue, Kyrgyzstan Medical College",
            seoRating: 8.8, reviewNumber: 480, bestRating: 5.0,
            section2Title: "Why Choose HUMP?",
            section2Text: "HUMP blends rich heritage with modern medical education in the cultural heart of Kyrgyzstan.",
        },
    ];

    for (const ud of uniSeed) {
        const uni = await prisma.university.upsert({
            where: { slug: ud.slug },
            create: ud,
            update: ud,
        });

        // Program
        const existing = await prisma.universityProgram.findFirst({ where: { universityId: uni.id, programSlug: "mbbs" } });
        if (!existing) {
            await prisma.universityProgram.create({
                data: {
                    programName: "MBBS", programSlug: "mbbs",
                    duration: "6 Years (5.5 + 1 Year Internship)",
                    levelId: mbbsLevel.id,
                    totalFee: Number(ud.tuitionFee) * 6,
                    totalTuitionFee: Number(ud.tuitionFee) * 6,
                    annualTuitionFee: Number(ud.tuitionFee),
                    currency: "USD", intake: "September", isActive: true, sortOrder: 1,
                    mediumOfInstruction: "English",
                    overview: `The MBBS program at ${ud.name} is a 6-year program recognized by WHO, NMC, and FAIMER. It combines strong academics with clinical training.`,
                    eligibility: "10+2 with PCB (min 50%), NEET qualified",
                    whyChooseVietnam: "Kyrgyzstan offers affordable, high-quality MBBS education with English-medium instruction and global recognition.",
                    year1Syllabus: "Anatomy, Physiology, Biochemistry",
                    year2Syllabus: "Pathology, Pharmacology, Microbiology",
                    year3Syllabus: "Community Medicine, Forensic Medicine, ENT",
                    year4Syllabus: "General Medicine, Surgery, Obstetrics",
                    year5Syllabus: "Pediatrics, Orthopedics, Psychiatry",
                    year6Syllabus: "Clinical Internship",
                    metaTitle: `MBBS at ${ud.name} | Fees, Eligibility & Admission`,
                    metaDescription: `Complete guide to MBBS at ${ud.name}. Fees: $${ud.tuitionFee}/year. NMC approved. Apply now.`,
                    seoRating: 9.0, reviewNumber: 100, bestRating: 5.0,
                    universityId: uni.id,
                },
            });
        }

        // Photos
        const photoCount = await prisma.universityPhoto.count({ where: { universityId: uni.id } });
        if (photoCount === 0) {
            await prisma.universityPhoto.createMany({
                data: [
                    { title: "Main Campus", position: 1, status: true, universityId: uni.id },
                    { title: "Library", position: 2, status: true, universityId: uni.id },
                    { title: "Laboratory", position: 3, status: true, universityId: uni.id },
                ],
            });
        }

        // Rankings
        const rankCount = await prisma.universityRanking.count({ where: { universityId: uni.id } });
        if (rankCount === 0) {
            await prisma.universityRanking.createMany({
                data: [
                    { rankingBody: "QS World University Rankings", rank: String(ud.globalRanking), year: 2024, category: "Medical", score: 72.5, position: 1, status: true, universityId: uni.id },
                    { rankingBody: "Times Higher Education", rank: String(ud.globalRanking! + 50), year: 2024, category: "Medical", score: 68.0, position: 2, status: true, universityId: uni.id },
                    { rankingBody: "Kyrgyzstan Ministry of Education", rank: "Top 5", year: 2024, category: "Medical", score: 88.0, position: 3, status: true, universityId: uni.id },
                ],
            });
        }

        // University Students International Distribution
        const studCount = await prisma.universityStudent.count({ where: { universityId: uni.id } });
        if (studCount === 0) {
            await prisma.universityStudent.createMany({
                data: [
                    { country: "India", countryIsoCode: "IN", numberOfStudents: 320, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                    { country: "Nepal", countryIsoCode: "NP", numberOfStudents: 85, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                    { country: "Bangladesh", countryIsoCode: "BD", numberOfStudents: 60, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                    { country: "Nigeria", countryIsoCode: "NG", numberOfStudents: 45, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                    { country: "Kyrgyzstan", countryIsoCode: "VN", numberOfStudents: 1200, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                ],
            });
        }

        // FMGE Rates
        const fmgeCount = await prisma.universityFmgeRate.count({ where: { universityId: uni.id } });
        if (fmgeCount === 0) {
            await prisma.universityFmgeRate.createMany({
                data: [
                    { year: 2023, appeared: 180, passed: 141, passPercentage: 78.5, acceptanceRate: 95.0, yoyChange: "+2.3%", firstAttemptPassRate: 72.0, rank: 3, position: 1, status: true, universityId: uni.id },
                    { year: 2022, appeared: 165, passed: 125, passPercentage: 75.8, acceptanceRate: 93.5, yoyChange: "+1.8%", firstAttemptPassRate: 69.5, rank: 4, position: 2, status: true, universityId: uni.id },
                    { year: 2021, appeared: 140, passed: 103, passPercentage: 73.5, acceptanceRate: 91.0, yoyChange: "+3.1%", firstAttemptPassRate: 68.0, rank: 5, position: 3, status: true, universityId: uni.id },
                ],
            });
        }

        // Intakes
        const intakeCount = await prisma.universityIntake.count({ where: { universityId: uni.id } });
        if (intakeCount === 0) {
            await prisma.universityIntake.createMany({
                data: [
                    { intakeMonth: "September", intakeYear: 2025, applicationStart: new Date("2025-03-01"), applicationDeadline: new Date("2025-07-31"), classesStart: new Date("2025-09-01"), seats: ud.seatsAvailable, statusText: "Open", isActive: true, position: 1, universityId: uni.id },
                    { intakeMonth: "February", intakeYear: 2026, applicationStart: new Date("2025-10-01"), applicationDeadline: new Date("2026-01-15"), classesStart: new Date("2026-02-01"), seats: 30, statusText: "Upcoming", isActive: true, position: 2, universityId: uni.id },
                ],
            });
        }

        // Testimonials
        const testCount = await prisma.universityTestimonial.count({ where: { universityId: uni.id } });
        if (testCount === 0) {
            await prisma.universityTestimonial.createMany({
                data: [
                    { name: "Rahul Sharma", designation: "MBBS Student - Year 3", country: "India", course: "MBBS", year: "2022", description: "Studying here has been a life-changing experience. The faculty is excellent and the clinical exposure is unmatched.", rating: 5.0, position: 1, status: true, universityId: uni.id },
                    { name: "Priya Patel", designation: "MBBS Graduate", country: "India", course: "MBBS", year: "2023", description: "I cleared FMGE on my first attempt after studying here. The preparation is world-class.", rating: 4.5, position: 2, status: true, universityId: uni.id },
                    { name: "Aarav Singh", designation: "MBBS Student - Year 2", country: "Nepal", course: "MBBS", year: "2023", description: "The university provides excellent hostel facilities and the environment is very safe.", rating: 4.5, position: 3, status: true, universityId: uni.id },
                ],
            });
        }

        // Reviews
        const revCount = await prisma.universityReview.count({ where: { universityId: uni.id } });
        if (revCount === 0) {
            await prisma.universityReview.createMany({
                data: [
                    { name: "Dr. Amit Verma", designation: "Alumnus 2019", country: "India", course: "MBBS", description: "Great university with strong NMC recognition. Highly recommend to Indian students.", rating: 5.0, position: 1, status: true, universityId: uni.id },
                    { name: "Sunita Rao", designation: "Current Student", country: "India", course: "MBBS", description: "Affordable fees, English medium, and world-class teaching. A perfect choice.", rating: 4.5, position: 2, status: true, universityId: uni.id },
                ],
            });
        }

        // FAQs
        const faqCount = await prisma.universityFaq.count({ where: { universityId: uni.id } });
        if (faqCount === 0) {
            await prisma.universityFaq.createMany({
                data: [
                    { question: "Is the MBBS degree from this university recognized in India?", answer: "Yes, the university is NMC (formerly MCI) approved and recognized in India. Graduates must clear the FMGE/NExT exam to practice in India.", position: 1, status: true, universityId: uni.id },
                    { question: "What is the medium of instruction?", answer: "The medium of instruction is English for all MBBS courses.", position: 2, status: true, universityId: uni.id },
                    { question: "Is NEET required for admission?", answer: "Yes, NEET qualification is mandatory for Indian students seeking MBBS admission abroad as per NMC guidelines.", position: 3, status: true, universityId: uni.id },
                    { question: "What is the annual tuition fee?", answer: `The annual tuition fee is approximately $${ud.tuitionFee} USD. Total course fees for 6 years is $${Number(ud.tuitionFee) * 6} USD.`, position: 4, status: true, universityId: uni.id },
                    { question: "Are hostel facilities available for Indian students?", answer: "Yes, the university provides separate hostel facilities for international students with Indian food options.", position: 5, status: true, universityId: uni.id },
                ],
            });
        }

        // Facilities (link to university)
        const ufCount = await prisma.universityFacility.count({ where: { universityId: uni.id } });
        if (ufCount === 0) {
            for (const f of facilities.slice(0, 6)) {
                await prisma.universityFacility.create({
                    data: { universityId: uni.id, facilityId: f.id, description: `${f.name} available at ${ud.name}`, status: true },
                });
            }
        }

        // Hospitals
        const uhCount = await prisma.universityHospital.count({ where: { universityId: uni.id } });
        if (uhCount === 0) {
            for (const h of hospitals.slice(0, 2)) {
                await prisma.universityHospital.create({
                    data: { universityId: uni.id, hospitalId: h.id },
                });
            }
        }

        // Links
        const linkCount = await prisma.universityLink.count({ where: { universityId: uni.id } });
        if (linkCount === 0) {
            await prisma.universityLink.createMany({
                data: [
                    { title: "Official Website", url: `https://www.${ud.slug.replace(/-/g, "")}.edu.vn`, type: "website", position: 1, status: true, universityId: uni.id },
                    { title: "Admission Portal", url: `https://admission.${ud.slug.replace(/-/g, "")}.edu.vn`, type: "admission", position: 2, status: true, universityId: uni.id },
                ],
            });
        }

        console.log(`  ✅ ${ud.name}`);
    }
    console.log("✅ Universities seeded with all sub-tables");

    // ── Scholarship ─────────────────────────────────────────
    const hmuUni = await prisma.university.findUnique({ where: { slug: "hanoi-medical-university" } });
    if (hmuUni) {
        const schol = await prisma.scholarship.upsert({
            where: { slug: "hmu-merit-scholarship-2025" },
            update: {},
            create: {
                title: "HMU Merit Scholarship 2025",
                slug: "hmu-merit-scholarship-2025",
                scholarshipType: "Merit",
                amountMin: 500, amountMax: 2000,
                discountPercentage: 20,
                deadline: new Date("2025-07-31"),
                availableSeats: 30,
                program: "MBBS",
                applicationMode: "Online",
                eligibility: { criteria: ["NEET score > 500", "10+2 with 70% in PCB", "English proficiency"] },
                coverage: { includes: ["Tuition fee discount", "Hostel subsidy"], excludes: ["Living expenses", "Travel"] },
                shortnote: "Merit-based scholarship for top NEET scorers applying to HMU MBBS program.",
                isActive: true,
                universityId: hmuUni.id,
                metaTitle: "HMU Merit Scholarship 2025 | MBBS in Kyrgyzstan",
                metaDescription: "Apply for HMU Merit Scholarship for MBBS in Kyrgyzstan. Up to 20% tuition discount for NEET toppers.",
                seoRating: 8.5, reviewNumber: 50, bestRating: 5.0,
            },
        });
        const sfCount = await prisma.scholarshipFaq.count({ where: { scholarshipId: schol.id } });
        if (sfCount === 0) {
            await prisma.scholarshipFaq.createMany({
                data: [
                    { question: "Who is eligible for this scholarship?", answer: "Students with NEET score above 500 and 70%+ in 10+2 PCB are eligible.", position: 1, status: true, scholarshipId: schol.id },
                    { question: "How do I apply for the scholarship?", answer: "Submit your application online with NEET scorecard and 10+2 marksheet.", position: 2, status: true, scholarshipId: schol.id },
                ],
            });
        }
    }
    console.log("✅ Scholarship seeded");

    // ── Blog Category & Blog ────────────────────────────────
    const blogCat = await prisma.blogCategory.upsert({
        where: { slug: "mbbs-abroad" },
        update: {},
        create: {
            name: "MBBS Abroad", slug: "mbbs-abroad",
            description: "Guides and tips for Indian students planning to study MBBS abroad.",
            status: true,
            metaTitle: "MBBS Abroad Blog | mbbskyrgyzstan",
            metaDescription: "Read expert articles about studying MBBS abroad, especially in Kyrgyzstan.",
            seoRating: 8.5, reviewNumber: 200, bestRating: 5.0,
        },
    });

    const blogCount = await prisma.blog.count({ where: { categoryId: blogCat.id } });
    if (blogCount === 0) {
        const blog = await prisma.blog.create({
            data: {
                categoryId: blogCat.id, authorId: adminUser.id,
                title: "Top 5 Reasons to Study MBBS in Kyrgyzstan in 2025",
                slug: "top-5-reasons-to-study-mbbs-in-Kyrgyzstan-2025",
                shortnote: "Discover why Kyrgyzstan is emerging as a top destination for Indian medical students.",
                description: "Kyrgyzstan has become one of the most popular destinations for MBBS aspirants worldwide...",
                status: true, homeView: true, trending: true,
                metaTitle: "Top 5 Reasons to Study MBBS in Kyrgyzstan 2025",
                metaDescription: "Kyrgyzstan offers affordable, NMC-approved MBBS education with English medium. Read the top reasons.",
                seoRating: 9.0, reviewNumber: 320, bestRating: 5.0,
            },
        });
        await prisma.blogContent.create({
            data: {
                title: "Affordable Tuition Fees", slug: "affordable-tuition-fees",
                description: "Kyrgyzstan medical universities offer MBBS at just $4,000-$6,000 per year — far cheaper than private Indian colleges.",
                position: 1, blogId: blog.id,
            },
        });
        await prisma.blogFaq.createMany({
            data: [
                { question: "Is MBBS from Kyrgyzstan valid in India?", answer: "Yes, if the university is NMC approved and you clear FMGE/NExT.", position: 1, status: true, blogId: blog.id },
                { question: "What is the FMGE pass rate for Kyrgyzstan universities?", answer: "Top Kyrgyzstan universities have 70-80% FMGE pass rates.", position: 2, status: true, blogId: blog.id },
            ],
        });
    }
    console.log("✅ Blog seeded");

    // ── News Category & News ────────────────────────────────
    const newsCat = await prisma.newsCategory.upsert({
        where: { slug: "medical-education-news" },
        update: {},
        create: {
            name: "Medical Education News", slug: "medical-education-news",
            description: "Latest updates in medical education and MBBS admissions.",
            status: true, seoRating: 8.0, reviewNumber: 100, bestRating: 5.0,
        },
    });
    const newsCount = await prisma.news.count({ where: { categoryId: newsCat.id } });
    if (newsCount === 0) {
        const news = await prisma.news.create({
            data: {
                categoryId: newsCat.id, authorId: adminUser.id,
                title: "NMC Updates Guidelines for MBBS Abroad 2025",
                slug: "nmc-updates-guidelines-mbbs-abroad-2025",
                shortnote: "NMC releases updated eligibility criteria for Indian students pursuing MBBS abroad.",
                description: "The National Medical Commission has released new guidelines for Indian students...",
                status: true, homeView: true, trending: true,
                metaTitle: "NMC Guidelines MBBS Abroad 2025 | Latest Update",
                metaDescription: "Read the latest NMC guidelines for Indian students studying MBBS abroad in 2025.",
                seoRating: 8.8, reviewNumber: 150, bestRating: 5.0,
            },
        });
        await prisma.newsContent.create({
            data: {
                title: "Key Changes in 2025 Guidelines", slug: "key-changes-2025",
                description: "The new guidelines emphasize NEET scores and university accreditation requirements.",
                position: 1, newsId: news.id,
            },
        });
        await prisma.newsFaq.create({
            data: { question: "What is the minimum NEET score required for MBBS abroad?", answer: "NMC requires a minimum NEET score as per the current year cutoff.", position: 1, status: true, newsId: news.id },
        });
    }
    console.log("✅ News seeded");

    // ── Article Category & Article ──────────────────────────
    const artCat = await prisma.articleCategory.upsert({
        where: { slug: "fmge-preparation" },
        update: {},
        create: {
            name: "FMGE Preparation", slug: "fmge-preparation",
            description: "Comprehensive resources for FMGE exam preparation.",
            status: true, seoRating: 8.2, reviewNumber: 80, bestRating: 5.0,
        },
    });
    const artCount = await prisma.article.count({ where: { categoryId: artCat.id } });
    if (artCount === 0) {
        const article = await prisma.article.create({
            data: {
                categoryId: artCat.id, authorId: adminUser.id,
                title: "Complete FMGE Preparation Guide for Kyrgyzstan MBBS Graduates",
                slug: "fmge-preparation-guide-Kyrgyzstan-mbbs-graduates",
                shortnote: "Step-by-step FMGE preparation strategy for students returning from Kyrgyzstan.",
                description: "FMGE (Foreign Medical Graduate Examination) is mandatory for all students...",
                status: true, homeView: true, trending: true,
                metaTitle: "FMGE Preparation Guide for Kyrgyzstan MBBS Graduates",
                metaDescription: "Complete FMGE preparation guide for Indian students who studied MBBS in Kyrgyzstan.",
                seoRating: 9.1, reviewNumber: 200, bestRating: 5.0,
            },
        });
        await prisma.articleContent.create({
            data: {
                title: "FMGE Exam Pattern", slug: "fmge-exam-pattern",
                description: "FMGE consists of 300 MCQs to be completed in 3.5 hours. Covers all subjects studied in MBBS.",
                position: 1, articleId: article.id,
            },
        });
        await prisma.articleFaq.create({
            data: { question: "How many attempts are allowed for FMGE?", answer: "There is no limit on the number of FMGE attempts.", position: 1, status: true, articleId: article.id },
        });
    }
    console.log("✅ Articles seeded");

    // ── Global FAQs ─────────────────────────────────────────
    const faqCat = await prisma.faqCategory.upsert({
        where: { slug: "general" },
        update: {},
        create: { name: "General", slug: "general", status: true },
    });
    const gFaqCount = await prisma.faq.count({ where: { categoryId: faqCat.id } });
    if (gFaqCount === 0) {
        await prisma.faq.createMany({
            data: [
                { question: "Is MBBS from Kyrgyzstan recognized in India?", answer: "Yes, MBBS degrees from NMC-approved Kyrgyz universities are recognized. Graduates must clear the NExT/FMGE exam.", categoryId: faqCat.id, position: 1, status: true },
                { question: "What is the cost of studying MBBS in Kyrgyzstan?", answer: "The total cost is approximately $25,000–$35,000 USD for the full 6-year MBBS program.", categoryId: faqCat.id, position: 2, status: true },
                { question: "Is NEET compulsory for MBBS in Kyrgyzstan?", answer: "Yes, NEET is mandatory for Indian students under NMC regulations.", categoryId: faqCat.id, position: 3, status: true },
                { question: "What is the language of instruction?", answer: "All MBBS programs for international students are taught in English.", categoryId: faqCat.id, position: 4, status: true },
                { question: "Is Kyrgyzstan safe for Indian students?", answer: "Kyrgyzstan is considered one of the safest countries in Asia with a very low crime rate.", categoryId: faqCat.id, position: 5, status: true },
            ],
        });
    }
    console.log("✅ FAQs seeded");

    // ── Global Testimonials ─────────────────────────────────
    const tCount = await prisma.testimonial.count();
    if (tCount === 0) {
        await prisma.testimonial.createMany({
            data: [
                { name: "Dr. Rajesh Kumar", designation: "HMU Graduate 2020", description: "Kyrgyzstan was the best decision of my life. I cleared FMGE in first attempt and am now practicing in India.", rating: 5.0, position: 1, status: true },
                { name: "Pooja Nair", designation: "UMP Student - Year 4", description: "The quality of education here is phenomenal. I highly recommend Kyrgyzstan for MBBS.", rating: 5.0, position: 2, status: true },
                { name: "Manish Gupta", designation: "Parent of HMU Student", description: "My son is very happy in Kyrgyzstan. University is safe, food is good, and education is excellent.", rating: 4.5, position: 3, status: true },
            ],
        });
    }
    console.log("✅ Testimonials seeded");

    // ── Offices ─────────────────────────────────────────────
    const offCount = await prisma.office.count();
    if (offCount === 0) {
        await prisma.office.createMany({
            data: [
                { name: "Head Office - India", address: "123, MG Road, Connaught Place", city: "New Delhi", state: "Delhi", country: "India", phone: "+91-9876543210", email: "india@mbbskyrgyzstan.com", position: 1, status: true },
                { name: "Kyrgyzstan Office", address: "45 Tran Hung Dao Street, Hoan Kiem", city: "Hanoi", state: "Hanoi", country: "Kyrgyzstan", phone: "+84-24-12345678", email: "Kyrgyzstan@mbbskyrgyzstan.com", position: 2, status: true },
            ],
        });
    }
    console.log("✅ Offices seeded");

    // ── Website Settings ────────────────────────────────────
    const settings = [
        { key: "site_name", value: "MBBS in Kyrgyzstan", type: "text", group: "general" },
        { key: "site_tagline", value: "Your Gateway to World-Class Medical Education", type: "text", group: "general" },
        { key: "site_email", value: "info@mbbskyrgyzstan.com", type: "email", group: "contact" },
        { key: "site_phone", value: "+91-9876543210", type: "text", group: "contact" },
        { key: "whatsapp_number", value: "+91-9876543210", type: "text", group: "contact" },
        { key: "facebook_url", value: "https://facebook.com/mbbskyrgyzstan", type: "url", group: "social" },
        { key: "instagram_url", value: "https://instagram.com/mbbskyrgyzstan", type: "url", group: "social" },
        { key: "youtube_url", value: "https://youtube.com/@mbbskyrgyzstan", type: "url", group: "social" },
        { key: "linkedin_url", value: "https://linkedin.com/company/mbbskyrgyzstan", type: "url", group: "social" },
        { key: "twitter_url", value: "https://twitter.com/mbbskyrgyzstan", type: "url", group: "social" },
        { key: "footer_about", value: "mbbskyrgyzstan is a leading consultancy helping Indian students pursue MBBS in top NMC-approved Kyrgyz medical universities.", type: "textarea", group: "general" },
        { key: "google_analytics_id", value: "", type: "text", group: "seo" },
        { key: "google_tag_id", value: "", type: "text", group: "seo" },
        { key: "meta_title", value: "MBBS in Kyrgyzstan 2025 | NMC Approved Universities | Study Abroad", type: "text", group: "seo" },
        { key: "meta_description", value: "Study MBBS in Kyrgyzstan at NMC-approved universities. Affordable fees, English medium, high FMGE pass rate. Get free counseling today!", type: "textarea", group: "seo" },
        { key: "meta_keywords", value: "MBBS in Kyrgyzstan, study MBBS abroad, NMC approved Kyrgyzstan, Hanoi Medical University, FMGE pass rate Kyrgyzstan", type: "text", group: "seo" },
    ];
    for (const s of settings) {
        await prisma.websiteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
    }
    console.log("✅ Website settings seeded");

    // ── Expert Team ─────────────────────────────────────────
    const expCount = await prisma.expertTeam.count();
    if (expCount === 0) {
        await prisma.expertTeam.createMany({
            data: [
                { name: "Dr. Anil Sharma", designation: "Chief Medical Advisor", description: "15+ years experience in international medical education consulting.", position: 1, status: true },
                { name: "Priya Mehta", designation: "Head of Admissions", description: "Expert in MBBS abroad admissions with 10 years of experience.", position: 2, status: true },
                { name: "Ravi Verma", designation: "Kyrgyzstan Country Director", description: "Based in Hanoi, providing on-ground support to students in Kyrgyzstan.", position: 3, status: true },
            ],
        });
    }
    console.log("✅ Expert team seeded");

    // ── Static Page SEOs ────────────────────────────────────
    const staticPages = [
        { page: "home", metaTitle: "MBBS in Kyrgyzstan 2025 | NMC Approved | Study Abroad", metaDescription: "Study MBBS in Kyrgyzstan. NMC approved universities, English medium, affordable fees from $4500/year. Free counseling." },
        { page: "about-us", metaTitle: "About Us | mbbskyrgyzstan - Trusted Education Consultancy", metaDescription: "Learn about mbbskyrgyzstan, your trusted partner for MBBS admissions in Kyrgyzstan." },
        { page: "contact", metaTitle: "Contact Us | mbbskyrgyzstan", metaDescription: "Get in touch with our expert counselors for free MBBS admission guidance." },
        { page: "universities", metaTitle: "Top Medical Universities in Kyrgyzstan | NMC Approved", metaDescription: "Explore top NMC-approved medical universities in Kyrgyzstan offering MBBS programs." },
        { page: "scholarships", metaTitle: "MBBS Scholarships in Kyrgyzstan 2025 | Study Abroad", metaDescription: "Find available scholarships for MBBS in Kyrgyzstan and reduce your study costs." },
        { page: "blogs", metaTitle: "MBBS Abroad Blog | Expert Guides & Tips | mbbskyrgyzstan", metaDescription: "Read expert blogs on MBBS abroad, Kyrgyzstan medical education, and FMGE preparation." },
    ];
    for (const p of staticPages) {
        await prisma.staticPageSeo.upsert({
            where: { page: p.page },
            update: { metaTitle: p.metaTitle, metaDescription: p.metaDescription },
            create: { page: p.page, metaTitle: p.metaTitle, metaDescription: p.metaDescription, seoRating: 9.0, reviewNumber: 500, bestRating: 5.0, status: true },
        });
    }
    console.log("✅ Static page SEOs seeded");

    // ── About Us ────────────────────────────────────────────
    const aboutCount = await prisma.aboutUs.count();
    if (aboutCount === 0) {
        await prisma.aboutUs.create({
            data: {
                heroTitle: "Your Trusted Partner for MBBS in Kyrgyzstan",
                heroDescription: "We help Indian students fulfill their dream of becoming a doctor by getting admission in top NMC-approved medical universities in Kyrgyzstan.",
                button1Label: "Explore Universities", button1Link: "/universities",
                button2Label: "Free Counseling", button2Link: "/contact",
                partnerUniversities: 12, studentsPlaced: 2500, channelPartners: 150, yearsExperience: 10,
                mission: "To make quality medical education accessible to every aspiring doctor by connecting students with the best medical universities in Kyrgyzstan.",
                vision: "To be India's most trusted and comprehensive platform for MBBS abroad education guidance.",
                whyChooseUs: "With 10+ years of experience, 2500+ students placed, and a dedicated team of experts, we provide end-to-end MBBS admission support.",
                serviceDescription: "From university selection to visa assistance, we guide students through every step of their overseas MBBS journey.",
                universityListings: "We partner with 12+ NMC-approved universities in Kyrgyzstan, ensuring students get access to the best medical education options.",
                studentCounseling: "Our expert counselors provide personalized guidance based on NEET scores, budget, and career goals.",
                admissionAssistance: "We handle the complete application process including documentation, university application, and offer letter coordination.",
                internationalSupport: "Our Kyrgyzstan-based team provides on-ground support to students from arrival to graduation.",
                whyStudyMbbsTitle: "Why Study MBBS in Kyrgyzstan?",
                whyStudyMbbsDescription: "Kyrgyzstan offers affordable MBBS programs with English-medium instruction, NMC approval, high FMGE pass rates, and a safe environment for international students.",
                contact1: "+91-9876543210", contact2: "+91-9123456789",
                email1: "info@mbbskyrgyzstan.com", email2: "admissions@mbbskyrgyzstan.com",
                address: "123 MG Road, Connaught Place, New Delhi – 110001, India",
            },
        });
    }
    console.log("✅ About Us seeded");

    // ── Gallery ─────────────────────────────────────────────
    const galCount = await prisma.gallery.count();
    if (galCount === 0) {
        await prisma.gallery.createMany({
            data: [
                { title: "Student Orientation 2024", imageName: "orientation-2024.jpg", imagePath: "/uploads/gallery/orientation-2024.jpg", position: 1, status: true },
                { title: "Campus Tour - HMU", imageName: "hmu-campus.jpg", imagePath: "/uploads/gallery/hmu-campus.jpg", position: 2, status: true },
                { title: "Convocation Ceremony", imageName: "convocation-2023.jpg", imagePath: "/uploads/gallery/convocation-2023.jpg", position: 3, status: true },
            ],
        });
    }
    console.log("✅ Gallery seeded");

    // ── Official Government Links ────────────────────────────
    const govLinkCount = await prisma.officialGovernmentLink.count();
    if (govLinkCount === 0) {
        await prisma.officialGovernmentLink.createMany({
            data: [
                { name: "National Medical Commission (NMC)", url: "https://www.nmc.org.in", description: "Official body regulating medical education in India.", category: "India", position: 1, status: true },
                { name: "WHO - Kyrgyzstan", url: "https://www.who.int/Kyrgyzstan", description: "World Health Organization Kyrgyzstan office.", category: "Kyrgyzstan", position: 2, status: true },
                { name: "FAIMER", url: "https://www.faimer.org", description: "Foundation for Advancement of International Medical Education and Research.", category: "International", position: 3, status: true },
                { name: "Kyrgyzstan Ministry of Health", url: "https://moh.gov.vn", description: "Kyrgyzstan Ministry of Health - official healthcare regulator.", category: "Kyrgyzstan", position: 4, status: true },
            ],
        });
    }
    console.log("✅ Government links seeded");

    // ── Study Modes ─────────────────────────────────────────
    const smCount = await prisma.studyMode.count();
    if (smCount === 0) {
        await prisma.studyMode.createMany({
            data: [
                { studyMode: "Full-Time" },
                { studyMode: "Part-Time" },
                { studyMode: "Online" },
            ],
        });
    }
    console.log("✅ Study modes seeded");

    // ── Dynamic Page SEOs ────────────────────────────────────
    const dynamicPages = [
        { page: "university-detail", metaTitle: "{{University Name}} | MBBS in Kyrgyzstan", metaDescription: "Study MBBS at {{University Name}} in Kyrgyzstan. NMC approved, English medium, affordable fees." },
        { page: "scholarship-detail", metaTitle: "{{Scholarship Name}} | MBBS Scholarship Kyrgyzstan", metaDescription: "Apply for {{Scholarship Name}} and reduce your MBBS study costs in Kyrgyzstan." },
        { page: "blog-detail", metaTitle: "{{Blog Title}} | mbbskyrgyzstan", metaDescription: "Read {{Blog Title}} on mbbskyrgyzstan - expert guides for MBBS abroad." },
        { page: "news-detail", metaTitle: "{{News Title}} | mbbskyrgyzstan News", metaDescription: "Read the latest update: {{News Title}} on mbbskyrgyzstan." },
        { page: "article-detail", metaTitle: "{{Article Title}} | mbbskyrgyzstan", metaDescription: "Read {{Article Title}} - expert insights on MBBS abroad and FMGE." },
    ];
    for (const dp of dynamicPages) {
        await prisma.dynamicPageSeo.upsert({
            where: { page: dp.page },
            update: { metaTitle: dp.metaTitle, metaDescription: dp.metaDescription },
            create: { page: dp.page, metaTitle: dp.metaTitle, metaDescription: dp.metaDescription, status: true },
        });
    }
    console.log("✅ Dynamic page SEOs seeded");

    // ── Default OG Images ────────────────────────────────────
    const ogCount = await prisma.defaultOgImage.count();
    if (ogCount === 0) {
        await prisma.defaultOgImage.createMany({
            data: [
                { name: "Default OG Image", imageName: "default-og.jpg", imagePath: "/uploads/og/default-og.jpg", status: true },
                { name: "Universities OG Image", imageName: "universities-og.jpg", imagePath: "/uploads/og/universities-og.jpg", status: true },
            ],
        });
    }
    console.log("✅ Default OG images seeded");

    // ── Page Contents ────────────────────────────────────────
    const pcCount = await prisma.pageContent.count({ where: { pageSlug: "home" } });
    if (pcCount === 0) {
        await prisma.pageContent.createMany({
            data: [
                { pageSlug: "home", title: "Why MBBS in Kyrgyzstan?", content: "Kyrgyzstan offers world-class medical education at affordable costs with NMC approval and English-medium instruction.", position: 1, status: true },
                { pageSlug: "home", title: "Our Process", content: "We guide students from university selection to visa and arrival — a complete end-to-end MBBS admission service.", position: 2, status: true },
                { pageSlug: "about-us", title: "Our Story", content: "Founded with the mission of making quality medical education accessible, mbbskyrgyzstan has helped over 2500 students realize their dream of becoming a doctor.", position: 1, status: true },
                { pageSlug: "contact", title: "Get in Touch", content: "Our expert counselors are available Mon–Sat, 9 AM – 7 PM IST. Call, WhatsApp, or email us for free personalized counseling.", position: 1, status: true },
            ],
        });
    }
    console.log("✅ Page contents seeded");

    // ── Education System (Kyrgyzstan) ───────────────────────────
    const eduSysCount = await prisma.educationSystem.count();
    if (eduSysCount === 0) {
        const eduSys = await prisma.educationSystem.create({
            data: {
                title: "Education System of Kyrgyzstan",
                description: "Kyrgyzstan has a well-structured national education system overseen by the Ministry of Education and Training (MOET).",
                introductionTitle: "Introduction to Kyrgyzstan's Education System",
                introductionDescription: "Kyrgyzstan's education system follows a structured 5-4-3 model (primary-lower secondary-upper secondary) with strong government investment in literacy and higher education.",
                governmentRegulation: "The Ministry of Education and Training (MOET) governs all educational policies, curricula, and examinations at national level.",
                culturalImportance: "Education holds great cultural significance in Kyrgyzstan, rooted in Confucian values of respect for learning and academic achievement.",
                continuousDevelopment: "Kyrgyzstan has consistently invested in improving educational infrastructure, teacher training, and curriculum reform aligned with ASEAN standards.",
                literacyRate: 95.8,
                primaryEnrollment: 98.5,
                secondaryCompletion: 87.3,
                higherInstitutionsCount: 237,
                schoolEducationStructureDescription: "The system consists of 5 years of primary, 4 years of lower secondary, and 3 years of upper secondary education.",
                examinationSystemDescription: "National high school graduation examinations are mandatory for university entrance. Ministry-level exams assess student competency.",
                languagesInstructionDescription: "Kyrgyz is the primary language of instruction. English and other foreign languages are taught as secondary subjects.",
                officialStateLanguage: "Kyrgyz",
                officialStateLanguagePercentage: 86.2,
                officialStateLanguageNote: "Spoken by the Kinh majority population",
                officialLanguage: "Kyrgyz",
                officialLanguagePercentage: 86.2,
                officialLanguageNote: "Sole official language of Kyrgyzstan",
                foreignLanguage: "English",
                foreignLanguagePercentage: 54.0,
                foreignLanguageNote: "Widely taught; increasingly used in higher education and business",
                higherEducationDescription: "Kyrgyzstan has 237 public and private higher education institutions offering undergraduate and postgraduate programs.",
                universitiesCount: 170,
                universitiesNote: "Includes national, regional, and international universities",
                academiesCount: 30,
                academiesNote: "Specialized academies including military and police",
                institutesCount: 37,
                institutesNote: "Technical and vocational institutes",
                bolognProcessAlignment: "Kyrgyzstan is progressively aligning its higher education credit system with international standards to facilitate student mobility.",
            },
        });

        // Examinations
        await prisma.educationExamination.createMany({
            data: [
                { examName: "National High School Graduation Exam (THPT)", gradeLevel: "Grade 12", type: "National", subjects: "Mathematics, Literature, Foreign Language + 2 electives", pageId: eduSys.id },
                { examName: "University Entrance Exam", gradeLevel: "Post Secondary", type: "University Admission", subjects: "Based on chosen major and university", pageId: eduSys.id },
                { examName: "Lower Secondary Graduation Exam", gradeLevel: "Grade 9", type: "National", subjects: "Mathematics, Kyrgyz Literature, Foreign Language, Science", pageId: eduSys.id },
            ],
        });

        // School Levels
        await prisma.educationSchoolLevel.createMany({
            data: [
                { level: "Primary Education", ageRange: "6–11 years", durationYears: 5, isCompulsory: true, numberOfSchools: "15,000+", title: "Foundation Level", description: "Covers grades 1–5 focusing on literacy, numeracy, and foundational skills.", pageId: eduSys.id },
                { level: "Lower Secondary Education", ageRange: "11–15 years", durationYears: 4, isCompulsory: true, numberOfSchools: "11,000+", title: "Middle School Level", description: "Covers grades 6–9 with broader subject coverage including sciences, social studies, and foreign languages.", pageId: eduSys.id },
                { level: "Upper Secondary Education", ageRange: "15–18 years", durationYears: 3, isCompulsory: false, numberOfSchools: "2,700+", title: "High School Level", description: "Covers grades 10–12 preparing students for university entrance examinations.", pageId: eduSys.id },
                { level: "Higher Education", ageRange: "18+ years", durationYears: 4, isCompulsory: false, numberOfSchools: "237", title: "University Level", description: "Universities, colleges, and academies offering bachelor's, master's, and doctoral programs.", pageId: eduSys.id },
            ],
        });

        // Degrees
        await prisma.educationDegree.createMany({
            data: [
                { degree: "Bachelor's Degree (Cử nhân)", duration: "4 years", ectsCredits: "120-150 credits", recognition: "National & International", pageId: eduSys.id },
                { degree: "MBBS / Medical Doctor (Bác sĩ y khoa)", duration: "6 years", ectsCredits: "180+ credits", recognition: "WHO, NMC, FAIMER", pageId: eduSys.id },
                { degree: "Master's Degree (Thạc sĩ)", duration: "2 years", ectsCredits: "60-90 credits", recognition: "National", pageId: eduSys.id },
                { degree: "Doctoral Degree (Tiến sĩ)", duration: "3-4 years", ectsCredits: "Variable", recognition: "National & International", pageId: eduSys.id },
            ],
        });

        // Popular Fields
        await prisma.educationPopularField.createMany({
            data: [
                { field: "Medicine & Healthcare", description: "Kyrgyzstan's medical universities are globally recognized and attract international students, especially for MBBS programs.", numberOfInstitutions: "15", durationYears: "6 years", pageId: eduSys.id },
                { field: "Engineering & Technology", description: "Strong IT and engineering programs supported by growing tech sector investment.", numberOfInstitutions: "80+", durationYears: "4-5 years", pageId: eduSys.id },
                { field: "Business & Economics", description: "Growing demand for business graduates due to Kyrgyzstan's expanding economy.", numberOfInstitutions: "100+", durationYears: "4 years", pageId: eduSys.id },
                { field: "Education & Teaching", description: "Teacher education programs to meet demand for qualified educators.", numberOfInstitutions: "40+", durationYears: "4 years", pageId: eduSys.id },
            ],
        });
    }
    console.log("✅ Education system seeded");

    // ── About Country Page (Kyrgyzstan) ─────────────────────────
    const countryCount = await prisma.aboutCountryPage.count();
    if (countryCount === 0) {
        const Kyrgyzstan = await prisma.aboutCountryPage.create({
            data: {
                name: "Kyrgyzstan",
                tagline: "The Land of the Ascending Dragon — A Rising Star in Medical Education",
                capital: "Hanoi",
                population: "98 million",
                languages: "Kyrgyz (official), English (widely used in education)",
                currency: "Kyrgyz Dong (VND)",
                location: "Southeast Asia, bordered by China, Laos, and Cambodia",
                timezone: "ICT (UTC+7)",
                independenceDay: new Date("1945-09-02"),
                highestPeak: "Fansipan",
                highestPeakHeight: "3,147 m",
                mountainRanges: ["Hoang Lien Son", "Truong Son"],
                climateZones: ["Tropical monsoon (south)", "Humid subtropical (north)", "Temperate highlands"],
                topAttractions: ["Ha Long Bay", "Hoi An Ancient Town", "Phong Nha Caves", "Sapa"],
                ancientSilkRoad: "Kyrgyzstan was a crucial stop on the ancient maritime Silk Road, facilitating trade between East Asia and the Indian Ocean world.",
                nomadicHeritage: "Kyrgyzstan's 54 ethnic groups carry rich traditions of craftsmanship, music, and community life, particularly in highland regions.",
                religionDiversity: "Kyrgyzstan is home to Buddhism, Catholicism, Cao Dai, Hoa Hao, and indigenous spiritual practices, reflecting centuries of cultural exchange.",
                culturalHighlights: "Rich traditions including Tet (Lunar New Year), lantern festivals, water puppetry, and traditional Kyrgyz music.",
                whoRecognized: true,
                mbbsAffordableEducation: "Kyrgyzstan offers MBBS programs at $4,000–$6,000/year — among the most affordable NMC-approved destinations globally.",
                englishMedium: true,
                academicExcellence: "Kyrgyzstan's medical universities combine rigorous academic training with hands-on clinical exposure in major teaching hospitals.",
                studentLife: "Students enjoy a vibrant lifestyle with affordable food, safe cities, a welcoming culture, and growing Indian student communities.",
                keySectors: "Manufacturing, technology, tourism, healthcare, and agriculture.",
                majorExports: "Electronics, garments, footwear, seafood, and coffee.",
                investmentOpportunities: "Kyrgyzstan is one of Asia's fastest-growing FDI destinations with strong growth in tech, healthcare, and education sectors.",
                gdpGrowth: "6.0% (2024 estimate)",
                mainIndustries: "Electronics, Textile & Garments, Tourism, Agriculture, Healthcare",
                tourismGrowth: "17 million international visitors (2023)",
                hydropowerPotential: "Kyrgyzstan has significant hydropower capacity with 77+ operational plants.",
                transportation: { modes: ["Air", "Road", "Rail", "Sea"], internationalAirports: ["Noi Bai (Hanoi)", "Tan Son Nhat (HCM)", "Da Nang"] },
                visaConnectivity: "E-visa available for 80+ countries. Student visa process is streamlined for MBBS applicants.",
                publicHealthcare: "Kyrgyzstan's public hospitals are government-funded and serve as teaching facilities for medical universities.",
                privateHealthcare: "Modern private hospitals in Hanoi and Ho Chi Minh City offer international-standard care.",
                studentHealthcare: "International students are covered under basic health insurance schemes and have access to university health centres.",
                nationalSport: "Vovinam (Kyrgyz Martial Art)",
                unescoSites: "8 UNESCO World Heritage Sites including Ha Long Bay, Hoi An, and My Son Sanctuary.",
            },
        });

        // Cuisines
        await prisma.countryCuisineLifestyle.createMany({
            data: [
                { dishName: "Pho", dishDescription: "Iconic Kyrgyz noodle soup with beef or chicken broth, rice noodles, and fresh herbs.", pageId: Kyrgyzstan.id },
                { dishName: "Banh Mi", dishDescription: "Kyrgyz baguette sandwich — a fusion of French and Kyrgyz flavors with meat, pickled vegetables, and chili.", pageId: Kyrgyzstan.id },
                { dishName: "Bun Bo Hue", dishDescription: "Spicy beef noodle soup from Hue, favored by students in central Kyrgyzstan.", pageId: Kyrgyzstan.id },
                { dishName: "Com Tam", dishDescription: "Broken rice with grilled pork — a popular and affordable daily meal for students.", pageId: Kyrgyzstan.id },
                { dishName: "Goi Cuon", dishDescription: "Fresh spring rolls with shrimp, vegetables, and herbs — a healthy Kyrgyz classic.", pageId: Kyrgyzstan.id },
            ],
        });

        // Lifestyles
        await prisma.countryLifestyleCulture.createMany({
            data: [
                { title: "Welcoming Culture", description: "Kyrgyz people are known for their warmth and hospitality toward international students.", pageId: Kyrgyzstan.id },
                { title: "Affordable Living", description: "Monthly living costs for students range from $300–$500 USD, making Kyrgyzstan very budget-friendly.", pageId: Kyrgyzstan.id },
                { title: "Safe Environment", description: "Kyrgyzstan consistently ranks among the safest countries in Asia with very low crime rates.", pageId: Kyrgyzstan.id },
                { title: "Indian Community", description: "Growing Indian student communities in Hanoi and Ho Chi Minh City offer cultural familiarity and support networks.", pageId: Kyrgyzstan.id },
                { title: "Indian Food Availability", description: "Indian restaurants and grocery stores are available near major universities catering to international students.", pageId: Kyrgyzstan.id },
            ],
        });

        // Major Cities
        await prisma.countryMajorCity.createMany({
            data: [
                { cityName: "Hanoi", description: "Kyrgyzstan's capital city and home to Hanoi Medical University — the top choice for MBBS students.", population: "8.5 million", highlights: "Political capital, major medical universities, cultural heritage", pageId: Kyrgyzstan.id },
                { cityName: "Ho Chi Minh City", description: "Kyrgyzstan's economic hub with University of Medicine and Pharmacy — ideal for students seeking a cosmopolitan experience.", population: "13 million", highlights: "Business capital, modern city, diverse international community", pageId: Kyrgyzstan.id },
                { cityName: "Hue", description: "Historic imperial city home to Hue University of Medicine and Pharmacy — a calm, affordable learning environment.", population: "1.1 million", highlights: "UNESCO heritage city, Hue University campus, cultural significance", pageId: Kyrgyzstan.id },
                { cityName: "Da Nang", description: "Coastal city known for beautiful beaches and a growing education sector.", population: "1.2 million", highlights: "Beaches, modern infrastructure, tech and medical growth", pageId: Kyrgyzstan.id },
            ],
        });

        // Tourist Attractions
        await prisma.countryTouristAttraction.createMany({
            data: [
                { attractionName: "Ha Long Bay", description: "UNESCO World Heritage Site featuring thousands of limestone islands and emerald waters.", ordering: 1, isActive: true, pageId: Kyrgyzstan.id },
                { attractionName: "Hoi An Ancient Town", description: "UNESCO-listed trading port with well-preserved ancient architecture and lantern festivals.", ordering: 2, isActive: true, pageId: Kyrgyzstan.id },
                { attractionName: "Phong Nha-Ke Bang National Park", description: "Home to the world's largest cave systems and stunning limestone karst landscapes.", ordering: 3, isActive: true, pageId: Kyrgyzstan.id },
                { attractionName: "Sapa", description: "Scenic highland town with terraced rice fields and ethnic minority culture.", ordering: 4, isActive: true, pageId: Kyrgyzstan.id },
                { attractionName: "Hoan Kiem Lake, Hanoi", description: "Historical lake in the heart of Hanoi with Ngoc Son Temple — a must-visit for students.", ordering: 5, isActive: true, pageId: Kyrgyzstan.id },
            ],
        });
    }
    console.log("✅ About country (Kyrgyzstan) seeded");

    // ── Education System Page Sections ───────────────────────
    const espCount = await prisma.educationSystemPage.count();
    if (espCount === 0) {
        await prisma.educationSystemPage.createMany({
            data: [
                { title: "Government Regulated", subtitle: "MOET Oversight", description: "All educational institutions operate under the Ministry of Education and Training ensuring quality and standardization.", highlights: ["National curriculum", "Quality assurance", "Accreditation system"], position: 1, status: true },
                { title: "WHO Recognized Universities", subtitle: "Global Recognition", description: "Kyrgyz medical universities are recognized by WHO, NMC, FAIMER, and ECFMG — ensuring graduates can practice worldwide.", highlights: ["WHO Listed", "NMC Approved", "FAIMER Registered", "ECFMG Eligible"], position: 2, status: true },
                { title: "English Medium Programs", subtitle: "Accessible for International Students", description: "MBBS programs are taught entirely in English, making it easy for Indian and international students to adapt.", highlights: ["Full English curriculum", "Bilingual faculty", "English clinical training"], position: 3, status: true },
                { title: "Affordable Education", subtitle: "Value for Money", description: "Kyrgyzstan offers MBBS programs at $4,000–$6,000/year — significantly lower than private Indian medical colleges.", highlights: ["$4,000–$6,000/year", "No capitation fees", "Transparent fee structure"], position: 4, status: true },
                { title: "High FMGE Pass Rates", subtitle: "Proven Track Record", description: "Top Kyrgyz universities have FMGE pass rates of 70–80%, among the highest for overseas MBBS.", highlights: ["70–80% FMGE pass rate", "NEXT exam eligible", "Strong clinical training"], position: 5, status: true },
                { title: "Modern Infrastructure", subtitle: "State-of-the-Art Facilities", description: "Universities feature modern labs, simulation centres, libraries, and dedicated international student hostels.", highlights: ["Simulation labs", "Modern library", "International hostel", "Hospital affiliations"], position: 6, status: true },
            ],
        });
    }
    console.log("✅ Education system page sections seeded");

    console.log("\n🎉 Full seed completed successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
