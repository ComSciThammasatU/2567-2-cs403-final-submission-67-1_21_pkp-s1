'use client'
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AllShelterDogPage() {
  const router = useRouter()
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession()
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
          if (status !== "loading" && !session) {
              router.push('/LoginForm');
          }
      }, [session, status, router]);
  
 useEffect(() => {
  if (!session) return;
  fetch(`/api/auth/shelterdog?shelterId=${session.user.id}`)
    .then(async res => {
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Fetch error');
      }
      return res.json();
    })
    .then(data => {
      setDogs(data);
      setLoading(false);
    })
    .catch(err => {
      setDogs([]);
      setLoading(false);
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูลสุนัข');
      console.error(err);
    });
}, [session]);

  const handleDelete = async (id) => {
  if (!confirm('ยืนยันการลบสุนัขตัวนี้?')) return;
  const res = await fetch(`/api/auth/dogs/${id}`, { method: 'DELETE' });
  if (res.ok) {
    setDogs(dogs.filter(dog => dog.id !== id));
  } else {
    alert('ลบไม่สำเร็จ');
  }
};

  if (loading) return <div>Loading...</div>;
   if (!session) return null;

  return (
    <div>
    <Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
    <div className="flex font-mitr">
        {/* Sidebar */}
                <aside className="fixed top-0 left-0 h-full w-50 bg-customCream p-6 shadow-md flex flex-col items-center gap-6 mt-20 rounded-xl">
                    <div className="flex flex-col gap-3 w-full mt-10">
                        <Link href="/Profile">
                          <button className="w-full text-left bg-while text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                              หน้าโปรไฟล์
                          </button>
                      </Link>
                      {session && session.user?.role === 'user' && (
                          <button className="w-full text-left text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-customBlue transition">
                              ติดตามสถานะ
                          </button>
                      )}
                      {session && session.user?.role === 'shelter' && (
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
      <div className="max-w-5xl mx-auto p-8 font-mitr">
        
        <div className='flex flex-row gap-5'>
            <h1 className="text-2xl font-bold mb-6">สุนัขของสถานสงเคราะห์</h1>
            <Link href= "/AddDogFrom">
                <button className="px-4 py-2 bg-customDarkblue text-white rounded hover:bg-blue-700">เพิ่มสุนัข</button>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dogs.length > 0 ? (
            dogs.map(dog => (
              <div key={dog.id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={`/uploads/${dog.dogImage}`}
                  alt={dog.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
                <div className="text-gray-500 mb-2">{dog.breed?.name}</div>
                <div className="text-gray-400 text-sm mb-2">
                  เพิ่มเมื่อ: {dog.createdAt ? new Date(dog.createdAt).toLocaleString() : "-"}
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleDelete(dog.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  ลบ
                </button>

              </div>
              
            ))
          ) : (
            <div className="text-gray-500 text-center col-span-3 py-8">
              ยังไม่มีสุนัขในสถานสงเคราะห์ของคุณ
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}