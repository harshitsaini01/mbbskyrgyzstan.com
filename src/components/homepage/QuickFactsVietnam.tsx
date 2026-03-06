import {
    Building, Users, Languages, DollarSign, MapPin, Clock,
    Flag, Mountain, Stethoscope, Star, Plane, Utensils,
    GraduationCap, TrendingUp, Globe, Sun, Snowflake, Calendar,
    Waves, TreePine, Heart, Car, Wifi, Award, Compass
} from "lucide-react";
import Link from "next/link";

// Static Vietnam quick facts — mirrors the old React AboutUs.tsx content
const essentialFacts = [
    { icon: Building, color: "blue", label: "Capital", value: "Hanoi" },
    { icon: Users, color: "green", label: "Population", value: "97 Million+" },
    { icon: Languages, color: "purple", label: "Languages", value: "Vietnamese (English widely spoken)" },
    { icon: DollarSign, color: "orange", label: "Currency", value: "Vietnamese Dong (VND)" },
    { icon: MapPin, color: "red", label: "Location", value: "South-East Asia, Indochina Peninsula" },
    { icon: Clock, color: "teal", label: "Timezone", value: "UTC+7 (ICT)" },
    { icon: Flag, color: "yellow", label: "Independence", value: "September 2, 1945" },
    { icon: Mountain, color: "indigo", label: "Highest Peak", value: "Fansipan (3,143 m)" },
];

const geographyPoints = [
    { icon: Mountain, color: "text-blue-600", text: "Fansipan — highest peak in Indochina" },
    { icon: Waves, color: "text-blue-400", text: "3,200+ km coastline on the South China Sea" },
    { icon: TreePine, color: "text-green-600", text: "Mekong Delta — fertile rice granary of Asia" },
    { icon: Globe, color: "text-purple-600", text: "Borders China, Laos, and Cambodia" },
];

const climateZones = [
    { icon: Sun, color: "text-yellow-500", text: "North: 4 seasons — cool winters, hot summers" },
    { icon: Snowflake, color: "text-blue-500", text: "Central: Distinct wet & dry seasons" },
    { icon: Sun, color: "text-orange-500", text: "South: Tropical — hot year-round (avg 28°C)" },
    { icon: Calendar, color: "text-green-500", text: "Monsoon season: May–October" },
];

const attractions = [
    { icon: Waves, color: "text-blue-200", name: "Ha Long Bay", desc: "UNESCO World Heritage — 1,600+ limestone islands" },
    { icon: TreePine, color: "text-green-200", name: "Hoi An Ancient Town", desc: "UNESCO heritage town with lantern festivals" },
    { icon: Mountain, color: "text-purple-200", name: "Sapa Rice Terraces", desc: "Breathtaking terraced fields in the highlands" },
    { icon: Compass, color: "text-yellow-200", name: "Phong Nha Caves", desc: "World's largest cave system" },
];

const majorCities = [
    { name: "Hanoi", gradient: "from-blue-600 to-purple-700", textMain: "text-blue-100", textSub: "text-blue-200", desc: "Capital city — home to Hanoi Medical University. French colonial architecture, vibrant culture.", pop: "8 Million+", highlight: "Top medical university city" },
    { name: "Ho Chi Minh City", gradient: "from-green-600 to-emerald-700", textMain: "text-green-100", textSub: "text-green-200", desc: "Economic powerhouse. Multiple medical colleges, modern infrastructure and nightlife.", pop: "9 Million+", highlight: "Most modern student city" },
    { name: "Hue", gradient: "from-orange-600 to-red-700", textMain: "text-orange-100", textSub: "text-orange-200", desc: "Serene imperial city. Hue University of Medicine is well-regarded with very low cost of living.", pop: "1.2 Million", highlight: "Most affordable city" },
];

const cuisines = [
    { emoji: "🍲", name: "Pho", desc: "Vietnam's iconic noodle soup — beef or chicken broth, served steaming hot" },
    { emoji: "🥖", name: "Banh Mi", desc: "Vietnamese baguette sandwich with fresh herbs — affordable street food" },
    { emoji: "🥗", name: "Goi Cuon", desc: "Fresh spring rolls — rice paper, veggies, shrimp. Loved by students" },
    { emoji: "🍚", name: "Com Tam", desc: "Broken rice with grilled pork — a staple affordable meal under $1" },
];

const transportOptions = [
    { icon: Plane, color: "text-blue-600", text: "International airports in Hanoi, HCMC, Da Nang" },
    { icon: Plane, color: "text-green-600", text: "Direct flights from major international hubs worldwide" },
    { icon: Car, color: "text-orange-600", text: "Motorbikes, buses & taxis within cities" },
    { icon: Globe, color: "text-purple-600", text: "Train network connecting all major cities" },
];

const visaFacts = [
    { icon: Award, color: "text-green-600", text: "E-visa available for nationals of 80+ countries" },
    { icon: Wifi, color: "text-blue-600", text: "Student visa (DN) issued with admission letter" },
    { icon: Calendar, color: "text-orange-600", text: "Processing time: 7–15 working days" },
    { icon: Heart, color: "text-red-600", text: "Foreign embassies in Hanoi & HCMC provide full consular support" },
];

const mbbsHighlights = [
    { icon: Stethoscope, label: "Internationally Recognized", desc: "All partner universities are WHO listed and recognized by major international medical councils worldwide", bg: "bg-white/10" },
    { icon: DollarSign, label: "Affordable Fees", desc: "Annual tuition from $3,000–$5,000 — significantly lower than most Western and private medical colleges globally", bg: "bg-white/10" },
    { icon: Languages, label: "English Medium", desc: "First 2–3 years fully in English; final years with Vietnamese clinical exposure", bg: "bg-white/10" },
];

const economyStats = [
    { label: "GDP Growth", value: "6-8% annually" },
    { label: "Main Industries", value: "Electronics, Textiles, Tourism" },
    { label: "Tourism Growth", value: "15M+ visitors/year" },
    { label: "Foreign Investment", value: "Top 5 in ASEAN" },
];

const quickFacts = [
    { icon: Calendar, label: "Independence Day", value: "September 2, 1945", color: "text-indigo-200" },
    { icon: Users, label: "National Sport", value: "Football (Soccer)", color: "text-purple-200" },
    { icon: Mountain, label: "Highest Peak", value: "Fansipan (3,143m)", color: "text-blue-200" },
    { icon: Award, label: "UNESCO Sites", value: "8 World Heritage Sites", color: "text-green-200" },
];

const healthcare = [
    { title: "Public Healthcare", desc: "Vietnam has an extensive public hospital network. Major cities have international-standard government hospitals with modern equipment and specialist care.", color: "border-blue-200" },
    { title: "Private Healthcare", desc: "FV Hospital, Vinmec, and CitiClinic offer international-standard private care. Many have English-speaking staff and accept international insurance.", color: "border-green-200" },
    { title: "Student Healthcare", desc: "Medical universities provide on-campus health facilities. Students get access to affiliated teaching hospitals for routine care. Cost is very affordable.", color: "border-purple-200" },
];

export default function QuickFactsVietnam() {
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
                            <div key={c.name} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-4xl mb-3">{c.emoji}</div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{c.name}</h3>
                                <p className="text-gray-600 text-sm">{c.desc}</p>
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
