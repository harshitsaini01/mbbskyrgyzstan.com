import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Users, Award, Globe, CheckCircle } from "lucide-react";

const years = [
    { year: "Year 1 & 2", focus: "Pre-Clinical Sciences", subjects: ["Anatomy", "Physiology", "Biochemistry", "Pathology"], color: "bg-red-50 border-red-200" },
    { year: "Year 3 & 4", focus: "Para-Clinical Sciences", subjects: ["Microbiology", "Pharmacology", "Forensic Medicine", "Community Medicine"], color: "bg-blue-50 border-blue-200" },
    { year: "Year 5 & 6", focus: "Clinical Sciences", subjects: ["Internal Medicine", "Surgery", "OB/GYN", "Paediatrics"], color: "bg-green-50 border-green-200" },
];

const systemFeatures = [
    { icon: Globe, title: "International Standards", description: "Education system follows international standards with WHO, UNESCO recognition" },
    { icon: BookOpen, title: "English Medium", description: "All programs taught in English with experienced international faculty" },
    { icon: Users, title: "Small Class Sizes", description: "Low student-to-teacher ratio ensuring personalized attention" },
    { icon: Award, title: "Practical Learning", description: "Emphasis on hands-on experience and clinical practice" },
];

const highlights = [
    { icon: Clock, title: "6-Year Program", desc: "Comprehensive MBBS curriculum over 6 academic years including clinical rotations." },
    { icon: Users, title: "English Medium", desc: "Complete instruction in English with dedicated language support for international students." },
    { icon: BookOpen, title: "WHO Curriculum", desc: "Curriculum aligned with WHO and NMC guidelines ensuring global recognition." },
    { icon: Award, title: "Clinical Training", desc: "Hands-on clinical training at affiliated hospitals with real patient exposure from Year 3." },
];

const keyHighlights = [
    "Ministry of Education and Training (MOET) standards",
    "Credit-based system for international mobility",
    "Quality assurance and regular accreditation",
    "Modern teaching methodologies and technology",
];

export default function EducationSystem() {
    return (
        <section id="education-system" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Education System in Vietnam
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Understand the comprehensive education system that has produced thousands
                        of successful medical professionals worldwide.
                    </p>
                </div>

                {/* System Overview — World-Class Standards */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-6">
                                World-Class Education Standards
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Vietnam&apos;s higher education system is built on strong academic foundations
                                with international recognition. The country has been a preferred destination
                                for medical education for over two decades.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Universities follow the Ministry of Education and Training (MOET) standards making it
                                easier for students to transfer credits and pursue further studies globally.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <h4 className="text-xl font-bold text-gray-800 mb-4">Key Highlights</h4>
                            <ul className="space-y-3">
                                {keyHighlights.map((item) => (
                                    <li key={item} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Students in classroom"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-red-600 text-white p-6 rounded-2xl shadow-xl">
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-2">25+</div>
                                <div className="text-red-100">Years of Excellence</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Vietnam's Education System? */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
                        Why Choose Vietnam&apos;s Education System?
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {systemFeatures.map((feature) => (
                            <div key={feature.title} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-4">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h4>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Curriculum Timeline */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {years.map((y) => (
                        <div key={y.year} className={`${y.color} border-2 rounded-2xl p-8`}>
                            <div className="text-lg font-bold text-gray-800 mb-1">{y.year}</div>
                            <div className="text-red-600 font-semibold mb-4">{y.focus}</div>
                            <ul className="space-y-2">
                                {y.subjects.map((s) => (
                                    <li key={s} className="flex items-center space-x-2 text-gray-700 text-sm">
                                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                                        <span>{s}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Quick Highlights */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {highlights.map((h) => (
                        <div key={h.title} className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                                <h.icon className="w-6 h-6 text-red-600" />
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2">{h.title}</h4>
                            <p className="text-gray-600 text-sm">{h.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/education-system"
                        className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
                    >
                        Learn More About the Education System
                    </Link>
                </div>
            </div>
        </section>
    );
}
