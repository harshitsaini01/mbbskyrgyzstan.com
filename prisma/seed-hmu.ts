/**
 * seed-hmu.ts — Comprehensive seed for Hanoi Medical University
 * Populates EVERY field across all related tables.
 * Run with:  npx tsx prisma/seed-hmu.ts
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
    console.log("🌱 Starting HMU comprehensive seed...\n");

    // ─── 1. Find Hanoi Medical University ─────────────────────────────────────
    const hmu = await prisma.university.findUnique({
        where: { slug: "hanoi-medical-university" },
    });
    if (!hmu) {
        throw new Error("❌ Hanoi Medical University not found. Run the base seed first: npx tsx prisma/seed.ts");
    }
    console.log(`✅ Found: ${hmu.name} (id: ${hmu.id})`);

    // ─── 2. Update core University fields ─────────────────────────────────────
    await prisma.university.update({
        where: { id: hmu.id },
        data: {
            // Basic
            section2Title: "A Century of Medical Excellence",
            section2Text: `Hanoi Medical University (HMU) was established in 1902, making it one of the oldest and most prestigious medical universities in Vietnam and Southeast Asia. Over 120 years, HMU has trained more than 50,000 medical professionals who serve across Vietnam and internationally.\n\nHMU's world-class faculty, state-of-the-art research facilities, and strong hospital network at Bach Mai Hospital — one of Asia's largest — give students unparalleled clinical exposure. The university is WHO-listed, FAIMER-registered, and recognized by medical councils worldwide.\n\nInternational students benefit from English-medium instruction, dedicated support staff, and a vibrant community of students from 45+ countries.`,
            metaTitle: "Hanoi Medical University – MBBS in Vietnam | WHO Listed | NMC Approved",
            metaKeyword: "Hanoi Medical University, MBBS Vietnam, HMU, Study Medicine Vietnam, NMC Approved",
            metaDescription: "Study MBBS at Hanoi Medical University – Vietnam's oldest medical college, established 1902. WHO Listed, FAIMER registered, NMC approved. Fees from $4,500/year.",
            seoRating: 4.8,
            reviewNumber: 850,
            bestRating: 5.0,
            // Stats
            rating: 4.8,
            parentSatisfaction: 95.5,
            totalReviews: 850,
            recommendedRate: 97.2,
        },
    });
    console.log("✅ University core fields updated");

    // ─── 3. Seed Facilities (reference + junction) ────────────────────────────
    // Clear existing HMU facilities
    await prisma.universityFacility.deleteMany({ where: { universityId: hmu.id } });

    const facilityDefs = [
        { id: 1, name: "Research Laboratories", iconName: "Microscope" },
        { id: 2, name: "Library & Study Rooms", iconName: "BookOpen" },
        { id: 3, name: "Student Hostel", iconName: "Home" },
        { id: 4, name: "Cafeteria & Dining", iconName: "Utensils" },
        { id: 5, name: "High-Speed Wi-Fi", iconName: "Wifi" },
        { id: 6, name: "Transport & Parking", iconName: "Car" },
    ];

    for (const f of facilityDefs) {
        await prisma.facility.upsert({
            where: { id: f.id },
            update: { name: f.name },
            create: { id: f.id, name: f.name, iconName: f.iconName, status: true },
        });
    }

    const facilityDetails = [
        {
            facilityId: 1,
            description: "40+ modern research labs equipped with advanced microscopy, biochemistry analysis tools, and simulation mannequins used for hands-on preclinical training.",
            imagePath: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&w=600",
        },
        {
            facilityId: 2,
            description: "A 5-floor central library with 200,000+ medical volumes, digital journal access (PubMed, Scopus), and 24/7 study rooms open to all students.",
            imagePath: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&w=600",
        },
        {
            facilityId: 3,
            description: "Fully furnished, air-conditioned hostel accommodating 3,000+ students across 8 buildings. Separate wings for male and female students with 24-hour security.",
            imagePath: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&w=600",
        },
        {
            facilityId: 4,
            description: "Multi-cuisine cafeteria serving international dishes including South Asian, East Asian, and Western options. Special dietary menus available on request.",
            imagePath: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&w=600",
        },
        {
            facilityId: 5,
            description: "Campus-wide gigabit Wi-Fi network with dedicated student portals for e-learning, accessing digital medical journals, and streaming lecture recordings.",
            imagePath: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&w=600",
        },
        {
            facilityId: 6,
            description: "Free shuttle service connecting campus to affiliated hospitals (Bach Mai, Viet Duc), city centre, and Noi Bai International Airport for newly arrived students.",
            imagePath: "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&w=600",
        },
    ];

    for (let i = 0; i < facilityDetails.length; i++) {
        const d = facilityDetails[i];
        await prisma.universityFacility.create({
            data: {
                universityId: hmu.id,
                facilityId: d.facilityId,
                description: d.description,
                imagePath: d.imagePath,
                status: true,
            },
        });
    }
    console.log(`✅ Seeded ${facilityDetails.length} facilities`);

    // ─── 4. Seed Campus Photos ────────────────────────────────────────────────
    await prisma.universityPhoto.deleteMany({ where: { universityId: hmu.id } });

    const photos = [
        { title: "Main Campus Gate", imagePath: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&w=800" },
        { title: "Anatomy Hall", imagePath: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&w=800" },
        { title: "Central Library", imagePath: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&w=800" },
        { title: "Student Hostel", imagePath: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&w=800" },
        { title: "Cafeteria", imagePath: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&w=800" },
        { title: "Lecture Theatre", imagePath: "https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&w=800" },
        { title: "Sports Ground", imagePath: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&w=800" },
        { title: "Bach Mai Hospital", imagePath: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&w=800" },
        { title: "Research Lab", imagePath: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&w=800" },
        { title: "Graduation Ceremony", imagePath: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&w=800" },
        { title: "International Students Day", imagePath: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&w=800" },
        { title: "Campus Garden", imagePath: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&w=800" },
    ];

    for (let i = 0; i < photos.length; i++) {
        await prisma.universityPhoto.create({
            data: { universityId: hmu.id, title: photos[i].title, imagePath: photos[i].imagePath, position: i + 1, status: true },
        });
    }
    console.log(`✅ Seeded ${photos.length} campus photos`);

    // ─── 5. Seed Rankings ─────────────────────────────────────────────────────
    await prisma.universityRanking.deleteMany({ where: { universityId: hmu.id } });

    const rankings = [
        { rankingBody: "QS World University Rankings", rank: "1201-1400", year: 2024, category: "Medical Sciences", score: 42.5, position: 1 },
        { rankingBody: "Times Higher Education (THE)", rank: "1001-1200", year: 2024, category: "Clinical & Health", score: 38.0, position: 2 },
        { rankingBody: "Webometrics Ranking of World Universities", rank: "2150", year: 2024, category: "General", score: null, position: 3 },
        { rankingBody: "SCImago Institutions Rankings", rank: "820", year: 2023, category: "Health Sciences", score: 56.2, position: 4 },
        { rankingBody: "URAP World Ranking", rank: "1560", year: 2023, category: "Medicine & Life Sciences", score: null, position: 5 },
    ];

    for (const r of rankings) {
        await prisma.universityRanking.create({
            data: { ...r, universityId: hmu.id, status: true },
        });
    }
    console.log(`✅ Seeded ${rankings.length} rankings`);

    // ─── 6. Seed International Students by Country ────────────────────────────
    await prisma.universityStudent.deleteMany({ where: { universityId: hmu.id } });

    const studentsByCountry = [
        { country: "Bangladesh", countryIsoCode: "bd", numberOfStudents: 1850 },
        { country: "Nepal", countryIsoCode: "np", numberOfStudents: 1420 },
        { country: "Sri Lanka", countryIsoCode: "lk", numberOfStudents: 980 },
        { country: "Pakistan", countryIsoCode: "pk", numberOfStudents: 760 },
        { country: "Nigeria", countryIsoCode: "ng", numberOfStudents: 540 },
        { country: "Ghana", countryIsoCode: "gh", numberOfStudents: 320 },
        { country: "United States", countryIsoCode: "us", numberOfStudents: 280 },
        { country: "United Kingdom", countryIsoCode: "gb", numberOfStudents: 215 },
    ];

    for (const s of studentsByCountry) {
        await prisma.universityStudent.create({
            data: {
                universityId: hmu.id,
                country: s.country,
                countryIsoCode: s.countryIsoCode,
                numberOfStudents: s.numberOfStudents,
                course: "MBBS",
                year: "2024",
                status: true,
            },
        });
    }
    console.log(`✅ Seeded ${studentsByCountry.length} student records by country`);

    // ─── 7. Seed FMGE Rates ───────────────────────────────────────────────────
    await prisma.universityFmgeRate.deleteMany({ where: { universityId: hmu.id } });

    const fmgeData = [
        { year: 2024, appeared: 420, passed: 336, acceptanceRate: 80.0, yoyChange: "+2.5", notes: "Best pass rate in 5 years", source: "NMC Official", position: 1 },
        { year: 2023, appeared: 395, passed: 305, acceptanceRate: 77.2, yoyChange: "+1.8", notes: "Consistent improvement", source: "NMC Official", position: 2 },
        { year: 2022, appeared: 380, passed: 286, acceptanceRate: 75.3, yoyChange: "-0.4", notes: "Slight dip post-pandemic", source: "NMC Official", position: 3 },
        { year: 2021, appeared: 345, passed: 262, acceptanceRate: 75.9, yoyChange: "+3.1", notes: "Strong recovery year", source: "NMC Official", position: 4 },
        { year: 2020, appeared: 310, passed: 225, acceptanceRate: 72.6, yoyChange: null, notes: "Pre-pandemic baseline", source: "NMC Official", position: 5 },
    ];

    for (const f of fmgeData) {
        await prisma.universityFmgeRate.create({
            data: {
                universityId: hmu.id,
                year: f.year,
                appeared: f.appeared,
                passed: f.passed,
                acceptanceRate: f.acceptanceRate,
                passPercentage: f.acceptanceRate,
                yoyChange: f.yoyChange,
                notes: f.notes,
                source: f.source,
                position: f.position,
                status: true,
            },
        });
    }
    console.log(`✅ Seeded ${fmgeData.length} FMGE rate records`);

    // ─── 8. Seed Intakes ──────────────────────────────────────────────────────
    await prisma.universityIntake.deleteMany({ where: { universityId: hmu.id } });

    await prisma.universityIntake.createMany({
        data: [
            {
                universityId: hmu.id,
                intakeMonth: "September",
                intakeYear: 2025,
                applicationStart: new Date("2025-05-01"),
                applicationDeadline: new Date("2025-07-31"),
                classesStart: new Date("2025-09-01"),
                seats: 150,
                statusText: "Open",
                notes: "Main annual intake. Apply early — seats fill fast.",
                position: 1,
                isActive: true,
            },
            {
                universityId: hmu.id,
                intakeMonth: "March",
                intakeYear: 2026,
                applicationStart: new Date("2025-11-01"),
                applicationDeadline: new Date("2026-01-31"),
                classesStart: new Date("2026-03-01"),
                seats: 50,
                statusText: "Upcoming",
                notes: "Limited seats for mid-year intake.",
                position: 2,
                isActive: true,
            },
        ],
    });
    console.log("✅ Seeded 2 intake records");

    // ─── 9. Seed Testimonials (What Parents Say) ──────────────────────────────
    await prisma.universityTestimonial.deleteMany({ where: { universityId: hmu.id } });

    const testimonials = [
        {
            name: "Rajesh Kumar Sharma",
            designation: "Parent of Year-3 Student",
            country: "Bangladesh",
            course: "MBBS",
            year: "2022",
            description: "My son is in his third year at HMU and the transformation has been incredible. The faculty are exceptionally dedicated, the hospital exposure is world-class, and the living conditions are comfortable and safe. We are extremely happy with our decision.",
            rating: 5.0,
            position: 1,
        },
        {
            name: "Amina Begum",
            designation: "Parent of MBBS Graduate",
            country: "Bangladesh",
            course: "MBBS",
            year: "2023",
            description: "My daughter graduated from HMU last year and cleared her licensing exam on the first attempt. The practical training at Bach Mai Hospital gave her skills that stand out even among locally trained doctors. HMU truly delivers what it promises.",
            rating: 5.0,
            position: 2,
        },
        {
            name: "Dr. Priya Patel (Parent)",
            designation: "Parent of 2nd Year Student",
            country: "Sri Lanka",
            course: "MBBS",
            year: "2023",
            description: "As a doctor myself, I was very selective about where my daughter would study. HMU's curriculum, faculty credentials, and affiliate hospital roster impressed me. The university's transparent fee structure and zero-donation policy were the deciding factors.",
            rating: 5.0,
            position: 3,
        },
        {
            name: "Mohammed Al-Hassan",
            designation: "Parent of Final Year Student",
            country: "Nigeria",
            course: "MBBS",
            year: "2019",
            description: "My son is in his final year and already has a job offer as a foundation doctor in the UK. The international recognition of HMU's degree opened doors we couldn't have imagined. The university's student support team was amazing throughout.",
            rating: 4.8,
            position: 4,
        },
        {
            name: "Sunita Thapa",
            designation: "Parent of Year-4 Student",
            country: "Nepal",
            course: "MBBS",
            year: "2021",
            description: "We were nervous about sending our daughter to study abroad, but HMU's induction programme, dedicated international student office, and friendly hostel wardens made the transition smooth. The education quality is honestly as good as back home — if not better.",
            rating: 4.9,
            position: 5,
        },
        {
            name: "Ibrahim Khalil",
            designation: "Parent of 1st Year Student",
            country: "Pakistan",
            course: "MBBS",
            year: "2024",
            description: "We just sent our child for the September 2024 intake and the orientation programme was outstanding. Everything the admission consultants told us matched reality — the campus, the facilities, and the quality of teaching. We're proud parents!",
            rating: 4.9,
            position: 6,
        },
    ];

    for (const t of testimonials) {
        await prisma.universityTestimonial.create({
            data: { universityId: hmu.id, ...t, status: true },
        });
    }
    console.log(`✅ Seeded ${testimonials.length} testimonials`);

    // ─── 10. Seed Reviews (Ratings & Reviews section) ────────────────────────
    await prisma.universityReview.deleteMany({ where: { universityId: hmu.id } });

    const reviews = [
        {
            name: "Aryan Chowdhury",
            designation: "MBBS Graduate 2023",
            country: "Bangladesh",
            course: "MBBS",
            year: "2023",
            description: "Outstanding university. The professors are leading clinicians at Bach Mai Hospital and their bedside teaching style is unmatched. Cleared USMLE Step 1 on my first attempt — HMU prepared me well for international practice.",
            rating: 5.0,
            position: 1,
        },
        {
            name: "Fatima Noor",
            designation: "Year-5 Student",
            country: "Sri Lanka",
            course: "MBBS",
            year: "2020",
            description: "Five years in and I have zero regrets. The clinical postings at Bach Mai Hospital are intense but rewarding. You see real pathology, real surgeries, and real emergencies — not just textbooks. The international office is always available to help.",
            rating: 4.9,
            position: 2,
        },
        {
            name: "Kwame Asante",
            designation: "Final Year Student",
            country: "Ghana",
            course: "MBBS",
            year: "2019",
            description: "Best decision of my life. Vietnam is safe, affordable and the people are warm. HMU's MBBS is internationally recognised and I plan to return to Ghana and apply for the medical council registration — the paperwork was all guided by the university.",
            rating: 4.8,
            position: 3,
        },
        {
            name: "Sana Mirza",
            designation: "Year-3 Student",
            country: "Pakistan",
            course: "MBBS",
            year: "2022",
            description: "The hostel is safe, clean and affordable. Food is available at the cafeteria and nearby restaurants have lots of vegetarian and halal options. Wi-Fi is fast. Academic workload is challenging but very well structured.",
            rating: 4.7,
            position: 4,
        },
        {
            name: "Daniel Okafor",
            designation: "MBBS Graduate 2022",
            country: "Nigeria",
            course: "MBBS",
            year: "2022",
            description: "I graduated from HMU and am now working as a physician in Canada. The degree was fully recognised here. The clinical skills I developed in Vietnam are what made me stand out during my residency interviews.",
            rating: 5.0,
            position: 5,
        },
        {
            name: "Thanh Nguyen",
            designation: "Year-2 Student",
            country: "United States",
            course: "MBBS",
            year: "2023",
            description: "Coming from the US I was sceptical, but HMU's English-medium programme is genuinely world-class. Small class sizes and access to professors is something you don't get at most American medical schools. Very happy here.",
            rating: 4.8,
            position: 6,
        },
    ];

    for (const r of reviews) {
        await prisma.universityReview.create({
            data: { universityId: hmu.id, ...r, status: true },
        });
    }
    console.log(`✅ Seeded ${reviews.length} reviews`);

    // ─── 11. Seed FAQs ────────────────────────────────────────────────────────
    await prisma.universityFaq.deleteMany({ where: { universityId: hmu.id } });

    const faqs = [
        { question: "Is Hanoi Medical University recognised by the WHO and NMC?", answer: "Yes. HMU is listed in the WHO Directory of Medical Schools and is approved by the National Medical Commission (NMC) of India, as well as FAIMER, ECFMG, and MCI. Graduates are eligible to appear for FMGE/NExT, USMLE, PLAB, and other international licensing exams.", position: 1 },
        { question: "What is the annual tuition fee for MBBS at HMU?", answer: "The annual tuition fee is approximately $4,500 USD. All-inclusive estimates (tuition + hostel + meals + local transport) are around $6,000–7,000 USD per year. There are no hidden fees or donation requirements.", position: 2 },
        { question: "What is the medium of instruction?", answer: "The entire MBBS programme is taught in English. However, students are encouraged to learn basic conversational Vietnamese, and a language support module is provided in Year 1 to help interact with patients during clinical postings.", position: 3 },
        { question: "What are the annual intakes and application deadlines?", answer: "HMU has two intakes: the main September intake (applications open May–July) and a smaller March intake (applications open November–January). Seats are limited and we recommend applying at least 3 months before your target intake.", position: 4 },
        { question: "Is NEET mandatory for international students?", answer: "NEET qualification is mandatory for Indian nationals under NMC guidelines. Students from other countries should check their home country's medical council requirements. NEET qualification strengthens your application regardless of nationality.", position: 5 },
        { question: "What is the FMGE pass rate for HMU graduates?", answer: "HMU consistently achieves an FMGE pass rate of 75–80%, which is among the highest for Vietnamese medical universities. The 2024 pass rate was 80.0%. The university offers dedicated FMGE coaching in the final year of study.", position: 6 },
        { question: "What clinical hospital is attached to HMU?", answer: "HMU's primary teaching hospital is Bach Mai Hospital, one of the largest and most comprehensive hospitals in Southeast Asia with over 3,000 beds and 30+ specialities. Students also rotate through Viet Duc University Hospital, Saint Paul Hospital, and other leading facilities.", position: 7 },
        { question: "Is there a hostel for international students?", answer: "Yes. HMU has 8 hostel buildings on campus with separate male and female wings. Rooms are fully furnished with air conditioning, Wi-Fi, and 24-hour security. The hostel cost is approximately $800–1,200 USD per year depending on room type.", position: 8 },
    ];

    for (const f of faqs) {
        await prisma.universityFaq.create({
            data: { universityId: hmu.id, ...f, status: true },
        });
    }
    console.log(`✅ Seeded ${faqs.length} FAQs`);

    // ─── 12. Seed Affiliated Hospitals ───────────────────────────────────────
    await prisma.universityHospital.deleteMany({ where: { universityId: hmu.id } });

    const hospitalDefs = [
        { id: 1, name: "Bach Mai Hospital", slug: "bach-mai-hospital", city: "Hanoi", state: "Hanoi", beds: 3000, establishedYear: 1911, accreditation: "JCI Accredited" },
        { id: 2, name: "Viet Duc University Hospital", slug: "viet-duc-university-hospital", city: "Hanoi", state: "Hanoi", beds: 1200, establishedYear: 1906, accreditation: "ISO 9001:2015" },
        { id: 3, name: "Saint Paul General Hospital", slug: "saint-paul-general-hospital", city: "Hanoi", state: "Hanoi", beds: 800, establishedYear: 1969, accreditation: "Ministry Licensed" },
        { id: 4, name: "108 Military Central Hospital", slug: "108-military-central-hospital", city: "Hanoi", state: "Hanoi", beds: 1500, establishedYear: 1951, accreditation: "Ministry Licensed" },
        { id: 5, name: "National Hospital of Obstetrics & Gynaecology", slug: "national-hospital-obs-gyn", city: "Hanoi", state: "Hanoi", beds: 600, establishedYear: 1955, accreditation: "ISO Certified" },
    ];

    for (const h of hospitalDefs) {
        await prisma.hospital.upsert({
            where: { id: h.id },
            update: { name: h.name, city: h.city, state: h.state, beds: h.beds, accreditation: h.accreditation },
            create: { ...h, status: true },
        });
        // Link to HMU (ignore duplicate constraint if already linked)
        const existing = await prisma.universityHospital.findFirst({
            where: { universityId: hmu.id, hospitalId: h.id },
        });
        if (!existing) {
            await prisma.universityHospital.create({
                data: { universityId: hmu.id, hospitalId: h.id },
            });
        }
    }
    console.log(`✅ Seeded ${hospitalDefs.length} affiliated hospitals`);

    // ─── 13. Seed Scholarships ────────────────────────────────────────────────
    await prisma.scholarship.deleteMany({ where: { universityId: hmu.id } });

    const scholarships = [
        {
            title: "HMU Merit Scholarship",
            slug: `hmu-merit-scholarship-${hmu.id}`,
            scholarshipType: "Merit",
            amountMin: 500,
            amountMax: 1000,
            discountPercentage: 20,
            deadline: new Date("2025-07-31"),
            availableSeats: 30,
            program: "MBBS",
            applicationMode: "Online",
            eligibility: ["NEET score above 550", "85%+ in 10+2 PCB", "No prior academic backlogs"],
            coverage: ["Tuition fee reduction", "Hostel fee waiver for 1 semester"],
            shortnote: "Awarded to academically exceptional students. Renewable annually based on performance.",
            isActive: true,
            universityId: hmu.id,
        },
        {
            title: "HMU International Student Bursary",
            slug: `hmu-international-bursary-${hmu.id}`,
            scholarshipType: "Need-based",
            amountMin: 300,
            amountMax: 700,
            discountPercentage: 15,
            deadline: new Date("2025-08-15"),
            availableSeats: 20,
            program: "MBBS",
            applicationMode: "Online",
            eligibility: ["International student (non-Vietnamese)", "Family income below $15,000/year", "NEET qualified"],
            coverage: ["Partial tuition fee reduction", "Meal subsidy at university cafeteria"],
            shortnote: "Designed to make world-class medical education accessible to talented students from all backgrounds.",
            isActive: true,
            universityId: hmu.id,
        },
        {
            title: "HMU Early Bird Discount",
            slug: `hmu-early-bird-${hmu.id}`,
            scholarshipType: "Early Application",
            amountMin: 450,
            amountMax: 450,
            discountPercentage: 10,
            deadline: new Date("2025-06-30"),
            availableSeats: 50,
            program: "MBBS",
            applicationMode: "Online",
            eligibility: ["Application confirmed before June 30, 2025", "Full fee deposited within 7 days of offer letter"],
            coverage: ["10% discount on first year tuition"],
            shortnote: "Apply early and save $450 on your first year tuition. Limited to first 50 confirmed admissions.",
            isActive: true,
            universityId: hmu.id,
        },
    ];

    for (const s of scholarships) {
        await prisma.scholarship.create({ data: s });
    }
    console.log(`✅ Seeded ${scholarships.length} scholarships`);

    // ─── 14. Update MBBS Program (more complete fields) ──────────────────────
    const program = await prisma.universityProgram.findFirst({
        where: { universityId: hmu.id, programSlug: "mbbs" },
    });

    if (program) {
        await prisma.universityProgram.update({
            where: { id: program.id },
            data: {
                duration: "6 Years (5.5 Years Academic + 1 Year Internship)",
                studyMode: "Full-time, On-campus",
                totalFee: 27000,
                totalTuitionFee: 27000,
                annualTuitionFee: 4500,
                currency: "USD",
                applicationDeadline: "July 31, 2025",
                intake: "September 2025 & March 2026",
                recognition: "WHO, NMC, FAIMER, ECFMG, MCI",
                overview: `The MBBS programme at Hanoi Medical University (HMU) is a 6-year degree programme combining rigorous academic training with extensive clinical exposure at Bach Mai Hospital — one of Asia's largest teaching hospitals.\n\nYear 1-2 focus on pre-clinical sciences: Anatomy, Physiology, Biochemistry, Pathology, and Pharmacology. Year 3-5 involve clinical rotations across Medicine, Surgery, Paediatrics, Obstetrics & Gynaecology, and Psychiatry. Year 6 is a full-year paid internship.\n\nAll lectures, practical sessions, and assessments are conducted in English. The curriculum is aligned with global standards recognised by WHO, FAIMER, and the ECFMG.`,
                eligibility: "10+2 PCB with minimum 50% aggregate. NEET qualified (mandatory for Indian nationals). Age 17–25 years. English proficiency (IELTS/TOEFL not mandatory but recommended).",
                mediumOfInstruction: "English",
                whyChooseVietnam: "Vietnam offers MBBS education at a fraction of the cost of Western countries, with degrees recognised globally. The country is safe, culturally diverse, and features a low cost of living — making it ideal for international medical students.",
                additionalInformation: "Accommodation: Fully furnished campus hostel at $800–1,200/year. Transport: Free shuttle to affiliated hospitals. Insurance: Basic health insurance included. Support: Dedicated international student office with 24/7 helpline.",
                year1Syllabus: "Anatomy, Physiology, Biochemistry, Introduction to Clinical Medicine, Vietnamese Language (Basics), Medical Ethics",
                year2Syllabus: "Pathology, Pharmacology, Microbiology, Parasitology, Community Medicine, Research Methodology",
                year3Syllabus: "Clinical Medicine (Internal Medicine), General Surgery, Radiology, Clinical Pharmacology, Medical Psychology",
                year4Syllabus: "Paediatrics, Obstetrics & Gynaecology, Ophthalmology, ENT, Orthopaedics, Dermatology & STI",
                year5Syllabus: "Psychiatry, Emergency Medicine, Infectious Diseases, Forensic Medicine, Elective Posting (4 weeks)",
                year6Syllabus: "Internship: 12-month clinical internship across Medicine, Surgery, Paediatrics, and O&G at Bach Mai and affiliated hospitals.",
                metaTitle: "MBBS at Hanoi Medical University – 6-Year Programme | WHO Recognised",
                metaDescription: "Complete details of the MBBS programme at HMU: 6 years, $4,500/year, English medium, WHO listed. Apply for September 2025 intake.",
                seoRating: 4.8,
                reviewNumber: 420,
                bestRating: 5.0,
            },
        });
        console.log("✅ MBBS program details updated");
    }

    // ─── 15. Seed University Links ────────────────────────────────────────────
    await prisma.universityLink.deleteMany({ where: { universityId: hmu.id } });

    await prisma.universityLink.createMany({
        data: [
            { universityId: hmu.id, title: "Official Website", url: "https://hmu.edu.vn", type: "official", position: 1, status: true },
            { universityId: hmu.id, title: "WHO Directory Listing", url: "https://apps.who.int/hrhshrportal/", type: "accreditation", position: 2, status: true },
            { universityId: hmu.id, title: "FAIMER Directory", url: "https://faimer.org/", type: "accreditation", position: 3, status: true },
            { universityId: hmu.id, title: "Admissions Portal", url: "https://hmu.edu.vn/admissions", type: "admissions", position: 4, status: true },
        ],
    });
    console.log("✅ Seeded 4 university links");

    // ─── Done ────────────────────────────────────────────────────────────────
    console.log(`
🎉 HMU comprehensive seed completed!

Summary of seeded data:
  ✅ University core fields     — all filled
  ✅ Facilities                 — 6 records (with descriptions & images)
  ✅ Campus Photos              — 12 records
  ✅ Rankings                   — 5 records (QS, THE, Webometrics, SCImago, URAP)
  ✅ International Students     — 8 countries with ISO codes & student counts
  ✅ FMGE Rates                 — 5 years (2020–2024) with YoY change
  ✅ Intakes                    — 2 records (Sep 2025, Mar 2026)
  ✅ Testimonials               — 6 parent testimonials
  ✅ Reviews                    — 6 student reviews with ratings
  ✅ FAQs                       — 8 questions
  ✅ Affiliated Hospitals       — 5 major Hanoi hospitals
  ✅ Scholarships               — 3 scholarships
  ✅ MBBS Program               — all fields including year-wise syllabus
  ✅ University Links           — 4 official links
`);
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
