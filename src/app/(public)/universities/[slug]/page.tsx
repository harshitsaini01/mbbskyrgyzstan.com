// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, BookOpen, Globe, Users, Trophy, ArrowRight, Mail, Phone, FileText, CheckCircle, CreditCard, Plane, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cdn } from "@/lib/cdn";
import { buildMetadata, universitySchema, breadcrumbSchema } from "@/lib/seo";
import InlineApplyForm from "@/components/university/InlineApplyForm";
import UniversityHero from "@/components/university/UniversityHero";
import UniversityAbout from "@/components/university/UniversityAbout";
import UniversityDocuments from "@/components/university/UniversityDocuments";
import UniversityTrustSeals from "@/components/university/UniversityTrustSeals";
import UniversityPrograms from "@/components/university/UniversityPrograms";
import UniversityFacilities from "@/components/university/UniversityFacilities";
import UniversityGallery from "@/components/university/UniversityGallery";
import UniversityRankings from "@/components/university/UniversityRankings";
import UniversityHospitals from "@/components/university/UniversityHospitals";
import UniversityFMGE from "@/components/university/UniversityFMGE";
import UniversityTestimonials from "@/components/university/UniversityTestimonials";
import UniversityFAQs from "@/components/university/UniversityFAQs";

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
        select: { name: true, shortnote: true, thumbnailPath: true, bannerPath: true, metaTitle: true, metaDescription: true, metaKeyword: true, city: true, province: { select: { name: true } } },
    }).catch(() => null);
    if (!u) return { title: "University Not Found" };
    return buildMetadata({
        title: u.metaTitle || `${u.name} — MBBS in Kyrgyzstan`,
        description: u.metaDescription || u.shortnote || `Study MBBS at ${u.name}.`,
        entitySeo: { metaKeyword: u.metaKeyword || `${u.name}, MBBS Kyrgyzstan` },
        ogImage: u.bannerPath ? cdn(u.bannerPath) ?? undefined : (u.thumbnailPath ? cdn(u.thumbnailPath) ?? undefined : undefined),
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

    const applicationSteps = [
        { icon: FileText, title: "Submit Application", description: "Complete the online application form with all required documents and academic records.", timeframe: "1–2 days", color: "blue" },
        { icon: CheckCircle, title: "Document Verification", description: "Our admissions team verifies your documents and confirms academic eligibility.", timeframe: "3–5 days", color: "green" },
        { icon: CreditCard, title: "Fee Payment", description: "Pay the initial registration fee and receive your official admission offer letter.", timeframe: "1–2 days", color: "purple" },
        { icon: Plane, title: "Visa Processing", description: "We assist with your Kyrgyz student visa application and provide invitation letter.", timeframe: "15–20 days", color: "orange" },
        { icon: Calendar, title: "Arrival & Enrollment", description: "Arrive in Kyrgyzstan and complete your university enrollment and orientation.", timeframe: "2–3 days", color: "pink" },
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

            <UniversityHero university={university} />
            <UniversityAbout university={university} />
            <UniversityDocuments university={university} />
            <UniversityTrustSeals university={university} />

            {/* Stats Row */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: BookOpen, label: "Years of Excellence", value: university.yearOfExcellence || (university.establishedYear ? new Date().getFullYear() - university.establishedYear : null) },
                            { icon: Globe, label: "Countries Represented", value: university.countriesRepresented },
                            { icon: Users, label: "Total Students", value: university.students ? `${university.students}+` : null },
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

            <UniversityPrograms universitySlug={university.slug} programs={university.programs} />
            <UniversityFacilities facilities={university.facilities} />
            <UniversityGallery universityName={university.name} photos={university.photos} />
            <UniversityRankings rankings={university.rankings} />
            <UniversityHospitals hospitals={university.hospitals} />
            <UniversityFMGE fmgeRates={university.fmgeRates} fmgePassRate={university.fmgePassRate} />

            {/* Scholarships */}
            {university.scholarships.length > 0 && (
                <section className="py-10 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-6">
                            <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-2">Financial Aid</span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">Scholarships Available</h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {university.scholarships.map((s) => (
                                <Link key={s.id} href={`/scholarships/${s.slug}`} className="group bg-white border border-gray-100 border-l-4 border-l-red-500 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-red-700 transition-colors">{s.title}</h3>
                                    {s.amount && <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-red-100">{s.amount}</span>}
                                    {s.description && <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{s.description}</p>}
                                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-end">
                                        <span className="text-xs font-semibold text-red-600 flex items-center gap-1">Learn More <ArrowRight className="w-3 h-3" /></span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <UniversityTestimonials testimonials={university.testimonials} universityName={university.name} rating={university.rating} parentSatisfaction={university.parentSatisfaction} />
            <UniversityFAQs universityName={university.name} faqs={university.faqs} />

            {/* Inline Apply Form */}
            <section id="apply" className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Apply Directly to the University</h2>
                        <p className="text-xl text-gray-600">Complete your application below. No agency fees, direct admission process.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <InlineApplyForm universityId={university.id} universityName={university.name} universitySlug={university.slug} />
                    </div>
                </div>
            </section>

            {/* Application Procedure */}
            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Procedure</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our streamlined admission process ensures a smooth journey from application to enrollment.</p>
                    </div>
                    <div className="relative">
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
                                    <div className="hidden lg:flex w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full items-center justify-center shadow-lg shrink-0 z-10">
                                        <span className="text-white font-bold text-xl">{index + 1}</span>
                                    </div>
                                    <div className="w-full lg:w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-14 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-3">Need Assistance?</h3>
                        <p className="text-red-100 mb-6">Our dedicated admissions team is here to help you throughout the application process</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="mailto:info@mbbskyrgyzstan.com" className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full"><Mail className="h-5 w-5 text-red-600" /></div>
                                <div className="text-left"><p className="font-semibold">Email Support</p><p className="text-red-200 text-sm">info@mbbskyrgyzstan.com</p></div>
                            </Link>
                            <Link href="/contact-us" className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full"><Phone className="h-5 w-5 text-red-600" /></div>
                                <div className="text-left"><p className="font-semibold">Get Free Counselling</p><p className="text-red-200 text-sm">Talk to our experts</p></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-10 bg-gradient-to-r from-red-700 to-red-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-3">Ready to Start Your Medical Journey?</h2>
                    <p className="text-red-200 text-lg mb-8">Secure your seat at {university.name} — limited spots available for {new Date().getFullYear() + 1} intake.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={university.applyNowUrl || "/apply"}
                            target={university.applyNowUrl ? "_blank" : undefined}
                            rel={university.applyNowUrl ? "noopener noreferrer" : undefined}
                            className="bg-yellow-400 text-yellow-900 px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all hover:scale-105"
                        >
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
