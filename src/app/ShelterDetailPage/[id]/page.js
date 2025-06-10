'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ShelterDetailPage() {
    const { id } = useParams();
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchShelter() {
            try {
                const response = await fetch(`/api/auth/shelterdetail/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setShelter(data);
                    console.log('Current ID:', id);
                } else {
                    console.error('Failed to fetch shelter:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching shelter:', error);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchShelter();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!shelter) {
        return <div>Shelter not found</div>;
    }

    return(
        <div className="font-mitr">
            <h1 className="text-2xl font-medium text-center mt-10">ข้อมูลสถานสงเคราะห์</h1>
            <div className="flex flex-col max-w-6xl mx-auto mt-10 gap-6">
                <div className='flex-1 bg-white p-8 rounded-lg shadow-xl '>
                        <Image
                            src={`/uploads/${shelter.shelter_picture }`}
                            width={80}
                            height={100}
                            alt="Profile"
                            className="rounded-full object-cover"
                        />
                    

                    <div className="grid grid-cols-2 gap-10 mt-10 ">
                        <Field label="ชื่อสถานสงเคราะห์" value={shelter.name} />
                        <Field label="เบอร์โทรศัพท์" value={shelter.phone} />
                        <Field label="อีเมล" value={shelter.email} />
                        <Field label="ที่อยู่" value={shelter.address} className="col-span-1" />
                        <Field label="โซเชียลมีเดีย" value={shelter.social_media} className="col-span-2" />

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