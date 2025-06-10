'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Navbar from '../../../components/Navbar.jsx'

export default function requestDetail(){
    const {id} = useParams();
    const router = useRouter();
    const [request,setRequest] = useState(null);
    const [status,setStatus] = useState('');
    const [loading,setLoading] = useState(true);
    const { data: session } = useSession()
     const isLoggedIn = !!session; 
    const profilePicture =
    session?.user?.role === "shelter"
            ? session?.user?.shelter_picture
            ? `/uploads/${session.user.shelter_picture}`
            : "/uploads/default-profile.jpg"
            : session?.user?.user_picture
            ? `/uploads/${session.user.user_picture}`
            : "/uploads/default-profile.jpg";

    useEffect(() => {
        async function fetchRequest() {
            const res = await fetch(`/api/auth/singleRequest/${id}`);
            if (res.ok) {
                const data = await res.json();
                setRequest(data);
                setStatus(data.status);
            }
            setLoading(false);
        }
        fetchRequest();
    }, [id]);

    useEffect(() => {
            if (status !== "loading" && !session) {
                router.push('/LoginForm');
            }
        }, [session, status, router]);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        await fetch(`/api/auth/singleRequest/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
    };

    if (loading) return <div>Loading...</div>;
    if (!request) return <div>ไม่พบคำขอ</div>;
    if (!session) return null;

    return(
        <div className='font-mitr'>
                < Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
                <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
                    <button
                    onClick={() => router.back()}
                    className="mb-6 text-blue-600 underline hover:text-blue-800 transition"
                    >
                        &larr; ย้อนกลับ
                    </button>
                    
                    {/* ข้อมูลสุนัขและผู้ขอ */}
                    <div className="flex gap-6 items-center mb-8">
                        <img
                            src={`/uploads/${request.dog.dogImage}`}
                            alt={request.dog.name}
                            className="w-32 h-32 object-cover rounded-xl border-2 border-customDarkblue shadow"
                        />
                        <div>
                            <div className="font-bold text-2xl text-customDarkblue mb-1">{request.dog.name}</div>
                            <div className="text-gray-700 mb-1">
                                <span className="font-semibold">โดย:</span> {request.user.fullname} {request.user.lastname}
                            </div>
                            <div className="text-gray-500 text-sm">
                                ส่งเมื่อ: {new Date(request.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>

                        {/* สถานะคำขอ */}
                    <div className="mb-8">
                        <label className="font-semibold text-customDarkblue">สถานะคำขอ:</label>
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="ml-3 border border-customDarkblue rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-customBlue"
                        >
                            <option value="PENDING">รอดำเนินการ</option>
                            <option value="APPROVED">รอการติดต่อกลับ</option>
                            <option value="REJECTED">สุนัขได้ถูกรับเลี้ยงแล้ว</option>
                        </select>
                    </div>

                        {/* คำถามและคำตอบ */}
                    <div className="mb-8">
                        <h2 className="font-semibold text-lg mb-3 text-customDarkblue">คำถามและคำตอบ</h2>
                        <div className="space-y-4">
                            {request.answers.map(ans => (
                                <div key={ans.id} className="bg-customCream rounded-lg p-3 shadow-sm">
                                    <div className="font-medium text-customDarkblue">{ans.question.text}</div>
                                    <div className="ml-2 text-gray-700">คำตอบ: {ans.answerText}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                        {/* ปุ่มดูโปรไฟล์ผู้ใช้ */}
                    <div className="flex justify-end">
                        <Link href={`/UserProfile/${request.user.id}`}>
                            <button className="px-5 py-2 bg-customDarkblue text-white rounded-lg hover:bg-green-700 transition">
                                ดูโปรไฟล์ผู้ใช้
                            </button>
                        </Link>
                    </div>
                </div>
        </div>
    )
}
 /*<button onClick={() => router.back()} className="mb-4 text-blue-600 underline">ย้อนกลับ</button>
                <div className="flex gap-6 mb-6">
                    <img src={`/uploads/${request.dog.dogImage}`} alt={request.dog.name} className="w-32 h-32 object-cover rounded" />
                    <div>
                        <div className="font-bold text-xl">{request.dog.name}</div>
                        <div className="text-gray-600">โดย: {request.user.fullname} {request.user.lastname}</div>
                        <div className="text-gray-500 text-sm">ส่งเมื่อ: {new Date(request.createdAt).toLocaleString()}</div>
                    </div>
                </div>

                 <div className="mb-4">
                    <label className="font-semibold">สถานะคำขอ:</label>
                    <select value={status} onChange={handleStatusChange} className="ml-2 border rounded px-2 py-1">
                        <option value="PENDING">รอดำเนินการ</option>
                        <option value="APPROVED">รอการติดต่อกลับ</option>
                        <option value="REJECTED">สุนัขได้ถูกรับเลี้ยงแล้ว</option>
                    </select>
                 </div>
                 <div className="mb-6">
                <h2 className="font-semibold mb-2">คำถามและคำตอบ</h2>
                    {request.answers.map(ans => (
                        <div key={ans.id} className="mb-2">
                            <div className="font-medium">{ans.question.text}</div>
                            <div className="ml-4">{ans.answerText}</div>
                        </div>
                    ))}
                </div>
                 <Link href={`/UserProfile/${request.user.id}`}>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">ดูโปรไฟล์ผู้ใช้</button>
                </Link>*/