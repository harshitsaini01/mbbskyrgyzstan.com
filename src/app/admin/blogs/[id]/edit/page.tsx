"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SeoFields } from "@/components/admin/SeoFields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ContentSectionsTab } from "@/components/admin/ContentSectionsTab";
import { FaqsTab } from "@/components/admin/FaqsTab";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const TABS = ["Details", "Contents", "FAQs"] as const;
type Tab = typeof TABS[number];

export default function BlogEditPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<Tab>("Details");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [form, setForm] = useState({
        title: "", slug: "", excerpt: "", content: "",
        categoryId: "", authorId: "1", status: true, homeView: false, trending: false,
        thumbnailName: "", thumbnailPath: "",
        metaTitle: "", metaKeyword: "", metaDescription: "", schema: "",
    });

    useEffect(() => {
        Promise.all([
            fetch(`/api/admin/blogs/${id}`).then((r) => r.json()),
            fetch("/api/admin/blog-categories?limit=200").then((r) => r.json()),
        ]).then(([blog, catData]) => {
            setCategories(catData.data ?? []);
            setForm({
                title: blog.title ?? "", slug: blog.slug ?? "",
                excerpt: blog.excerpt ?? "", content: blog.description ?? "",
                categoryId: String(blog.categoryId ?? ""), authorId: String(blog.authorId ?? "1"),
                status: blog.status ?? true, homeView: blog.homeView ?? false, trending: blog.trending ?? false,
                thumbnailName: blog.thumbnailName ?? "", thumbnailPath: blog.thumbnailPath ?? "",
                metaTitle: blog.metaTitle ?? "", metaKeyword: blog.metaKeyword ?? "",
                metaDescription: blog.metaDescription ?? "", schema: blog.schema ?? "",
            });
        }).catch(() => toast.error("Failed to load"))
            .finally(() => setFetching(false));
    }, [id]);

    const set = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.title.trim()) return toast.error("Title is required");
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/blogs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: form.title.trim(), slug: form.slug,
                    excerpt: form.excerpt || undefined, description: form.content || undefined,
                    categoryId: form.categoryId ? parseInt(form.categoryId) : undefined,
                    status: form.status, homeView: form.homeView, trending: form.trending,
                    thumbnailName: form.thumbnailName || undefined, thumbnailPath: form.thumbnailPath || undefined,
                    metaTitle: form.metaTitle || undefined, metaKeyword: form.metaKeyword || undefined,
                    metaDescription: form.metaDescription || undefined,
                }),
            });
            if (!res.ok) throw new Error((await res.json()).error ?? "Failed");
            toast.success("Blog updated");
            router.push("/admin/blogs");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Error");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) return <div className="p-6 space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-96 w-full" /></div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Blog Post</h1>
            <p className="text-sm text-gray-500 mb-6">ID: {id}</p>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === tab ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Details" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-3 gap-5">
                        <div className="col-span-2 space-y-5">
                            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <Label>Title *</Label>
                                    <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Slug</Label>
                                    <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Excerpt / Short Note</Label>
                                    <Textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} placeholder="Brief summary…" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Description (intro content)</Label>
                                    <Textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={8} placeholder="Intro content (HTML supported)…" className="font-mono text-sm" />
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <SeoFields
                                    values={{ metaTitle: form.metaTitle, metaKeyword: form.metaKeyword, metaDescription: form.metaDescription, schema: form.schema }}
                                    onChange={(k, v) => set(k, v)}
                                />
                            </div>
                        </div>
                        <div className="col-span-1 space-y-5">
                            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                                <h3 className="font-semibold text-gray-700 text-sm">Publish Settings</h3>
                                <div className="space-y-1.5">
                                    <Label>Category</Label>
                                    <Select value={form.categoryId} onValueChange={(v) => set("categoryId", v)}>
                                        <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between"><Label className="text-sm">Published</Label><Switch checked={form.status} onCheckedChange={(v) => set("status", v)} /></div>
                                <div className="flex items-center justify-between"><Label className="text-sm">Home View</Label><Switch checked={form.homeView} onCheckedChange={(v) => set("homeView", v)} /></div>
                                <div className="flex items-center justify-between"><Label className="text-sm">Trending</Label><Switch checked={form.trending} onCheckedChange={(v) => set("trending", v)} /></div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <Label className="mb-3 block text-sm">Thumbnail</Label>
                                <ImageUpload
                                    value={form.thumbnailPath}
                                    onChange={(path, name) => setForm((p) => ({ ...p, thumbnailPath: path ?? "", thumbnailName: name ?? "" }))}
                                    folder="blogs"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
                            {loading ? "Saving…" : "Save Changes"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    </div>
                </form>
            )}

            {activeTab === "Contents" && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <ContentSectionsTab entityId={id} apiBase={`/api/admin/blogs/${id}/contents`} />
                </div>
            )}

            {activeTab === "FAQs" && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <FaqsTab apiBase={`/api/admin/blogs/${id}/faqs`} />
                </div>
            )}
        </div>
    );
}
