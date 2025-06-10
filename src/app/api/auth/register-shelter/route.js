import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs'

const prisma = new PrismaClient()

export async function POST(requset){
    try{
        const formData = await requset.formData(); 
        const email = formData.get("email");
        const password = formData.get("password");
        const name = formData.get("name");
        const phone = formData.get("phone");
        const address = formData.get("address");
        const social_media = formData.get("social_media");
        const shelter_picture = formData.get("shelter_picture");
        const role = formData.get("role") || "shelter";
        
        // Log formData values for debugging
        console.log('email:', email);   
        console.log('password:', password );
        console.log('name:', name);
        console.log('phone:', phone);
        console.log('address:', address);
        console.log('social_media:', social_media);
        console.log('shelter_picture:', shelter_picture);
        console.log('role:', role);

        //check email in database
        const existingUser = await prisma.Shelter.findUnique({where :{email}})
        if(existingUser){
            return Response.json({message :"มีบัญชีนี้แล้วในระบบ"}, {status: 400})
        }
        //upload
        let imagePath = null;
            if (shelter_picture) {
                const buffer = Buffer.from(await shelter_picture.arrayBuffer());
                const fileName = `${Date.now()}-${shelter_picture.name}`;
                imagePath = `images/${fileName}`;
                const filePath = path.join(process.cwd(), 'public/uploads/images', fileName);
        
                // Check if the directory exists, if not, create it
                const dir = path.dirname(filePath);
                if (!existsSync(dir)) {
                    await mkdir(dir, { recursive: true });
                }
        
                await writeFile(filePath, buffer);
            }

            const hashrdPassword = bcrypt.hashSync(password,10) 
            const newUser = await prisma.Shelter.create({ //Creat new user
                data :{
                    name,
                    phone,
                    address,
                    social_media,
                    email,
                    password: hashrdPassword,
                    shelter_picture : imagePath,
                    role,
                },
            })
            return Response.json({
                message : 'ลงทะเบียนสำเร็จ',
                data : newUser,
            }, {status: 200})
        
    }catch(error){
        console.error('Error during registration:', error.stack || error);
        return new Response(
            JSON.stringify({
                message: 'ลงทะเบียนไม่สำเร็จ ลองใหม่อีกครั้ง',
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );

    }

}
