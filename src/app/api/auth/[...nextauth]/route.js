import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log("Credentials received:", credentials);

      // Check in the `user` table
      let user = await prisma.Shelter.findUnique({
        where: { 
          email: credentials.email 
        },
        select: {
          id: true,
          email: true,
          role: true,
          name: true, // Shelter name
          phone: true,
          address: true,
          social_media: true,
          shelter_picture: true,
          password: true, 
        },
      })
      // If not found in `user`, check in the `shelter` table
        if (!user) {
          user = await prisma.User.findUnique({
            where: { 
              email: credentials.email 
            },
            select: {
              id: true,
              email: true,
              role: true,
              fullname: true,
              lastname: true,
              gender: true,
              birth_date: true,
              phone: true,
              address: true,
              user_picture: true,
              password: true,
            },
          })
        }
        // If no user found, return null
      if (!user) {
        throw new Error("No user found with this email");
      }

      if (!user.password) {
        throw new Error("Password is missing for this user");
      }
        // ตรวจสอบรหัสผ่าน
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
      }
          if(user.role === 'shelter') {
            return {
              id: user.id,
              role: user.role,
              email: user.email,
              name: user.name,
              phone: user.phone,
              address: user.address,
              social_media: user.social_media,
              shelter_picture: user.shelter_picture,
            };  
        }else{
            return {
              id: user.id,
              role: user.role,
              email: user.email,
              fullname: user.fullname,
              lastname: user.lastname,
              gender: user.gender,
              birth_date: user.birth_date, 
              phone: user.phone,
              address: user.address,
              user_picture: user.user_picture,
            };
          } 
      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email

        if(user.role === 'shelter') {
          token.name = user.name;
          token.phone = user.phone;
          token.address = user.address;
          token.social_media = user.social_media;
          token.shelter_picture = user.shelter_picture;
        }else{
          token.fullname = user.fullname;
          token.lastname = user.lastname;
          token.gender = user.gender;
          token.birth_date = user.birth_date;
          token.phone = user.phone;
          token.address = user.address;
          token.user_picture = user.user_picture;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
        email: token.email,
      };
      if (token.role === 'shelter') {
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.address = token.address;
        session.user.social_media = token.social_media;
        session.user.shelter_picture = token.shelter_picture;
      }else{
        session.user.fullname = token.fullname;
        session.user.lastname = token.lastname;
        session.user.gender = token.gender;
        session.user.birth_date = token.birth_date;
        session.user.phone = token.phone;
        session.user.address = token.address;
        session.user.user_picture = token.user_picture;
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }