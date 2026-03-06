import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cdn } from "@/lib/cdn";
import { buildMetadata } from "@/lib/seo";

export const metadata: Promise<Metadata> = buildMetadata({
    title: "MBBS Vietnam Blog — Medical Education Tips, University Reviews & More",
    description: "Read our expert blog on MBBS in Vietnam. University reviews, student experiences, admission tips, and medical education guides.",
    entitySeo: { metaKeyword: "MBBS Vietnam blog, medical education Vietnam, study abroad blog" },
    pageKey: "blog",
});

export const revalidate = 1800;

export default async function BlogPage() {
    const [categories, recentBlogs] = await Promise.all([
        prisma.blogCategory.findMany({
            where: { status: true },
            include: { _count: { select: { blogs: { where: { status: true } } } } },
            orderBy: { id: "asc" },
        }).catch(() => []),
        prisma.blog.findMany({
            where: { status: true },
            include: { category: { select: { name: true, slug: true } }, author: { select: { name: true } } },
            orderBy: { createdAt: "desc" },
            take: 12,
        }).catch(() => []),
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blog &amp; News</h1>
                    <p className="text-xl text-red-100 max-w-3xl mx-auto">
                        Expert insights on MBBS in Vietnam, admission tips, university reviews, and student success stories.
                    </p>
                </div>
            </div>

            {/* Content Type Tabs */}
            <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex gap-1">
                        {[
                            { label: "✍️ Blog", href: "/blog" },
                            { label: "📰 News", href: "/news" },
                            { label: "📄 Articles", href: "/articles" },
                        ].map((tab) => (
                            <a
                                key={tab.href}
                                href={tab.href}
                                className="px-6 py-4 text-sm font-semibold text-gray-600 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition-colors"
                            >
                                {tab.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Main posts */}
                    <div className="lg:col-span-3">
                        {recentBlogs.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                <p>No blog posts available yet. Check back soon!</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                {recentBlogs.map((blog) => (
                                    <article key={blog.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={cdn(blog.thumbnailPath || blog.imagePath) || "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600"}
                                                alt={blog.title || "Blog post"}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <Link
                                                    href={`/blog/${blog.category.slug}`}
                                                    className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-red-700"
                                                >
                                                    {blog.category.name}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h2 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                                                {blog.title}
                                            </h2>
                                            {blog.shortnote && (
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.shortnote}</p>
                                            )}
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center space-x-3">
                                                    {blog.author && (
                                                        <span className="flex items-center space-x-1">
                                                            <User className="w-3 h-3" />
                                                            <span>{blog.author.name}</span>
                                                        </span>
                                                    )}
                                                    <span className="flex items-center space-x-1">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                                    </span>
                                                </div>
                                                <Link
                                                    href={`/blog/${blog.category.slug}/${blog.slug}`}
                                                    className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
                                                >
                                                    <span>Read</span>
                                                    <ArrowRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar — categories */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
                            <ul className="space-y-2">
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <Link
                                            href={`/blog/${cat.slug}`}
                                            className="flex items-center justify-between text-gray-600 hover:text-red-600 py-2 border-b border-gray-50 last:border-0 transition-colors"
                                        >
                                            <span className="text-sm">{cat.name}</span>
                                            <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                                                {cat._count.blogs}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
