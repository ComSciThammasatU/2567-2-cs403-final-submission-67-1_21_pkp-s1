import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.QuestionCategory.findMany({
            include: {
                questions: true,
            },
        });
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch questions' }), { status: 500 });
    }
}