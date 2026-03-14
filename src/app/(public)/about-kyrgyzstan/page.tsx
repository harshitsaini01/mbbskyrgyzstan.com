import type { Metadata } from "next";
import { Globe, Mountain, Utensils, Music, Landmark, Sun, CheckCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import QuickFactsKyrgyzstan from "@/components/homepage/QuickFactsKyrgyzstan";

export const metadata: Promise<Metadata> = buildMetadata({
    title: "About Kyrgyzstan - Culture, Lifestyle and Education | mbbskyrgyzstan.com",
    description:
        "Discover Kyrgyzstan - its culture, affordability, student lifestyle, and why it is a strong destination for MBBS aspirants.",
    entitySeo: {
        metaKeyword:
            "about kyrgyzstan, kyrgyzstan culture, life in kyrgyzstan for students, mbbs kyrgyzstan environment",
    },
    pageKey: "about-kyrgyzstan",
});

const highlights = [
    {
        icon: Globe,
        color: "red",
        title: "Safe and Welcoming",
        desc: "Kyrgyzstan hosts a large international student population, with universities and local communities that actively support newcomers.",
    },
    {
        icon: Sun,
        color: "amber",
        title: "Four Distinct Seasons",
        desc: "The country has a continental climate with cold winters and warm summers, offering a predictable yearly cycle for students.",
    },
    {
        icon: Utensils,
        color: "green",
        title: "Affordable Daily Living",
        desc: "Food, local transport, and accommodation are generally cost-effective compared to many other MBBS destinations.",
    },
    {
        icon: Mountain,
        color: "blue",
        title: "Natural Beauty",
        desc: "From Issyk-Kul Lake to high mountain ranges, Kyrgyzstan offers a unique outdoor lifestyle during breaks and weekends.",
    },
    {
        icon: Music,
        color: "purple",
        title: "Nomadic Heritage",
        desc: "Kyrgyz culture blends strong traditional heritage with modern city life, giving students rich cultural exposure.",
    },
    {
        icon: Landmark,
        color: "red",
        title: "Student-Friendly Cities",
        desc: "Cities like Bishkek and Osh offer practical access to universities, clinics, hostels, and public transport.",
    },
];

const facts = [
    "More than 90 percent of Kyrgyzstan is mountainous.",
    "Bishkek is the largest education and healthcare hub for international students.",
    "The official currency is Kyrgyzstani Som (KGS), which helps keep day-to-day expenses manageable.",
    "English-medium MBBS tracks are available at multiple universities.",
    "Student communities from India and other countries are well established.",
    "Universities provide on-arrival and onboarding support for international admissions.",
];

export default function AboutKyrgyzstanPage() {
    return (
        <div className="min-h-screen">
            <div className="relative bg-gradient-to-br from-red-600 to-amber-600 text-white py-20 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <div className="text-6xl font-bold mb-6">Kyrgyzstan</div>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        Where Culture Meets
                        <br />
                        Opportunity
                    </h1>
                    <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
                        A practical and affordable destination for international medical students looking for globally aligned MBBS pathways.
                    </p>
                </div>
            </div>

            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        {[
                            { val: "7.2M+", label: "Population", icon: "People" },
                            { val: "199,951 km2", label: "Area", icon: "Map" },
                            { val: "Bishkek", label: "Capital", icon: "City" },
                            { val: "$180-320/mo", label: "Living Cost", icon: "Budget" },
                        ].map((s) => (
                            <div key={s.label} className="p-4 rounded-xl bg-gray-50">
                                <div className="text-sm font-semibold text-red-600 mb-2 uppercase tracking-wide">{s.icon}</div>
                                <div className="text-2xl font-bold text-gray-900">{s.val}</div>
                                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">Why Kyrgyzstan?</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">A Strong Study Base for MBBS</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        For students seeking affordable and structured medical education, Kyrgyzstan offers a balanced academic and lifestyle environment.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {highlights.map((h) => (
                        <div
                            key={h.title}
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 bg-${h.color}-50 rounded-xl flex items-center justify-center mb-4`}>
                                <h.icon className={`w-6 h-6 text-${h.color}-500`} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{h.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{h.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">Did You Know?</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-8">Kyrgyzstan Education Facts</h2>
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
                                    {
                                        label: "Tuition / Year",
                                        kg: "$3,500-6,500",
                                        india: "$8,000-20,000",
                                        ru: "$4,500-8,500",
                                    },
                                    {
                                        label: "Hostel / Year",
                                        kg: "$600-1,500",
                                        india: "$1,500-3,000",
                                        ru: "$1,000-2,200",
                                    },
                                    {
                                        label: "Food / Month",
                                        kg: "$100-180",
                                        india: "$150-300",
                                        ru: "$150-260",
                                    },
                                ].map((row) => (
                                    <div key={row.label} className="bg-white rounded-xl p-4">
                                        <div className="font-medium text-gray-700 mb-2 text-sm">{row.label}</div>
                                        <div className="grid grid-cols-3 gap-2 text-xs">
                                            <div className="text-center">
                                                <div className="font-bold text-green-600">{row.kg}</div>
                                                <div className="text-gray-400">Kyrgyzstan</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-gray-600">{row.india}</div>
                                                <div className="text-gray-400">India</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-gray-600">{row.ru}</div>
                                                <div className="text-gray-400">Russia</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <QuickFactsKyrgyzstan />
        </div>
    );
}
