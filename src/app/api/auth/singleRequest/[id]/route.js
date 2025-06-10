import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request, context){
    const { id } = context.params;
    try{
        const singleRequest = await prisma.adoptionRequest.findUnique({
            where: {id},
            include : {
                dog: true,
                user: true,
                answers: {include:{question : true}}
            }
        });
        if(!singleRequest){
            return new Response(JSON.stringify({message: "not found"}))
        }

        return new Response(JSON.stringify(singleRequest),{
            status : 200,
            headers: { "Content-Type": "application/json" },

        });
    }catch(error){
        console.error("Error fetching adoption request:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch adoption request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}