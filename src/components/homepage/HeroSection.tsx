"use client";

import Link from "next/link";
import { ArrowRight, Users, GraduationCap, Globe, Award } from "lucide-react";
import { useDownloadModal } from "@/lib/modalContext";

const FALLBACK_BROCHURE = "/brochures/vietnam_university.pdf";

export default function HeroSection() {
    const { openModal } = useDownloadModal();

    return (
        <section id="home" className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />
            <div className="relative max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 text-red-200">
                                <Globe className="w-5 h-5" />
                                <span className="text-sm font-medium">Official Partner of top Vietnamese Universities</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                MBBS in
                                <span className="block text-yellow-300">Vietnam</span>
                            </h1>
                            <p className="text-xl text-red-100 leading-relaxed">
                                Discover world-class medical education in the heart of Southeast Asia with globally
                                recognized degrees and affordable tuition.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/universities"
                                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                            >
                                <span>Explore Universities</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={() => openModal("MBBS in Vietnam", FALLBACK_BROCHURE)}
                                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
                                suppressHydrationWarning={true}
                            >
                                Download Brochure
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-red-500">
                            {[
                                { value: "15+", label: "Top Medical Universities" },
                                { value: "500+", label: "Satisfied Students" },
                                { value: "100%", label: "Support" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl font-bold text-yellow-300">{stat.value}</div>
                                    <div className="text-red-200 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="relative">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                            <h3 className="text-2xl font-bold mb-6">Why Choose Vietnam?</h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: <GraduationCap className="w-6 h-6 text-red-600" />,
                                        title: "Global Recognition",
                                        desc: "Degrees recognized by WHO, NMC (India), ECFMG (USA), and global medical councils.",
                                    },
                                    {
                                        icon: <Users className="w-6 h-6 text-red-600" />,
                                        title: "English Medium",
                                        desc: "Complete education in English with experienced international faculty.",
                                    },
                                    {
                                        icon: <Award className="w-6 h-6 text-red-600" />,
                                        title: "Affordable Excellence",
                                        desc: "Low tuition fees and living costs with high-quality clinical training.",
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">{item.title}</h4>
                                            <p className="text-red-100 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse" />
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full opacity-20 animate-pulse delay-1000" />
                    </div>
                </div>
            </div>
        </section>
    );
}
