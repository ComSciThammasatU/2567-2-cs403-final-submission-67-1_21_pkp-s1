import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, context) {
    const { id } = context.params;
    
    if(!id ) {
        return new Response(JSON.stringify({ message: 'Invalid ID' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try {
        const shelter = await prisma.Shelter.findUnique({
            where: { id },
            include: {
                dogs: {
                    include: {
                        breed: true,
                    },
                },
            },
        });
        console.log('Current ID:', id);
        if (!shelter || typeof shelter !== 'object') {
            return new Response(JSON.stringify({ message: 'shelter not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify(shelter), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching shelter:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch shelter' }), { status: 500 });
    }
}