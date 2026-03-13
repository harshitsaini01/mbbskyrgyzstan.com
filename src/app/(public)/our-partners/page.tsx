import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, Globe, Award, ArrowRight, CheckCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Promise<Metadata> = buildMetadata({
    title: "Our Partners — Universities & Organizations | MbbsInVietnam.com",
    description: "Meet our official partner medical universities, embassy liaisons, and educational bodies in Vietnam that make MBBS admissions smooth and transparent.",
    entitySeo: { metaKeyword: "mbbs vietnam partners, partner universities vietnam, vietnam mbbs official partners" },
});

const partnerTypes = [
    {
        type: "Official University Partners",
        icon: Award,
        color: "red",
        desc: "We have direct MoU agreements with these NMC-approved Vietnamese medical universities — ensuring transparent admissions, fixed tuition, and dedicated support.",
        partners: [
            { name: "Hanoi Medical University", city: "Hanoi", est: "1902" },
            { name: "Vietnam National University – School of Medicine", city: "Hanoi", est: "1956" },
            { name: "Hue University of Medicine", city: "Hue", est: "1957" },
            { name: "University of Medicine & Pharmacy – HCMC", city: "Ho Chi Minh City", est: "1947" },
            { name: "Can Tho University of Medicine & Pharmacy", city: "Can Tho", est: "1989" },
            { name: "Pham Ngoc Thach University of Medicine", city: "Ho Chi Minh City", est: "1989" },
        ],
    },
    {
        type: "International Bodies",
        icon: Globe,
        color: "blue",
        desc: "We are affiliated with and recognized by these international medical education authorities.",
        partners: [
            { name: "World Health Organization (WHO)", city: "Geneva", est: "" },
            { name: "Foundation for Advancement of International Medical Education (FAIMER)", city: "USA", est: "" },
            { name: "National Medical Commission, India (NMC)", city: "New Delhi", est: "" },
        ],
    },
];

const benefits = [
    "Direct admission without middlemen or agents",
    "Guaranteed seat after offer letter",
    "Fixed tuition as per official university prospectus",
    "On-ground support team in Vietnam",
    "Regular progress reports to parents",
    "Emergency assistance 24/7",
];

export default function OurPartnersPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Handshake className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Official Partners</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        We work directly with NMC-approved Vietnamese medical universities, eliminating middlemen and ensuring transparent, reliable MBBS admissions.
                    </p>
                </div>
            </div>

            {/* Partner Sections */}
            {partnerTypes.map((pt) => (
                <div key={pt.type} className="max-w-7xl mx-auto px-4 py-14">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 bg-${pt.color}-50 rounded-xl flex items-center justify-center`}>
                            <pt.icon className={`w-6 h-6 text-${pt.color}-600`} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{pt.type}</h2>
                    </div>
                    <p className="text-gray-600 mb-8 max-w-3xl">{pt.desc}</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {pt.partners.map((p) => (
                            <div key={p.name} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-10 h-10 bg-${pt.color}-50 rounded-xl flex items-center justify-center mb-3`}>
                                    <span className="text-lg font-bold text-gray-600">{p.name[0]}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span>📍 {p.city}</span>
                                    {p.est && <span>Est. {p.est}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Benefits of our partnerships */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">Partnership Benefits</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-8">What Our Partnerships Mean For You</h2>
                            <div className="space-y-4">
                                {benefits.map((b) => (
                                    <div key={b} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{b}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-lg">
                            <div className="text-5xl mb-4">🤝</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Want to Become a Partner?</h3>
                            <p className="text-gray-600 mb-6">We welcome inquiry from universities, coaching centers, and diaspora organizations looking to collaborate.</p>
                            <Link href="/contact-us"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                                Get in Touch <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
