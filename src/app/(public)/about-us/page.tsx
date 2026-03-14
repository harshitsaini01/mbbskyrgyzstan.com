import type { Metadata } from "next";
import Link from "next/link";
import { Users, Award, Globe, HeartHandshake, Target, BookOpen, Phone, ArrowRight, CheckCircle, Star, MapPin, GraduationCap, Shield, ChevronDown, Rocket } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Promise<Metadata> = buildMetadata({
    title: "About Us — Global MBBS in Kyrgyzstan Consultants | mbbskyrgyzstan.com",
    description: "We are Kyrgyzstan's top medical education consultancy helping students from around the world secure admissions in recognized medical universities since 2015.",
    entitySeo: { metaKeyword: "about mbbs Kyrgyzstan, global medical consultancy, mbbs admission support, study mbbs Kyrgyzstan team" },
    pageKey: "about-us",
});

const stats = [
    { val: "5000+", label: "Students Placed" },
    { val: "15+", label: "Partner Universities" },
    { val: "10+", label: "Years Experience" },
    { val: "98%", label: "Visa Success Rate" },
];

const services = [
    { icon: BookOpen, title: "University Listings", desc: "Access comprehensive information and listings of top-tier medical universities across Kyrgyzstan." },
    { icon: Users, title: "Student Counseling", desc: "Expert guidance to help you choose the right university based on your academic goals and budget." },
    { icon: Shield, title: "Admission Assistance", desc: "End-to-end support for the application process, ensuring all documentation is handled professionally." },
    { icon: Globe, title: "International Support", desc: "Comprehensive on-ground support in Kyrgyzstan, assisting with everything from arrival to graduation." },
];

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48 animate-pulse" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block bg-white/20 backdrop-blur-md text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/30">
                        🌎 Trusted Global MBBS Consultancy
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                        Empowering Future Doctors <br />
                        <span className="text-yellow-300">from Every Corner of the World</span>
                    </h1>
                    <p className="text-xl text-red-50 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        mbbskyrgyzstan.com is dedicated to bridging the gap between aspiring medical students and world-class quality education in Kyrgyzstan.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/universities" className="bg-white text-red-700 hover:bg-gray-100 font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95">
                            Explore Universities
                        </Link>
                        <Link href="/contact-us" className="border-2 border-white/60 hover:border-white text-white font-bold px-10 py-4 rounded-xl transition-all hover:bg-white/10">
                            Get Free Counseling
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white border-b py-12 relative z-10 -mt-10 mx-4 max-w-6xl lg:mx-auto rounded-2xl shadow-xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((s, idx) => (
                        <div key={s.label} className={`text-center ${idx < stats.length - 1 ? "lg:border-r border-gray-100" : ""}`}>
                            <div className="text-4xl font-extrabold text-red-600 mb-1">{s.val}</div>
                            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Vision Section (Extracted from Old React) */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 text-red-600 font-bold text-sm tracking-widest uppercase mb-4">
                            <span className="h-0.5 w-8 bg-red-600"></span>
                            <span>Our Purpose</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
                            Committed to Your <br />Medical Excellence
                        </h2>

                        <div className="space-y-10">
                            <div className="flex items-start space-x-6 group">
                                <div className="p-4 bg-red-50 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                    <Target className="w-8 h-8 text-current" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Mission</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        To bridge the gap between aspiring medical students and quality education by providing comprehensive information about MBBS programs in Kyrgyzstan&apos;s top universities.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="p-4 bg-red-50 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                    <Rocket className="w-8 h-8 text-current" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Vision</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        To become the most trusted and comprehensive platform for MBBS admissions in Kyrgyzstan, empowering students from every country to achieve their dreams of becoming medical professionals.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <GraduationCap className="w-32 h-32" />
                        </div>
                        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            Why Choose Bespoke Education?
                        </h3>
                        <ul className="grid gap-6">
                            {[
                                "Internationally Recognized Degrees (WHO/WDOMS)",
                                "Highly Affordable Fee Structure & Scholarships",
                                "World-Class Infrastructure & Dedicated Faculty",
                                "100% English Medium Instruction",
                                "Comprehensive Global Community & Support",
                                "Safe, Friendly, and Culturally Rich Environment"
                            ].map((item) => (
                                <li key={item} className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                                    <span className="text-gray-100 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Our Services */}
            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-red-600 font-bold text-sm uppercase tracking-widest bg-red-50 px-4 py-1.2 rounded-full mb-4 inline-block">Support Services</span>
                        <h2 className="text-4xl font-black text-gray-900 mt-4">We Guide You at Every Step</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                            From initial university selection to your graduation day, our dedicated team provides continuous support across borders.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <div key={service.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-500">
                                    <service.icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Kyrgyzstan - Generic */}
            <div className="bg-gray-50 py-24 border-y border-gray-100">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-8">
                        <span className="text-4xl text-red-600 font-bold">10+</span>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-6 underline decoration-red-600/20 underline-offset-8">10 Years of Excellence in Education Consulting</h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-10">
                        mbbskyrgyzstan.com is a specialized education consultancy focused exclusively on medical admissions in Kyrgyzstan. We were the first to establish <strong>direct official partnerships</strong> with top Kyrgyz medical universities for international students.
                    </p>
                    <p className="text-lg text-gray-500 italic max-w-3xl mx-auto">
                        &quot;Our mission has always been to simplify the complex world of international medical admissions, making premium education accessible to students of all backgrounds globally.&quot;
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to Start Your <span className="text-yellow-400">MBBS Journey?</span></h2>
                    <p className="text-gray-300 text-xl mb-12 font-light">Join the global community of students pursuing their medical careers in Kyrgyzstan. Get personalized guidance from our experts today.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact-us" className="bg-red-600 text-white hover:bg-red-700 font-bold px-12 py-5 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                            <Phone className="w-5 h-5" /> Book Free Consultation
                        </Link>
                        <Link href="/universities" className="bg-white/10 hover:bg-white/20 text-white font-bold px-12 py-5 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2">
                            Browse Programs <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
