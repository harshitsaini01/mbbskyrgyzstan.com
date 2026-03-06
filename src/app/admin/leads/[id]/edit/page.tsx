"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react";

const LEAD_STATUSES = ["active", "inactive", "blocked"] as const;
const LEAD_TYPES = ["general", "university", "scholarship", "hot", "follow-up", "converted"] as const;

export default function LeadEditPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lead, setLead] = useState<any>(null);
    const [form, setForm] = useState({
        status: "active" as "active" | "inactive" | "blocked",
        leadStatus: "", leadType: "", subStatus: "", note: "",
        interestedUniversity: "", interestedProgram: "", assignedTo: "",
    });

    useEffect(() => {
        fetch(`/api/admin/leads/${id}`)
            .then((r) => r.json())
            .then((d) => {
                setLead(d);
                setForm({
                    status: d.status ?? "active",
                    leadStatus: d.leadStatus ?? "",
                    leadType: d.leadType ?? "",
                    subStatus: d.subStatus ?? "",
                    note: d.note ?? "",
                    interestedUniversity: d.interestedUniversity ?? "",
                    interestedProgram: d.interestedProgram ?? "",
                    assignedTo: d.assignedTo ? String(d.assignedTo) : "",
                });
            })
            .catch(() => toast.error("Failed to load lead"))
            .finally(() => setFetching(false));
    }, [id]);

    const set = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/leads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: form.status,
                    leadStatus: form.leadStatus || undefined,
                    leadType: form.leadType || undefined,
                    subStatus: form.subStatus || undefined,
                    note: form.note || undefined,
                    interestedUniversity: form.interestedUniversity || undefined,
                    interestedProgram: form.interestedProgram || undefined,
                    assignedTo: form.assignedTo ? parseInt(form.assignedTo) : undefined,
                }),
            });
            if (!res.ok) throw new Error((await res.json()).error ?? "Failed");
            toast.success("Lead updated");
            router.push("/admin/leads");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Error");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) return <div className="p-6 space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-80 w-full" /></div>;
    if (!lead) return <div className="p-6 text-red-600">Lead not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lead Details — {lead.name}</h1>
                <Badge variant={lead.status === "active" ? "default" : "secondary"} className="capitalize">{lead.status}</Badge>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Profile Info (read-only) */}
                <div className="col-span-1 space-y-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <h2 className="font-semibold text-gray-700 mb-4">Contact Info</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-700"><User size={14} className="text-gray-400" /><span>{lead.name}</span></div>
                            {lead.email && <div className="flex items-center gap-2 text-gray-700"><Mail size={14} className="text-gray-400" /><span className="truncate">{lead.email}</span></div>}
                            {lead.phone && <div className="flex items-center gap-2 text-gray-700"><Phone size={14} className="text-gray-400" /><span>{lead.phoneCode} {lead.phone}</span></div>}
                            {(lead.city || lead.state) && (
                                <div className="flex items-center gap-2 text-gray-700"><MapPin size={14} className="text-gray-400" /><span>{[lead.city, lead.state].filter(Boolean).join(", ")}</span></div>
                            )}
                            <div className="flex items-center gap-2 text-gray-500"><Calendar size={14} className="text-gray-400" /><span>{new Date(lead.createdAt).toLocaleDateString()}</span></div>
                        </div>
                    </div>

                    {/* Academics */}
                    {(lead.neetScore || lead.neetQualificationStatus) && (
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h2 className="font-semibold text-gray-700 mb-3">Academic</h2>
                            <div className="space-y-2 text-sm text-gray-700">
                                {lead.neetScore && <div><span className="text-gray-500">NEET Score:</span> <strong>{lead.neetScore}</strong></div>}
                                {lead.neetQualificationStatus && <div><span className="text-gray-500">NEET:</span> <Badge className="text-xs capitalize ml-1">{lead.neetQualificationStatus}</Badge></div>}
                                {lead.highestLevelOfEducation && <div><span className="text-gray-500">Education:</span> {lead.highestLevelOfEducation}</div>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Editable CRM Fields */}
                <div className="col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                            <h2 className="font-semibold text-gray-700 border-b pb-2">CRM Management</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label>Account Status</Label>
                                    <Select value={form.status} onValueChange={(v) => set("status", v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {LEAD_STATUSES.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Lead Type</Label>
                                    <Select value={form.leadType} onValueChange={(v) => set("leadType", v)}>
                                        <SelectTrigger><SelectValue placeholder="Select type…" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">— None —</SelectItem>
                                            {LEAD_TYPES.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Lead Status</Label>
                                    <Input value={form.leadStatus} onChange={(e) => set("leadStatus", e.target.value)} placeholder="e.g. Documents Pending" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Sub Status</Label>
                                    <Input value={form.subStatus} onChange={(e) => set("subStatus", e.target.value)} placeholder="e.g. Follow Up" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Interested University</Label>
                                    <Input value={form.interestedUniversity} onChange={(e) => set("interestedUniversity", e.target.value)} placeholder="University slug or name" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Interested Program</Label>
                                    <Input value={form.interestedProgram} onChange={(e) => set("interestedProgram", e.target.value)} placeholder="e.g. MBBS" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label>Internal Note</Label>
                                <Textarea value={form.note} onChange={(e) => set("note", e.target.value)} rows={4} placeholder="Add notes about this lead (visible to admins only)…" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
                                {loading ? "Saving…" : "Update Lead"}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
