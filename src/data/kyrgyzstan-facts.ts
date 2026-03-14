/**
 * Static data for Kyrgyzstan Quick Facts page.
 * Kept in a separate module to keep the page component lean.
 */
import {
    Building,
    Users,
    Languages,
    DollarSign,
    MapPin,
    Clock,
    Flag,
    Mountain,
    Stethoscope,
    Plane,
    Globe,
    Sun,
    Snowflake,
    Calendar,
    TreePine,
    Heart,
    Car,
    Wifi,
    Award,
    Compass,
} from "lucide-react";

export const essentialFacts = [
    { icon: Building, color: "blue", label: "Capital", value: "Bishkek" },
    { icon: Users, color: "green", label: "Population", value: "7.2 Million+" },
    { icon: Languages, color: "purple", label: "Languages", value: "Kyrgyz and Russian" },
    { icon: DollarSign, color: "orange", label: "Currency", value: "Kyrgyzstani Som (KGS)" },
    { icon: MapPin, color: "red", label: "Location", value: "Central Asia" },
    { icon: Clock, color: "teal", label: "Timezone", value: "UTC+6 (KGT)" },
    { icon: Flag, color: "yellow", label: "Independence", value: "August 31, 1991" },
    { icon: Mountain, color: "indigo", label: "Highest Peak", value: "Jengish Chokusu (7,439 m)" },
];

export const geographyPoints = [
    { icon: Mountain, color: "text-blue-600", text: "Over 90% of the country is mountainous" },
    { icon: TreePine, color: "text-green-600", text: "Tien Shan mountain ranges shape the landscape" },
    { icon: Compass, color: "text-purple-600", text: "Landlocked nation bordering Kazakhstan, Uzbekistan, Tajikistan, and China" },
    { icon: Globe, color: "text-cyan-600", text: "Lake Issyk-Kul is one of the largest alpine lakes in the world" },
];

export const climateZones = [
    { icon: Snowflake, color: "text-blue-500", text: "Cold winters with snowfall in many regions" },
    { icon: Sun, color: "text-yellow-500", text: "Warm summers in valleys and cities" },
    { icon: Mountain, color: "text-indigo-500", text: "Cool alpine conditions in high-altitude areas" },
    { icon: Calendar, color: "text-green-500", text: "Four-season continental climate" },
];

export const attractions = [
    { icon: Globe, color: "text-blue-200", name: "Issyk-Kul Lake", desc: "A major alpine lake and year-round tourist destination" },
    { icon: TreePine, color: "text-green-200", name: "Ala Archa National Park", desc: "Popular trekking and nature destination near Bishkek" },
    { icon: Mountain, color: "text-purple-200", name: "Song Kol Lake", desc: "High-altitude lake known for yurt camps and nomadic culture" },
    { icon: Compass, color: "text-yellow-200", name: "Burana Tower", desc: "Historic Silk Road monument and archaeological site" },
];

export const majorCities = [
    {
        name: "Bishkek",
        gradient: "from-blue-600 to-purple-700",
        textMain: "text-blue-100",
        textSub: "text-blue-200",
        desc: "Capital city and main student hub with leading medical universities.",
        pop: "1.1 Million+",
        highlight: "Largest MBBS student ecosystem",
    },
    {
        name: "Osh",
        gradient: "from-green-600 to-emerald-700",
        textMain: "text-green-100",
        textSub: "text-green-200",
        desc: "Major southern city with growing higher-education and medical training centers.",
        pop: "350,000+",
        highlight: "Affordable and student-friendly",
    },
    {
        name: "Jalal-Abad",
        gradient: "from-orange-600 to-red-700",
        textMain: "text-orange-100",
        textSub: "text-orange-200",
        desc: "Developing academic city with easy access to regional clinical training facilities.",
        pop: "130,000+",
        highlight: "Balanced cost and infrastructure",
    },
];

export const defaultCuisines = [
    { id: 0, iconClass: "??", dishName: "Beshbarmak", dishDescription: "Traditional meat and noodle dish popular across Kyrgyzstan", dishImage: null },
    { id: 1, iconClass: "??", dishName: "Plov", dishDescription: "Rice dish with vegetables and meat, common in student meals", dishImage: null },
    { id: 2, iconClass: "??", dishName: "Lagman", dishDescription: "Hand-pulled noodle dish served in soup or stir-fried style", dishImage: null },
    { id: 3, iconClass: "??", dishName: "Samsa", dishDescription: "Baked savory pastry that is affordable and widely available", dishImage: null },
];

export const transportOptions = [
    { icon: Plane, color: "text-blue-600", text: "International gateways: Manas (Bishkek) and Osh airports" },
    { icon: Car, color: "text-orange-600", text: "Shared taxis, buses, and marshrutka routes between cities" },
    { icon: Globe, color: "text-purple-600", text: "Road links to neighboring Central Asian countries" },
    { icon: Wifi, color: "text-green-600", text: "Online ride and ticket options available in major cities" },
];

export const visaFacts = [
    { icon: Award, color: "text-green-600", text: "E-visa facilities available for many nationalities" },
    { icon: Calendar, color: "text-orange-600", text: "Typical processing windows are short for student routes" },
    { icon: Plane, color: "text-blue-600", text: "Admission letter and invitation documents support visa filing" },
    { icon: Heart, color: "text-red-600", text: "Universities provide arrival and registration guidance" },
];

export const mbbsHighlights = [
    { icon: Stethoscope, label: "International Recognition", desc: "Many partner universities are listed with WHO and accepted for NMC pathways." },
    { icon: DollarSign, label: "Affordable Fee Structure", desc: "Annual tuition is generally lower than many private medical colleges." },
    { icon: Languages, label: "English Medium Options", desc: "Core MBBS teaching is available in English for international students." },
];

export const economyStats = [
    { label: "GDP Trend", value: "Steady Growth" },
    { label: "Main Industries", value: "Mining, Agriculture, Services" },
    { label: "Education Demand", value: "Rising Intl Enrolment" },
    { label: "Student Budget", value: "Cost-effective Cities" },
];

export const quickFacts = [
    { icon: Calendar, label: "Independence Day", value: "August 31, 1991", color: "text-indigo-200" },
    { icon: Mountain, label: "Mountain Terrain", value: "90%+", color: "text-blue-200" },
    { icon: Globe, label: "Region", value: "Central Asia", color: "text-green-200" },
    { icon: Award, label: "Academic Growth", value: "Strong Intl Interest", color: "text-yellow-200" },
];

export const healthcare = [
    {
        title: "Public Healthcare",
        desc: "Public hospitals and teaching institutions support foundational clinical exposure for students.",
        color: "border-blue-200",
    },
    {
        title: "Private Healthcare",
        desc: "Private providers in major cities offer additional care pathways and specialist services.",
        color: "border-green-200",
    },
    {
        title: "Student Healthcare",
        desc: "Most universities support basic health services and referral support for international students.",
        color: "border-purple-200",
    },
];

export const mbbsWhyStats = [
    { val: "6 Years", label: "Course Duration" },
    { val: "NMC + WHO", label: "Recognition" },
    { val: "25-35%", label: "FMGE Band" },
    { val: "$3.5K-6.5K", label: "Annual Tuition" },
];

export const studentLifeCards = [
    { icon: Heart, label: "Safe Environment", desc: "Many international students choose Kyrgyzstan for its student-friendly environment." },
    { icon: Building, label: "Hostel Support", desc: "University hostels and private options are available in major student cities." },
    { icon: Users, label: "Global Community", desc: "Large student communities in Bishkek and Osh support new international arrivals." },
];
