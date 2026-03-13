/**
 * Static data for Vietnam Quick Facts page.
 * Moved here from QuickFactsVietnam.tsx to reduce component size
 * and avoid parsing large arrays on every render.
 */
import {
    Building, Users, Languages, DollarSign, MapPin, Clock,
    Flag, Mountain, Stethoscope, Star, Plane, Utensils,
    GraduationCap, Globe, Sun, Snowflake, Calendar,
    Waves, TreePine, Heart, Car, Wifi, Award, Compass
} from "lucide-react";

export const essentialFacts = [
    { icon: Building, color: "blue", label: "Capital", value: "Hanoi" },
    { icon: Users, color: "green", label: "Population", value: "97 Million+" },
    { icon: Languages, color: "purple", label: "Languages", value: "Vietnamese (English widely spoken)" },
    { icon: DollarSign, color: "orange", label: "Currency", value: "Vietnamese Dong (VND)" },
    { icon: MapPin, color: "red", label: "Location", value: "South-East Asia, Indochina Peninsula" },
    { icon: Clock, color: "teal", label: "Timezone", value: "UTC+7 (ICT)" },
    { icon: Flag, color: "yellow", label: "Independence", value: "September 2, 1945" },
    { icon: Mountain, color: "indigo", label: "Highest Peak", value: "Fansipan (3,143 m)" },
];

export const geographyPoints = [
    { icon: Mountain, color: "text-blue-600", text: "Fansipan — highest peak in Indochina" },
    { icon: Waves, color: "text-blue-400", text: "3,200+ km coastline on the South China Sea" },
    { icon: TreePine, color: "text-green-600", text: "Mekong Delta — fertile rice granary of Asia" },
    { icon: Globe, color: "text-purple-600", text: "Borders China, Laos, and Cambodia" },
];

export const climateZones = [
    { icon: Sun, color: "text-yellow-500", text: "North: 4 seasons — cool winters, hot summers" },
    { icon: Snowflake, color: "text-blue-500", text: "Central: Distinct wet & dry seasons" },
    { icon: Sun, color: "text-orange-500", text: "South: Tropical — hot year-round (avg 28°C)" },
    { icon: Calendar, color: "text-green-500", text: "Monsoon season: May–October" },
];

export const attractions = [
    { icon: Waves, color: "text-blue-200", name: "Ha Long Bay", desc: "UNESCO World Heritage — 1,600+ limestone islands" },
    { icon: TreePine, color: "text-green-200", name: "Hoi An Ancient Town", desc: "UNESCO heritage town with lantern festivals" },
    { icon: Mountain, color: "text-purple-200", name: "Sapa Rice Terraces", desc: "Breathtaking terraced fields in the highlands" },
    { icon: Compass, color: "text-yellow-200", name: "Phong Nha Caves", desc: "World's largest cave system" },
];

export const majorCities = [
    { name: "Hanoi", gradient: "from-blue-600 to-purple-700", textMain: "text-blue-100", textSub: "text-blue-200", desc: "Capital city — home to Hanoi Medical University. French colonial architecture, vibrant culture.", pop: "8 Million+", highlight: "Top medical university city" },
    { name: "Ho Chi Minh City", gradient: "from-green-600 to-emerald-700", textMain: "text-green-100", textSub: "text-green-200", desc: "Economic powerhouse. Multiple medical colleges, modern infrastructure and nightlife.", pop: "9 Million+", highlight: "Most modern student city" },
    { name: "Hue", gradient: "from-orange-600 to-red-700", textMain: "text-orange-100", textSub: "text-orange-200", desc: "Serene imperial city. Hue University of Medicine is well-regarded with very low cost of living.", pop: "1.2 Million", highlight: "Most affordable city" },
];

