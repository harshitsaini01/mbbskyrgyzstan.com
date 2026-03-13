import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Mountain, Utensils, Music, Landmark, Sun, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import QuickFactsVietnam from "@/components/homepage/QuickFactsVietnam";

export const metadata: Promise<Metadata> = buildMetadata({
    title: "About Vietnam — Culture, Lifestyle & Education | MbbsInVietnam.com",
    description: "Discover Vietnam — its rich culture, affordable living, world-class education system, and why it's the top MBBS destination for international students.",
    entitySeo: { metaKeyword: "about vietnam, vietnam culture, life in vietnam for international students, vietnam mbbs environment" },
    pageKey: "about-vietnam",
});

const highlights = [
    { icon: Globe, color: "red", title: "Safe & Welcoming", desc: "Vietnam consistently ranks as one of Asia's safest countries. International students are warmly welcomed, with a large and growing global student community." },
    { icon: Sun, color: "amber", title: "Tropical Climate", desc: "Warm weather year-round with distinct seasons. Ho Chi Minh City averages 28°C — comfortable for students from any part of the world." },
    { icon: Utensils, color: "green", title: "Vegetarian-Friendly", desc: "Vietnamese cuisine features fresh vegetables, rice, and noodles. Vegetarian and international food options are readily available in all major university cities." },
    { icon: Mountain, color: "blue", title: "Rich Natural Beauty", desc: "Stunning beaches, lush mountains, and UNESCO heritage sites like Ha Long Bay and Hoi An — weekend trips await every student." },
    { icon: Music, color: "purple", title: "Vibrant Culture", desc: "Vietnam's 54 ethnic groups create a rich cultural mosaic. Festivals, traditional arts, and a lively modern city scene offer rich experiences." },
    { icon: Landmark, color: "red", title: "Affordable Living", desc: "Monthly living costs are significantly lower than Western countries, making Vietnam one of the most affordable destinations for international medical students." },
];

const facts = [
    "Vietnam has 250+ years of modern education history dating to the first university in 1076",
    "Literacy rate: 95%+ — one of the highest in Southeast Asia",
    "Vietnam invests 6.3% of GDP in education — higher than many developed nations",
    "English proficiency is rapidly growing, especially in university cities",
    "Affordable cost of living compared to Europe, the US, or Australia",
    "Active international student associations in Hanoi, Ho Chi Minh City, and Hue",
];

export default function AboutVietnamPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-red-600 to-amber-600 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 text-center opacity-5 text-[20rem] leading-none select-none">🇻🇳</div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <div className="text-6xl font-bold mb-6">Vietnam</div>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                         Where Tradition <br />Meets Opportunity
                    </h1>
                    <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
                        A country of breathtaking landscapes, warm people, and world-class medical education — Vietnam is Asia&apos;s rising star for MBBS aspirants.
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        {[
                            { val: "97M+", label: "Population", icon: "👥" },
                            { val: "331K km²", label: "Area", icon: "🗺️" },
                            { val: "Hanoi", label: "Capital", icon: "🏛️" },
                            { val: "₹8-15K/mo", label: "Living Cost", icon: "💰" },
                        ].map((s) => (
                            <div key={s.label} className="p-4 rounded-xl bg-gray-50">
                                <div className="text-3xl mb-2">{s.icon}</div>
                                <div className="text-2xl font-bold text-gray-900">{s.val}</div>
                                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Vietnam */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">Why Vietnam?</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">A Perfect Home Away From Home</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">For international students from every corner of the world, Vietnam offers a comfortable, affordable, and welcoming environment to study and grow.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {highlights.map((h) => (
                        <div key={h.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className={`w-12 h-12 bg-${h.color}-50 rounded-xl flex items-center justify-center mb-4`}>
                                <h.icon className={`w-6 h-6 text-${h.color}-500`} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{h.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{h.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Facts + Cost Comparison */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">Did You Know?</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-8">Vietnam Education Facts</h2>
                            <div className="space-y-4">
                                {facts.map((fact) => (
                                    <div key={fact} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{fact}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-3xl p-8">
                            <h3 className="font-bold text-xl text-gray-900 mb-6">Cost Comparison</h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Tuition / Year", vn: "$3,000–5,000", india: "$8,000–20,000", ru: "$5,000–8,000" },
                                    { label: "Hostel / Year", vn: "$600–1,200", india: "$1,500–3,000", ru: "$1,000–2,000" },
                                    { label: "Food / Month", vn: "$100–200", india: "$150–300", ru: "$150–250" },
                                ].map((row) => (
                                    <div key={row.label} className="bg-white rounded-xl p-4">
                                        <div className="font-medium text-gray-700 mb-2 text-sm">{row.label}</div>
                                        <div className="grid grid-cols-3 gap-2 text-xs">
                                            <div className="text-center">
                                                <div className="font-bold text-green-600">{row.vn}</div>
                                                <div className="text-gray-400">Vietnam 🇻🇳</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-gray-600">{row.india}</div>
                                                <div className="text-gray-400">India 🇮🇳</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-gray-600">{row.ru}</div>
                                                <div className="text-gray-400">Russia 🇷🇺</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Full Quick Facts About Vietnam (all 10 sections) ─── */}
            <QuickFactsVietnam />
        </div>
    );
}
