import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, GraduationCap, FlaskConical, Stethoscope, Award, Clock, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Promise<Metadata> = buildMetadata({
    title: "Education System in Kyrgyzstan — MBBS Degree Structure | mbbskyrgyzstan.com",
    description: "Learn about Kyrgyzstan's medical education system, MBBS degree structure, NMC recognition, FMGE requirements, and how it compares to India's medical curriculum.",
    entitySeo: { metaKeyword: "Kyrgyzstan education system, mbbs Kyrgyzstan curriculum, Kyrgyzstan medical degree, NMC approved Kyrgyzstan, FMGE Kyrgyzstan" },
    pageKey: "education-system",
});

const phases = [
    { year: "Year 1–2", phase: "Pre-Clinical", icon: BookOpen, color: "blue", desc: "Basic sciences — Anatomy, Physiology, Biochemistry, Community Medicine. Strong foundation in human body structure and function.", subjects: ["Anatomy", "Physiology", "Biochemistry", "Biophysics", "Kyrgyz Language"] },
    { year: "Year 3–4", phase: "Para-Clinical", icon: FlaskConical, color: "purple", desc: "Transition from theory to practice — Pathology, Pharmacology, Microbiology, Forensic Medicine.", subjects: ["Pathology", "Pharmacology", "Microbiology", "Forensic Medicine", "Community Medicine"] },
    { year: "Year 5–6", phase: "Clinical", icon: Stethoscope, color: "red", desc: "Hospital rotations — internal medicine, surgery, pediatrics, OBG. Real patient interaction under senior faculty supervision.", subjects: ["Medicine & Allied", "Surgery & Allied", "Pediatrics", "OBG", "Psychiatry"] },
];

const faqs = [
    { q: "Is the Kyrgyzstan MBBS degree recognized in India?", a: "Yes. The Medical Council of India (NMC) recognizes Kyrgyzstan MBBS degrees from approved universities. Graduates must clear FMGE/NExT to practice in India." },
    { q: "What is the medium of instruction?", a: "Most Kyrgyz medical universities teach in English for the first 2–3 years, transitioning partly to Kyrgyz for clinical rotations. All exams are conducted in English." },
    { q: "How does the curriculum compare to India's?", a: "Kyrgyzstan follows a WHO-recommended curriculum similar to India's MBBS. The 6-year structure (including internship) maps directly to the NMC syllabus, making FMGE preparation straightforward." },
    { q: "What is the FMGE pass rate for Kyrgyzstan graduates?", a: "Kyrgyzstan MBBS graduates have one of the higher FMGE pass rates among foreign MBBS countries — averaging 35–45% in recent years, compared to 20–25% for some other countries." },
    { q: "Is there a NEET requirement?", a: "Yes. You must qualify NEET with at least 50th percentile to be eligible for MBBS admission in Kyrgyzstan (as per NMC regulations for foreign medical education)." },
];

export default function EducationSystemPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">📚 Academic Excellence</span>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        Kyrgyzstan Medical <br />
                        <span className="text-blue-300">Education System</span>
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                        A rigorous, internationally recognized 6-year MBBS program with strong clinical training and NMC-approved degrees — built for global medical careers.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {[
                            { val: "6 years", label: "Duration" },
                            { val: "NMC", label: "Recognized" },
                            { val: "English", label: "Medium" },
                            { val: "WHO", label: "Listed" },
                        ].map((s) => (
                            <div key={s.label} className="bg-white/10 rounded-2xl py-4 px-3">
                                <div className="text-2xl font-bold">{s.val}</div>
                                <div className="text-blue-200 text-sm mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Degree Structure */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Curriculum</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">6-Year MBBS Structure</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">The Kyrgyz MBBS follows a structured 6-year program (5 years academic + 1 year mandatory internship) aligned with NMC guidelines.</p>
                </div>

                <div className="space-y-6">
                    {phases.map((phase, i) => (
                        <div key={phase.phase} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <div className={`w-16 h-16 bg-${phase.color}-50 rounded-2xl flex items-center justify-center shrink-0`}>
                                    <phase.icon className={`w-8 h-8 text-${phase.color}-600`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-xs font-bold bg-${phase.color}-100 text-${phase.color}-700 px-3 py-1 rounded-full`}>{phase.year}</span>
                                        <h3 className="text-xl font-bold text-gray-900">{phase.phase} Phase</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{phase.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {phase.subjects.map((s) => (
                                            <span key={s} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl px-4 py-2 text-center shrink-0">
                                    <div className="text-2xl font-bold text-gray-900">0{i + 1}</div>
                                    <div className="text-xs text-gray-500">Phase</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Internship */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
                                <Award className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xs font-bold bg-green-200 text-green-700 px-3 py-1 rounded-full">Year 6 / Post-5th Year</span>
                                    <h3 className="text-xl font-bold text-gray-900">Compulsory Rotating Internship</h3>
                                </div>
                                <p className="text-gray-700">12-month supervised internship at affiliated university hospitals. Rotations cover Medicine, Surgery, Pediatrics, OBG, and Emergency. Required for degree conferment and NMC eligibility.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NMC & FMGE */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-green-500" /> NMC Recognition
                            </h2>
                            <p className="text-gray-600 mb-5">The National Medical Commission (India) recognizes MBBS from approved Kyrgyz medical universities. NMC conducts periodic verifications of foreign medical institutions.</p>
                            <div className="space-y-3">
                                {["University must be in NMC's approved foreign medical institutions list", "Student must have NEET qualifying score", "University must have required faculty-to-student ratio", "Annual inspections by NMC-appointed teams"].map((p) => (
                                    <div key={p} className="flex items-start gap-3 text-sm text-gray-700">
                                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <GraduationCap className="w-6 h-6 text-blue-500" /> FMGE / NExT Exam
                            </h2>
                            <p className="text-gray-600 mb-5">Foreign Medical Graduates must clear FMGE (or NExT from 2025) to obtain an Indian medical license. Kyrgyzstan graduates are well-prepared due to curriculum alignment.</p>
                            <div className="space-y-3">
                                {["200 MCQ exam covering all MBBS subjects", "Minimum 50% marks required to pass", "Unlimited attempts (exam twice yearly)", "NExT will replace FMGE from 2025 onwards", "Kyrgyzstan avg pass rate: 35–45%"].map((p) => (
                                    <div key={p} className="flex items-start gap-3 text-sm text-gray-700">
                                        <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Common Questions</h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <details key={faq.q} className="group bg-white border border-gray-200 rounded-2xl">
                            <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-gray-800 hover:bg-gray-50 rounded-2xl">
                                {faq.q}
                                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                            </summary>
                            <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-14">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Apply for MBBS in Kyrgyzstan?</h2>
                    <p className="text-blue-100 mb-8 text-lg">Get personalized guidance from our expert team — completely free.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/universities" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-full transition-colors">
                            <BookOpen className="w-5 h-5" />Browse Universities
                        </Link>
                        <Link href="/contact-us" className="inline-flex items-center gap-2 border-2 border-white/50 hover:border-white text-white font-bold px-8 py-4 rounded-full transition-colors">
                            Talk to Counsellor <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
