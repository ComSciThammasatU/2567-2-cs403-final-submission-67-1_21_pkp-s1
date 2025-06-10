import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request, context) {
    const { id } = context.params;
    try {
        const user = await prisma.User.findUnique({
            where: { id },
        });
        if (!user) {
            return new Response(JSON.stringify(null), { status: 404 });
        }
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch user" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}