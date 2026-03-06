"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import DownloadFormPopup from "@/components/modals/DownloadFormPopup";

interface Props {
    brochureUrl?: string;
    universityName: string;
}

export default function ProgramPageClient({ brochureUrl, universityName }: Props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsPopupOpen(true)}
                className="border-2 border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2"
            >
                <Download className="w-4 h-4" />
                Download Brochure
            </button>
            <DownloadFormPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                universityName={universityName}
                brochureUrl={brochureUrl}
            />
        </>
    );
}
