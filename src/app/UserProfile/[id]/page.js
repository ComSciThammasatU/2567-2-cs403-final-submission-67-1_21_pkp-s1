'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function UserProfile() {
    const router = useRouter()
    const { data: session, status } = useSession();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
     

     useEffect(() => {
        if (status !== "loading" && (!session || session.user.role !== 'shelter')) {
            router.push('/LoginForm');
        }
    }, [session, status, router]);

    useEffect(() => {
        if (!session || session.user.role !== 'shelter') return;
        async function fetchUser() {
            const res = await fetch(`/api/auth/userdetail/${id}`);
            if (res.ok) {
                setUser(await res.json());
            }
            setLoading(false);
        }
        fetchUser();
    }, [id, session]);

    if (loading) return <div>Loading...</div>;
    if (!session || session.user.role !== 'shelter') return null;
    if (!user) return <div>ไม่พบข้อมูลผู้ใช้</div>


    return (
        <div className="font-mitr">
            <h1 className="text-2xl font-medium text-center mt-10">โปรไฟล์ผู้ใช้</h1>
            <div className="flex flex-col max-w-6xl mx-auto mt-10 gap-6">
                <div className='flex-1 bg-white p-8 rounded-lg shadow-xl '>
                    <img
                    src={`/uploads/${user.user_picture || 'default-profile.jpg'}`}
                    alt={user.fullname}
                     width={80}
                    height={100}
                    className="rounded-full object-cover"
                    />
                    <div className="grid grid-cols-2 gap-10 mt-10 ">
                        <Field label="ชื่อจริง" value={user.fullname} />
                        <Field label="นามสกุล" value={user.lastname} />
                        <Field label="เพศ" value={user.gender === "MALE" ? "ชาย" : user.gender === "MALE" ? "หญิง" : "อื่นๆ"} />
                        <Field label="เบอร์โทรศัพท์" value={user.phone} />
                        <Field label="อีเมล" value={user.email} />
                        <Field label="วันเกิด" value={new Date(user.birth_date).toLocaleDateString()} />
                        <Field label="ที่อยู่ปัจจุบัน" value={user.address} className="col-span-2" />
                    </div>
                </div>

            </div>
            
            <button onClick={() => router.back()} className="mb-4 text-blue-600 underline">ย้อนกลับ</button>
        </div>
    );
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