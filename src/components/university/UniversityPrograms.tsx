import Link from "next/link";
import { GraduationCap, DollarSign, Clock, Calendar, Users, BookOpen, CheckCircle, Globe, ExternalLink } from "lucide-react";

interface Program {
    id: number; programName: string; programSlug: string;
    studyMode: string | null; annualTuitionFee: unknown; totalFee: unknown;
    duration: string | null; intake: string | null; applicationDeadline: string | null;
    seats: string | null; eligibility: string | null; overview: string | null;
    accreditation: string | null; medium: string | null;
}

interface Props {
    universitySlug: string;
    programs: Program[];
}

export default function UniversityPrograms({ universitySlug, programs }: Props) {
    if (programs.length === 0) return null;

    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">Admissions Open</span>
                    <h2 className="text-3xl font-bold text-gray-900">Available Courses</h2>
                </div>
                <div className="flex flex-col gap-4">
                    {programs.map((program) => (
                        <div key={program.id} className="bg-white border border-gray-100 border-l-4 border-l-red-500 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="bg-gradient-to-br from-red-600 to-red-800 px-5 py-5 md:w-44 flex flex-col justify-center shrink-0">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <GraduationCap className="w-3.5 h-3.5 text-red-300 shrink-0" />
                                        <span className="text-red-300 text-[10px] font-semibold uppercase tracking-widest">Program</span>
                                    </div>
                                    <h3 className="text-lg font-black text-white leading-tight mb-2">{program.programName}</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {program.studyMode && <span className="bg-white/20 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">{program.studyMode}</span>}
                                        <span className="bg-white/20 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">English</span>
                                    </div>
                                </div>
                                <div className="flex-1 px-6 py-5">
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                                            <DollarSign className="w-4 h-4 text-green-600 shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400 leading-none mb-0.5">Annual Fee</p>
                                                <p className="font-bold text-gray-900 text-sm">{program.annualTuitionFee ? `$${Number(program.annualTuitionFee).toLocaleString()}` : "—"}</p>
                                                {program.totalFee != null && <p className="text-[10px] text-gray-400 leading-none mt-0.5">Total: ${Number(program.totalFee).toLocaleString()}</p>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                                            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400 leading-none mb-0.5">Duration</p>
                                                <p className="font-bold text-gray-900 text-sm">{program.duration || "6 Years"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5">
                                            <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400 leading-none mb-0.5">Intake</p>
                                                <p className="font-bold text-gray-900 text-sm">{program.intake || "Sep"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5">
                                            <Users className="w-4 h-4 text-orange-500 shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-400 leading-none mb-0.5">Deadline</p>
                                                <p className="font-bold text-gray-900 text-sm">{program.applicationDeadline || "Rolling"}</p>
                                            </div>
                                        </div>
                                        {program.seats && (
                                            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                                                <BookOpen className="w-4 h-4 text-red-500 shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400 leading-none mb-0.5">Seats</p>
                                                    <p className="font-bold text-gray-900 text-sm">{program.seats}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                        {program.eligibility && (
                                            <div className="flex-1 min-w-0 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Eligibility</p>
                                                <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{program.eligibility}</p>
                                            </div>
                                        )}
                                        {program.overview && (
                                            <div className="flex-1 min-w-0 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Overview</p>
                                                <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{program.overview}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {program.accreditation && (
                                                <span className="flex items-center gap-1 text-[10px] text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full font-semibold">
                                                    <CheckCircle className="w-3 h-3" />{program.accreditation}
                                                </span>
                                            )}
                                            {program.medium && (
                                                <span className="flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full font-semibold">
                                                    <Globe className="w-3 h-3" />{program.medium}
                                                </span>
                                            )}
                                        </div>
                                        <Link href={`/universities/${universitySlug}/courses/${program.programSlug}`} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-5 rounded-xl font-semibold text-xs hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md group">
                                            View Full Details <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
