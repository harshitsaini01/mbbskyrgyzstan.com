import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/upload";

export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdmin();
    if (authError) {
        console.error("[upload] Unauthorized — no admin session");
        return authError;
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) || "general";

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

        const result = await uploadFile(file, folder, { maxSize: 20 * 1024 * 1024 });

        console.log(`[upload] Success: ${result.publicUrl} (${file.size} bytes, user: ${session.user?.email})`);
        return NextResponse.json({ url: `/${result.filePath}`, filename: result.fileName }, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[upload] Error:", message);

        // Return proper status for validation errors
        if (message.includes("not allowed")) return NextResponse.json({ error: message }, { status: 415 });
        if (message.includes("exceeds")) return NextResponse.json({ error: message }, { status: 413 });

        return NextResponse.json({ error: "Upload failed", detail: message }, { status: 500 });
    }
}
