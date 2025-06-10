'use client'
import { useSession,signOut } from 'next-auth/react'
import Image from 'next/image'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Profile() {
    const { data: session,status } = useSession()
    const router = useRouter();
    const isLoggedIn = !!session; // Check if the user is logged in
    const profilePicture = session?.user?.role === "shelter"
    ? `/uploads/${session?.user?.shelter_picture || "default-profile.jpg"}`
    : `/uploads/${session?.user?.user_picture || "default-profile.jpg"}`;

    useEffect(() => {
            if (status !== "loading" && !session) {
                router.push('/LoginForm');
            }
        }, [session, status, router]);

    if(status === "loading") {
        return <div>Loading...</div>
    }

    if (!session) {
    return <div>กรุณาเข้าสู่ระบบ</div>;
    }
    const user = session.user

    // Debugging: Log the session object
    console.log("Session object:", session);

    return (
        <div className='min-h-screen font-mitr'>
            < Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
            <div className="flex max-w-6xl mx-auto mt-10 gap-6">
                {/* Sidebar */}
                <aside className="fixed top-0 left-0 h-full w-50 bg-customCream p-6 shadow-md flex flex-col items-center gap-6 mt-20 rounded-xl">
                    <div className="flex flex-col gap-3 w-full mt-10">
                        <button className="w-full text-left bg-while text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                            หน้าโปรไฟล์
                        </button>
                        {session.user.role === 'user' && (
                            <Link href={`/StatusTracking/${session.user.id}`}>
                                <button className="w-full text-left text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                                    ติดตามสถานะ
                                </button>
                            </Link>
                        )}
                        {session.user.role === 'shelter' && (
                        <>
                            <Link href="/DogManagement">
                                <button className="w-full text-left text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                                    จัดการคำขอรับเลี้ยงสุนัข
                                </button>
                            </Link>
                            <Link href="/AllShelterDog">
                                <button className="w-full text-left text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                                    เพิ่มและลบสุนัข
                                </button>
                            </Link>
                         </>    
                        )}
                    </div>
                </aside>
            
            {/* Profile Content */}
            <div className='flex-1 bg-white p-8 rounded-lg shadow-xl '>
                    <Image
                        src={profilePicture}
                        width={80}
                        height={100}
                        alt="Profile"
                        className="rounded-full object-cover"
                    />
                <div className="grid grid-cols-2 gap-10 mt-10 ">
                    {user.role === 'user' ? (
                    <>
                        <Field label="ชื่อจริง" value={user.fullname} />
                        <Field label="นามสกุล" value={user.lastname} />
                        <Field label="เพศ" value={user.gender === "MALE" ? "ชาย" : user.gender === "MALE" ? "หญิง" : "อื่นๆ"} />
                        <Field label="เบอร์โทรศัพท์" value={user.phone} />
                        <Field label="อีเมล" value={user.email} />
                        <Field label="วันเกิด" value={new Date(user.birth_date).toLocaleDateString()} />
                        <Field label="ที่อยู่ปัจจุบัน" value={user.address} className="col-span-2" />
                    </>
                    ) : (
                    <>
                        <Field label="ชื่อสถานสงเคราะห์" value={user.name} />
                        <Field label="เบอร์โทรศัพท์" value={user.phone} />
                        <Field label="อีเมล" value={user.email} />
                        <Field label="ที่อยู่" value={user.address} className="col-span-1" />
                        <Field label="โซเชียลมีเดีย" value={user.social_media} className="col-span-2" />
                    </>
                    )}
                </div>
           

                <div className="text-right mt-6">
                    <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => signOut({ callbackUrl: '/LoginForm' })}
                    >
                    ออกจากระบบ
                    </button>
                </div>     
            </div>
            </div>
            
        </div>
    )
}

function Field({ label, value, className = '' }) {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="text-sm text-gray-700 font-medium">{label}</label>
        <input
          type="text"
          value={value}
          readOnly
          className="mt-1 p-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>
    )
  }
  