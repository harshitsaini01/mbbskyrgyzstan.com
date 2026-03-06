import { ExternalLink, Building2, Globe, FileText, Phone, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

const embassyInfo = {
    name: "Embassy of Vietnam in India",
    address: "EP-34, Dr. APJ Abdul Kalam Road, New Delhi - 110011",
    phone: "+91-11-2634-2643, +91-11-2634-2644",
    email: "vietnamembassy.india@gov.vn",
    website: "https://www.vietnamembassy-india.org",
    consular: "consular.vietnam@gov.vn",
    hours: "Monday to Friday: 9:00 AM - 6:00 PM",
};

const fallbackMinistries = [
    {
        id: 1, name: "Ministry of Health Vietnam", subtitle: "MOH Vietnam",
        description: "Official ministry overseeing all medical colleges and healthcare standards in Vietnam.",
        website: "https://moh.gov.vn", phone: "+84-24-3846-4051", email: "byt@moh.gov.vn",
        key_services: JSON.stringify(["Medical University Accreditation", "Healthcare Regulation", "MBBS Program Approval", "International Recognition"]),
    },
    {
        id: 2, name: "National Medical Commission India", subtitle: "NMC India",
        description: "Regulatory body recognizing overseas medical qualifications for practice in India.",
        website: "https://www.nmc.org.in", phone: "+91-11-4560-9900", email: "secretary@nmc.org.in",
        key_services: JSON.stringify(["Screening Test (FMGE/NExT)", "Foreign University Recognition", "Indian Practice License", "Medical Council Registration"]),
    },
    {
        id: 3, name: "World Health Organization", subtitle: "WHO",
        description: "Global health authority recognizing Vietnamese medical universities for international mobility.",
        website: "https://www.who.int", phone: "+41-22-791-2111", email: "info@who.int",
        key_services: JSON.stringify(["Global University Recognition", "Health Standards", "International Mobility", "Medical Accreditation"]),
    },
    {
        id: 4, name: "ECFMG (USA)", subtitle: "ECFMG",
        description: "Recognition body for foreign medical graduates to practice in the United States.",
        website: "https://www.ecfmg.org", phone: "+1-215-386-5900", email: "info@ecfmg.org",
        key_services: JSON.stringify(["USMLE Eligibility", "US Practice Certification", "Medical Graduate Screening", "International Recognition"]),
    },
];

function parseKeyServices(keyServices: string): string[] {
    try { return JSON.parse(keyServices); } catch { return []; }
}

export default async function MinistryLinks() {
    let ministries = fallbackMinistries;
    try {
        const dbMinistries = await (prisma as any).ministryLink?.findMany({
            where: { isActive: true },
            orderBy: { id: "asc" },
        });
        if (dbMinistries && dbMinistries.length > 0) ministries = dbMinistries;
    } catch {
        // Use fallback data
    }

    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Official Government Links</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Direct access to official ministries and government agencies responsible
                        for education in Vietnam. Get authentic information and official support.
                    </p>
                </div>

                {/* Embassy Info Panel */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 mb-8 text-white">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Embassy of Vietnam, New Delhi</h3>
                            <p className="text-red-100 mb-6">
                                Your primary point of contact for all education-related queries, visa applications,
                                and official documentation for studying in Vietnam.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Building2 className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span className="text-red-100">{embassyInfo.address}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-red-100">{embassyInfo.phone}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-red-100">{embassyInfo.email}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Globe className="w-5 h-5 flex-shrink-0" />
                                    <a href={embassyInfo.website} target="_blank" rel="noopener noreferrer"
                                        className="text-yellow-300 hover:text-yellow-200 transition-colors">
                                        {embassyInfo.website}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <h4 className="text-xl font-semibold mb-4">Office Hours</h4>
                            <p className="text-red-100 mb-4">{embassyInfo.hours}</p>
                            <h4 className="text-xl font-semibold mb-2">Consular Services</h4>
                            <p className="text-red-100 mb-4">{embassyInfo.consular}</p>
                            <a href={embassyInfo.website} target="_blank" rel="noopener noreferrer"
                                className="block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors text-center">
                                Contact Embassy
                            </a>
                        </div>
                    </div>
                </div>

                {/* Ministry Cards Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {ministries.map((ministry: any) => (
                        <div key={ministry.id} className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 flex-shrink-0">
                                        <Building2 className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{ministry.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{ministry.subtitle}</p>
                                        <p className="text-gray-600">{ministry.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Contact Info */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <Globe className="w-4 h-4 text-red-600 flex-shrink-0" />
                                            <a href={ministry.website} target="_blank" rel="noopener noreferrer"
                                                className="text-red-600 hover:text-red-700 transition-colors text-sm">
                                                {ministry.website}
                                            </a>
                                            <ExternalLink className="w-3 h-3 text-gray-400" />
                                        </div>
                                        {ministry.phone && (
                                            <div className="flex items-center space-x-3">
                                                <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">{ministry.phone}</span>
                                            </div>
                                        )}
                                        {ministry.email && (
                                            <div className="flex items-center space-x-3">
                                                <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">{ministry.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Key Services */}
                                <div className="mb-6 flex-grow">
                                    <h4 className="font-semibold text-gray-800 mb-3">Key Services</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {parseKeyServices(ministry.key_services).map((service: string, i: number) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">{service}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Visit Button */}
                                <div className="mt-auto">
                                    <a href={ministry.website} target="_blank" rel="noopener noreferrer"
                                        className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                                        <span>Visit Official Website</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-yellow-800" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-yellow-800 mb-3">Important Notice</h3>
                            <p className="text-yellow-700 mb-4">
                                Always verify information directly with official government sources. These links connect you
                                to authentic government websites for the most up-to-date and accurate information about
                                education policies, requirements, and procedures.
                            </p>
                            <ul className="space-y-2 text-yellow-700">
                                {[
                                    "All university accreditations should be verified through the Ministry of Education",
                                    "Visa and immigration matters must be handled through official embassy channels",
                                    "Medical education standards are regulated by the Ministry of Health",
                                ].map((item) => (
                                    <li key={item} className="flex items-start space-x-2">
                                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
