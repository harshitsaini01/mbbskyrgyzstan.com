import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Star, ArrowRight, Award, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cdn } from "@/lib/cdn";

function getTypeColor(type: string) {
    switch (type.toLowerCase()) {
        case "medical": return "bg-green-100 text-green-800";
        case "technical": return "bg-blue-100 text-blue-800";
        case "private": return "bg-purple-100 text-purple-800";
        case "public": return "bg-blue-100 text-blue-800";
        default: return "bg-gray-100 text-gray-800";
    }
}

function formatFee(fee: number | null | undefined): string {
    if (!fee) return "Contact for details";
    if (fee >= 100000) return `$${(fee / 100000).toFixed(1)}L/year`;
    return `$${fee.toLocaleString()}/year`;
}

function formatStudents(students: string | null | undefined): string {
    if (!students) return "N/A";
    const n = parseInt(students, 10);
    if (!isNaN(n) && String(n) === students.trim()) {
        return n >= 1000 ? `${(n / 1000).toFixed(1)}K+` : `${n}+`;
    }
    return students; // e.g. "3000+" or "5K" — display as-is
}

export default async function UniversityGrid() {
    const universities = await prisma.university.findMany({
        where: { status: true, homeView: true },
        select: {
            id: true,
            name: true,
            slug: true,
            thumbnailPath: true,
            rating: true,
            city: true,
            state: true,
            students: true,
            tuitionFee: true,
            establishedYear: true,
            approvedBy: true,
            scholarshipName: true,
            instituteType: { select: { name: true } },
            province: { select: { name: true } },
            cityRelation: { select: { name: true } },
        },
        orderBy: { id: "asc" },
        take: 6,
    }).catch(() => []);

    return (
        <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Universities in Vietnam</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore world-class educational institutions offering quality programs recognized
                        globally and designed for international students.
                    </p>
                </div>

                {universities.length === 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-200" />
                                <div className="p-6">
                                    <div className="h-6 bg-gray-200 rounded mb-2" />
                                    <div className="h-4 bg-gray-200 rounded mb-4" />
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="h-16 bg-gray-200 rounded" />
                                        <div className="h-16 bg-gray-200 rounded" />
                                    </div>
                                    <div className="h-8 bg-gray-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {universities.map((university) => {
                            const approvedBy = Array.isArray(university.approvedBy)
                                ? (university.approvedBy as string[])
                                : ["WHO", "NMC"];

                            return (
                                <div
                                    key={university.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {(() => {
                                            const src = cdn(university.thumbnailPath) || "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800";
                                            const isLocalUpload = src.startsWith("/uploads/");
                                            return (
                                                <Image
                                                    src={src}
                                                    alt={university.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    unoptimized={isLocalUpload}
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            );
                                        })()}
                                        {university.instituteType && (
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(university.instituteType.name)}`}>
                                                    {university.instituteType.name}
                                                </span>
                                            </div>
                                        )}
                                        {university.rating && (
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="text-sm font-medium">{Number(university.rating).toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                                                {university.name}
                                            </h3>
                                            <div className="flex items-center text-gray-600 text-sm mb-2">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span>
                                                    {university.cityRelation?.name || university.city || "Vietnam"}
                                                    {university.province?.name ? `, ${university.province.name}` : ""}
                                                </span>
                                                {university.establishedYear && (
                                                    <>
                                                        <span className="mx-2">•</span>
                                                        <span>Est. {university.establishedYear}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <Users className="w-5 h-5 text-red-600 mx-auto mb-1" />
                                                <div className="text-sm font-medium text-gray-800">{formatStudents(university.students)}</div>
                                                <div className="text-xs text-gray-600">Students</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <Award className="w-5 h-5 text-red-600 mx-auto mb-1" />
                                                <div className="text-sm font-medium text-gray-800">{formatFee(university.tuitionFee ? Number(university.tuitionFee) : null)}</div>
                                                <div className="text-xs text-gray-600">Annual Fees</div>
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {university.scholarshipName && (
                                                <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-md">
                                                    {university.scholarshipName}
                                                </span>
                                            )}
                                            {university.instituteType && (
                                                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md">
                                                    {university.instituteType.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Recognition */}
                                        <div className="mb-4 flex-grow">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Globe className="w-4 h-4" />
                                                <span>Recognized by: {approvedBy.slice(0, 3).join(", ")}</span>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-auto">
                                            <Link
                                                href={`/universities/${university.slug}`}
                                                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <span>View Details</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="/universities"
                        className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
                    >
                        View All Universities
                    </Link>
                </div>
            </div>
        </section>
    );
}
