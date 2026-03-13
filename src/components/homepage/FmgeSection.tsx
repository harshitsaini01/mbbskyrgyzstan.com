import { prisma } from "@/lib/prisma";
import FmgeRatesTable from "./FmgeRatesTable";
import Link from "next/link";

export default async function FmgeSection() {
    const rows = await prisma.universityFmgeRate.findMany({
        where: { status: true },
        select: {
            year: true, appeared: true, passed: true, passPercentage: true,
            university: { select: { name: true, slug: true } },
        },
        orderBy: { year: "desc" },
    }).catch(() => []);

    const data = rows.map((r) => ({
        universityName: r.university.name,
        slug: r.university.slug,
        year: r.year,
        appeared: r.appeared,
        passed: r.passed,
        passPercentage: r.passPercentage ? Number(r.passPercentage) : null,
    }));

    // Build year overview cards (like old React Newanup.tsx)
    const yearMap: Record<number, { total: number; accepted: number }> = {};
    for (const r of data) {
        if (!yearMap[r.year]) yearMap[r.year] = { total: 0, accepted: 0 };
        yearMap[r.year].total += r.appeared ?? 0;
        yearMap[r.year].accepted += r.passed ?? 0;
    }
    const yearOverviews = Object.entries(yearMap)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([year, vals]) => ({
            year,
            total: vals.total,
            accepted: vals.accepted,
            rate: vals.total > 0 ? (vals.accepted / vals.total) * 100 : 0,
        }));

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FmgeRatesTable data={data} />

                {/* Year-wise Overview Cards — mirrors old React Newanup.tsx */}
                {yearOverviews.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {yearOverviews.map(({ year, total, accepted, rate }) => (
                            <div key={year} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{year} Overview</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Applications:</span>
                                        <span className="font-medium">{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Accepted:</span>
                                        <span className="font-medium">{accepted.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Rate:</span>
                                        <span className="font-medium text-blue-600">{rate.toFixed(2)}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link href="/fmge-rates" className="inline-block bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors">
                        View Full FMGE Data →
                    </Link>
                </div>
            </div>
        </section>
    );
}
