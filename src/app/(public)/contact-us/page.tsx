"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";

const contactInfo = [
    { icon: <Phone className="w-6 h-6 text-red-600" />, label: "Phone", value: "+91 89xxxxxx", href: "tel:+9189xxxxxxxx" },
    { icon: <Mail className="w-6 h-6 text-red-600" />, label: "Email", value: "info@mbbskyrgyzstan.com", href: "mailto:info@mbbskyrgyzstan.com" },
    { icon: <MapPin className="w-6 h-6 text-red-600" />, label: "Office", value: "New Delhi, India (Head Office)", href: "#" },
    { icon: <Clock className="w-6 h-6 text-red-600" />, label: "Hours", value: "Mon–Sat: 9 AM – 7 PM IST", href: "#" },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, leadSource: "contact-us" }),
            });
            if (!res.ok) throw new Error("Failed to submit");
            setSuccess(true);
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch {
            setError("Failed to send your message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-red-100 max-w-2xl mx-auto">
                        Have questions about MBBS in Kyrgyzstan? Our counsellors are ready to help you every step of the way.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left — contact info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                            <p className="text-gray-600">
                                Our expert counsellors have helped thousands of students secure MBBS admissions in Kyrgyzstan.
                                Reach out to us for personalized guidance.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {contactInfo.map((info) => (
                                <a
                                    key={info.label}
                                    href={info.href}
                                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-sm transition-all group"
                                >
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-red-100">
                                        {info.icon}
                                    </div>
                                    <div className="text-sm text-gray-500">{info.label}</div>
                                    <div className="font-semibold text-gray-800 mt-0.5">{info.value}</div>
                                </a>
                            ))}
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Why Talk to Us?</h3>
                            <ul className="space-y-3">
                                {[
                                    "Free counselling with no obligations",
                                    "15+ years of experience in overseas MBBS",
                                    "End-to-end admission support",
                                    "Visa, accommodation, and travel assistance",
                                    "Post-arrival support in Kyrgyzstan",
                                ].map((point) => (
                                    <li key={point} className="flex items-start space-x-2 text-gray-600 text-sm">
                                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1.5" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right — form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

                        {success ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                                <p className="text-gray-600 mb-6">Our counsellor will contact you within 24 hours.</p>
                                <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                    Back to Home
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                                    <input
                                        required
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Your Name"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                                        <input
                                            required
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            placeholder="+91 XXXXXXXXXX"
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                                    <textarea
                                        rows={4}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-red-600 text-white py-3.5 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-60 transition-colors flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
