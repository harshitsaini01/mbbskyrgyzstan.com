// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin, Users, Star, Award, Globe, Clock, BookOpen,
    CheckCircle, ArrowRight, Building2, Trophy, ChevronRight,
    Stethoscope, HelpCircle, Quote, Shield, FileText,
    CreditCard, Plane, Calendar, Phone, Mail, Download,
    GraduationCap, Send, TrendingUp, ThumbsUp, MessageSquare, UserCheck,
    Microscope, Home, Utensils, Wifi, Car, DollarSign, Heart, ExternalLink,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cdn } from "@/lib/cdn";
import { buildMetadata, universitySchema, breadcrumbSchema } from "@/lib/seo";
import BrochureButton from "@/components/university/BrochureButton";
import InlineApplyForm from "@/components/university/InlineApplyForm";

export const revalidate = 3600;

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
    const universities = await prisma.university.findMany({
        where: { status: true }, select: { slug: true },
    }).catch(() => []);
    return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const u = await prisma.university.findUnique({
        where: { slug },
        select: { name: true, shortnote: true, thumbnailPath: true, metaTitle: true, metaDescription: true, metaKeyword: true, city: true, province: { select: { name: true } } },
    }).catch(() => null);
    if (!u) return { title: "University Not Found" };
    return buildMetadata({
        title: u.metaTitle || `${u.name} — MBBS in Vietnam`,
        description: u.metaDescription || u.shortnote || `Study MBBS at ${u.name}.`,
        entitySeo: { metaKeyword: u.metaKeyword || `${u.name}, MBBS Vietnam` },
        ogImage: u.thumbnailPath ? cdn(u.thumbnailPath) ?? undefined : undefined,
    });
}

