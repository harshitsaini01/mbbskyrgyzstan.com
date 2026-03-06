import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const leadSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    nationality: z.string().optional(),
    message: z.string().optional(),
    universityId: z.number().optional(),
    universityName: z.string().optional(),
    scholarshipId: z.number().optional(),
    leadSource: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = leadSchema.parse(body);

        // Try to find existing lead by email first
        let lead = await prisma.lead.findFirst({ where: { email: data.email } });

        if (lead) {
            // Update existing lead — skip phone update if it would violate unique constraint
            try {
                lead = await prisma.lead.update({
                    where: { id: lead.id },
                    data: {
                        name: data.name,
                        phone: data.phone,
                        ...(data.nationality ? { country: data.nationality } : {}),
                    },
                });
            } catch {
                // Phone may already belong to another lead — update without phone
                lead = await prisma.lead.update({
                    where: { id: lead.id },
                    data: {
                        name: data.name,
                        ...(data.nationality ? { country: data.nationality } : {}),
                    },
                });
            }
        } else {
            // Create new lead — if phone unique constraint fires, create without phone
            try {
                lead = await prisma.lead.create({
                    data: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        ...(data.nationality ? { country: data.nationality } : {}),
                    },
                });
            } catch {
                lead = await prisma.lead.create({
                    data: {
                        name: data.name,
                        email: data.email,
                        ...(data.nationality ? { country: data.nationality } : {}),
                    },
                });
            }
        }

        const messageText = [
            data.message,
            data.nationality ? `Nationality: ${data.nationality}` : null,
        ].filter(Boolean).join(" | ");

        await prisma.leadInquiry.create({
            data: {
                leadId: lead.id,
                universityId: data.universityId,
                universityName: data.universityName,
                scholarshipId: data.scholarshipId,
                message: messageText || null,
                source: data.leadSource || "website",
                status: "pending",
            },
        });

        return NextResponse.json({ message: "Inquiry submitted successfully." }, { status: 201 });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.issues[0].message }, { status: 422 });
        }
        console.error("Lead API error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
