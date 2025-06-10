import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request,context) {
    const { id } = context.params;
    try {
        const { status } = await request.json();
        const updated = await prisma.adoptionRequest.update({
            where: { id },
            data: { status }
        });
        return new Response(JSON.stringify(updated), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating adoption request status:", error);
        return new Response(JSON.stringify({ message: "Failed to update status" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}