export default async function UniversityDetailPage({ params }: Props) {
    const { slug } = await params;
    const university = await prisma.university.findUnique({
        where: { slug },
        include: {
            instituteType: true, province: true, cityRelation: true,
            programs: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
            faqs: { orderBy: { position: "asc" } },
            scholarships: { where: { isActive: true } },
            photos: { where: { status: true }, orderBy: { position: "asc" }, take: 12 },
            hospitals: { include: { hospital: true }, orderBy: { id: "asc" } },
            facilities: { include: { facility: true }, orderBy: { id: "asc" } },
            rankings: { where: { status: true }, orderBy: { position: "asc" } },
            testimonials: { where: { status: true }, orderBy: { position: "asc" }, take: 6 },
            reviews: { where: { status: true }, orderBy: { position: "asc" }, take: 6 },
            fmgeRates: { where: { status: true }, orderBy: { year: "desc" }, take: 5 },
            intakes: { where: { isActive: true }, orderBy: { id: "asc" } },
            studentRecords: { where: { status: true }, take: 8 },
        },
    }).catch((e) => { console.error("[UniversityPage]", e?.message); return null; });

    if (!university) notFound();

    const jsonLd = [
        universitySchema({ ...university, rating: university.rating ? Number(university.rating) : null, bestRating: university.bestRating ? Number(university.bestRating) : null }),
        breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Universities", url: "/universities" }, { name: university.name, url: `/universities/${university.slug}` }]),
    ];

    const approvedBy = Array.isArray(university.approvedBy) ? (university.approvedBy as string[]) : ["WHO", "NMC"];

    const applicationSteps = [
        { icon: FileText, title: "Submit Application", description: "Complete the online application form with all required documents and academic records.", timeframe: "1–2 days", color: "blue" },
        { icon: CheckCircle, title: "Document Verification", description: "Our admissions team verifies your documents and confirms academic eligibility.", timeframe: "3–5 days", color: "green" },
        { icon: CreditCard, title: "Fee Payment", description: "Pay the initial registration fee and receive your official admission offer letter.", timeframe: "1–2 days", color: "purple" },
        { icon: Plane, title: "Visa Processing", description: "We assist with your Vietnamese student visa application and provide invitation letter.", timeframe: "15–20 days", color: "orange" },
        { icon: Calendar, title: "Arrival & Enrollment", description: "Arrive in Vietnam and complete your university enrollment and orientation.", timeframe: "2–3 days", color: "pink" },
    ];

    const stepColors: Record<string, string> = {
        blue: "bg-blue-100 text-blue-600", green: "bg-green-100 text-green-600",
        purple: "bg-purple-100 text-purple-600", orange: "bg-orange-100 text-orange-600", pink: "bg-pink-100 text-pink-600",
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Breadcrumb */}
            <nav className="bg-white border-b text-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center space-x-2 text-gray-500">
                    <Link href="/" className="hover:text-red-600">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/universities" className="hover:text-red-600">Universities</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-800 font-medium truncate">{university.name}</span>
                </div>
            </nav>

            {/* ── 1. HERO ─────────────────────────────────────────────────── */}
            <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                {university.instituteType && (
                                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        {university.instituteType.name}
                                    </span>
                                )}
                                {university.nmcApproved && <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">NMC Approved</span>}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{university.name}</h1>
                            <p className="text-red-100 text-lg leading-relaxed mb-8">
                                {university.shortnote || university.aboutNote || "Join one of Southeast Asia's premier medical institutions. World-class education, international recognition, and affordable fees await you."}
                            </p>

                            <div className="grid grid-cols-2 gap-5 mb-8">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-yellow-400 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-sm">Location</p>
                                        <p className="text-red-200 text-sm">{university.cityRelation?.name || university.city || "Vietnam"}{university.province?.name ? `, ${university.province.name}` : ""}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Users className="h-5 w-5 text-yellow-400 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-sm">Students</p>
                                        <p className="text-red-200 text-sm">{university.students ? `${university.students.toLocaleString()}+` : "N/A"} International</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Award className="h-5 w-5 text-yellow-400 shrink-0" />
                                    <div>
                                        <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer" className="font-semibold text-sm hover:underline hover:text-yellow-300 transition-colors">WHO Listed</a>
                                        <p className="text-red-200 text-sm">{university.whoListed ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Star className="h-5 w-5 text-yellow-400 fill-current shrink-0" />
                                    <div>
                                        <p className="font-semibold text-sm">FMGE Pass Rate</p>
                                        <p className="text-red-200 text-sm">{university.fmgePassRate ? `${Number(university.fmgePassRate)}% Success` : "NMC Recognized"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/apply" className="bg-yellow-400 text-yellow-900 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all duration-200 hover:scale-105">
                                    <span>Apply Now</span><ArrowRight className="h-5 w-5" />
                                </Link>
                                <BrochureButton
                                    universityName={university.name}
                                    brochureUrl={university.brochurePath ? (cdn(university.brochurePath) ?? undefined) : undefined}
                                    variant="hero"
                                />
                            </div>
                        </div>

                        {/* Right — Quick Facts */}
                        <div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                                <h3 className="text-2xl font-bold mb-6">Quick Facts</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Course Duration", value: university.courseDuration || "6 Years" },
                                        { label: "Medium of Instruction", value: university.mediumOfInstruction || "English" },
                                        { label: "Annual Tuition Fee", value: university.tuitionFee ? `$${Number(university.tuitionFee).toLocaleString()}` : "Contact Us" },
                                        { label: "Eligibility", value: university.eligibility || "12th Science (PCB)" },
                                        { label: "NEET Requirement", value: university.neetRequirement || "Required" },
                                        { label: "Established", value: university.establishedYear?.toString() || "N/A" },
                                    ].map((f) => (
                                        <div key={f.label} className="flex justify-between py-3 border-b border-white/20 last:border-0">
                                            <span className="text-red-200 text-sm">{f.label}</span>
                                            <span className="font-semibold text-sm text-right max-w-[55%]">{f.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. ABOUT ────────────────────────────────────────────────── */}
            <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">About The University</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">{university.name}</h2>
                        {(university.aboutNote || university.shortnote) && (
                            <div
                                className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: university.aboutNote || university.shortnote || "" }}
                            />
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 mb-4 items-start">
                        {/* Why International Students Choose Us */}
                        <div>
                            <div className="mb-6">
                                <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Why Choose Us</span>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">Why International Students Choose Us?</h3>
                                <p className="text-gray-400 text-sm">Everything you need for a successful MBBS journey abroad.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { icon: <CreditCard className="h-5 w-5 text-white" />, title: "Affordable Education", desc: "Low tuition fees with transparent structure — no hidden costs or donations required." },
                                    { icon: <Award className="h-5 w-5 text-white" />, title: "International Recognition", desc: university.internationalRecognition || "Degree recognized by WHO, FAIMER, WFME and international medical councils worldwide." },
                                    { icon: <BookOpen className="h-5 w-5 text-white" />, title: "Quality Education", desc: "World-class curriculum with modern teaching methods and experienced faculty." },
                                    { icon: <Shield className="h-5 w-5 text-white" />, title: "Safe Environment", desc: "Peaceful country with excellent support for international students at every step." },
                                    { icon: <CheckCircle className="h-5 w-5 text-white" />, title: "No Donation / Capitation", desc: "Fully transparent admission. No hidden fees, no donations, no capitation required." },
                                    { icon: <Globe className="h-5 w-5 text-white" />, title: "English Medium", desc: university.englishMedium || "Complete MBBS curriculum delivered in English by qualified international faculty." },
                                ].map((item, i) => (
                                    <div
                                        key={item.title}
                                        className="relative group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                        style={{ animationDelay: `${i * 80}ms` }}
                                    >
                                        {/* Red bottom accent bar */}
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                        <div className="flex items-start gap-3">
                                            <div className="bg-gradient-to-br from-red-500 to-red-700 p-2.5 rounded-xl shrink-0 shadow-md">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-[10px] font-black text-red-400 tracking-widest">{item.num}</span>
                                                    <h4 className="font-bold text-gray-800 text-sm leading-tight">{item.title}</h4>
                                                </div>
                                                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Campus Highlights */}
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 sticky top-20">
                            {(university.section2Image || university.thumbnailPath) && (
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={cdn(university.section2Image || university.thumbnailPath) || "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800"}
                                        alt={university.section2Title || university.name}
                                        fill className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
                                    <div className="absolute bottom-3 left-4">
                                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">Campus Highlights</span>
                                    </div>
                                </div>
                            )}
                            <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 p-6 relative overflow-hidden">
                                {/* Decorative circles */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full" />

                                <h4 className="text-xl font-bold text-white mb-2 relative z-10">{university.section2Title || `Why Choose ${university.name}?`}</h4>
                                <p className="text-red-100 leading-relaxed text-sm mb-5 relative z-10 line-clamp-3">{university.section2Text || "State-of-the-art laboratories, libraries, hostels, and clinical training facilities ensure an excellent learning environment."}</p>

                                {/* Stats grid */}
                                {[
                                    { label: "Labs", value: university.labs, icon: <Microscope className="w-4 h-4" /> },
                                    { label: "Lecture Halls", value: university.lectureHall, icon: <BookOpen className="w-4 h-4" /> },
                                    { label: "Hostel Buildings", value: university.hostelBuilding, icon: <Home className="w-4 h-4" /> },
                                    { label: "Campus Area", value: university.campusArea, icon: <MapPin className="w-4 h-4" /> },
                                ].filter(s => s.value).length > 0 && (
                                        <div className="grid grid-cols-2 gap-2.5 relative z-10">
                                            {[
                                                { label: "Labs", value: university.labs, icon: <Microscope className="w-4 h-4" /> },
                                                { label: "Lecture Halls", value: university.lectureHall, icon: <BookOpen className="w-4 h-4" /> },
                                                { label: "Hostel Buildings", value: university.hostelBuilding, icon: <Home className="w-4 h-4" /> },
                                                { label: "Campus Area", value: university.campusArea, icon: <MapPin className="w-4 h-4" /> },
                                            ].filter(s => s.value).map(s => (
                                                <div key={s.label} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/10">
                                                    <div className="text-red-200 shrink-0">{s.icon}</div>
                                                    <div>
                                                        <p className="text-white font-black text-lg leading-none">{s.value}</p>
                                                        <p className="text-red-200 text-[10px] font-medium mt-0.5">{s.label}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            {/* ── DOCUMENTS / DOWNLOADS ────────────────────────────────────── */}
            <section className="py-14 bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-10">
                        <span className="inline-block bg-yellow-400 text-red-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">Official Documents</span>
                        <h2 className="text-3xl font-extrabold text-white mb-1">Download Resources</h2>
                        <p className="text-red-200 text-sm">All documents verified &amp; official</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* University Brochure */}
                        <div className="group flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-xl">
                            <div className="bg-yellow-400 group-hover:bg-yellow-300 transition-colors p-3 rounded-xl shrink-0 shadow-md">
                                <FileText className="w-6 h-6 text-red-800" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-sm">University Brochure</p>
                                <p className="text-red-200 text-xs mt-0.5">Fees, syllabus &amp; admission details</p>
                            </div>
                            <BrochureButton
                                universityName={university.name}
                                brochureUrl={university.brochurePath ? (cdn(university.brochurePath) ?? undefined) : undefined}
                                variant="download"
                            />
                        </div>

                        {/* NMC Guidelines */}
                        <div className="group flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-xl">
                            <div className="bg-yellow-400 group-hover:bg-yellow-300 transition-colors p-3 rounded-xl shrink-0 shadow-md">
                                <Award className="w-6 h-6 text-red-800" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-sm">NMC Guidelines</p>
                                <p className="text-red-200 text-xs mt-0.5">Official NMC advisory for MBBS abroad</p>
                            </div>
                            <BrochureButton
                                universityName={university.name}
                                brochureUrl="/brochures/nmc-advisory.pdf"
                                label="NMC Guidelines"
                                variant="download"
                            />
                        </div>

                        {/* Embassy Letter */}
                        {university.embassyLetterPath && (
                            <div className="group flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-xl">
                                <div className="bg-yellow-400 group-hover:bg-yellow-300 transition-colors p-3 rounded-xl shrink-0 shadow-md">
                                    <Globe className="w-6 h-6 text-red-800" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white text-sm">Embassy Letter</p>
                                    <p className="text-red-200 text-xs mt-0.5">Official embassy verification</p>
                                </div>
                                <a
                                    href={cdn(university.embassyLetterPath) ?? "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-1.5 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900 text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200"
                                >
                                    <Download className="w-3.5 h-3.5" />Download
                                </a>
                            </div>
                        )}

                        {/* University License */}
                        {university.universityLicensePath && (
                            <div className="group flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-xl">
                                <div className="bg-yellow-400 group-hover:bg-yellow-300 transition-colors p-3 rounded-xl shrink-0 shadow-md">
                                    <Shield className="w-6 h-6 text-red-800" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white text-sm">University License</p>
                                    <p className="text-red-200 text-xs mt-0.5">Ministry approved license</p>
                                </div>
                                <a
                                    href={cdn(university.universityLicensePath) ?? "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-1.5 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900 text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200"
                                >
                                    <Download className="w-3.5 h-3.5" />Download
                                </a>
                            </div>
                        )}

                        {/* Aggregation Letter */}
                        {university.aggregationLetterPath && (
                            <div className="group flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-xl">
                                <div className="bg-yellow-400 group-hover:bg-yellow-300 transition-colors p-3 rounded-xl shrink-0 shadow-md">
                                    <CheckCircle className="w-6 h-6 text-red-800" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white text-sm">Aggregation Letter</p>
                                    <p className="text-red-200 text-xs mt-0.5">Official grade aggregation doc</p>
                                </div>
                                <a
                                    href={cdn(university.aggregationLetterPath) ?? "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-1.5 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900 text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200"
                                >
                                    <Download className="w-3.5 h-3.5" />Download
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Trust & Recognition</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our university holds prestigious accreditations ensuring your degree is globally accepted.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
                        {[
                            { icon: Shield, title: "Embassy Verified", subtitle: "Internationally Verified", desc: "Verified by diplomatic missions and recognized for international student admissions.", badge: "VERIFIED", grad: "from-green-500 to-emerald-500", badgeCls: "bg-green-100 text-green-800", active: university.embassyVerified },
                            { icon: Globe, title: "WHO Listed", titleHref: "https://www.who.int/", subtitle: "World Health Organization", desc: "Listed in the WHO World Directory of Medical Schools.", badge: "LISTED", grad: "from-blue-500 to-cyan-500", badgeCls: "bg-blue-100 text-blue-800", active: university.whoListed },
                            { icon: Award, title: "Globally Accredited", subtitle: "International Medical Council", desc: "Accredited for international students to practice medicine worldwide.", badge: "APPROVED", grad: "from-purple-500 to-indigo-500", badgeCls: "bg-purple-100 text-purple-800", active: university.nmcApproved },
                            { icon: CheckCircle, title: "Ministry Licensed", subtitle: "Government of Vietnam", desc: "Licensed by the Ministry of Education & Science, Vietnam.", badge: "LICENSED", grad: "from-orange-500 to-red-500", badgeCls: "bg-orange-100 text-orange-800", active: university.ministryLicensed },
                        ].map((seal) => (
                            <div key={seal.title} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border ${seal.active ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
                                <div className="text-center">
                                    <div className={`w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br ${seal.grad} flex items-center justify-center shadow-lg`}>
                                        <seal.icon className="h-10 w-10 text-white" />
                                    </div>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${seal.badgeCls}`}>{seal.active ? seal.badge : "NOT LISTED"}</span>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        {seal.titleHref ? (
                                            <a href={seal.titleHref} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition-colors">{seal.title}</a>
                                        ) : seal.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">{seal.subtitle}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">{seal.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Additional recognitions */}
                    <div className="mt-10">
                        <div className="text-center mb-8">
                            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">Global Standards</span>
                            <h3 className="text-2xl font-bold text-gray-900">Additional Recognitions</h3>
                            <p className="text-gray-400 text-sm mt-1">Our university maintains high standards recognized globally</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-5">
                            {[
                                { abbr: "FAIMER", label: "FAIMER Listed", desc: "Foundation for Advancement of International Medical Education — global directory of medical schools.", grad: "from-blue-500 to-blue-700", border: "border-t-blue-500", active: university.faimerListed },
                                { abbr: "WFME", label: "WFME Recognized", desc: "World Federation for Medical Education — standards-compliant institution for quality assurance.", grad: "from-emerald-500 to-green-700", border: "border-t-emerald-500", active: university.mciRecognition },
                                { abbr: "ECFMG", label: "ECFMG Eligible", desc: "Educational Commission for Foreign Medical Graduates — US clinical practice pathway eligible.", grad: "from-purple-500 to-indigo-700", border: "border-t-purple-500", active: university.ecfmgEligible },
                            ].map((r) => (
                                <div key={r.label} className={`bg-white rounded-2xl border border-gray-100 border-t-4 ${r.border} shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-4 ${!r.active ? "opacity-50 grayscale" : ""}`}>
                                    <div className="flex items-center justify-between">
                                        <div className={`bg-gradient-to-br ${r.grad} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                                            <span className="text-white font-black text-xs tracking-tight text-center leading-tight px-1">{r.abbr}</span>
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${r.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                            {r.active ? "✓ Recognized" : "Not Listed"}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base">{r.label}</h4>
                                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">{r.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Approved By badges */}
                        {/* {approvedBy.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">Approved & Recognized By</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {approvedBy.map((body) => (
                                        <span key={body} className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:border-red-400 hover:text-red-600 transition-colors cursor-default">{body}</span>
                                    ))}
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </section>


            {/* Stats Row */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: BookOpen, label: "Years of Excellence", value: university.yearOfExcellence || (university.establishedYear ? new Date().getFullYear() - university.establishedYear : null) },
                            { icon: Globe, label: "Countries Represented", value: university.countriesRepresented },
                            { icon: Users, label: "Total Students", value: university.students ? `${university.students.toLocaleString()}+` : null },
                            { icon: Trophy, label: "Global Ranking", value: university.globalRanking ? `#${university.globalRanking}` : null },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group hover:scale-105 transition-transform duration-300">
                                <div className="bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:shadow-xl transition-shadow">
                                    <stat.icon className="h-9 w-9 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value ?? "N/A"}</h3>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. PROGRAMS / COURSES ───────────────────────────────────── */}
            {university.programs.length > 0 && (
                <section className="py-10 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">Admissions Open</span>
                            <h2 className="text-3xl font-bold text-gray-900">Available Courses</h2>
                            <p className="text-gray-400 text-sm mt-2">Discover programs offered at {university.name}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            {university.programs.map((program) => (
                                <div key={program.id} className="bg-white border border-gray-100 border-l-4 border-l-red-500 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left panel — name */}
                                        <div className="bg-gradient-to-br from-red-600 to-red-800 px-5 py-5 md:w-44 flex flex-col justify-center shrink-0">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <GraduationCap className="w-3.5 h-3.5 text-red-300 shrink-0" />
                                                <span className="text-red-300 text-[10px] font-semibold uppercase tracking-widest">Program</span>
                                            </div>
                                            <h3 className="text-lg font-black text-white leading-tight mb-2">{program.programName}</h3>
                                            <div className="flex flex-wrap gap-1.5">
                                                {program.studyMode && (
                                                    <span className="bg-white/20 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">{program.studyMode}</span>
                                                )}
                                                <span className="bg-white/20 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">English</span>
                                            </div>
                                        </div>

                                        {/* Right — details */}
                                        <div className="flex-1 px-6 py-5">
                                            {/* Stat row — compact chips */}
                                            <div className="flex flex-wrap gap-3 mb-4">
                                                <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                                                    <DollarSign className="w-4 h-4 text-green-600 shrink-0" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 leading-none mb-0.5">Annual Fee</p>
                                                        <p className="font-bold text-gray-900 text-sm">{program.annualTuitionFee ? `$${Number(program.annualTuitionFee).toLocaleString()}` : "—"}</p>
                                                        {program.totalFee && <p className="text-[10px] text-gray-400 leading-none mt-0.5">Total: ${Number(program.totalFee).toLocaleString()}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                                                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 leading-none mb-0.5">Duration</p>
                                                        <p className="font-bold text-gray-900 text-sm">{program.duration || "6 Years"}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5">
                                                    <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 leading-none mb-0.5">Intake</p>
                                                        <p className="font-bold text-gray-900 text-sm">{program.intake || "Sep"}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5">
                                                    <Users className="w-4 h-4 text-orange-500 shrink-0" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 leading-none mb-0.5">Deadline</p>
                                                        <p className="font-bold text-gray-900 text-sm">{program.applicationDeadline || "Rolling"}</p>
                                                    </div>
                                                </div>
                                                {program.seats && (
                                                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                                                        <BookOpen className="w-4 h-4 text-red-500 shrink-0" />
                                                        <div>
                                                            <p className="text-xs text-gray-400 leading-none mb-0.5">Seats</p>
                                                            <p className="font-bold text-gray-900 text-sm">{program.seats}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Eligibility & Overview */}
                                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                                {program.eligibility && (
                                                    <div className="flex-1 min-w-0 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Eligibility</p>
                                                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{program.eligibility}</p>
                                                    </div>
                                                )}
                                                {program.overview && (
                                                    <div className="flex-1 min-w-0 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Overview</p>
                                                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{program.overview}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* CTA row */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {program.accreditation && (
                                                        <span className="flex items-center gap-1 text-[10px] text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full font-semibold">
                                                            <CheckCircle className="w-3 h-3" />{program.accreditation}
                                                        </span>
                                                    )}
                                                    {program.medium && (
                                                        <span className="flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full font-semibold">
                                                            <Globe className="w-3 h-3" />{program.medium}
                                                        </span>
                                                    )}
                                                </div>
                                                <Link
                                                    href={`/universities/${university.slug}/courses/${program.programSlug}`}
                                                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-5 rounded-xl font-semibold text-xs hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md group"
                                                >
                                                    View Full Details
                                                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section >
            )
            }

            {/* ── 4. WORLD-CLASS FACILITIES ───────────────────────────── */}
            <section id="facilities" className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">World-Class Facilities</h2>
                        <p className="text-base text-gray-500 max-w-3xl mx-auto">
                            Modern campus facilities designed to give medical students the best learning environment.
                        </p>
                    </div>
                    {university.facilities.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {university.facilities.map((uf) => {
                                const iconMap: Record<number, React.ElementType> = { 1: Microscope, 2: BookOpen, 3: Home, 4: Utensils, 5: Wifi, 6: Car };
                                const IconComponent = iconMap[uf.facilityId] || Microscope;
                                const fallback = "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&w=600";
                                return (
                                    <div key={uf.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                        <div className="relative h-28 overflow-hidden">
                                            <Image
                                                src={uf.thumbnailPath ? (cdn(uf.thumbnailPath) || fallback) : fallback}
                                                alt={uf.facility?.name || "Facility"}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-blue-100 p-1.5 rounded-lg shrink-0">
                                                    <IconComponent className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <h3 className="text-sm font-bold text-gray-900 leading-tight">{uf.facility?.name || "Facility"}</h3>
                                            </div>
                                            {uf.description && <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{uf.description}</p>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No facilities information available at the moment.</p>
                        </div>
                    )}

                </div>
            </section>

            {/* ── 6. CAMPUS PHOTOS ────────────────────────────────────────── */}
            {
                university.photos.length > 0 && (
                    <section className="py-10 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-6">
                                <h2 className="text-4xl font-bold text-gray-900 mb-2">Campus Gallery</h2>
                                <p className="text-base text-gray-500">A glimpse into life at {university.name}</p>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                                {university.photos.map((photo) => (
                                    <div key={photo.id} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 group">
                                        {photo.imagePath ? (
                                            <Image src={cdn(photo.imagePath) || ""} alt={photo.title || "Campus"} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-300 text-xs">No image</div>
                                        )}
                                        {photo.title && (
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                                                <p className="text-white text-xs p-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">{photo.title}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* ── 7. RANKINGS & ACCREDITATION ───────────────────────────── */}
            <section id="rankings" className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Rankings &amp; Accreditation</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our commitment to excellence is reflected in our international rankings and
                            comprehensive accreditations from leading medical education bodies.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left: Official Accreditations — always visible */}
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-8">Official Accreditations</h3>
                            <div className="space-y-6">
                                {[
                                    { icon: Globe, title: "WHO Listed", href: "https://www.who.int/", desc: "Listed in World Health Organization Directory", status: "Verified" },
                                    { icon: CheckCircle, title: "Internationally Accredited", desc: "Approved by international medical councils for global practice", status: "Approved" },
                                    { icon: Shield, title: "Ministry Recognition", desc: "Recognized by Ministry of Education, Vietnam", status: "Licensed" },
                                    { icon: Star, title: "International Standards", desc: "Meets global medical education standards (FAIMER, WFME)", status: "Certified" },
                                ].map((accred) => (
                                    <div key={accred.title} className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-green-100 p-3 rounded-lg shrink-0">
                                                <accred.icon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h4 className="text-lg font-semibold text-gray-900">
                                                        {accred.href ? (
                                                            <a href={accred.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition-colors">{accred.title}</a>
                                                        ) : accred.title}
                                                    </h4>
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{accred.status}</span>
                                                </div>
                                                <p className="text-gray-600">{accred.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Right: Dynamic DB Rankings */}
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-8">Global Rankings</h3>
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl min-h-[200px]">
                                {university.rankings.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                                        <p className="text-gray-600">Ranking data will be available soon.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {university.rankings.map((r) => (
                                            <div key={r.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{r.rankingBody}</h4>
                                                    {r.category && <p className="text-sm text-gray-600">{r.category}</p>}
                                                    {r.year && <p className="text-xs text-gray-400 mt-0.5">{r.year}</p>}
                                                </div>
                                                {r.rank && <span className="text-2xl font-bold text-blue-600">#{r.rank}</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 8. INTERNATIONAL STUDENTS SUCCESS ──────────────────────── */}
            {/* <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">International Students Success</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Join thousands of successful international students who have chosen {university.name} for their medical education and achieved outstanding results.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12"> */}
            {/* Students by Country */}
            {/* <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="bg-blue-100 p-3 rounded-lg"><Globe className="h-6 w-6 text-blue-600" /></div>
                                <h3 className="text-2xl font-bold text-gray-900">Students by Country</h3>
                            </div>
                            {university.studentRecords.length > 0 ? (
                                <div className="space-y-3">
                                    {university.studentRecords.map((student) => (
                                        <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                {student.countryIsoCode && (
                                                    <img
                                                        src={`https://flagcdn.com/24x18/${student.countryIsoCode.toLowerCase()}.png`}
                                                        alt={student.country || ""}
                                                        className="w-6 h-4 object-cover rounded-sm"
                                                    />
                                                )}
                                                <span className="font-semibold text-gray-900">{student.country || "International"}</span>
                                            </div>
                                            {student.numberOfStudents && (
                                                <span className="text-blue-600 font-bold">{student.numberOfStudents.toLocaleString()}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Globe className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                                    <p>No student data available</p>
                                </div>
                            )}
                            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Users className="h-6 w-6 text-blue-600" />
                                    <h4 className="text-lg font-semibold text-gray-900">Total International Students</h4>
                                </div>
                                <p className="text-3xl font-bold text-blue-600 mb-1">
                                    {university.students ? university.students.toLocaleString() + "+" : (university.studentRecords.reduce((s, r) => s + (r.numberOfStudents || 0), 0) || 0).toLocaleString()}
                                </p>
                                <p className="text-gray-600">From {university.countriesRepresented || university.studentRecords.length}+ countries worldwide</p>
                            </div>
                        </div> */}
            {/* Why International Students Choose Us */}
            {/* <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Why International Students Choose Us</h3>
                            <div className="space-y-6">
                                {[
                                    { icon: DollarSign, color: "bg-blue-100 text-blue-600", title: "Affordable Education", desc: "Low tuition fees with transparent structure — no hidden costs or donations required." },
                                    { icon: Globe, color: "bg-green-100 text-green-600", title: "International Recognition", desc: "Degree recognized by WHO, FAIMER, WFME and international medical councils worldwide." },
                                    { icon: Award, color: "bg-purple-100 text-purple-600", title: "Quality Education", desc: "World-class curriculum with modern teaching methods and experienced faculty." },
                                    { icon: Heart, color: "bg-orange-100 text-orange-600", title: "Safe Environment", desc: "Peaceful country with excellent support for international students at every step." },
                                    { icon: Shield, color: "bg-red-100 text-red-600", title: "No Donation / Capitation", desc: "Fully transparent admission. No hidden fees, no donations, no capitation required." },
                                    { icon: Users, color: "bg-teal-100 text-teal-600", title: "English Medium", desc: "Complete MBBS curriculum delivered in English by qualified international faculty." },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start space-x-4">
                                        <div className={`p-3 rounded-lg ${item.color} shrink-0`}><item.icon className="h-5 w-5" /></div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                            <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* ── 8b. AFFILIATED HOSPITALS ─────────────────────────────── */}
            {
                university.hospitals.length > 0 && (
                    <section className="py-10 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-7">
                                <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">Clinical Training</span>
                                <h2 className="text-4xl font-bold text-gray-900">Affiliated Hospitals</h2>
                                <p className="text-base text-gray-500 mt-2">World-class clinical training at top hospitals</p>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {university.hospitals.map((uh) => (
                                    <div key={uh.id} className="bg-white border border-gray-100 border-t-4 border-t-red-500 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="bg-gradient-to-br from-red-500 to-red-700 p-2.5 rounded-xl shadow-md shrink-0">
                                                <Stethoscope className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-base leading-snug pt-0.5">{uh.hospital.name}</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-sm">
                                            {uh.hospital.city && (
                                                <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 text-gray-500 rounded-lg px-2.5 py-1">
                                                    <MapPin className="w-3 h-3 text-red-400" />{uh.hospital.city}
                                                </span>
                                            )}
                                            {uh.hospital.beds && (
                                                <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 text-gray-500 rounded-lg px-2.5 py-1">
                                                    <Home className="w-3 h-3 text-blue-400" />{uh.hospital.beds} beds
                                                </span>
                                            )}
                                            {uh.hospital.accreditation && (
                                                <span className="flex items-center gap-1 bg-green-50 border border-green-100 text-green-700 rounded-lg px-2.5 py-1 font-semibold">
                                                    <CheckCircle className="w-3 h-3" />{uh.hospital.accreditation}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* ── 9. FMGE SUCCESS RATE ──────────────────────────────────────── */}
            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-7">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">FMGE Success Rate</h2>
                        <p className="text-base text-gray-500">Year-on-year performance of graduates in the Foreign Medical Graduates Examination</p>
                    </div>
                    {university.fmgeRates.length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <table className="w-full text-base">
                                <thead>
                                    <tr className="bg-red-600 text-white">
                                        <th className="text-left p-5 font-semibold">Year</th>
                                        <th className="text-right p-5 font-semibold">Appeared</th>
                                        <th className="text-right p-5 font-semibold">Passed</th>
                                        <th className="text-right p-5 font-semibold">Pass Rate</th>
                                        <th className="text-right p-5 font-semibold">YoY Change</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {university.fmgeRates.map((r) => (
                                        <tr key={r.id} className="hover:bg-gray-50">
                                            <td className="p-5 font-bold text-base">{r.year}</td>
                                            <td className="p-5 text-right text-gray-600">{r.appeared ?? "—"}</td>
                                            <td className="p-5 text-right text-gray-600">{r.passed ?? "—"}</td>
                                            <td className="p-5 text-right">
                                                {r.acceptance_rate
                                                    ? <span className="text-green-600 font-bold text-lg">{r.acceptance_rate}%</span>
                                                    : r.passPercentage
                                                        ? <span className="text-green-600 font-bold text-lg">{Number(r.passPercentage)}%</span>
                                                        : "—"}
                                            </td>
                                            <td className="p-5 text-right">
                                                {r.yoy_change
                                                    ? <span className={`font-semibold text-base ${r.yoy_change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{r.yoy_change.startsWith('-') ? '' : '+'}{r.yoy_change}%</span>
                                                    : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center text-gray-500">
                            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No FMGE data available</p>
                        </div>
                    )}
                    {/* Average FMGE stat */}
                    {university.fmgePassRate && (
                        <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                            <p className="text-5xl font-black text-green-600 mb-2">{Number(university.fmgePassRate)}%</p>
                            <p className="text-lg font-semibold text-gray-900">Average FMGE Success Rate</p>
                            <p className="text-gray-600 text-sm mt-1">Based on historical data from our graduates</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── 10. SCHOLARSHIPS ────────────────────────────────────────── */}
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-2">Financial Aid</span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Scholarships Available</h2>
                        <p className="text-base text-gray-500">Financial aid options to support your medical education journey</p>
                    </div>
                    {university.scholarships.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {university.scholarships.map((s) => (
                                <Link key={s.id} href={`/scholarships/${s.slug}`}
                                    className="group bg-white border border-gray-100 border-l-4 border-l-red-500 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-gradient-to-br from-red-500 to-red-700 p-2.5 rounded-xl shrink-0 shadow-sm">
                                            <GraduationCap className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-red-700 transition-colors">{s.title}</h3>
                                            {s.amount && (
                                                <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-red-100">{s.amount}</span>
                                            )}
                                            {s.description && <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">{s.description}</p>}
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-end">
                                        <span className="text-xs font-semibold text-red-600 group-hover:gap-1.5 flex items-center gap-1 transition-all">
                                            Learn More <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No scholarships available at the moment. Check back soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── 11. TESTIMONIALS (What Parents Say) ───────────────── */}
            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">What Parents Say About Us</h2>
                        <p className="text-base text-gray-500">Hear from parents of our international students about their experience and why they trust us.</p>
                    </div>
                    {university.testimonials.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {university.testimonials.map((t) => (
                                <div key={t.id} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                                    <div className="flex items-center space-x-3 mb-3">
                                        {t.imagePath ? (
                                            <Image src={cdn(t.imagePath) || ""} alt={t.name || "Parent"} width={40} height={40} className="rounded-full object-cover w-10 h-10 border-2 border-white shadow" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-base border-2 border-white shadow">{(t.name || "P")[0]}</div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{t.name || "Anonymous"}</p>
                                            {t.designation && <p className="text-xs text-blue-600 font-medium">{t.designation}</p>}
                                            {t.course && <p className="text-xs text-gray-500">{t.course}</p>}
                                        </div>
                                    </div>
                                    <Quote className="w-5 h-5 text-blue-300 mb-2" />
                                    <p className="text-gray-700 leading-relaxed italic text-sm">&ldquo;{t.description}&rdquo;</p>
                                    {t.rating && (
                                        <div className="flex items-center gap-0.5 mt-3 pt-3 border-t border-gray-200">
                                            {[...Array(Math.round(Number(t.rating)))].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <Quote className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No testimonials available yet.</p>
                        </div>
                    )}
                    <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Join Our Family of Satisfied Parents</h3>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white p-2 rounded-full"><Users className="h-5 w-5 text-blue-600" /></div>
                                <div className="text-left">
                                    <p className="font-semibold">Parent Satisfaction</p>
                                    <p className="text-blue-200">{university.parentSatisfaction ? `${Number(university.parentSatisfaction)}%` : "98%"} Positive Feedback</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-white p-2 rounded-full"><Star className="h-5 w-5 text-yellow-500" /></div>
                                <div className="text-left">
                                    <p className="font-semibold">Average Rating</p>
                                    <p className="text-blue-200">{university.rating ? `${Number(university.rating)}/5 Stars` : "4.9/5 Stars"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 12. RATINGS & REVIEWS ────────────────────────────────── */}
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ratings &amp; Reviews</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">See what students and parents are saying about their experience at {university.name}.</p>
                    </div>
                    {/* Award badges — always shown */}
                    <div className="grid md:grid-cols-4 gap-6 mb-7">
                        {[
                            { title: "Top Rated University", subtitle: "Excellence Award", icon: Trophy, color: "from-yellow-400 to-orange-500" },
                            { title: "Student Choice Award", subtitle: "Best International Support", icon: ThumbsUp, color: "from-green-400 to-blue-500" },
                            { title: "Parent Recommended", subtitle: `${university.parentSatisfaction ? Number(university.parentSatisfaction) : 98}% Satisfaction`, icon: Users, color: "from-purple-400 to-pink-500" },
                            { title: "Rising Star", subtitle: "Fastest Growing University", icon: TrendingUp, color: "from-blue-400 to-cyan-500" },
                        ].map((badge) => (
                            <div key={badge.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}>
                                    <badge.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{badge.title}</h3>
                                <p className="text-base text-gray-600">{badge.subtitle}</p>
                            </div>
                        ))}
                    </div>
                    {/* Reviews list or empty state */}
                    {university.reviews && university.reviews.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-7">
                            {university.reviews.map((review) => (
                                <div key={review.id} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h5 className="font-semibold text-gray-900 text-sm">{review.name || "Verified Student"}</h5>
                                                {review.designation && (
                                                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">✓ {review.designation}</span>
                                                )}
                                            </div>
                                            {review.rating && (
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-3 w-3 ${i < Math.round(Number(review.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {review.country && <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{review.country}</span>}
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{review.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 mb-7">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No reviews yet. Be the first to share your experience!</p>
                        </div>
                    )}
                    {/* Overall Satisfaction Metrics — always shown */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Overall Satisfaction Metrics</h3>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { icon: Star, color: "text-blue-600 bg-blue-100", val: university.rating ? `${Number(university.rating)}/5` : "4.8/5", label: "Average Rating" },
                                { icon: MessageSquare, color: "text-green-600 bg-green-100", val: university.totalReviews?.toLocaleString() ?? (university.reviews?.length ?? 0).toString(), label: "Total Reviews" },
                                { icon: ThumbsUp, color: "text-purple-600 bg-purple-100", val: university.parentSatisfaction ? `${Number(university.parentSatisfaction)}%` : "98%", label: "Satisfaction Rate" },
                                { icon: UserCheck, color: "text-orange-600 bg-orange-100", val: university.recommendedRate ? `${Number(university.recommendedRate)}%` : "95%", label: "Recommendation Rate" },
                            ].map((s) => (
                                <div key={s.label} className="text-center">
                                    <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${s.color}`}>
                                        <s.icon className="h-8 w-8" />
                                    </div>
                                    <h4 className="text-3xl font-bold text-gray-800 mb-1">{s.val}</h4>
                                    <p className="text-gray-600 text-sm">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="apply" className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Apply Directly to the University</h2>
                        <p className="text-xl text-gray-600">Complete your application below. No agency fees, direct admission process.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <InlineApplyForm
                            universityId={university.id}
                            universityName={university.name}
                            universitySlug={university.slug}
                        />
                    </div>
                </div>
            </section>

            {/* ── 13. APPLICATION PROCEDURE ────────────────────────────────── */}
            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Procedure</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our streamlined admission process ensures a smooth journey from application to enrollment.</p>
                    </div>
                    <div className="relative">
                        {/* Vertical connector line */}
                        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-200 to-green-200" />
                        <div>
                            {applicationSteps.map((step, index) => (
                                <div key={index} className={`flex items-center gap-8 flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                                    <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                                        <div className="bg-white p-7 rounded-2xl shadow-lg border hover:shadow-xl transition-shadow">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-4 rounded-full ${stepColors[step.color]} shrink-0`}>
                                                    <step.icon className="h-7 w-7" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                                                        <span className="bg-gray-100 text-gray-600 px-3 py-0.5 rounded-full text-xs font-medium">{step.timeframe}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Step number bubble */}
                                    <div className="hidden lg:flex w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full items-center justify-center shadow-lg shrink-0 z-10">
                                        <span className="text-white font-bold text-xl">{index + 1}</span>
                                    </div>
                                    <div className="w-full lg:w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Contact strip */}
                    <div className="mt-14 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-3">Need Assistance?</h3>
                        <p className="text-red-100 mb-6">Our dedicated admissions team is here to help you throughout the application process</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="mailto:info@mbbsinvietnam.com" className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full"><Mail className="h-5 w-5 text-red-600" /></div>
                                <div className="text-left"><p className="font-semibold">Email Support</p><p className="text-red-200 text-sm">info@mbbsinvietnam.com</p></div>
                            </Link>
                            <Link href="/contact-us" className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full"><Phone className="h-5 w-5 text-red-600" /></div>
                                <div className="text-left"><p className="font-semibold">Get Free Counselling</p><p className="text-red-200 text-sm">Talk to our experts</p></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 14. FAQs ────────────────────────────────────────────────── */}
            {
                university.faqs.length > 0 && (
                    <section className="py-10 bg-white">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-7">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                                <p className="text-xl text-gray-600">Everything you need to know about studying at {university.name}</p>
                            </div>
                            <div className="space-y-3">
                                {university.faqs.map((faq) => (
                                    <details key={faq.id} className="group border border-gray-200 rounded-2xl overflow-hidden">
                                        <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-gray-800 hover:bg-gray-50 transition-colors list-none">
                                            <span className="flex items-center gap-3">
                                                <HelpCircle className="w-5 h-5 text-red-500 shrink-0" />
                                                {faq.question}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-3" />
                                        </summary>
                                        <div className="px-5 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* ── BOTTOM CTA STRIP ─────────────────────────────────────────── */}
            <section className="py-10 bg-gradient-to-r from-red-700 to-red-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-3">Ready to Start Your Medical Journey?</h2>
                    <p className="text-red-200 text-lg mb-8">Secure your seat at {university.name} — limited spots available for {new Date().getFullYear() + 1} intake.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/apply" className="bg-yellow-400 text-yellow-900 px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all hover:scale-105">
                            Apply Now <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/universities" className="border-2 border-white/50 text-white px-10 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                            ← Back to Universities
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
