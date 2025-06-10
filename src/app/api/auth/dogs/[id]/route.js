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
        const dog = await prisma.Dog.findUnique({
            where: { id },
            include: {
                breed: true,
                shelter: true,
            },
        });
        if (!dog || typeof dog !== 'object') {
            return new Response(JSON.stringify({ message: 'Dog not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify(dog), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching dog:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch dog' }), { status: 500 });
    }
}

export async function DELETE(req, context) {
    const { id } = context.params;
    try {
        await prisma.Dog.delete({ where: { id } }); 
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to delete dog' }), { status: 500 });
    }
}