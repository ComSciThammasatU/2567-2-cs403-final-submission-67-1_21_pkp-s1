'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar.jsx'
import { useRouter } from 'next/navigation';

export default function DogManagement(){
    const router = useRouter()
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session,status } = useSession()
    const isLoggedIn = !!session; // Check if the user is logged in
    const profilePicture = session?.user?.role === "shelter"
    ? `/uploads/${session?.user?.shelter_picture || "default-profile.jpg"}`
    : `/uploads/${session?.user?.user_picture || "default-profile.jpg"}`;

      useEffect(() => {
        if (status !== "loading" && !session) {
            router.push('/LoginForm');
        }
    }, [session, status, router]);

    useEffect(() => {
    async function fetchRequests() {
        const res = await fetch('/api/auth/AdoptionRequest');
        if (res.ok) {
            let data = await res.json();
            console.log("Data:", data);
            // filter เฉพาะของ shelter ที่ล็อกอิน
            setRequests(data);
        }
        setLoading(false);
    }
    if (session) fetchRequests();
}, [session]);

     

    if(loading) return <div>Loading...</div>
    if (!session) return null;
    return(
        <div className='font-mitr'>
            < Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
            <div  className='flex'> 
            {/* Sidebar */}
                <aside className="fixed top-0 left-0 h-full w-50 bg-customCream p-6 shadow-md flex flex-col items-center gap-6 mt-20 rounded-xl">
                    <div className="flex flex-col gap-3 w-full mt-10">
                            <Link href="/Profile">
                                <button className="w-full text-left bg-while text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                                    หน้าโปรไฟล์
                                </button>
                            </Link>
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
            <main className='ml-64 flex-1'>
            <div className='flex flex-row gap-5'>
                <h1 className="text-2xl font-bold mb-6">รายการคำขอรับเลี้ยง</h1>
            </div>
            
                <div className='grid gap-6'>
                    {requests.length > 0 ? (
                        requests.map(req => (
                        <div key={req.id} className='bg-white rounded-lg shadow p-4 flex item-center justify-between'>
                            <div className='flex item-center gap-4'>
                            <img src={`/uploads/${req.dog.dogImage}`} alt={req.dog.name} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <div className="font-bold">{req.dog.name}</div>
                                <div className="text-gray-600">โดย: {req.user.fullname} {req.user.lastname}</div>
                                <div className="text-gray-500 text-sm">ส่งคำขอรับเลี้ยงเมื่อ: {new Date(req.createdAt).toLocaleString()}</div>
                            </div>
                            </div>
                            <Link href={`/DogManagement/requestDetail/${req.id}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">ดูรายละเอียด</button>
                            </Link>
                        </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-8">ยังไม่มีคำขอรับเลี้ยง</div>
                    )}
                    </div>
                </main>
            </div>
        </div>
    )

}