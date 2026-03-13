import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding remaining tables...");

    // ── Prerequisite lookups ─────────────────────────────────
    const adminUser = await prisma.user.findFirst({ where: { role: "admin" } });
    if (!adminUser) throw new Error("Admin user not found — run main seed.ts first.");

    const publicType = await prisma.instituteType.findFirst({ where: { name: "Public" } });
    const privateType = await prisma.instituteType.findFirst({ where: { name: "Private" } });
    const hcmProv = await prisma.province.findFirst({ where: { name: "Ho Chi Minh" } });
    const danangProv = await prisma.province.upsert({ where: { id: 3 }, update: {}, create: { name: "Da Nang", status: true } });
    const canthoPtr = await prisma.province.upsert({ where: { id: 6 }, update: {}, create: { name: "Can Tho", status: true } });
    const hcmCity = await prisma.city.findFirst({ where: { name: "Ho Chi Minh City" } });
    const danangCity = await prisma.city.upsert({ where: { id: 3 }, update: {}, create: { name: "Da Nang", provinceId: danangProv.id, status: true } });
    const canthoCity = await prisma.city.upsert({ where: { id: 6 }, update: {}, create: { name: "Can Tho", provinceId: canthoPtr.id, status: true } });
    const mbbsLevel = await prisma.level.findFirst({ where: { slug: "mbbs" } });
    const facilities = await prisma.facility.findMany({ take: 6 });
    const hospitals = await prisma.hospital.findMany({ take: 2 });

    // ── Reset sequences for new provinces/cities ─────────────
    await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('provinces','id'), COALESCE((SELECT MAX(id) FROM provinces),0)+1, false)`);
    await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('cities','id'),    COALESCE((SELECT MAX(id) FROM cities),0)+1, false)`);

    // ── 3 Missing Universities ───────────────────────────────
    const extraUnis = [
        {
            name: "Vietnam National University of Medicine",
            slug: "vietnam-national-university-of-medicine",
            city: "Ho Chi Minh City", state: "Ho Chi Minh",
            cityId: hcmCity!.id, provinceId: hcmProv!.id, instituteTypeId: publicType!.id,
            establishedYear: 1947, rating: 4.6, students: 9500, tuitionFee: 5000,
            approvedBy: ["WHO", "NMC", "FAIMER"],
            scholarshipName: "Need-based Scholarship", scholarshipAmount: "15%", seatsAvailable: 120,
            isFeatured: true, homeView: true, status: true,
            nmcApproved: true, whoListed: true, faimerListed: true, embassyVerified: true, ministryLicensed: true,
            fmgePassRate: 74.2, courseDuration: "6 years", mediumOfInstruction: "English",
            eligibility: "10+2 with PCB, NEET qualified", neetRequirement: "Required",
            shortnote: "VNUM is a leading medical institution in southern Vietnam with modern facilities and experienced faculty.",
            aboutNote: "Established in 1947, VNUM is one of the most respected medical universities in Ho Chi Minh City.",
            internationalRecognition: "Yes", englishMedium: "Yes", diverseCommunity: "Yes",
            yearOfExcellence: 75, countriesRepresented: 38, globalRanking: 1450,
            campusArea: "40 acres", labs: 20, lectureHall: 25, hostelBuilding: 6,
            parentSatisfaction: 93.0, totalReviews: 620, recommendedRate: 95.5,
            metaTitle: "Vietnam National University of Medicine | MBBS Vietnam",
            metaDescription: "Study MBBS at Vietnam National University of Medicine. NMC approved, English medium, affordable fees.",
            metaKeyword: "Vietnam National University Medicine, MBBS Vietnam, NMC approved",
            seoRating: 9.0, reviewNumber: 620, bestRating: 5.0,
            section2Title: "Why Choose VNUM?",
            section2Text: "VNUM provides comprehensive clinical training across 8 affiliated hospitals in Ho Chi Minh City.",
        },
        {
            name: "Da Nang University of Medical Technology",
            slug: "da-nang-university-of-medical-technology",
            city: "Da Nang", state: "Da Nang",
            cityId: danangCity.id, provinceId: danangProv.id, instituteTypeId: privateType!.id,
            establishedYear: 2001, rating: 4.3, students: 5500, tuitionFee: 5500,
            approvedBy: ["WHO", "NMC"],
            scholarshipName: "Early Bird Scholarship", scholarshipAmount: "10%", seatsAvailable: 80,
            isFeatured: false, homeView: true, status: true,
            nmcApproved: true, whoListed: true, embassyVerified: true, ministryLicensed: true,
            fmgePassRate: 69.5, courseDuration: "6 years", mediumOfInstruction: "English",
            eligibility: "10+2 with PCB, NEET qualified", neetRequirement: "Required",
            shortnote: "DUMT is a modern private medical university in the coastal city of Da Nang with excellent clinical exposure.",
            aboutNote: "Founded in 2001, DUMT blends modern medical education with the natural beauty of Da Nang.",
            internationalRecognition: "Yes", englishMedium: "Yes", diverseCommunity: "Yes",
            yearOfExcellence: 22, countriesRepresented: 25, globalRanking: 2100,
            campusArea: "28 acres", labs: 15, lectureHall: 18, hostelBuilding: 4,
            parentSatisfaction: 89.0, totalReviews: 320, recommendedRate: 92.5,
            metaTitle: "Da Nang University of Medical Technology | MBBS Vietnam",
            metaDescription: "Study MBBS at Da Nang University of Medical Technology. Affordable private medical university in Vietnam.",
            metaKeyword: "Da Nang Medical University, MBBS Da Nang, private medical university Vietnam",
            seoRating: 8.5, reviewNumber: 320, bestRating: 5.0,
            section2Title: "Why Choose DUMT?",
            section2Text: "DUMT offers a modern learning environment in one of Vietnam's fastest-growing coastal cities.",
        },
        {
            name: "Can Tho University of Medicine and Pharmacy",
            slug: "can-tho-university-of-medicine-and-pharmacy",
            city: "Can Tho", state: "Can Tho",
            cityId: canthoCity.id, provinceId: canthoPtr.id, instituteTypeId: publicType!.id,
            establishedYear: 2002, rating: 4.4, students: 6800, tuitionFee: 4000,
            approvedBy: ["WHO", "NMC", "MCI"],
            scholarshipName: "Government Scholarship", scholarshipAmount: "20%", seatsAvailable: 90,
            isFeatured: false, homeView: true, status: true,
            nmcApproved: true, whoListed: true, mciRecognition: true, embassyVerified: true, ministryLicensed: true,
            fmgePassRate: 71.0, courseDuration: "6 years", mediumOfInstruction: "English",
            eligibility: "10+2 with PCB, NEET qualified", neetRequirement: "Required",
            shortnote: "CTUMP offers one of the most affordable MBBS programs in Vietnam with high-quality education.",
            aboutNote: "Established in 2002, CTUMP serves the Mekong Delta region with quality medical education.",
            internationalRecognition: "Yes", englishMedium: "Yes", diverseCommunity: "Yes",
            yearOfExcellence: 21, countriesRepresented: 28, globalRanking: 1950,
            campusArea: "32 acres", labs: 16, lectureHall: 20, hostelBuilding: 5,
            parentSatisfaction: 90.5, totalReviews: 410, recommendedRate: 93.0,
            metaTitle: "Can Tho University of Medicine and Pharmacy | MBBS Vietnam",
            metaDescription: "Study MBBS at Can Tho University, one of the most affordable options in Vietnam. Government scholarships available.",
            metaKeyword: "Can Tho Medical University, MBBS Can Tho, affordable MBBS Vietnam",
            seoRating: 8.6, reviewNumber: 410, bestRating: 5.0,
            section2Title: "Why Choose CTUMP?",
            section2Text: "CTUMP provides affordable, quality medical education in the heart of the Mekong Delta.",
        },
    ];

    for (const ud of extraUnis) {
        const uni = await prisma.university.upsert({
            where: { slug: ud.slug },
            create: ud,
            update: ud,
        });

        // MBBS Program
        const prog = await prisma.universityProgram.findFirst({ where: { universityId: uni.id, programSlug: "mbbs" } });
        if (!prog) {
            await prisma.universityProgram.create({
                data: {
                    programName: "MBBS", programSlug: "mbbs",
                    duration: "6 Years (5.5 + 1 Year Internship)",
                    levelId: mbbsLevel!.id,
                    totalFee: Number(ud.tuitionFee) * 6,
                    totalTuitionFee: Number(ud.tuitionFee) * 6,
                    annualTuitionFee: Number(ud.tuitionFee),
                    currency: "USD", intake: "September", isActive: true, sortOrder: 1,
                    mediumOfInstruction: "English",
                    overview: `The MBBS program at ${ud.name} is a 6-year program recognized by WHO and NMC. It combines strong academics with clinical training.`,
                    eligibility: "10+2 with PCB (min 50%), NEET qualified",
                    whyChooseVietnam: "Vietnam offers affordable, high-quality MBBS education with English-medium instruction and global recognition.",
                    year1Syllabus: "Anatomy, Physiology, Biochemistry",
                    year2Syllabus: "Pathology, Pharmacology, Microbiology",
                    year3Syllabus: "Community Medicine, Forensic Medicine, ENT",
                    year4Syllabus: "General Medicine, Surgery, Obstetrics",
                    year5Syllabus: "Pediatrics, Orthopedics, Psychiatry",
                    year6Syllabus: "Clinical Internship",
                    metaTitle: `MBBS at ${ud.name} | Fees, Eligibility & Admission`,
                    metaDescription: `Complete guide to MBBS at ${ud.name}. Annual fee: $${ud.tuitionFee}. NMC approved.`,
                    seoRating: 8.8, reviewNumber: 80, bestRating: 5.0,
                    universityId: uni.id,
                },
            });
        }

        // Photos
        if (await prisma.universityPhoto.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityPhoto.createMany({
                data: [
                    { title: "Main Campus", position: 1, status: true, universityId: uni.id },
                    { title: "Library", position: 2, status: true, universityId: uni.id },
                    { title: "Laboratory", position: 3, status: true, universityId: uni.id },
                ],
            });
        }

        // Rankings
        if (await prisma.universityRanking.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityRanking.createMany({
                data: [
                    { rankingBody: "QS World University Rankings", rank: String(ud.globalRanking), year: 2024, category: "Medical", score: 68.0, position: 1, status: true, universityId: uni.id },
                    { rankingBody: "Times Higher Education", rank: String(ud.globalRanking! + 80), year: 2024, category: "Medical", score: 63.0, position: 2, status: true, universityId: uni.id },
                ],
            });
        }

        // International Student Distribution
        if (await prisma.universityStudent.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityStudent.createMany({
                data: [
                    { country: "India", countryIsoCode: "IN", numberOfStudents: 200, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                    { country: "Nepal", countryIsoCode: "NP", numberOfStudents: 55, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                    { country: "Bangladesh", countryIsoCode: "BD", numberOfStudents: 40, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                    { country: "Vietnam", countryIsoCode: "VN", numberOfStudents: 900, course: "MBBS", year: "2024", status: true, universityId: uni.id },
                ],
            });
        }

        // FMGE Rates
        if (await prisma.universityFmgeRate.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityFmgeRate.createMany({
                data: [
                    { year: 2023, appeared: 120, passed: 85, passPercentage: ud.fmgePassRate!, acceptanceRate: 90.0, yoyChange: "+1.5%", firstAttemptPassRate: 65.0, rank: 6, position: 1, status: true, universityId: uni.id },
                    { year: 2022, appeared: 100, passed: 69, passPercentage: Number(ud.fmgePassRate!) - 2, acceptanceRate: 88.0, yoyChange: "+1.0%", firstAttemptPassRate: 62.0, rank: 7, position: 2, status: true, universityId: uni.id },
                ],
            });
        }

        // Intakes
        if (await prisma.universityIntake.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityIntake.createMany({
                data: [
                    { intakeMonth: "September", intakeYear: 2025, applicationStart: new Date("2025-04-01"), applicationDeadline: new Date("2025-07-31"), classesStart: new Date("2025-09-01"), seats: ud.seatsAvailable, statusText: "Open", isActive: true, position: 1, universityId: uni.id },
                ],
            });
        }

        // Testimonials
        if (await prisma.universityTestimonial.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityTestimonial.createMany({
                data: [
                    { name: "Arjun Mehta", designation: "MBBS Student - Year 3", country: "India", course: "MBBS", year: "2022", description: "The teaching quality and clinical exposure here are outstanding. I am glad I chose this university.", rating: 4.5, position: 1, status: true, universityId: uni.id },
                    { name: "Sneha Iyer", designation: "MBBS Graduate", country: "India", course: "MBBS", year: "2023", description: "Excellent university with great faculty. I cleared FMGE successfully after graduating.", rating: 5.0, position: 2, status: true, universityId: uni.id },
                ],
            });
        }

        // Reviews
        if (await prisma.universityReview.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityReview.createMany({
                data: [
                    { name: "Dr. Sanjay Patel", designation: "Alumnus 2020", country: "India", course: "MBBS", description: "A solid university with strong NMC recognition. Good clinical hospital exposure.", rating: 4.5, position: 1, status: true, universityId: uni.id },
                    { name: "Ananya Sharma", designation: "Current Student - Year 2", country: "India", course: "MBBS", description: "Affordable fees and excellent teaching. The faculty is very supportive.", rating: 4.5, position: 2, status: true, universityId: uni.id },
                ],
            });
        }

        // FAQs
        if (await prisma.universityFaq.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityFaq.createMany({
                data: [
                    { question: "Is the MBBS degree from this university recognized in India?", answer: "Yes, the university is NMC approved. Graduates must clear FMGE/NExT to practice in India.", position: 1, status: true, universityId: uni.id },
                    { question: "What is the medium of instruction?", answer: "English is the medium of instruction for all MBBS courses.", position: 2, status: true, universityId: uni.id },
                    { question: "Is NEET required?", answer: "Yes, NEET qualification is mandatory for Indian students under NMC guidelines.", position: 3, status: true, universityId: uni.id },
                    { question: "What is the annual tuition fee?", answer: `Annual tuition fee is approximately $${ud.tuitionFee} USD. Total for 6 years is $${Number(ud.tuitionFee) * 6} USD.`, position: 4, status: true, universityId: uni.id },
                ],
            });
        }

        // Facility links
        if (facilities.length > 0 && await prisma.universityFacility.count({ where: { universityId: uni.id } }) === 0) {
            for (const f of facilities.slice(0, 5)) {
                await prisma.universityFacility.create({
                    data: { universityId: uni.id, facilityId: f.id, description: `${f.name} available at ${ud.name}`, status: true },
                });
            }
        }

        // Hospital links
        if (hospitals.length > 0 && await prisma.universityHospital.count({ where: { universityId: uni.id } }) === 0) {
            for (const h of hospitals.slice(0, 1)) {
                await prisma.universityHospital.create({ data: { universityId: uni.id, hospitalId: h.id } });
            }
        }

        // Links
        if (await prisma.universityLink.count({ where: { universityId: uni.id } }) === 0) {
            await prisma.universityLink.createMany({
                data: [
                    { title: "Official Website", url: `https://www.${ud.slug.replace(/-/g, "")}.edu.vn`, type: "website", position: 1, status: true, universityId: uni.id },
                    { title: "Admission Portal", url: `https://admission.${ud.slug.replace(/-/g, "")}.edu.vn`, type: "admission", position: 2, status: true, universityId: uni.id },
                ],
            });
        }

        console.log(`  ✅ ${ud.name}`);
    }
    console.log("✅ Extra universities seeded");

    // ── About Country Page (Vietnam) ─────────────────────────
    const aboutCountryCount = await prisma.aboutCountryPage.count();
    if (aboutCountryCount === 0) {
        const countryPage = await prisma.aboutCountryPage.create({
            data: {
                name: "Vietnam",
                tagline: "The Rising Star of Southeast Asian Medical Education",
                capital: "Hanoi",
                population: "97 million",
                languages: "Vietnamese (official), English (widely used in education)",
                currency: "Vietnamese Dong (VND)",
                location: "Southeast Asia, bordered by China, Laos, and Cambodia",
                timezone: "ICT (UTC+7)",
                independenceDay: new Date("1945-09-02"),
                highestPeak: "Fansipan",
                highestPeakHeight: "3,143 m",
                mountainRanges: ["Hoang Lien Son Range", "Truong Son Range"],
                climateZones: ["Tropical monsoon (South)", "Subtropical (North)", "Temperate (highlands)"],
                topAttractions: ["Ha Long Bay", "Hoi An Ancient Town", "Ho Chi Minh City", "Sapa", "Phong Nha Caves"],
                ancientSilkRoad: "Vietnam was an important stop on the ancient Maritime Silk Road, facilitating centuries of trade and cultural exchange.",
                nomadicHeritage: "Vietnam is home to 54 ethnic groups, each with unique traditions, festivals, and customs passed down through generations.",
                religionDiversity: "Vietnam is a multi-religious country with Buddhism, Christianity, Taoism, and Confucianism coexisting harmoniously.",
                culturalHighlights: "Vietnam's rich culture includes traditional water puppetry, the ao dai national costume, and UNESCO-listed folk songs.",
                whoRecognized: true,
                mbbsAffordableEducation: "Vietnam ranks among the most affordable destinations for MBBS education with annual fees ranging from $4,000 to $6,000 USD.",
                englishMedium: true,
                academicExcellence: "Vietnamese medical universities maintain high academic standards with modern laboratories, simulation labs, and experienced faculty.",
                studentLife: "International students enjoy a vibrant campus life with Indian food options, cultural festivals, and a safe, welcoming environment.",
                keySectors: "Healthcare, Technology, Manufacturing, Tourism, Agriculture",
                majorExports: "Electronics, Textiles, Footwear, Agricultural Products, Seafood",
                investmentOpportunities: "Vietnam offers strong FDI opportunities in manufacturing, technology, and services sectors.",
                gdpGrowth: "6-7% annually (one of Asia's fastest growing economies)",
                mainIndustries: "Electronics manufacturing, Tourism, Agriculture, Textiles",
                tourismGrowth: "18 million international visitors annually (pre-pandemic peak)",
                hydropowerPotential: "Vietnam has extensive hydropower resources with over 100 hydropower plants.",
                transportation: { air: "4 international airports", rail: "North-South railway 1,726km", road: "Extensive highway network" },
                visaConnectivity: "Indian students receive study visa easily with university acceptance letter. Vietnam offers e-visa for most nationalities.",
                publicHealthcare: "Vietnam has a comprehensive public healthcare system with government-subsidized medical services.",
                privateHealthcare: "Growing private healthcare sector with modern hospitals and international standard clinics.",
                studentHealthcare: "All international students have access to university health centers and affiliated hospitals.",
                nationalSport: "Vovinam (Vietnamese martial art), Football",
                unescoSites: "8 UNESCO World Heritage Sites including Ha Long Bay, Hoi An, and Hue Imperial Citadel",
                bannerImage: "/uploads/country/vietnam-banner.jpg",
            },
        });

        // Cuisines
        await prisma.countryCuisineLifestyle.createMany({
            data: [
                { dishName: "Pho", dishDescription: "Vietnam's iconic rice noodle soup with beef or chicken, garnished with fresh herbs and lime.", iconClass: "🍜", pageId: countryPage.id },
                { dishName: "Banh Mi", dishDescription: "A Vietnamese baguette sandwich filled with meats, pickled vegetables, and cilantro.", iconClass: "🥖", pageId: countryPage.id },
                { dishName: "Bun Bo Hue", dishDescription: "A spicy beef noodle soup from Hue, known for its rich, complex broth.", iconClass: "🍲", pageId: countryPage.id },
                { dishName: "Com Tam", dishDescription: "Broken rice served with grilled pork, egg, and vegetables — a popular everyday meal.", iconClass: "🍚", pageId: countryPage.id },
                { dishName: "Goi Cuon", dishDescription: "Fresh spring rolls with shrimp, pork, vegetables, rolled in rice paper — light and healthy.", iconClass: "🌿", pageId: countryPage.id },
            ],
        });

        // Lifestyle & Culture
        await prisma.countryLifestyleCulture.createMany({
            data: [
                { title: "Water Puppetry", description: "A unique Vietnamese art form dating to the 11th century, performed in water with wooden puppets controlled by puppeteers behind a screen.", iconClass: "🎭", pageId: countryPage.id },
                { title: "Tet Festival", description: "The Vietnamese Lunar New Year is the most important festival, celebrated with family reunions, fireworks, and traditional food.", iconClass: "🎉", pageId: countryPage.id },
                { title: "Ao Dai", description: "The traditional Vietnamese dress worn on formal occasions, blending elegance with cultural heritage.", iconClass: "👘", pageId: countryPage.id },
                { title: "Coffee Culture", description: "Vietnam is the world's second-largest coffee exporter. Ca phe trung (egg coffee) and ca phe sua da (iced coffee) are must-tries.", iconClass: "☕", pageId: countryPage.id },
            ],
        });

        // Major Cities
        await prisma.countryMajorCity.createMany({
            data: [
                { cityName: "Hanoi", description: "Vietnam's capital city blends ancient heritage with modern development. Home to Hanoi Medical University.", population: "8.05 million", highlights: "Hoan Kiem Lake, Old Quarter, Temple of Literature", pageId: countryPage.id },
                { cityName: "Ho Chi Minh City", description: "Vietnam's economic hub, formerly Saigon. A dynamic metropolis with world-class medical universities.", population: "9.3 million", highlights: "Ben Thanh Market, Reunification Palace, Cu Chi Tunnels", pageId: countryPage.id },
                { cityName: "Hue", description: "The ancient imperial capital of Vietnam, rich in history and home to HUMP medical university.", population: "1.1 million", highlights: "Imperial Citadel, Royal Tombs, Perfume River", pageId: countryPage.id },
                { cityName: "Da Nang", description: "A modern coastal city with beautiful beaches and several medical universities.", population: "1.2 million", highlights: "My Khe Beach, Marble Mountains, Dragon Bridge", pageId: countryPage.id },
            ],
        });

        // Tourist Attractions
        await prisma.countryTouristAttraction.createMany({
            data: [
                { attractionName: "Ha Long Bay", description: "A UNESCO World Heritage Site with thousands of limestone karst islands. One of the natural wonders of the world.", ordering: 1, isActive: true, iconClass: "⛵", pageId: countryPage.id },
                { attractionName: "Hoi An Ancient Town", description: "A UNESCO-listed trading port town known for its well-preserved architecture and lantern festivals.", ordering: 2, isActive: true, iconClass: "🏮", pageId: countryPage.id },
                { attractionName: "Phong Nha-Ke Bang", description: "Home to the world's largest cave, Son Doong Cave, and miles of spectacular karst formations.", ordering: 3, isActive: true, iconClass: "🦇", pageId: countryPage.id },
                { attractionName: "Sapa Rice Terraces", description: "Breathtaking terraced rice fields in the misty mountains of northern Vietnam.", ordering: 4, isActive: true, iconClass: "🌾", pageId: countryPage.id },
                { attractionName: "Mekong Delta", description: "A vast river delta known as the 'rice bowl' of Vietnam with floating markets and lush waterways.", ordering: 5, isActive: true, iconClass: "🛶", pageId: countryPage.id },
            ],
        });

        console.log("✅ About Country Page (Vietnam) seeded");
    } else {
        console.log("⏭️  About Country Page already exists, skipping");
    }

    // ── Education System (Vietnam) ───────────────────────────
    const eduSysCount = await prisma.educationSystem.count();
    if (eduSysCount === 0) {
        const eduSystem = await prisma.educationSystem.create({
            data: {
                title: "Education System of Vietnam",
                description: "Vietnam has a well-structured national education system that emphasizes academic excellence, STEM subjects, and international cooperation.",
                introductionTitle: "An Overview of Vietnam's Education System",
                introductionDescription: "Vietnam's education system is highly regarded in Southeast Asia, producing graduates who compete globally. The government invests heavily in education reform and international partnerships.",
                governmentRegulation: "The Ministry of Education and Training (MOET) oversees all levels of education in Vietnam, from primary through higher education, setting curricula and accreditation standards.",
                culturalImportance: "Education is deeply valued in Vietnamese culture, with Confucian traditions emphasizing learning, respect for teachers, and academic achievement.",
                continuousDevelopment: "Vietnam continuously updates its education system through international partnerships, curriculum modernization, and increasing English-medium instruction at higher education level.",
                literacyRate: 95.8,
                primaryEnrollment: 98.5,
                secondaryCompletion: 89.2,
                higherInstitutionsCount: 240,
                schoolEducationStructureDescription: "Vietnam's school system follows a 5-4-3 structure: 5 years primary, 4 years lower secondary, and 3 years upper secondary education.",
                examinationSystemDescription: "Students undergo national examinations at the end of upper secondary school (Grade 12) which determine university admission — the National High School Graduation Exam (THPT).",
                languagesInstructionDescription: "Vietnamese is the primary language of instruction. English is compulsory from Grade 3 and is widely used in higher education medical programs.",
                officialStateLanguage: "Vietnamese",
                officialStateLanguagePercentage: 92.5,
                officialStateLanguageNote: "Vietnamese is spoken by all ethnic Vietnamese and is the official administrative language.",
                officialLanguage: "Vietnamese",
                officialLanguagePercentage: 92.5,
                officialLanguageNote: "Used across all government, education, and business contexts.",
                foreignLanguage: "English",
                foreignLanguagePercentage: 35.0,
                foreignLanguageNote: "English proficiency is growing rapidly; most medical universities offer MBBS in English.",
                higherEducationDescription: "Vietnam has 240+ higher education institutions including universities, academies, and colleges. Medical universities are among the most prestigious.",
                universitiesCount: 175,
                universitiesNote: "Public and private universities offering undergraduate through doctoral programs.",
                academiesCount: 35,
                academiesNote: "Specialized academies in military, police, arts, and sciences.",
                institutesCount: 30,
                institutesNote: "Professional and vocational institutes.",
                bolognProcessAlignment: "Vietnam has been gradually aligning its higher education system with international standards, including credit-transfer systems and quality assurance frameworks.",
            },
        });

        // Examinations
        await prisma.educationExamination.createMany({
            data: [
                { examName: "National High School Graduation Exam (THPT)", gradeLevel: "Grade 12", type: "National", subjects: "Mathematics, Literature, Foreign Language + 2 electives", pageId: eduSystem.id },
                { examName: "University Entrance Exam", gradeLevel: "Post Grade 12", type: "National", subjects: "Subject-specific based on chosen major", pageId: eduSystem.id },
                { examName: "Medical License Exam", gradeLevel: "Post MBBS", type: "Professional", subjects: "Clinical knowledge and practical skills", pageId: eduSystem.id },
            ],
        });

        // School Levels
        await prisma.educationSchoolLevel.createMany({
            data: [
                { level: "Preschool", ageRange: "3–5 years", durationYears: 3, isCompulsory: false, numberOfSchools: "15,000+", title: "Early Childhood Education", description: "Focuses on play-based learning and early childhood development.", pageId: eduSystem.id },
                { level: "Primary School", ageRange: "6–10 years", durationYears: 5, isCompulsory: true, numberOfSchools: "19,000+", title: "Primary Education", description: "Covers Grades 1–5. Compulsory for all children. Core subjects include Vietnamese, Math, and Science.", pageId: eduSystem.id },
                { level: "Lower Secondary School", ageRange: "11–14 years", durationYears: 4, isCompulsory: true, numberOfSchools: "12,000+", title: "Lower Secondary Education", description: "Covers Grades 6–9. Introduces English as a compulsory subject.", pageId: eduSystem.id },
                { level: "Upper Secondary School", ageRange: "15–17 years", durationYears: 3, isCompulsory: false, numberOfSchools: "3,000+", title: "Upper Secondary Education", description: "Covers Grades 10–12. Prepares students for national examinations and university admission.", pageId: eduSystem.id },
                { level: "Higher Education", ageRange: "18+ years", durationYears: 4, isCompulsory: false, numberOfSchools: "240+", title: "University & College Education", description: "Includes bachelor's, master's, and doctoral programs across all disciplines.", pageId: eduSystem.id },
            ],
        });

        // Degrees
        await prisma.educationDegree.createMany({
            data: [
                { degree: "Bachelor's Degree (Cử nhân)", duration: "4 years", ectsCredits: "240 ECTS", recognition: "Internationally recognized, equivalent to global bachelor's degrees", pageId: eduSystem.id },
                { degree: "MBBS (Bác sĩ y khoa)", duration: "6 years", ectsCredits: "360 ECTS", recognition: "WHO, NMC, FAIMER recognized; FMGE/NExT required to practice in India", pageId: eduSystem.id },
                { degree: "Master's Degree (Thạc sĩ)", duration: "2 years", ectsCredits: "120 ECTS", recognition: "Internationally recognized postgraduate qualification", pageId: eduSystem.id },
                { degree: "PhD (Tiến sĩ)", duration: "3–4 years", ectsCredits: "180 ECTS", recognition: "Research doctorate equivalent to global PhD standards", pageId: eduSystem.id },
            ],
        });

        // Popular Fields
        await prisma.educationPopularField.createMany({
            data: [
                { field: "Medicine (MBBS)", description: "The most sought-after program with 6-year MBBS degrees recognized globally. Vietnam's top medical universities attract thousands of international students.", numberOfInstitutions: "12+", durationYears: "6 years", pageId: eduSystem.id },
                { field: "Engineering & Technology", description: "Vietnam's booming tech sector drives demand for engineering graduates in software, electronics, and manufacturing.", numberOfInstitutions: "50+", durationYears: "4 years", pageId: eduSystem.id },
                { field: "Business & Economics", description: "Growing as Vietnam becomes a global manufacturing hub and FDI destination.", numberOfInstitutions: "60+", durationYears: "4 years", pageId: eduSystem.id },
                { field: "Agriculture & Biotechnology", description: "Vietnam's strong agricultural sector makes this a key academic field.", numberOfInstitutions: "20+", durationYears: "4 years", pageId: eduSystem.id },
            ],
        });

        console.log("✅ Education System (Vietnam) seeded");
    } else {
        console.log("⏭️  Education System already exists, skipping");
    }

    // ── Education System Page (cards/highlights) ─────────────
    const espCount = await prisma.educationSystemPage.count();
    if (espCount === 0) {
        await prisma.educationSystemPage.createMany({
            data: [
                { title: "WHO Recognized Universities", subtitle: "Global Acceptance", description: "All top medical universities in Vietnam are WHO listed, ensuring global recognition of your MBBS degree.", highlights: ["WHO Listed", "Globally Accepted", "Practice Anywhere"], iconClass: "🌍", position: 1, status: true },
                { title: "NMC Approved", subtitle: "India Recognition", description: "Vietnamese medical universities are approved by India's National Medical Commission (NMC), allowing graduates to appear for NExT/FMGE.", highlights: ["NMC Approved", "FMGE Eligible", "Practice in India"], iconClass: "✅", position: 2, status: true },
                { title: "English Medium", subtitle: "No Language Barrier", description: "All MBBS programs for international students are taught entirely in English, eliminating language barriers.", highlights: ["Full English Medium", "English Faculty", "English Materials"], iconClass: "🇬🇧", position: 3, status: true },
                { title: "Affordable Fees", subtitle: "Best Value Education", description: "Study MBBS in Vietnam at just $4,000–$6,000 annually — a fraction of the cost of private medical colleges in India.", highlights: ["$4,000-6,000/year", "Government Colleges", "Scholarships Available"], iconClass: "💰", position: 4, status: true },
                { title: "High FMGE Pass Rate", subtitle: "Proven Success", description: "Top Vietnam universities boast 70-80% FMGE pass rates, among the highest for any overseas MBBS destination.", highlights: ["70-80% Pass Rate", "First Attempt Success", "FMGE Coaching"], iconClass: "📈", position: 5, status: true },
                { title: "Safe & Student-Friendly", subtitle: "Secure Environment", description: "Vietnam is consistently ranked as one of the safest countries in Asia with a welcoming environment for international students.", highlights: ["Low Crime Rate", "Indian Community", "Indian Food Available"], iconClass: "🛡️", position: 6, status: true },
            ],
        });
        console.log("✅ Education System Page seeded");
    } else {
        console.log("⏭️  Education System Page already exists, skipping");
    }

    // ── Page Contents ────────────────────────────────────────
    const pageContentData = [
        { pageSlug: "contact", title: "Get Free Counseling", content: "Fill out the form below and our expert counselors will contact you within 24 hours to guide you through the MBBS admission process.", position: 1, status: true },
        { pageSlug: "contact", title: "Our Offices", content: "We have offices in New Delhi (India) and Hanoi (Vietnam) to assist you at every step of your journey.", position: 2, status: true },
        { pageSlug: "about-mbbs-in-vietnam", title: "Why Vietnam for MBBS?", content: "Vietnam offers a unique combination of affordable fees, high academic standards, NMC recognition, and a safe environment for Indian students.", position: 1, status: true },
        { pageSlug: "about-mbbs-in-vietnam", title: "Admission Process", content: "The admission process typically involves: 1) NEET qualification, 2) university application, 3) offer letter, 4) visa application, 5) departure and enrollment.", position: 2, status: true },
    ];

    // Clear existing for these pages to avoid duplicates
    await prisma.pageContent.deleteMany({
        where: {
            pageSlug: { in: ["contact", "about-mbbs-in-vietnam"] }
        }
    });

    await prisma.pageContent.createMany({
        data: pageContentData
    });

    console.log("✅ Page contents seeded");

    console.log("🌱 Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
