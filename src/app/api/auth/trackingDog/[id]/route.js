import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request, context) {
    const { id } = context.params;
    try {
        const requests = await prisma.adoptionRequest.findMany({
            where: { userId: id },
            include: {
                dog: {
                    include: {
                        breed: true,
                        shelter: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return new Response(JSON.stringify(requests), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch requests" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}