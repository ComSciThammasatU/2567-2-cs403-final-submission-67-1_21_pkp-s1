import { PrismaClient } from '@prisma/client'
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';


const prisma = new PrismaClient()

 export async function POST(req) {
  try{
    
    const formData = await req.formData();
    const name = formData.get('name');
    const breedId = formData.get('breedId');
    const customBreed = formData.get('customBreed');
    const gender = formData.get('gender');
    const estimatedAge = formData.get('estimatedAge');
    const size = formData.get('size');
    const vaccinated = formData.get('vaccinated');
    const neutered = formData.get('neutered') === 'true';
    const otherIllnesses = formData.get('otherIllnesses');
    const description = formData.get('description');
    const shelterId = formData.get('shelterId');
    const dogImage = formData.get('dogImage'); // File 
    
    console.log('Parsed form data:', {
            name,
            breedId,
            customBreed,
            gender,
            estimatedAge,
            size,
            vaccinated,
            neutered,
            otherIllnesses,
            description,
            shelterId,
            dogImage ,
        });
         
    //upload 
            let imagePath = null;
            if (dogImage) {
                const buffer = Buffer.from(await dogImage.arrayBuffer());
                const fileName = `${Date.now()}-${dogImage.name}`;
                imagePath = `dogimages/${fileName}`;
                const filePath = path.join(process.cwd(), 'public/uploads/dogimages', fileName);
        
                // Check if the directory exists, if not, create it
                const dir = path.dirname(filePath);
                if (!existsSync(dir)) {
                    await mkdir(dir, { recursive: true });
                }
        
                await writeFile(filePath, buffer);
            }
            
    console.log('Data being passed to prisma.Dog.create:', {
            name,
            breedId,
            customBreed,
            gender,
            estimatedAge: parseInt(estimatedAge),
            estimatedYear: new Date().getFullYear(),
            size,
            vaccinated,
            neutered,
            otherIllnesses,
            description,
            dogImage: imagePath,
            shelterId,
        });

    const newDog = await prisma.Dog.create({
        data: {
            name,
            breedId,
            customBreed,
            gender,
            estimatedAge: parseInt(estimatedAge),
            estimatedYear: new Date().getFullYear(),
            size,
            vaccinated,
            neutered,
            otherIllnesses,
            description,
            dogImage : imagePath,
            shelterId,
        },
    });
    return new Response(
        JSON.stringify({ message: 'เพิ่มสุนัขสำเร็จ', dog: newDog }),
        { status: 201 }
    );
  }catch (error) {
    console.error('Error adding dog:', error);
    return new Response(JSON.stringify({ message: 'การเพิ่มสุนัขมีข้อผิดพลาด' }), { status: 500 });
  }
 }

 export async function GET() {
    try {
        const breeds = await prisma.Breed.findMany({
              select: {
                id : true,
                name: true,
            },
        });
        console.log('Breeds fetched:', breeds);
        return new Response(JSON.stringify(breeds), { status: 200 });
    } catch (error) {
        console.error('Error fetching dogs:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch breeds' }), { status: 500 });
    }
  }