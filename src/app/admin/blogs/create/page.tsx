"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SeoFields } from "@/components/admin/SeoFields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

function slugify(str: string) {
    return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function CreateBlogPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "", slug: "", excerpt: "", content: "", thumbnail: null as string | null,
        isFeatured: false, status: true,
        metaTitle: "", metaKeyword: "", metaDescription: "", schema: "",
        readingTime: 5, author: "Admin",
    });
    const [loading, setLoading] = useState(false);

    const set = (field: string, value: unknown) => setForm((p) => ({ ...p, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.slug) { toast.error("Title and slug are required."); return; }
        setLoading(true);
        try {
            const res = await fetch("/api/admin/blogs", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success("Blog post created!");
            router.push("/admin/blogs");
        } catch { toast.error("Failed to create post."); } finally { setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild><Link href="/admin/blogs"><ArrowLeft size={18} /></Link></Button>
                <div><h1 className="text-2xl font-bold text-gray-900">New Blog Post</h1></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                    <h2 className="font-semibold text-gray-900 border-b pb-3">Post Details</h2>
                    <div className="space-y-1.5">
                        <Label>Title <span className="text-red-500">*</span></Label>
                        <Input value={form.title} onChange={(e) => { set("title", e.target.value); set("slug", slugify(e.target.value)); }} placeholder="e.g. MBBS in Kyrgyzstan — Complete Guide 2025" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label>Slug <span className="text-red-500">*</span></Label>
                            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Author</Label>
                            <Input value={form.author} onChange={(e) => set("author", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Reading Time (min)</Label>
                            <Input type="number" value={form.readingTime} onChange={(e) => set("readingTime", parseInt(e.target.value))} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label>Excerpt</Label>
                        <Textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} placeholder="Short summary shown in listings" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>Content (HTML)</Label>
                        <Textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={12} placeholder="<p>Write your blog post content here...</p>" className="font-mono text-sm" />
                    </div>
                    <div className="flex gap-6">
                        {[{ key: "status", label: "Published" }, { key: "isFeatured", label: "Featured" }].map(({ key, label }) => (
                            <div key={key} className="flex items-center gap-2">
                                <Switch id={key} checked={form[key as keyof typeof form] as boolean} onCheckedChange={(v) => set(key, v)} />
                                <Label htmlFor={key} className="cursor-pointer">{label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 border-b pb-3 mb-4">Thumbnail</h2>
                    <ImageUpload label="Blog Thumbnail" value={form.thumbnail} onChange={(v) => set("thumbnail", v)} folder="blogs" />
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 border-b pb-3 mb-4">SEO</h2>
                    <SeoFields values={{ metaTitle: form.metaTitle, metaKeyword: form.metaKeyword, metaDescription: form.metaDescription, schema: form.schema }} onChange={(f, v) => set(f, v)} />
                </div>
                <div className="flex justify-end gap-3 pb-8">
                    <Button variant="outline" asChild><Link href="/admin/blogs">Cancel</Link></Button>
                    <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
                        {loading ? <><Loader2 size={14} className="mr-2 animate-spin" />Saving...</> : <><Save size={14} className="mr-2" />Publish Post</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}
