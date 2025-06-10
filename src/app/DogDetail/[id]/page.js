'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import{ useSession } from 'next-auth/react';
import Navbar from '../../components/Navbar.jsx'
import Link from 'next/link';
import Image from 'next/image';

export default function DogDetail() {
    const { data: session, status } = useSession()
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [suggestedDogs, setSuggestedDogs] = useState([]);

    const isLoggedIn = true; // Check if the user is logged in
        const profilePicture = session?.user?.role === "shelter"
    ? `/uploads/${session?.user?.shelter_picture || "default-profile.jpg"}`
    : `/uploads/${session?.user?.user_picture || "default-profile.jpg"}`;


    useEffect(() => {
        async function fetchDog() {
            try {
                const response = await fetch(`/api/auth/dogs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setDog(data); 
                    console.log('Current ID:', id);
                } else {
                    console.error('Failed to fetch dog:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching dog:', error);
                
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchDog();
    }, [id]);

    useEffect(() => {
        async function fetchSuggestedDogs() {
            if (!dog) return;
            const res = await fetch('/api/auth/alldog');
            if (res.ok) {
                let allDogs = await res.json();
                allDogs = allDogs.filter(d => d.id !== dog.id);
                // สุ่ม 4 ตัว
                const shuffled = allDogs.sort(() => 0.5 - Math.random());
                setSuggestedDogs(shuffled.slice(0, 4));
            }
        }
        fetchSuggestedDogs();
    }, [dog])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!dog) {
        return <div>Dog not found</div>;
    }
    return (
    <div className="font-mitr">
        <Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
        <div className='flex flex-col md:flex-row  p-6 max-h-md'>
            <div className="w-full  md:w-1/2 flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-2xl aspect-[4/3] rounded-lg overflow-hidden flex justify-center	">
                    <Image
                        src={`/uploads/${dog.dogImage}`}
                        alt={dog.name}
                        width={700}
                        height={700}
                        className=" object-cover rounded-md"
                        
                    />
                </div>
            </div>
       

        {/* Right: Dog info */}
        <div className="w-full md:w-1/2 ">
            <h2 className="text-2xl font-bold mb-4">{dog.name}</h2>
            <div className="space-y-2 divide-y divide-gray-300">
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>สายพันธุ์</span>
                    <span>: {dog.breed?.name || dog.customBreed || '-'}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>เพศ</span>
                    <span>: {dog.gender === 'MALE' ? 'ชาย' : 'หญิง'}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>อายุ</span>
                    <span>: {dog.estimatedAge} ปี</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>ขนาด</span>
                    <span>: {dog.size === 'SMALL' ? 'เล็ก' : dog.size === 'MEDIUM' ? 'กลาง' : 'ใหญ่'}</span>
                </div>
    
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>ประวัติการฉีดวัคซีน</span>
                    <span>:
                    {dog.vaccinated === 'COMBINED'
                        ? 'วัคซีนรวม'
                        : dog.vaccinated === 'RABIES'
                        ? 'วัคซีนพิษสุนัขบ้า'
                        : dog.vaccinated === 'BOTH'
                        ? 'วัคซีนรวม+พิษสุนัขบ้า'
                        : 'ยังไม่ได้ฉีดวัคซีน'}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>การทำหมัน</span>
                    <span>: {dog.neutered ? 'ทำหมันแล้ว' : 'ยังไม่ได้ทำหมัน'}</span>
                </div>  
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>โรคประจำตัวหรือโรคอื่นๆ</span>
                    <span>: {dog.otherIllnesses || '-'}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>ข้อมูลเพิ่มเติม</span>
                    <span>: {dog.description || '-'}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 py-2">
                    <span>สถานสงเคราะห์ที่ดูแล</span>
                    <span>: {dog.shelter?.name}</span>
                </div>
        </div>
            

            <div className='mt-6 flex gap-4 '>
                <Link href={`/questionsFrom/${dog.id}`}>
                    <button className="px-6 py-2 bg-customDarkblue text-white rounded-full border-customDarkblue font-small mt-4 hover:opacity-80 transition duration-300">
                        รับเลี้ยง
                    </button>
                </Link>
                 <Link href={`/ShelterDetailPage/${dog.shelter?.id}`}>
                    <button className="px-6 py-2 border-2 border-customDarkblue rounded-full border-customDarkblue font-small text-customDarkblue hover:bg-customDarkblue hover:text-white transition duration-300 mt-4">
                        ดูหน้าโปรไฟล์สถานสงเคราะห์
                    </button>
                </Link>
            </div>
        </div>
    </div> 
    <div className="max-w-7xl mx-auto mt-16">
                <h3 className="text-xl font-bold mb-4 text-customDarkblue">แนะนำสุนัขตัวอื่นๆ</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {suggestedDogs.length > 0 ? (
                        suggestedDogs.map(sdog => (
                            <Link href={`/DogDetail/${sdog.id}`} key={sdog.id}>
                                <div className="border rounded-2xl shadow-md overflow-hidden w-full max-w-xs mx-auto p-3 bg-white hover:shadow-lg transition">
                                    <img
                                        src={`/uploads/${sdog.dogImage}`}
                                        alt={sdog.name}
                                        className="w-full h-56 object-cover rounded-md"
                                    />
                                    <div className="mt-2 text-md font-small">
                                        <p>ชื่อ : {sdog.name}</p>
                                        <p>เพศ : {sdog.gender === "MALE" ? "ผู้" : "เมีย"}</p>
                                        <p>อายุ : {sdog.estimatedAge} ปี</p>
                                        <p>สายพันธุ์ : {sdog.breed?.name || sdog.customBreed || "-"}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500">ไม่มีข้อมูลแนะนำ</p>
                    )}
                </div>
            </div>

</div>
)
}
/*
<div className="grid grid-cols-2 gap-y-3 text-sm">
                <Info label="สายพันธุ์" value={dog.breed?.name || dog.customBreed || '-'} />
                <Info label="เพศ" value={dog.gender === 'MALE' ? 'ชาย' : 'หญิง'} />
                <Info label="อายุ" value={`${dog.estimatedAge} ปี`} />
                <Info label="ขนาด" value={sizeText(dog.size)} />
                <Info label="ประวัติการฉีดวัคซีน" value={vaccineText(dog.vaccinated)} />
                <Info label="การทำหมัน" value={dog.neutered ? 'ทำหมันแล้ว' : 'ยังไม่ได้ทำหมัน'} />
                <Info label="โรคประจำตัวหรือโรคอื่นๆ" value={dog.otherIllnesses || '-'} />
                <Info label="ข้อมูลเพิ่มเติม" value={dog.description || '-'} className="col-span-2" />
                <Info label="สถานสงเคราะห์ที่ดูแล" value={dog.shelter?.name || '-'} />
            </div>
 function Info({ label, value, className = '' }) {
  return (
    <div className={`flex ${className}`}>
      <div className="w-1/2 font-medium">{label}</div>
      <div className="w-1/2">: {value}</div>
    </div>
  )
}
function vaccineText(vaccinated) {
  switch (vaccinated) {
    case 'COMBINED':
      return 'วัคซีนรวม'
    case 'RABIES':
      return 'วัคซีนพิษสุนัขบ้า'
    case 'BOTH':
      return 'วัคซีนรวม+พิษสุนัขบ้า'
    default:
      return 'ยังไม่ได้ฉีดวัคซีน'
  }
}

function sizeText(size) {
  switch (size) {
    case 'SMALL':
      return 'เล็ก'
    case 'MEDIUM':
      return 'กลาง'
    case 'LARGE':
      return 'ใหญ่'
    default:
      return '-'
  }
}
*/