"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding database...");
    // ─── Clean existing data (order matters for FK constraints) ───
    await prisma.universityFaq.deleteMany();
    await prisma.universityReview.deleteMany();
    await prisma.universityTestimonial.deleteMany();
    await prisma.universityStudent.deleteMany();
    await prisma.universityRanking.deleteMany();
    await prisma.universityFmgeRate.deleteMany();
    await prisma.universityIntake.deleteMany();
    await prisma.universityFacility.deleteMany();
    await prisma.universityHospital.deleteMany();
    await prisma.universityLink.deleteMany();
    await prisma.universityPhoto.deleteMany();
    await prisma.universityProgram.deleteMany();
    await prisma.scholarship.deleteMany();
    await prisma.blogContent.deleteMany();
    await prisma.blogFaq.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.blogCategory.deleteMany();
    // await prisma.leadInquiry.deleteMany(); // Removed as LeadInquiry might not exist in client yet if generation failed earlier? No, it exists.
    await prisma.leadInquiry.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.websiteSetting.deleteMany();
    await prisma.faq.deleteMany();
    await prisma.faqCategory.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.office.deleteMany();
    await prisma.university.deleteMany();
    await prisma.city.deleteMany();
    await prisma.province.deleteMany();
    await prisma.instituteType.deleteMany();
    await prisma.user.deleteMany();
    console.log("  ✓ Cleaned existing data");
    // ─── Admin User ───────────────────────────────────────────────
    const hashedPassword = await bcryptjs_1.default.hash("Admin@1234", 12);
    const admin = await prisma.user.create({
        data: {
            name: "Super Admin",
            email: "admin@mbbsinvietnam.com",
            password: hashedPassword,
        },
    });
    console.log("  ✓ Admin user created:", admin.email);
    // ─── Institute Types ──────────────────────────────────────────
    const types = await Promise.all([
        prisma.instituteType.create({ data: { name: "Government University", status: true } }),
        prisma.instituteType.create({ data: { name: "Private University", status: true } }),
        prisma.instituteType.create({ data: { name: "Public University", status: true } }),
    ]);
    console.log("  ✓ Institute types created");
    // ─── Provinces ────────────────────────────────────────────────
    const provinces = await Promise.all([
        prisma.province.create({ data: { name: "Hanoi", status: true } }),
        prisma.province.create({ data: { name: "Ho Chi Minh City", status: true } }),
        prisma.province.create({ data: { name: "Da Nang", status: true } }),
        prisma.province.create({ data: { name: "Hue", status: true } }),
        prisma.province.create({ data: { name: "Hai Phong", status: true } }),
    ]);
    console.log("  ✓ Provinces created");
    // ─── Cities ───────────────────────────────────────────────────
    const cities = await Promise.all([
        prisma.city.create({ data: { name: "Hanoi", provinceId: provinces[0].id, status: true } }),
        prisma.city.create({ data: { name: "Ho Chi Minh City", provinceId: provinces[1].id, status: true } }),
        prisma.city.create({ data: { name: "Da Nang", provinceId: provinces[2].id, status: true } }),
        prisma.city.create({ data: { name: "Hue", provinceId: provinces[3].id, status: true } }),
        prisma.city.create({ data: { name: "Hai Phong", provinceId: provinces[4].id, status: true } }),
    ]);
    console.log("  ✓ Cities created");
    // ─── Universities ─────────────────────────────────────────────
    const universitiesData = [
        {
            name: "Hanoi Medical University",
            slug: "hanoi-medical-university",
            city: "Hanoi",
            state: "Hanoi",
            cityId: cities[0].id,
            provinceId: provinces[0].id,
            instituteTypeId: types[0].id,
            isFeatured: true,
            homeView: true,
            rating: 4.8,
            establishedYear: 1902,
            students: 12000,
            tuitionFee: 4500,
            seatsAvailable: 200,
            fmgePassRate: 82.5,
            courseDuration: "6 Years",
            mediumOfInstruction: "English",
            eligibility: "50% in PCB, NEET qualified",
            neetRequirement: "Mandatory",
            embassyVerified: true,
            whoListed: true,
            nmcApproved: true,
            ministryLicensed: true,
            faimerListed: true,
            mciRecognition: true,
            ecfmgEligible: true,
            status: true,
            approvedBy: ["MCI/NMC", "WHO", "ECFMG", "FAIMER", "Ministry of Health Vietnam"],
            yearOfExcellence: 122,
            countriesRepresented: 45,
            globalRanking: 1200,
            campusArea: "25 Acres",
            labs: 42,
            lectureHall: 18,
            hostelBuilding: 8,
            parentSatisfaction: 4.7,
            totalReviews: 1250,
            recommendedRate: 92.5,
            shortnote: "Vietnam's oldest and most prestigious medical university, established in 1902.",
            aboutNote: "<p>Hanoi Medical University (HMU) is the leading medical institution in Vietnam with over 120 years of excellence in medical education. Located in the heart of Hanoi, HMU offers world-class MBBS programs recognized by major international medical bodies.</p><p>The university boasts state-of-the-art facilities, modern laboratories, and clinical training at top hospitals in Vietnam.</p>",
            internationalRecognition: "Yes",
            englishMedium: "Yes",
            diverseCommunity: "Yes",
            scholarshipName: "Merit Scholarship",
            scholarshipAmount: "Up to 50%",
            metaTitle: "Hanoi Medical University — MBBS in Vietnam | NMC Recognized",
            metaDescription: "Study MBBS at Hanoi Medical University, Vietnam's top medical college. NMC & WHO recognized, English medium, affordable fees from $4,500/year.",
        },
        {
            name: "Ho Chi Minh City University of Medicine and Pharmacy",
            slug: "hcm-university-medicine-pharmacy",
            city: "Ho Chi Minh City",
            state: "Ho Chi Minh City",
            cityId: cities[1].id,
            provinceId: provinces[1].id,
            instituteTypeId: types[0].id,
            isFeatured: true,
            homeView: true,
            rating: 4.7,
            establishedYear: 1947,
            students: 15000,
            tuitionFee: 4800,
            seatsAvailable: 250,
            fmgePassRate: 79.8,
            courseDuration: "6 Years",
            mediumOfInstruction: "English",
            eligibility: "50% in PCB, NEET qualified",
            neetRequirement: "Mandatory",
            embassyVerified: true,
            whoListed: true,
            nmcApproved: true,
            ministryLicensed: true,
            faimerListed: true,
            mciRecognition: true,
            ecfmgEligible: true,
            status: true,
            approvedBy: ["MCI/NMC", "WHO", "ECFMG", "FAIMER"],
            yearOfExcellence: 77,
            countriesRepresented: 38,
            globalRanking: 1350,
            campusArea: "30 Acres",
            labs: 55,
            lectureHall: 22,
            hostelBuilding: 10,
            parentSatisfaction: 4.6,
            totalReviews: 980,
            recommendedRate: 89.0,
            shortnote: "One of Vietnam's premier medical institutions in the dynamic city of Ho Chi Minh.",
            aboutNote: "<p>Ho Chi Minh City University of Medicine and Pharmacy (UMP) is among the top medical universities in Vietnam. Situated in Vietnam's economic hub, UMP provides excellent clinical exposure and modern medical education.</p>",
            internationalRecognition: "Yes",
            englishMedium: "Yes",
            diverseCommunity: "Yes",
            scholarshipName: "Excellence Scholarship",
            scholarshipAmount: "Up to 40%",
            metaTitle: "HCM University of Medicine — MBBS in Vietnam | WHO Recognized",
            metaDescription: "Study MBBS at Ho Chi Minh City University of Medicine and Pharmacy. WHO & NMC recognized, affordable fees, English medium programs.",
        },
        {
            name: "University of Medicine and Pharmacy at Hue",
            slug: "hue-university-medicine-pharmacy",
            city: "Hue",
            state: "Hue",
            cityId: cities[3].id,
            provinceId: provinces[3].id,
            instituteTypeId: types[0].id,
            isFeatured: true,
            homeView: true,
            rating: 4.5,
            establishedYear: 1957,
            students: 8000,
            tuitionFee: 3900,
            seatsAvailable: 150,
            fmgePassRate: 75.2,
            courseDuration: "6 Years",
            mediumOfInstruction: "English",
            eligibility: "50% in PCB, NEET qualified",
            neetRequirement: "Mandatory",
            embassyVerified: true,
            whoListed: true,
            nmcApproved: true,
            ministryLicensed: true,
            faimerListed: true,
            mciRecognition: true,
            ecfmgEligible: false,
            status: true,
            approvedBy: ["MCI/NMC", "WHO", "FAIMER"],
            yearOfExcellence: 67,
            countriesRepresented: 28,
            globalRanking: 1600,
            campusArea: "18 Acres",
            labs: 35,
            lectureHall: 14,
            hostelBuilding: 6,
            parentSatisfaction: 4.4,
            totalReviews: 640,
            recommendedRate: 85.0,
            shortnote: "Historic medical university in the cultural capital of Vietnam.",
            aboutNote: "<p>The University of Medicine and Pharmacy at Hue has been training physicians since 1957. Set in Vietnam's imperial city, it combines cultural richness with excellent medical education at affordable fees.</p>",
            internationalRecognition: "Yes",
            englishMedium: "Yes",
            diverseCommunity: "Yes",
            metaTitle: "Hue University of Medicine — MBBS in Vietnam | Affordable Fees",
            metaDescription: "Study MBBS at Hue University of Medicine and Pharmacy. Lowest fees, NMC recognized, beautiful campus in Hue, Vietnam.",
        },
        {
            name: "Da Nang University of Medical Technology",
            slug: "da-nang-university-medical-technology",
            city: "Da Nang",
            state: "Da Nang",
            cityId: cities[2].id,
            provinceId: provinces[2].id,
            instituteTypeId: types[1].id,
            isFeatured: false,
            homeView: true,
            rating: 4.3,
            establishedYear: 1996,
            students: 5500,
            tuitionFee: 4200,
            seatsAvailable: 100,
            fmgePassRate: 72.0,
            courseDuration: "6 Years",
            mediumOfInstruction: "English",
            eligibility: "50% in PCB, NEET qualified",
            neetRequirement: "Mandatory",
            embassyVerified: true,
            whoListed: false,
            nmcApproved: true,
            ministryLicensed: true,
            faimerListed: false,
            mciRecognition: true,
            ecfmgEligible: false,
            status: true,
            approvedBy: ["MCI/NMC", "Ministry of Health Vietnam"],
            yearOfExcellence: 28,
            countriesRepresented: 20,
            globalRanking: 2100,
            campusArea: "12 Acres",
            labs: 28,
            lectureHall: 10,
            hostelBuilding: 4,
            parentSatisfaction: 4.2,
            totalReviews: 320,
            recommendedRate: 80.0,
            shortnote: "Emerging medical university in Vietnam's third largest city.",
            aboutNote: "<p>Da Nang University of Medical Technology offers modern MBBS programs in the fastest-growing city in Vietnam. The university has excellent infrastructure and experienced faculty.</p>",
            internationalRecognition: "Yes",
            englishMedium: "Yes",
            diverseCommunity: "Yes",
            metaTitle: "Da Nang University of Medical Technology — MBBS Vietnam",
            metaDescription: "Study MBBS at Da Nang University of Medical Technology. NMC recognized, modern campus, affordable fees in Da Nang, Vietnam.",
        },
        {
            name: "Hai Phong University of Medicine and Pharmacy",
            slug: "hai-phong-university-medicine-pharmacy",
            city: "Hai Phong",
            state: "Hai Phong",
            cityId: cities[4].id,
            provinceId: provinces[4].id,
            instituteTypeId: types[0].id,
            isFeatured: false,
            homeView: false,
            rating: 4.4,
            establishedYear: 1979,
            students: 7000,
            tuitionFee: 4000,
            seatsAvailable: 120,
            fmgePassRate: 74.5,
            courseDuration: "6 Years",
            mediumOfInstruction: "English",
            eligibility: "50% in PCB, NEET qualified",
            neetRequirement: "Mandatory",
            embassyVerified: true,
            whoListed: true,
            nmcApproved: true,
            ministryLicensed: true,
            faimerListed: false,
            mciRecognition: true,
            ecfmgEligible: false,
            status: true,
            approvedBy: ["MCI/NMC", "WHO", "Ministry of Health Vietnam"],
            yearOfExcellence: 45,
            countriesRepresented: 25,
            globalRanking: 1850,
            campusArea: "20 Acres",
            labs: 32,
            lectureHall: 12,
            hostelBuilding: 5,
            parentSatisfaction: 4.3,
            totalReviews: 480,
            recommendedRate: 82.0,
            shortnote: "Established government medical university in northern Vietnam's port city.",
            aboutNote: "<p>Hai Phong University of Medicine and Pharmacy provides quality medical education in Vietnam's major northern port city. The university benefits from its strategic location and strong hospital affiliations.</p>",
            internationalRecognition: "Yes",
            englishMedium: "Yes",
            diverseCommunity: "Yes",
            metaTitle: "Hai Phong University of Medicine — MBBS in Vietnam",
            metaDescription: "Study MBBS at Hai Phong University of Medicine and Pharmacy. WHO & NMC recognized, affordable fees, excellent clinical training.",
        },
    ];
    const universities = [];
    for (const uData of universitiesData) {
        const u = await prisma.university.create({ data: uData });
        universities.push(u);
    }
    console.log("  ✓ Universities created:", universities.length);
    // ─── University Programs ───────────────────────────────────────
    for (const u of universities) {
        await prisma.universityProgram.createMany({
            data: [
                {
                    universityId: u.id,
                    programName: "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
                    programSlug: `mbbs-${u.slug}`,
                    duration: "6 years",
                    annualTuitionFee: u.tuitionFee ?? 4500,
                    eligibility: "50% in Physics, Chemistry, Biology + NEET",
                    mediumOfInstruction: "English",
                    isActive: true,
                },
                {
                    universityId: u.id,
                    programName: "MD (Doctor of Medicine)",
                    programSlug: `md-${u.slug}`,
                    duration: "3 years",
                    annualTuitionFee: Number(u.tuitionFee ?? 4500) + 1500,
                    eligibility: "MBBS degree + entrance exam",
                    mediumOfInstruction: "English / Vietnamese",
                    isActive: true,
                },
            ],
        });
    }
    console.log("  ✓ University programs created");
    // ─── University FAQs ──────────────────────────────────────────
    const faqData = [
        { question: "Is the MBBS degree from this university recognized in India?", answer: "Yes, the MBBS degree is recognized by NMC (National Medical Commission) India, WHO, and ECFMG. Indian students can appear for the FMGE/NExT exam after returning." },
        { question: "What is the medium of instruction?", answer: "The MBBS program is conducted entirely in the English language. All textbooks, lectures, and clinical training are in English." },
        { question: "Is NEET mandatory for MBBS in Vietnam?", answer: "Yes, NEET qualification is mandatory for Indian students seeking admission to MBBS programs in Vietnam as per NMC regulations." },
        { question: "What is the total cost of studying MBBS in Vietnam?", answer: "The total cost including tuition, hostel, food, and other expenses is approximately $25,000–$35,000 for the entire 6-year MBBS program, making it one of the most affordable destinations." },
        { question: "What are the hostel facilities like?", answer: "The university provides fully furnished hostel facilities with separate blocks for boys and girls. Facilities include Wi-Fi, AC rooms, cafeteria with Indian food options, and 24/7 security." },
    ];
    for (const u of universities) {
        await prisma.universityFaq.createMany({
            data: faqData.map((faq, i) => ({ ...faq, universityId: u.id, position: i + 1, status: true })),
        });
    }
    console.log("  ✓ University FAQs created");
    // ─── University Rankings ──────────────────────────────────────
    for (const u of universities.slice(0, 3)) {
        await prisma.universityRanking.createMany({
            data: [
                { universityId: u.id, rankingBody: "QS World University Rankings", rank: String(Math.floor(Math.random() * 500) + 1000), year: 2024 },
                { universityId: u.id, rankingBody: "Times Higher Education", rank: String(Math.floor(Math.random() * 600) + 1200), year: 2024 },
                { universityId: u.id, rankingBody: "Vietnam Ministry National Ranking", rank: String(Math.floor(Math.random() * 5) + 1), year: 2024 },
            ],
        });
    }
    console.log("  ✓ University rankings created");
    // ─── University FMGE Rates ────────────────────────────────────
    for (const u of universities) {
        await prisma.universityFmgeRate.createMany({
            data: [
                { universityId: u.id, year: 2021, appeared: 240, passed: 178, passPercentage: 74.2 },
                { universityId: u.id, year: 2022, appeared: 285, passed: 218, passPercentage: 76.5 },
                { universityId: u.id, year: 2023, appeared: 310, passed: 248, passPercentage: 80.0 },
                { universityId: u.id, year: 2024, appeared: 340, passed: 280, passPercentage: 82.4 },
            ],
        });
    }
    console.log("  ✓ FMGE pass rates created");
    // ─── University Testimonials ──────────────────────────────────
    const testimonialNames = [
        { name: "Rahul Sharma", year: 3 },
        { name: "Priya Patel", year: 4 },
        { name: "Ankur Singh", year: 5 },
        { name: "Sneha Reddy", year: 2 },
    ];
    for (const u of universities) {
        for (const t of testimonialNames.slice(0, 2)) {
            await prisma.universityTestimonial.create({
                data: {
                    universityId: u.id,
                    name: t.name,
                    designation: `MBBS ${t.year}th Year Student`,
                    description: `Studying MBBS at ${u.name} has been a life-changing experience. The faculty is excellent.`,
                    rating: 4.5 + Math.random() * 0.5,
                    status: true,
                },
            });
        }
    }
    console.log("  ✓ University testimonials created");
    // ─── University Intakes ───────────────────────────────────────
    for (const u of universities) {
        await prisma.universityIntake.createMany({
            data: [
                { universityId: u.id, intakeMonth: "September", intakeYear: 2025, seats: u.seatsAvailable ?? 100, statusText: "Open" },
                { universityId: u.id, intakeMonth: "March", intakeYear: 2026, seats: u.seatsAvailable ?? 100, statusText: "Upcoming" },
            ],
        });
    }
    console.log("  ✓ University intakes created");
    // ─── Scholarships ──────────────────────────────────────────────
    await prisma.scholarship.createMany({
        data: [
            {
                title: "Vietnam Excellence Scholarship 2025",
                slug: "vietnam-excellence-scholarship-2025",
                universityId: universities[0].id,
                shortnote: "The Vietnam Excellence Scholarship is awarded to top-performing NEET candidates.",
                amountMin: 2250,
                amountMax: 2250,
                // discountPercentage: 50,
                eligibility: { neetScore: 600 },
                deadline: new Date("2025-08-31"),
                isActive: true,
                scholarshipType: "merit",
                metaTitle: "Vietnam Excellence Scholarship 2025",
                metaDescription: "Apply for Vietnam Excellence Scholarship.",
            },
            {
                title: "MBBS Vietnam Government Scholarship",
                slug: "mbbs-vietnam-government-scholarship",
                universityId: null,
                shortnote: "Vietnamese government scholarships available for international students.",
                amountMin: 4500,
                amountMax: 6000,
                deadline: new Date("2025-06-30"),
                isActive: true,
                scholarshipType: "government",
                metaTitle: "Vietnam Government Scholarship",
                metaDescription: "Apply for Vietnam Government Scholarship.",
            },
            {
                title: "HCM University Early Bird Discount",
                slug: "hcm-university-early-bird-discount",
                universityId: universities[1].id,
                shortnote: "Early admission discount for students who secure admission before July 15.",
                discountPercentage: 20,
                deadline: new Date("2025-07-15"),
                isActive: true,
                scholarshipType: "merit",
                metaTitle: "HCM University Early Bird Scholarship",
                metaDescription: "Get 20% tuition discount.",
            },
        ],
    });
    console.log("  ✓ Scholarships created");
    // ─── Blog Categories ───────────────────────────────────────────
    const blogCats = await Promise.all([
        prisma.blogCategory.create({
            data: {
                name: "MBBS in Vietnam",
                slug: "mbbs-in-vietnam",
                description: "Complete guide to studying MBBS in Vietnam.",
                status: true,
                metaTitle: "MBBS in Vietnam — Complete Guide 2025",
                metaDescription: "Everything you need to know about studying MBBS in Vietnam.",
            },
        }),
        prisma.blogCategory.create({
            data: {
                name: "Admission Process",
                slug: "admission-process",
                description: "Step-by-step MBBS admission process for Vietnam.",
                status: true,
                metaTitle: "MBBS Admission Process — Vietnam 2025",
                metaDescription: "Learn the complete MBBS admission process.",
            },
        }),
        prisma.blogCategory.create({
            data: {
                name: "Student Life",
                slug: "student-life",
                description: "Life as an MBBS student in Vietnam.",
                status: true,
                metaTitle: "Student Life in Vietnam — MBBS Experience",
                metaDescription: "Discover what life is like as an MBBS student.",
            },
        }),
        prisma.blogCategory.create({
            data: {
                name: "Career & FMGE",
                slug: "career-fmge",
                description: "Career guidance and FMGE preparation.",
                status: true,
                metaTitle: "FMGE Preparation & Career Guide",
                metaDescription: "Prepare for FMGE after MBBS in Vietnam.",
            },
        }),
    ]);
    console.log("  ✓ Blog categories created");
    // ─── Blog Posts ────────────────────────────────────────────────
    const blogsData = [
        {
            categoryId: blogCats[0].id,
            title: "Why Study MBBS in Vietnam in 2025? Complete Guide",
            slug: "why-study-mbbs-in-vietnam-2025",
            shortnote: "Vietnam has emerged as a top MBBS destination for Indian students.",
            description: "Why Vietnam for MBBS? Vietnam has rapidly emerged...",
            status: true,
            homeView: true,
            trending: true,
            metaTitle: "Why Study MBBS in Vietnam 2025",
            metaDescription: "Complete guide to MBBS in Vietnam 2025.",
        },
        {
            categoryId: blogCats[0].id,
            title: "MBBS in Vietnam: Fees Structure 2025-26",
            slug: "mbbs-vietnam-fees-structure-2025",
            shortnote: "Detailed breakdown of MBBS fees at all major Vietnamese medical universities.",
            description: "MBBS Fees in Vietnam 2025-26...",
            status: true,
            homeView: false,
            trending: true,
            metaTitle: "MBBS Fees in Vietnam 2025-26",
            metaDescription: "Detailed MBBS fees structure in Vietnam for 2025-26.",
        },
        {
            categoryId: blogCats[1].id,
            title: "How to Apply for MBBS in Vietnam: Step-by-Step Process",
            slug: "how-to-apply-mbbs-vietnam-step-by-step",
            shortnote: "Complete step-by-step guide to applying for MBBS in Vietnam.",
            description: "MBBS Admission Process in Vietnam...",
            status: true,
            homeView: false,
            trending: false,
            metaTitle: "How to Apply for MBBS in Vietnam 2025",
            metaDescription: "Complete MBBS admission process for Vietnam.",
        },
        {
            categoryId: blogCats[2].id,
            title: "Student Life in Vietnam: What Indian MBBS Students Can Expect",
            slug: "student-life-vietnam-indian-mbbs-students",
            shortnote: "From Indian food to festive celebrations...",
            description: "Life as an Indian MBBS Student in Vietnam...",
            status: true,
            homeView: false,
            trending: false,
            metaTitle: "Student Life in Vietnam for Indian MBBS Students",
            metaDescription: "What to expect as an Indian MBBS student in Vietnam.",
        },
        {
            categoryId: blogCats[3].id,
            title: "FMGE Preparation Guide for Vietnam MBBS Graduates",
            slug: "fmge-preparation-guide-vietnam-mbbs",
            shortnote: "Comprehensive FMGE preparation tips and resources.",
            description: "FMGE/NExT for Vietnam MBBS Graduates...",
            status: true,
            homeView: false,
            trending: true,
            metaTitle: "FMGE Preparation Guide for Vietnam MBBS Graduates 2025",
            metaDescription: "Complete FMGE preparation guide for Vietnam MBBS students.",
        },
    ];
    for (const blogData of blogsData) {
        await prisma.blog.create({ data: { ...blogData, authorId: admin.id } });
    }
    console.log("  ✓ Blog posts created");
    // ─── FAQ Categories & FAQs ─────────────────────────────────────
    const faqCategories = await Promise.all([
        prisma.faqCategory.create({ data: { name: "Admissions", slug: "admissions" } }),
        prisma.faqCategory.create({ data: { name: "Fees & Scholarships", slug: "fees-scholarships" } }),
        prisma.faqCategory.create({ data: { name: "FMGE & Career", slug: "fmge-career" } }),
        prisma.faqCategory.create({ data: { name: "Student Life", slug: "student-life" } }),
    ]);
    const faqs = [
        { categoryId: faqCategories[0].id, question: "Is NEET mandatory for MBBS in Vietnam?", answer: "Yes, NEET is mandatory.", position: 1 },
        { categoryId: faqCategories[0].id, question: "What is the minimum NEET score required?", answer: "Qualifying marks.", position: 2 },
        { categoryId: faqCategories[0].id, question: "When does MBBS admission start?", answer: "June to September.", position: 3 },
        { categoryId: faqCategories[1].id, question: "What is the total cost?", answer: "$25,000–$35,000.", position: 1 },
        { categoryId: faqCategories[1].id, question: "Are scholarships available?", answer: "Yes, merit and government scholarships.", position: 2 },
        { categoryId: faqCategories[2].id, question: "Is Vietnam MBBS recognized?", answer: "Yes, NMC and WHO recognized.", position: 1 },
        { categoryId: faqCategories[3].id, question: "Is Vietnam safe?", answer: "Yes, very safe.", position: 1 },
    ];
    await prisma.faq.createMany({ data: faqs });
    console.log("  ✓ FAQs created");
    // ─── Testimonials (Global) ─────────────────────────────────────
    await prisma.testimonial.createMany({
        data: [
            { name: "Dr. Amit Kumar", designation: "MBBS Graduate", description: "Best decision.", rating: 5.0, status: true },
            { name: "Pooja Sharma", designation: "4th Year Student", description: "Supportive faculty.", rating: 4.8, status: true },
            { name: "Rohan Nair", designation: "MBBS Graduate", description: "Cleared FMGE easily.", rating: 4.9, status: true },
            { name: "Ananya Gupta", designation: "2nd Year Student", description: "Amazing country.", rating: 4.7, status: true },
        ],
    });
    console.log("  ✓ Global testimonials created");
    // ─── Offices ──────────────────────────────────────────────────
    await prisma.office.createMany({
        data: [
            {
                name: "India Head Office",
                address: "B-42, Sector 63, Noida",
                city: "Noida",
                state: "Uttar Pradesh",
                country: "India",
                phone: "+91-9876543210",
                email: "india@mbbsinvietnam.com",
                status: true,
            },
            {
                name: "Vietnam Liaison Office",
                address: "15 Pham Ngoc Thach Street",
                city: "Hanoi",
                state: "Hanoi",
                country: "Vietnam",
                phone: "+84-24-3576-1234",
                email: "vietnam@mbbsinvietnam.com",
                status: true,
            },
        ],
    });
    console.log("  ✓ Offices created");
    // ─── Website Settings ──────────────────────────────────────────
    await prisma.websiteSetting.createMany({
        data: [
            { key: "site_name", value: "MBBS in Vietnam", group: "general" },
            { key: "site_tagline", value: "Your Gateway to Medical Excellence", group: "general" },
            { key: "site_email", value: "info@mbbsinvietnam.com", group: "general" },
            { key: "site_phone", value: "+91-9876543210", group: "general" },
            { key: "site_address", value: "B-42, Sector 63, Noida", group: "general" },
            { key: "facebook_url", value: "https://facebook.com/mbbsinvietnam", group: "social" },
            { key: "instagram_url", value: "https://instagram.com/mbbsinvietnam", group: "social" },
            { key: "youtube_url", value: "https://youtube.com/@mbbsinvietnam", group: "social" },
            { key: "footer_about", value: "Leading educational consultancy.", group: "footer" },
            { key: "meta_title_default", value: "MBBS in Vietnam", group: "seo" },
            { key: "meta_description_default", value: "Study MBBS in Vietnam.", group: "seo" },
        ],
    });
    console.log("  ✓ Website settings created");
    console.log("\n✅ Database seeding complete!");
}
main()
    .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
