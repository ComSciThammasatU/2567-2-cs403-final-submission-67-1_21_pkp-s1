'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '../../components/Navbar.jsx'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StatusTracking(){
    const router  = useRouter()
    const { data: session, status } = useSession();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
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
        if (!session) return;
        async function fetchRequests() {
            const res = await fetch(`/api/auth/trackingDog/${session.user.id}`);
            if (res.ok) setRequests(await res.json());
            setLoading(false);
        }
        fetchRequests();
    }, [session]);

    if (loading) return <div>Loading...</div>;
    if (!session) return null;
    
    return (
         <div className="font-mitr ">
            < Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
            <div className='flex'>
            {/* Sidebar */}
                <aside className="fixed top-0 left-0 h-full w-50 bg-customCream p-6 shadow-md flex flex-col items-center gap-6 mt-20 rounded-xl">
                    <div className="flex flex-col gap-3 w-full mt-10">
                            <Link href="/Profile">
                                <button className="w-full text-left bg-while text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                                    หน้าโปรไฟล์
                                </button>
                            </Link>
                        {session.user.role === 'user' && (
                            <button className="w-full text-left text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                                ติดตามสถานะ
                            </button>
                        )}
                        {session.user.role === 'shelter' && (
                            <Link href="/DogManagement">
                                <button className="w-full text-left text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                                    จัดการข้อมูลสุนัข
                                </button>
                            </Link>
                             
                        )}
                    </div>
                </aside>
             <main className='ml-64 flex-1'>
                <h1 className="text-2xl font-semibold mb-6">ติดตามสถานะการขอรับเลี้ยง</h1>
                <div className="grid gap-6">
                    {requests.map(req => (
                        <div key={req.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-6">
                            <img src={`/uploads/${req.dog.dogImage}`} alt={req.dog.name} className="w-24 h-24 object-cover rounded" />
                            <div className="flex-1">
                            <div className="font-bold">{req.dog.name}</div>
                                <div>สายพันธุ์: {req.dog.breed?.name || req.dog.customBreed || '-'}</div>
                                <div>อายุ: {req.dog.estimatedAge} ปี</div>
                                <div>สถานสงเคราะห์: {req.dog.shelter?.name || '-'}</div>
                            </div>
                        <div className='className="flex flex-col items-end justify-between h-full gap-2"'>
                            <div className="font-semibold">
                                สถานะ: {req.status === 'PENDING' && <span className="text-yellow-600">รอดำเนินการ</span>}
                                {req.status === 'APPROVED' && <span className="text-green-600">รอการติดต่อกลับ</span>}
                                {req.status === 'REJECTED' && <span className="text-red-600">สุนัขได้ถูกรับเลี้ยงแล้ว</span>}
                            </div>
                       
                        <div className='flex gap-2 mt-4'>
                            <Link   href= {`/DogDetail/${req.dog.id}`}>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">ดูรายละเอียด</button>
                            </Link>
                            <Link href={`/ShelterDetailPage/${req.dog.shelter?.id}`}>
                            <button className="px-6 py-2 border-2 border-customDarkblue rounded-full border-customDarkblue font-small text-customDarkblue hover:bg-customDarkblue hover:text-white transition duration-300 ">
                                ดูหน้าโปรไฟล์สถานสงเคราะห์
                            </button>
                            </Link>
                        </div>
                        </div>
                    </div>
                    ))} 
                </div>
            </main>
            </div>
        </div> 
    )
}