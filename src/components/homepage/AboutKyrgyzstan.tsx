import Link from "next/link";
import { CheckCircle, Globe, BookOpen, DollarSign, Building, Users, Languages, Clock } from "lucide-react";

const features = [
    {
        icon: <CheckCircle className="w-6 h-6 text-red-600" />,
        title: "NMC & WHO Recognized",
        desc: "Many medical universities in Kyrgyzstan are recognized by the National Medical Commission (NMC) of India and the World Health Organization (WHO).",
    },
    {
        icon: <Globe className="w-6 h-6 text-red-600" />,
        title: "Popular MBBS Destination",
        desc: "Kyrgyzstan has become a leading destination for international medical students due to its quality education and affordable medical programs.",
    },
    {
        icon: <BookOpen className="w-6 h-6 text-red-600" />,
        title: "English Medium Programs",
        desc: "MBBS programs are offered in English, making it easier for international students to study and adapt quickly.",
    },
    {
        icon: <DollarSign className="w-6 h-6 text-red-600" />,
        title: "Affordable Tuition Fees",
        desc: "Medical education in Kyrgyzstan is significantly more affordable compared to private medical colleges in India.",
    },
];

const quickFacts = [
    { icon: Building, label: "Capital", value: "Bishkek" },
    { icon: Users, label: "Population", value: "6.7 Million+" },
    { icon: Languages, label: "Language", value: "Kyrgyz & Russian" },
    { icon: Clock, label: "Timezone", value: "UTC+6 (KGT)" },
];

export default function AboutKyrgyzstan() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left */}
                    <div>
                        <div className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                            Why Kyrgyzstan for MBBS?
                        </div>

                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Affordable Medical Education in Central Asia
                        </h2>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Kyrgyzstan is home to several internationally recognized medical universities
                            offering high-quality MBBS programs. With affordable tuition fees, English-medium
                            courses, and globally accepted degrees, Kyrgyzstan has become a preferred
                            destination for medical students from India and other countries.
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
                                href="/about-kyrgyzstan"
                                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                            >
                                Learn More About Kyrgyzstan
                            </Link>
                        </div>
                    </div>

                    {/* Right stats */}
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { value: "10+", label: "Universities", sub: "NMC Recognized" },
                            { value: "30+", label: "Years", sub: "Medical Education" },
                            { value: "₹2.5-4L", label: "Per Year", sub: "Affordable Tuition" },
                            { value: "80%+", label: "FMGE Rate", sub: "Pass Percentage" },
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

                {/* Quick Facts */}
                <div className="mt-16 border-t pt-12">
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
                        Quick Facts About Kyrgyzstan
                    </h3>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {quickFacts.map((f) => (
                            <div
                                key={f.label}
                                className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-shadow"
                            >
                                <f.icon className="h-10 w-10 text-red-600 mx-auto mb-3" />
                                <h4 className="text-base font-bold text-gray-800">{f.label}</h4>
                                <p className="text-gray-600 text-sm mt-1">{f.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-6">
                        <Link
                            href="/about-kyrgyzstan"
                            className="text-red-600 text-sm font-medium hover:text-red-700 underline underline-offset-4"
                        >
                            See all facts about Kyrgyzstan →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
