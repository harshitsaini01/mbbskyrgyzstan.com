import Image from "next/image";
import { cdn } from "@/lib/cdn";

interface Photo {
    id: number; imagePath: string | null; title: string | null;
}

interface Props { universityName: string; photos: Photo[]; }

export default function UniversityGallery({ universityName, photos }: Props) {
    if (photos.length === 0) return null;

    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Campus Gallery</h2>
                    <p className="text-base text-gray-500">A glimpse into life at {universityName}</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                    {photos.map((photo) => (
                        <div key={photo.id} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 group">
                            {photo.imagePath ? (
                                <Image src={cdn(photo.imagePath) || ""} alt={photo.title || "Campus"} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300 text-xs">No image</div>
                            )}
                            {photo.title && (
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                                    <p className="text-white text-xs p-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">{photo.title}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
