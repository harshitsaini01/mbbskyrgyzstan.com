import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/homepage/HeroSection";
import UniversityGrid from "@/components/homepage/UniversityGrid";
import AboutKyrgyzstan from "@/components/homepage/AboutKyrgyzstan";
import ScholarshipsSection from "@/components/homepage/ScholarshipsSection";
import EducationSystem from "@/components/homepage/EducationSystem";
import MinistryLinks from "@/components/homepage/MinistryLinks";
import CompareUniversities from "@/components/homepage/CompareUniversities";
import FmgeSection from "@/components/homepage/FmgeSection";
import { organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
    title: "MBBS in Kyrgyzstan — Study MBBS in Kyrgyzstan 2025 | Low Fees, NMC Recognized",
    description:
        "Study MBBS in Kyrgyzstan at top NMC & WHO recognized medical universities. Affordable tuition, English medium, high FMGE pass rates. Apply for 2025-26 admission.",
    keywords: "MBBS in Kyrgyzstan, study MBBS Kyrgyzstan, medical university Kyrgyzstan, NMC recognized Kyrgyzstan, MBBS admission 2025",
};

const UniversityGridFallback = () => (
    <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200" />
                        <div className="p-6 space-y-3">
                            <div className="h-6 bg-gray-200 rounded" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-16 bg-gray-200 rounded" />
                                <div className="h-16 bg-gray-200 rounded" />
                            </div>
                            <div className="h-10 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default function HomePage() {
    const jsonLd = organizationSchema();

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Sections */}
            <HeroSection />
            <Suspense fallback={<UniversityGridFallback />}>
                <UniversityGrid />
            </Suspense>
            <AboutKyrgyzstan />
            
            <Suspense fallback={<div className="py-16 bg-gray-50" />}>
                <CompareUniversities />
            </Suspense>
            <Suspense fallback={<div className="py-16 bg-white" />}>
                <ScholarshipsSection />
            </Suspense>
            <Suspense fallback={<div className="py-16 bg-white" />}>
                <FmgeSection />
            </Suspense>
            <EducationSystem />
            <MinistryLinks />
        </>
    );
}
