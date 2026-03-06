/**
 * File Upload Handler
 * Handles file uploads to CDN-ready storage.
 * Matches Laravel's FileStorageHelper pattern:
 * Path: uploads/{entity}/{YYYY}/{MM}/{DD}/{uuid}.{ext}
 */

import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "public/uploads";
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/avif"];
const ALLOWED_DOC_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
    fileName: string;
    filePath: string;  // relative: "uploads/universities/2025/01/15/uuid.jpg"
    publicUrl: string; // full CDN URL
}

/**
 * Upload a file from a FormData File object.
 * Returns the relative path and public URL.
 */
export async function uploadFile(
    file: File,
    folder: string,
    options: {
        allowedTypes?: string[];
        maxSize?: number;
        oldFilePath?: string;
    } = {}
): Promise<UploadResult> {
    const allowedTypes = options.allowedTypes || [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOC_TYPES];
    const maxSize = options.maxSize || MAX_FILE_SIZE;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type "${file.type}" is not allowed.`);
    }

    // Validate file size
    if (file.size > maxSize) {
        throw new Error(`File size exceeds the ${maxSize / 1024 / 1024}MB limit.`);
    }

    // Build date-based folder path
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // Generate UUID filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const uuid = crypto.randomUUID();
    const fileName = `${uuid}.${ext}`;

    const relativeFolderPath = `uploads/${folder.replace(/^\//, "")}/${year}/${month}/${day}`;
    const absoluteFolderPath = path.join(process.cwd(), UPLOAD_DIR.replace("public/", "public/"), `../${relativeFolderPath}`);
    const cleanAbsPath = path.join(process.cwd(), "public", relativeFolderPath);

    // Create directory if needed
    if (!existsSync(cleanAbsPath)) {
        await mkdir(cleanAbsPath, { recursive: true });
    }

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(cleanAbsPath, fileName), buffer);

    // Delete old file if provided
    if (options.oldFilePath) {
        try {
            const oldAbsPath = path.join(process.cwd(), "public", options.oldFilePath);
            if (existsSync(oldAbsPath)) {
                await unlink(oldAbsPath);
            }
        } catch {
            // Silently ignore old file deletion errors
        }
    }

    const filePath = `${relativeFolderPath}/${fileName}`;

    return {
        fileName,
        filePath,
        publicUrl: `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${filePath}`,
    };
}

/**
 * Delete a stored file by its relative path.
 */
export async function deleteFile(filePath: string): Promise<void> {
    if (!filePath) return;

    try {
        const absPath = path.join(process.cwd(), "public", filePath);
        if (existsSync(absPath)) {
            await unlink(absPath);
        }
    } catch {
        // Silently ignore deletion errors
    }
}
