'use client'
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSession } from 'next-auth/react';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession()
  
  let homeLink = "/";
    if (session && (session.user?.role === "user" || session.user?.role === "shelter")) {
        homeLink = "/Home";
    }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    console.log("Sign in result:", result); // Log the result of signIn

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/Home"); // Redirect to the home page after successful login
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="font-mitr flex h-screen">
      <div className="w-1/2 bg-customDarkcream flex justify-center items-center relative">
        <div className="absolute bottom-0 w-2/4 h-2/3 bg-customDarkblue rounded-3xl mr-16 z-10"></div>
        <div className="absolute bottom-0  w-2/4 h-2/3 bg-customCream rounded-3xl z-20">
          <img name="Dog" src="/DogLogin.png" alt="Dog " className="z-30 absolute w-full bottom-0 "/>
        </div>
        <Link href={homeLink}>
          <div className="absolute top-10 left-10 text-customDarkblue font-bold text-3xl">
            StayDog
          </div>
        </Link>
      </div>
      
      <div className="flex min-h-screen w-1/2 items-center justify-center ">
        <div className="w-full max-w-lg ">
          <h2 className="text-4xl font-medium mb-10 text-black ">เข้าสู่ระบบ</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-7">
              <label className="block text-gray-700 text-md font-medium">ชื่อผู้ใช้งาน</label>
              <input type="email" name="email" placeholder="Email" className="w-full mt-1 p-2 border rounded-md" onChange={handleChange} required /> 
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 text-md font-medium">รหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full mt-1 p-2 border rounded-md"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 pt-1 flex items-center text-sm leading-5"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="mb-12">
              <button className="w-full bg-customDarkblue text-white font-medium py-3 rounded-full text-lg ">
                Log in
              </button>
            </div>
            {error && <p>{error}</p>}
          </form>
          {/* Divider */}
          <div className="mt-6 border-t border-gray-300 mb-5"></div>
          <div className="text-center mt-4">
          <p className="text-gray-700 font-medium text-xl">ลงทะเบียนเข้าสู่ระบบได้ที่นี่</p>
          <Link href="/RegisterForm">
            <button className="w-full mt-3 border border-gray-700 text-black font-medium py-3 rounded-full text-lg">
              ลงทะเบียน
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
      <div className="relative flex justify-center items-end w-full h-screen">
          <div className="absolute w-72 h-1/2 bg-customDarkblue rounded-3xl bottom-0 left-8 z-0"></div>
          <div className="absolute w-72 h-[60vh] bg-white rounded-3xl bottom-0 left-12 z-10 shadow-lg overflow-hidden flex items-center">
            <img 
              src="/DogLogin.png" 
              alt="Dog" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        const res = await fetch("/api/auth/session")
      const session = await res.json()
      console.log("Session object:", session);
*/

