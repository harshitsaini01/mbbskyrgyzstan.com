import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mbbskyrgyzstan.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        { url: `${SITE_URL}/universities`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${SITE_URL}/scholarships`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
        { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
        { url: `${SITE_URL}/fmge-rates`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${SITE_URL}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/about-kyrgyzstan`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE_URL}/education-system`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE_URL}/our-partners`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ];

    try {
        // Universities
        const universities = await prisma.university.findMany({
            where: { status: true },
            select: { slug: true, updatedAt: true },
        });
        const universityPages: MetadataRoute.Sitemap = universities.map((u: { slug: string; updatedAt: Date }) => ({
            url: `${SITE_URL}/universities/${u.slug}`,
            lastModified: u.updatedAt,
            changeFrequency: "weekly",
            priority: 0.85,
        }));

        // Scholarships
        const scholarships = await prisma.scholarship.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true },
        });
        const scholarshipPages: MetadataRoute.Sitemap = scholarships.map((s: { slug: string; updatedAt: Date }) => ({
            url: `${SITE_URL}/scholarships/${s.slug}`,
            lastModified: s.updatedAt,
            changeFrequency: "weekly",
            priority: 0.8,
        }));

        // Blog categories
        const blogCats = await prisma.blogCategory.findMany({
            where: { status: true },
            select: { slug: true, updatedAt: true },
        });
        const blogCatPages: MetadataRoute.Sitemap = blogCats.map((c: { slug: string; updatedAt: Date }) => ({
            url: `${SITE_URL}/blog/${c.slug}`,
            lastModified: c.updatedAt,
            changeFrequency: "weekly",
            priority: 0.7,
        }));

        // Blog posts
        const blogs = await prisma.blog.findMany({
            where: { status: true },
            select: { slug: true, category: { select: { slug: true } }, updatedAt: true },
        });
        const blogPages: MetadataRoute.Sitemap = blogs.map((b: { slug: string | null; updatedAt: Date; category: { slug: string } }) => ({
            url: `${SITE_URL}/blog/${b.category.slug}/${b.slug}`,
            lastModified: b.updatedAt,
            changeFrequency: "monthly",
            priority: 0.65,
        }));

        // Programs / Courses
        const programs = await prisma.universityProgram.findMany({
            where: { isActive: true },
            select: { programSlug: true, updatedAt: true, university: { select: { slug: true } } },
        });
        const programPages: MetadataRoute.Sitemap = programs.map((p: { programSlug: string; updatedAt: Date; university: { slug: string } }) => ({
            url: `${SITE_URL}/universities/${p.university.slug}/courses/${p.programSlug}`,
            lastModified: p.updatedAt,
            changeFrequency: "weekly",
            priority: 0.8,
        }));

        return [...staticPages, ...universityPages, ...programPages, ...scholarshipPages, ...blogCatPages, ...blogPages];
    } catch {
        // DB not ready during build — return static pages only
        return staticPages;
    }
}