export const defaultCuisines = [
    { id: 0, iconClass: "🍲", dishName: "Pho", dishDescription: "Vietnam's iconic noodle soup — beef or chicken broth, served steaming hot", dishImage: null },
    { id: 1, iconClass: "🥖", dishName: "Banh Mi", dishDescription: "Vietnamese baguette sandwich with fresh herbs — affordable street food", dishImage: null },
    { id: 2, iconClass: "🥗", dishName: "Goi Cuon", dishDescription: "Fresh spring rolls — rice paper, veggies, shrimp. Loved by students", dishImage: null },
    { id: 3, iconClass: "🍚", dishName: "Com Tam", dishDescription: "Broken rice with grilled pork — a staple affordable meal under $1", dishImage: null },
];

export const transportOptions = [
    { icon: Plane, color: "text-blue-600", text: "International airports in Hanoi, HCMC, Da Nang" },
    { icon: Plane, color: "text-green-600", text: "Direct flights from major international hubs worldwide" },
    { icon: Car, color: "text-orange-600", text: "Motorbikes, buses & taxis within cities" },
    { icon: Globe, color: "text-purple-600", text: "Train network connecting all major cities" },
];

export const visaFacts = [
    { icon: Award, color: "text-green-600", text: "E-visa available for nationals of 80+ countries" },
    { icon: Wifi, color: "text-blue-600", text: "Student visa (DN) issued with admission letter" },
    { icon: Calendar, color: "text-orange-600", text: "Processing time: 7–15 working days" },
    { icon: Heart, color: "text-red-600", text: "Foreign embassies in Hanoi & HCMC provide full consular support" },
];

export const mbbsHighlights = [
    { icon: Stethoscope, label: "Internationally Recognized", desc: "All partner universities are WHO listed and recognized by major international medical councils worldwide" },
    { icon: DollarSign, label: "Affordable Fees", desc: "Annual tuition from $3,000–$5,000 — significantly lower than most Western and private medical colleges globally" },
    { icon: Languages, label: "English Medium", desc: "First 2–3 years fully in English; final years with Vietnamese clinical exposure" },
];

export const economyStats = [
    { label: "GDP Growth", value: "6-8% annually" },
    { label: "Main Industries", value: "Electronics, Textiles, Tourism" },
    { label: "Tourism Growth", value: "15M+ visitors/year" },
    { label: "Foreign Investment", value: "Top 5 in ASEAN" },
];

export const quickFacts = [
    { icon: Calendar, label: "Independence Day", value: "September 2, 1945", color: "text-indigo-200" },
    { icon: Users, label: "National Sport", value: "Football (Soccer)", color: "text-purple-200" },
    { icon: Mountain, label: "Highest Peak", value: "Fansipan (3,143m)", color: "text-blue-200" },
    { icon: Award, label: "UNESCO Sites", value: "8 World Heritage Sites", color: "text-green-200" },
];

export const healthcare = [
    { title: "Public Healthcare", desc: "Vietnam has an extensive public hospital network. Major cities have international-standard government hospitals with modern equipment and specialist care.", color: "border-blue-200" },
    { title: "Private Healthcare", desc: "FV Hospital, Vinmec, and CitiClinic offer international-standard private care. Many have English-speaking staff and accept international insurance.", color: "border-green-200" },
    { title: "Student Healthcare", desc: "Medical universities provide on-campus health facilities. Students get access to affiliated teaching hospitals for routine care. Cost is very affordable.", color: "border-purple-200" },
];

export const mbbsWhyStats = [
    { val: "6 Years", label: "Course Duration" },
    { val: "NMC + WHO", label: "Recognition" },
    { val: "35-45%", label: "FMGE Pass Rate" },
    { val: "$3-5K/yr", label: "Annual Tuition" },
];

export const studentLifeCards = [
    { icon: Heart, label: "Safe Environment", desc: "Vietnam is consistently ranked among Asia's safest countries for students." },
    { icon: Building, label: "Modern Hostels", desc: "University hostels equipped with Wi-Fi, common areas, and 24/7 security." },
    { icon: Users, label: "Global Community", desc: "Active international student associations in Hanoi, HCMC, and Hue providing multicultural support." },
];
