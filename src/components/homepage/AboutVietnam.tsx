import Link from "next/link";
import { CheckCircle, Globe, BookOpen, DollarSign, Building, Users, Languages, Clock } from "lucide-react";

const features = [
    {
        icon: <CheckCircle className="w-6 h-6 text-red-600" />,
        title: "NMC & WHO Recognized",
        desc: "All listed universities are recognized by the National Medical Commission of India and the World Health Organization.",
    },
    {
        icon: <Globe className="w-6 h-6 text-red-600" />,
        title: "Southeast Asia's Medical Hub",
        desc: "Vietnam has rapidly emerged as a top destination for international medical students, with world-class hospitals and clinical exposure.",
    },
    {
        icon: <BookOpen className="w-6 h-6 text-red-600" />,
        title: "English Medium Programs",
        desc: "All programs are offered in English, with dedicated support for international students throughout their studies.",
    },
    {
        icon: <DollarSign className="w-6 h-6 text-red-600" />,
        title: "Affordable Tuition",
        desc: "Study at globally recognized medical universities at a fraction of the cost compared to private institutions in India.",
    },
];

const quickFacts = [
    { icon: Building, label: "Capital", value: "Hanoi" },
    { icon: Users, label: "Population", value: "97 Million+" },
    { icon: Languages, label: "Language", value: "Vietnamese & English" },
    { icon: Clock, label: "Timezone", value: "UTC+7 (ICT)" },
];

export default function AboutVietnam() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div>
                        <div className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                            Why Vietnam for MBBS?
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            World-Class Medical Education in Southeast Asia
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Vietnam is home to some of Asia&apos;s finest medical universities with over 60 years
                            of excellence in medical education. With globally recognized degrees, English-medium
                            programs, and affordable tuition, Vietnam is the preferred destination for aspiring
                            medical professionals worldwide.
                        </p>
                        <div className="space-y-4">
                            {features.map((f) => (
                                <div key={f.title} className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">{f.title}</h4>
                                        <p className="text-gray-600 text-sm">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/about-vietnam"
                                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                            >
                                Learn More About Vietnam
                            </Link>
                        </div>
                    </div>

                    {/* Right — stats grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { value: "15+", label: "Universities", sub: "MCI/NMC Recognized" },
                            { value: "60+", label: "Years", sub: "Medical Education Excellence" },
                            { value: "₹3-5L", label: "Per Year", sub: "Affordable Tuition" },
                            { value: "85%+", label: "FMGE Rate", sub: "First Attempt Pass Rate" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-8 text-center"
                            >
                                <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                                <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                                <div className="text-sm text-gray-600">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Facts About Vietnam */}
                <div className="mt-16 border-t pt-12">
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Quick Facts About Vietnam</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {quickFacts.map((f) => (
                            <div key={f.label} className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-shadow">
                                <f.icon className="h-10 w-10 text-red-600 mx-auto mb-3" />
                                <h4 className="text-base font-bold text-gray-800">{f.label}</h4>
                                <p className="text-gray-600 text-sm mt-1">{f.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <Link href="/about-vietnam" className="text-red-600 text-sm font-medium hover:text-red-700 underline underline-offset-4">
                            See all facts about Vietnam →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
