import {
    Mountain, Stethoscope, Star, GraduationCap, TrendingUp, Globe, Sun, Utensils,
    Building, Users, Plane, Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { cdn } from "@/lib/cdn";
import {
    essentialFacts, geographyPoints, climateZones, attractions, majorCities,
    defaultCuisines, transportOptions, visaFacts, mbbsHighlights, economyStats,
    quickFacts, healthcare, mbbsWhyStats, studentLifeCards,
} from "@/data/vietnam-facts";


export default async function QuickFactsVietnam() {
    // Fetch cuisine items from DB; fall back to static data when empty
    let cuisines: { id: number; dishName: string | null; dishDescription: string | null; dishImage: string | null; iconClass: string | null }[] = defaultCuisines;
    try {
        const dbItems = await prisma.countryCuisineLifestyle.findMany({
            where: { pageId: 1 },
            orderBy: { id: "asc" },
        });
        if (dbItems.length > 0) cuisines = dbItems;
    } catch {
        // silently fall back to static data
    }
    return (
        <div>
            {/* ─── Essential Facts ─── */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Quick Facts About Vietnam</h2>
                        <p className="text-lg text-gray-600">Key information every MBBS aspirant should know</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {essentialFacts.map((f) => (
                            <div key={f.label} className={`text-center p-6 bg-gradient-to-br from-${f.color}-50 to-${f.color}-100 rounded-xl hover:shadow-lg transition-shadow`}>
                                <f.icon className={`h-12 w-12 text-${f.color}-600 mx-auto mb-4`} />
                                <h3 className="text-lg font-bold text-gray-800">{f.label}</h3>
                                <p className="text-gray-600 text-sm mt-1">{f.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Geography & Climate ─── */}
            <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Mountain className="h-16 w-16 text-red-600 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Geography &amp; Climate</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            A long, narrow S-shaped country stretching 1,650 km — from mountains to tropical coast
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Geography Highlights</h3>
                            <div className="space-y-4">
                                {geographyPoints.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <item.icon className={`h-6 w-6 ${item.color}`} />
                                        <span className="text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Climate Zones</h3>
                            <div className="space-y-4">
                                {climateZones.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <item.icon className={`h-6 w-6 ${item.color}`} />
                                        <span className="text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Top Attractions */}
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 rounded-2xl text-white">
                        <h3 className="text-2xl font-bold mb-6 text-center">Top Tourist Attractions</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {attractions.map((a) => (
                                <div key={a.name} className="text-center">
                                    <a.icon className={`h-8 w-8 mx-auto mb-2 ${a.color}`} />
                                    <h4 className="font-semibold">{a.name}</h4>
                                    <p className="text-sm text-orange-100 mt-1">{a.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── MBBS Education Hub ─── */}
            <section className="py-16 bg-gradient-to-r from-red-600 to-orange-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <GraduationCap className="h-16 w-16 text-orange-200 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold mb-4">MBBS Education Hub</h2>
                        <p className="text-xl text-orange-100 max-w-3xl mx-auto">
                            A top destination for international medical students — WHO recognized universities with global accreditations
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-10">
                        {mbbsHighlights.map((item) => (
                            <div key={item.label} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
                                <item.icon className="h-12 w-12 text-orange-200 mb-4" />
                                <h3 className="text-xl font-bold mb-3">{item.label}</h3>
                                <p className="text-orange-100">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold mb-6">Why Choose Vietnam for MBBS?</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { val: "6 Years", label: "Course Duration" },
                                { val: "NMC + WHO", label: "Recognition" },
                                { val: "35-45%", label: "FMGE Pass Rate" },
                                { val: "$3-5K/yr", label: "Annual Tuition" },
                            ].map(s => (
                                <div key={s.label} className="bg-white/10 rounded-xl py-4 px-3">
                                    <div className="text-2xl font-bold">{s.val}</div>
                                    <div className="text-orange-200 text-sm mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Major Cities ─── */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Building className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Major University Cities</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Urban centres offering modern amenities, affordable living, and world-class medical colleges
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {majorCities.map((city) => (
                            <div key={city.name} className={`bg-gradient-to-br ${city.gradient} text-white p-8 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                                <h3 className="text-2xl font-bold mb-3">{city.name}</h3>
                                <p className={`${city.textMain} mb-4`}>{city.desc}</p>
                                <div className={`space-y-2 text-sm ${city.textSub}`}>
                                    <div className="flex items-center gap-2"><Users className="h-4 w-4" /><span>{city.pop}</span></div>
                                    <div className="flex items-center gap-2"><Star className="h-4 w-4" /><span>{city.highlight}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Economy ─── */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <TrendingUp className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Growing Economy</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            One of Asia's fastest-growing economies — stable, welcoming to foreigners, and affordable for students
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">🏆 Key Sectors</h3>
                                <p className="text-gray-600">Electronics manufacturing, textiles, seafood exports, tourism, and a booming tech startup ecosystem.</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">📈 Major Exports</h3>
                                <p className="text-gray-600">Samsung, LG, Intel have major investments. Vietnam is among the world's top electronics exporters.</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">🌍 Student Economy</h3>
                                <p className="text-gray-600">Monthly living costs are very affordable for international MBBS students. The Vietnamese Dong offers favorable exchange rates for many currencies.</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-600 to-blue-700 p-8 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold mb-6">Economic Indicators</h3>
                            <div className="space-y-4">
                                {economyStats.map(s => (
                                    <div key={s.label} className="flex justify-between items-center border-b border-white/20 pb-3 last:border-0">
                                        <span className="text-blue-100">{s.label}</span>
                                        <span className="font-semibold">{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Cuisine & Lifestyle ─── */}
            <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Utensils className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Cuisine &amp; Student Life</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Vietnam's food is fresh, flavourful, and incredibly affordable — a huge plus for international students from every corner of the world
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {cuisines.map((c) => (
                            <div key={c.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                                {c.dishImage ? (
                                    <div className="relative w-full h-44">
                                        <Image
                                            src={cdn(c.dishImage)}
                                            alt={c.dishName ?? ""}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-20 bg-amber-50">
                                        <span className="text-5xl">{c.iconClass}</span>
                                    </div>
                                )}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{c.dishName}</h3>
                                    <p className="text-gray-600 text-sm">{c.dishDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gradient-to-r from-orange-600 to-red-700 p-8 rounded-2xl text-white">
                        <h3 className="text-2xl font-bold mb-6 text-center">Student Lifestyle</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: Heart, label: "Safe Environment", desc: "Vietnam is consistently ranked among Asia's safest countries for students." },
                                { icon: Building, label: "Modern Hostels", desc: "University hostels equipped with Wi-Fi, common areas, and 24/7 security." },
                                { icon: Users, label: "Global Community", desc: "Active international student associations in Hanoi, HCMC, and Hue providing multicultural support." },
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <item.icon className="h-8 w-8 mx-auto mb-2 text-orange-200" />
                                    <h4 className="font-semibold">{item.label}</h4>
                                    <p className="text-sm text-orange-100 mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Travel & Connectivity ─── */}
            <section className="py-16 bg-gradient-to-r from-slate-100 to-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Plane className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Travel &amp; Connectivity</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Well-connected to the world — multiple international routes and a straightforward student visa process for most nationalities</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Transportation</h3>
                            <div className="space-y-4">
                                {transportOptions.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <item.icon className={`h-6 w-6 ${item.color}`} />
                                        <span className="text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Visa &amp; Connectivity</h3>
                            <div className="space-y-4">
                                {visaFacts.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <item.icon className={`h-6 w-6 ${item.color}`} />
                                        <span className="text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Healthcare ─── */}
            <section className="py-16 bg-gradient-to-r from-green-50 to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Stethoscope className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Healthcare System</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Affordable healthcare for locals and international students alike</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {healthcare.map((h) => (
                            <div key={h.title} className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 ${h.color}`}>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{h.title}</h3>
                                <p className="text-gray-600">{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Quick Trivia Banner ─── */}
            <section className="py-16 bg-red-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Star className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold mb-4">Did You Know?</h2>
                        <p className="text-xl text-red-100">Interesting facts about Vietnam</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickFacts.map((f) => (
                            <div key={f.label} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                                <f.icon className={`h-8 w-8 mx-auto mb-3 ${f.color}`} />
                                <h3 className="font-bold">{f.label}</h3>
                                <p className={`${f.color} text-sm mt-1`}>{f.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Start Your MBBS Journey in Vietnam</h2>
                    <p className="text-xl text-red-100 mb-8">
                        Discover world-class medical education in Southeast Asia's most beautiful country
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/universities" className="bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors">
                            Explore MBBS Programs
                        </Link>
                        <Link href="/contact-us" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-700 transition-colors">
                            Contact Universities
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
