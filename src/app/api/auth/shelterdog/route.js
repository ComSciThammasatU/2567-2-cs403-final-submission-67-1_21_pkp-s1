import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const shelterId = searchParams.get('shelterId');
        if (!shelterId) {
            return new Response(JSON.stringify([]), { status: 200 });
        }
        const dogs = await prisma.Dog.findMany({
            where: { shelterId: shelterId },
            include: { breed: true }
        });
        return new Response(JSON.stringify(dogs), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error(error);
        return new Response('Fetch error', { status: 500 });
    }
}