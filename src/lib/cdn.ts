/**
 * CDN URL Builder
 * Generates public URLs for stored files.
 * Supports: local, S3, Cloudflare R2
 */

const CDN_BASE = process.env.NEXT_PUBLIC_CDN_BASE_URL || "https://admin.mbbsinvietnam.com/storage";
const CDN_PROVIDER = process.env.CDN_PROVIDER || "local";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "";
const AWS_BUCKET = process.env.AWS_BUCKET_NAME || "";
const AWS_REGION = process.env.AWS_REGION || "";

/**
 * Build a public CDN URL from a stored file path.
 * Input:  "uploads/universities/2025/01/15/abc-uuid.jpg"
 * Output: "https://cdn.mbbsinvietnam.com/uploads/universities/2025/01/15/abc-uuid.jpg"
 */
export function cdn(filePath: string | null | undefined): string {
    if (!filePath) return "";

    // Already a full URL
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
        return filePath;
    }

    // Remove leading slash if present
    const cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;

    switch (CDN_PROVIDER) {
        case "r2":
            return `${R2_PUBLIC_URL}/${cleanPath}`;
        case "s3":
            return `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${cleanPath}`;
        case "local":
        default:
            // In local mode, Next.js serves public/uploads at /uploads directly.
            // Do NOT prepend the external CDN_BASE — that only applies to cloud storage.
            return `/${cleanPath}`;
    }
}

/**
 * Get CDN URL for a thumbnail (uses same path logic)
 */
export function cdnThumb(thumbnailPath: string | null | undefined): string {
    return cdn(thumbnailPath);
}

/**
 * Get placeholder image URL
 */
export function placeholder(width = 400, height = 300): string {
    return `https://placehold.co/${width}x${height}/e2e8f0/64748b?text=No+Image`;
}

/**
 * Get university thumbnail URL with fallback
 */
export function universityImage(thumbnailPath: string | null | undefined): string {
    return thumbnailPath ? cdn(thumbnailPath) : placeholder(800, 450);
}

/**
 * Get blog/article image URL with fallback
 */
export function blogImage(imagePath: string | null | undefined): string {
    return imagePath ? cdn(imagePath) : placeholder(800, 450);
}
