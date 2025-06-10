import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
    try{
        const { dogId, userId, answers } = await request.json();

        const adoptionRequest = await prisma.adoptionRequest.create({
            data: {
                dogId,
                userId,
                answers: {
                    create: answers.map((ans) => ({
                        questionId: ans.questionId,
                        answerText: ans.answerText,
                    })),
                },
            },
            include: {
                answers: true,
            },
        });

        return new Response(JSON.stringify(adoptionRequest), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    }catch (error) {
        console.error("Error creating adoption request:", error);
        return new Response(JSON.stringify({ message: "Failed to create adoption request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(req) {
    // ดึง session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "shelter") {
        return new Response(JSON.stringify([]), { status: 200 });
    }
        console.log("session.user.id", session.user.id);
    try {
        const requests = await prisma.AdoptionRequest.findMany({
            where: {
                dog: {
                    shelterId: session.user.id
                }
            },
            include: {
                dog: true,
                user: true,
            },
            orderBy: { createdAt: 'desc' }
        });
        console.log("requests from DB:", requests);
        return new Response(JSON.stringify(requests), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching adoption requests:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch adoption requests" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}