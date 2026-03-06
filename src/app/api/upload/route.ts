import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const ALLOWED_TYPES: Record<string, string[]> = {
    "image/jpeg": ["jpg"],
    "image/png": ["png"],
    "image/webp": ["webp"],
    "image/gif": ["gif"],
    "application/pdf": ["pdf"],
};

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) || "general";

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

        const exts = ALLOWED_TYPES[file.type];
        if (!exts) {
            return NextResponse.json({ error: "File type not allowed" }, { status: 415 });
        }

        // Max size: 20MB
        if (file.size > 20 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large (max 20MB)" }, { status: 413 });
        }

        const ext = exts[0];
        const filename = `${randomUUID()}.${ext}`;
        const relativePath = `uploads/${folder}/${filename}`;
        const absolutePath = path.join(process.cwd(), "public", relativePath);

        // Ensure directory exists
        await mkdir(path.dirname(absolutePath), { recursive: true });

        // Write file
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(absolutePath, buffer);

        // Return the public URL path
        const url = `/${relativePath}`;
        return NextResponse.json({ url, filename }, { status: 201 });
    } catch (err) {
        console.error("Upload error:", err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

