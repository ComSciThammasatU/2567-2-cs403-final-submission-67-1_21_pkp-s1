import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const dogs = await prisma.Dog.findMany({
            include: {
                breed: true,
                shelter: true,
            },
        });
        return new Response(JSON.stringify(dogs), { status: 200 });
    } catch (error) {
        console.error('Error fetching dogs:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch dogs' }), { status: 500 });
    }
}