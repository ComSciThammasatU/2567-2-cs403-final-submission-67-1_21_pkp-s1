"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession} from 'next-auth/react'

export default function Navbar({profilePicture, isLoggedIn}) {
        const { data: session, status } = useSession()
    const [firstArticleId, setFirstArticleId] = useState(null);
        useEffect(() => {
        fetch('api/auth/articles')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) setFirstArticleId(data[0].id);
            });
    }, []);
    
     let homeLink = "/";
    if (session && (session.user?.role === "user" || session.user?.role === "shelter")) {
        homeLink = "/Home";
    }

    return(
        
    <nav className="p-4 flex items-center justify-between font-mitr">
        {/* Logo (ชิดซ้าย) */}
        <Link href={homeLink}>
            <div className="text-customDarkblue font-bold text-3xl pl-6">
                StayDog
            </div>
        </Link>

        {/* ขวา: Menu + Login + Profile */}
        <div className="flex items-center space-x-10 pr-16 ">
            {/* Menu */}
            <div className="flex items-center space-x-14 text-customDarkblue font-semibold text-xl pr-2">
            <Link href={homeLink}>หน้าแรก</Link>
            <Link href="/AllDogs">ดูสุนัขทั้งหมด</Link>
            <Link href={firstArticleId ? `/ArticlesPage/${firstArticleId}` : "#"}>บทความ</Link>
            {isLoggedIn && session?.user?.role === "user" && (
                    <Link href={`/StatusTracking/${session.user.id}`}>
                        <button className="bg-customBlue text-white font-medium px-4 py-2 rounded-full">
                            ติดตามสถานะ
                        </button>
                    </Link>
                )}
                {isLoggedIn && session?.user?.role === "shelter" && (
                    <Link href="/AllShelterDog">
                        <button className="bg-customBlue text-white font-medium px-4 py-2 rounded-full">
                            จัดการสุนัข
                        </button>
                    </Link>
                )}            
            </div>

            {/* Login Button + Profile Picture */}
            <div className="flex items-center space-x-4">
            <Link href="/LoginForm">
                <button className="bg-customDarkblue text-white font-medium px-6 py-2 rounded-full">Login</button>
            </Link>
            <Link href="/Profile">
                    <Image 
                    src={isLoggedIn ? (profilePicture || "/uploads/default-profile.jpg") : "/uploads/default-profile.jpg"}
                    alt="Profile Picture"
                    width={45}
                    height={40}
                    className="rounded-full w-auto h-auto"
                />
            </Link>
            </div>
        </div>
    </nav>
    )
}
