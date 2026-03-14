import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cdn } from "@/lib/cdn";
import { buildMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";

interface Props {
    params: Promise<{ categorySlug: string; blogSlug: string }>;
}

export const revalidate = 1800;

export async function generateStaticParams() {
    const blogs = await prisma.blog.findMany({
        where: { status: true },
        select: { slug: true, category: { select: { slug: true } } },
    }).catch(() => []);
    return blogs.map((b) => ({ categorySlug: b.category.slug, blogSlug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { categorySlug, blogSlug } = await params;
    const blog = await prisma.blog.findFirst({
        where: { slug: blogSlug, category: { slug: categorySlug } },
        select: { title: true, shortnote: true, thumbnailPath: true, metaTitle: true, metaDescription: true, metaKeyword: true },
    }).catch(() => null);

    if (!blog) return { title: "Blog Post Not Found" };
    return buildMetadata({
        title: blog.metaTitle || blog.title || undefined,
        description: blog.metaDescription || blog.shortnote || undefined,
        ogImage: blog.thumbnailPath ? cdn(blog.thumbnailPath) ?? undefined : undefined,
        entitySeo: { metaKeyword: blog.metaKeyword },
    });
}

export default async function BlogDetailPage({ params }: Props) {
    const { categorySlug, blogSlug } = await params;

    const blog = await prisma.blog.findFirst({
        where: { slug: blogSlug, status: true, category: { slug: categorySlug } },
        include: {
            category: true,
            author: { select: { name: true } },
            contents: { orderBy: [{ position: "asc" }, { id: "asc" }] },
            faqs: { orderBy: { id: "asc" } },
        },
    }).catch(() => null);

    if (!blog) notFound();

    const relatedBlogs = await prisma.blog.findMany({
        where: { status: true, categoryId: blog.categoryId, NOT: { id: blog.id } },
        select: { title: true, slug: true, thumbnailPath: true, shortnote: true, createdAt: true },
        take: 3,
        orderBy: { createdAt: "desc" },
    }).catch(() => []);

    const jsonLd = [
        articleSchema({
            title: blog.title ?? undefined,
            description: blog.description ?? undefined,
            slug: blog.slug ?? undefined,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            imagePath: blog.imagePath ?? undefined,
            authorName: blog.author?.name ?? undefined,
            path: `/blog/${categorySlug}/${blogSlug}`,
        }),
        breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: blog.category.name, url: `/blog/${categorySlug}` },
            { name: blog.title ?? blogSlug, url: `/blog/${categorySlug}/${blogSlug}` },
        ]),
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Breadcrumb */}
            <nav className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center space-x-2 text-sm text-gray-600 flex-wrap">
                    <Link href="/" className="hover:text-red-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/blog" className="hover:text-red-600">Blog</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/blog/${categorySlug}`} className="hover:text-red-600">{blog.category.name}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-800 font-medium line-clamp-1">{blog.title}</span>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Main content */}
                    <article className="lg:col-span-2">
                        {/* Hero image */}
                        {(blog.thumbnailPath || blog.imagePath) && (
                            <div className="relative h-80 rounded-2xl overflow-hidden mb-8">
                                <Image
                                    src={cdn(blog.thumbnailPath || blog.imagePath)!}
                                    alt={blog.title || "University blog post"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Meta */}
                        <div className="mb-6">
                            <Link href={`/blog/${categorySlug}`} className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                {blog.category.name}
                            </Link>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">{blog.title}</h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                {blog.author && (
                                    <span className="flex items-center space-x-1">
                                        <User className="w-4 h-4" />
                                        <span>{blog.author.name}</span>
                                    </span>
                                )}
                                <span className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                                </span>
                            </div>
                        </div>

                        {/* Short note */}
                        {blog.shortnote && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-xl">
                                <p className="text-gray-700 text-lg leading-relaxed">{blog.shortnote}</p>
                            </div>
                        )}

                        {/* Main description */}
                        {blog.description && (
                            <div
                                className="prose prose-lg max-w-none text-gray-700 mb-8"
                                dangerouslySetInnerHTML={{ __html: blog.description }}
                            />
                        )}

                        {/* Content sections */}
                        {blog.contents.map((content) => (
                            <div key={content.id} className="mb-8">
                                {content.title && (
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{content.title}</h2>
                                )}
                                {content.description && (
                                    <div
                                        className="prose max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: content.description }}
                                    />
                                )}
                                {content.imagePath && (
                                    <div className="relative h-64 rounded-xl overflow-hidden mt-4">
                                        <Image src={cdn(content.imagePath)!} alt={content.title || ""} fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* FAQs */}
                        {blog.faqs.length > 0 && (
                            <div className="bg-gray-50 rounded-2xl p-8 mt-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {blog.faqs.map((faq) => (
                                        <div key={faq.id} className="bg-white border border-gray-200 rounded-xl p-5">
                                            <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                            <p className="text-gray-600 text-sm">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back */}
                        <div className="mt-8">
                            <Link href="/blog" className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Blog</span>
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Related */}
                        {relatedBlogs.length > 0 && (
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Related Articles</h3>
                                <div className="space-y-4">
                                    {relatedBlogs.map((rel) => (
                                        <Link key={rel.slug} href={`/blog/${categorySlug}/${rel.slug}`} className="flex space-x-3 group">
                                            <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                                <Image
                                                    src={cdn(rel.thumbnailPath) || "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=200"}
                                                    alt={rel.title || "Related blog post"}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">{rel.title}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(rel.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link href={`/blog/${categorySlug}`} className="flex items-center space-x-1 text-red-600 text-sm font-medium mt-4 hover:text-red-700">
                                    <span>See all in {blog.category.name}</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl p-6">
                            <h3 className="font-bold text-lg mb-2">Interested in MBBS Kyrgyzstan?</h3>
                            <p className="text-red-100 text-sm mb-4">Get free counselling from our experts.</p>
                            <Link
                                href="/contact-us"
                                className="block bg-white text-red-600 py-2.5 rounded-xl font-semibold text-center text-sm hover:bg-red-50 transition-colors"
                            >
                                Talk to Counsellor
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
