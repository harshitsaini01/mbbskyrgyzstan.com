import Link from "next/link";
import { Award, Users, DollarSign, Calendar, CheckCircle, ArrowRight, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

type EligibilityItem = string;
type CoverageItem = string;

function formatAmount(min: number | null, max: number | null): string {
    if (!min && !max) return "Contact for details";
    if (min === max || !max) return `$${(min || 0).toLocaleString()}`;
    return `$${(min || 0).toLocaleString()} – $${max.toLocaleString()}`;
}

function formatDeadline(deadline: Date | null): string {
    if (!deadline) return "Open";
    return new Date(deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function getTypeColor(type: string | null): string {
    switch ((type || "").toLowerCase()) {
        case "government": return "bg-green-100 text-green-800";
        case "embassy": return "bg-blue-100 text-blue-800";
        case "university": return "bg-purple-100 text-purple-800";
        case "merit": return "bg-yellow-100 text-yellow-800";
        default: return "bg-gray-100 text-gray-800";
    }
}

export default async function ScholarshipsSection() {
    const scholarships = await prisma.scholarship.findMany({
        where: { isActive: true, universityId: null },
        select: {
            id: true, slug: true, title: true, scholarshipType: true, program: true,
            amountMin: true, amountMax: true, deadline: true, availableSeats: true,
            eligibility: true, coverage: true,
        },
        take: 4,
        orderBy: { id: "asc" },
    }).catch(() => []);

    return (
        <section id="scholarships" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Scholarships &amp; Financial Aid</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Make your education dreams affordable with various scholarship opportunities
                        available for international students studying in Kyrgyzstan.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-8 mb-16">
                    {[
                        { icon: <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />, val: "250+", label: "Scholarships Available", bg: "from-red-50 to-red-100" },
                        { icon: <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />, val: "$2M+", label: "Total Aid Distributed", bg: "from-green-50 to-green-100" },
                        { icon: <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />, val: "85%", label: "Students Receive Aid", bg: "from-blue-50 to-blue-100" },
                        { icon: <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />, val: "95%", label: "Success Rate", bg: "from-purple-50 to-purple-100" },
                    ].map((s) => (
                        <div key={s.label} className={`text-center p-6 bg-gradient-to-br ${s.bg} rounded-2xl`}>
                            {s.icon}
                            <div className="text-3xl font-bold text-gray-800 mb-2">{s.val}</div>
                            <div className="text-gray-700 font-medium">{s.label}</div>
                        </div>
                    ))}
                </div>

                {scholarships.length > 0 && (
                    <div className="grid lg:grid-cols-2 gap-8 mb-16">
                        {scholarships.map((scholarship) => {
                            const eligibilityItems = (scholarship.eligibility as unknown as EligibilityItem[]) || [];
                            const coverageItems = (scholarship.coverage as unknown as CoverageItem[]) || [];

                            return (
                                <div key={scholarship.id} className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                                    {/* Header banner */}
                                    <div className="relative h-32 bg-gradient-to-r from-red-600 to-red-800 p-6 flex flex-col justify-end">
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(scholarship.scholarshipType)}`}>
                                                {scholarship.scholarshipType || "Merit"}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{scholarship.title}</h3>
                                        {scholarship.program && (
                                            <p className="text-red-100 text-sm">{scholarship.program}</p>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <DollarSign className="w-5 h-5 text-green-600 mb-2" />
                                                <div className="text-sm text-gray-600">Amount</div>
                                                <div className="font-semibold text-gray-800">
                                                    {formatAmount(scholarship.amountMin ? Number(scholarship.amountMin) : null, scholarship.amountMax ? Number(scholarship.amountMax) : null)}
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                                                <div className="text-sm text-gray-600">Deadline</div>
                                                <div className="font-semibold text-gray-800">{formatDeadline(scholarship.deadline)}</div>
                                            </div>
                                        </div>

                                        {eligibilityItems.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="font-semibold text-gray-800 mb-2">Eligibility</h4>
                                                <div className="space-y-1">
                                                    {eligibilityItems.slice(0, 3).map((item, i) => (
                                                        <p key={i} className="text-gray-600 text-sm">• {item}</p>
                                                    ))}
                                                </div>
                                                {scholarship.availableSeats && (
                                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        <span>{scholarship.availableSeats} scholarships available</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {coverageItems.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="font-semibold text-gray-800 mb-3">Coverage Includes</h4>
                                                <div className="space-y-2">
                                                    {coverageItems.slice(0, 4).map((item, i) => (
                                                        <div key={i} className="flex items-center space-x-2">
                                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                            <span className="text-gray-600 text-sm">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-auto">
                                            <Link
                                                href={`/scholarships/${scholarship.slug}`}
                                                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <span>Apply Now</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Need Help CTA — from old React Scholarships.tsx */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Need Help with Scholarship Applications?
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Our scholarship counselors are here to guide you through the application process
                        and help you secure the best financial aid opportunities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/scholarships"
                            className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                            Explore Scholarships
                        </Link>
                        <Link
                            href="/contact-us"
                            className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
                        >
                            Talk to a Counselor
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
