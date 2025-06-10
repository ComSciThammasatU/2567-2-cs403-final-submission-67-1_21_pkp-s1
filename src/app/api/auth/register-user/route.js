import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

const prisma = new PrismaClient()

export async function POST(request){
    try{
        const formData = await request.formData();
        const fullname = formData.get('fullname');
        const lastname = formData.get('lastname');
        const phone = formData.get('phone');
        const address = formData.get('address');
        const gender = formData.get('gender');
        const birth_date = formData.get('birth_date');
        const email = formData.get('email');
        const password = formData.get('password');
        const user_picture = formData.get('user_picture');  
        const role = formData.get('role') || 'user';

        const validGenders = ['MALE', 'FEMALE', 'OTHER'];
        if (!validGenders.includes(gender)) {
            return new Response(
                JSON.stringify({ message: 'Invalid gender value' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        // Convert birth_date to Date object
        const birthDateObject = birth_date ? new Date(birth_date) : null;

        // Log formData values for debugging
        console.log('fullname:', fullname);
        console.log('lastname:', lastname);
        console.log('phone:', phone);
        console.log('address:', address);
        console.log('gender:', gender);
        console.log('birth_date:', birthDateObject);
        console.log('email:', email);
        console.log('password:', password);
        console.log('user_picture:', user_picture);
        console.log('role:', role);

        
        // Check if all required fields are present
        const requiredFields = { fullname, lastname, phone, address, gender, birth_date, email, password };
        for (const [key, value] of Object.entries(requiredFields)) {
          if (!value) {
            return new Response(
              JSON.stringify({ message: `กรุณากรอกข้อมูล ${key} ให้ครบถ้วน` }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
          }
        }    
    //check email in database
    const existingUser = await prisma.User.findUnique({ where: { email } });
        if (existingUser) {
            return new Response(
                JSON.stringify({ message: 'มีบัญชีนี้แล้วในระบบ' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
    //upload 
    let imagePath = null;
    if (user_picture) {
        const buffer = Buffer.from(await user_picture.arrayBuffer());
        const fileName = `${Date.now()}-${user_picture.name}`;
        imagePath = `images/${fileName}`;
        const filePath = path.join(process.cwd(), 'public/uploads/images', fileName);

        // Check if the directory exists, if not, create it
        const dir = path.dirname(filePath);
        if (!existsSync(dir)) {
            await mkdir(dir, { recursive: true });
        }

        await writeFile(filePath, buffer);
    }
    //hash password
    const hashrdPassword = bcrypt.hashSync(password,10) 

    // Log data being sent to Prisma
    console.log('Data being sent to Prisma:', {
        fullname,
        lastname,
        phone,
        address,
        gender,
        birth_date: birthDateObject,
        email,
        password: hashrdPassword,
        user_picture: imagePath,
        role,
    });
    //Creat new user
    const newUser = await prisma.User.create({ 
        data :{
            fullname,
            lastname,
            phone,
            address,
            gender,
            birth_date: new Date(birth_date),
            email,
            password: hashrdPassword,
            user_picture : imagePath,
            role,
        },
        
    })
    return new Response(
        JSON.stringify({
            message: 'ลงทะเบียนสำเร็จ',
            data: { newUser },
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
    } catch (error) {
        console.error('Error during registration:', error.stack || error);
        return new Response(
            JSON.stringify({
                message: 'ลงทะเบียนไม่สำเร็จ ลองใหม่อีกครั้ง',
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
}

