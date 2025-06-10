'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import Select from 'react-select';

export default function AllDogs(){
    const [dogs,setDogs]  = useState([]);
    const [filteredDogs, setFilteredDogs] = useState([]);
    const [filters, setFilters] = useState({
        breed: null,
        gender: '',
        size: '',
        age: '',
        vaccinated: '',
        neutered: '',
    });
    const [breedOptions, setBreedOptions] = useState([]);
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
    const ageRanges = [
  { label: "1-3 ปี", value: "1-3" },
  { label: "4-7 ปี", value: "4-7" },
  { label: "7 ปีขึ้นไป", value: "7+" }
  ];

    useEffect(() => {
    async function fetchDogs() {
      const res = await fetch('/api/auth/alldog');
      if (res.ok) {
        const data = await res.json();
        setDogs(data);
        setFilteredDogs(data);
        const options = [
            ...new Map(
                data
                    .filter(d => d.breed?.name)
                    .map(d => [d.breed.id,{value: d.breed.name, label: d.breed.name}])
            ).values(),
        ]
        setBreedOptions(options);
      }
    }
    fetchDogs();
  }, []);

  // ฟังก์ชัน filter
  useEffect(() => {
    let result = dogs;
    if (filters.breed) result = result.filter(d => d.breed?.name === filters.breed.value);
    if (filters.gender) result = result.filter(d => d.gender === filters.gender);
    if (filters.size) result = result.filter(d => d.size === filters.size);
    if (filters.age) {
    result = result.filter(d => {
      if (!d.estimatedAge) return false;
      const age = Number(d.estimatedAge);
      if (filters.age === "1-3") return age >= 1 && age <= 3;
      if (filters.age === "4-7") return age >= 4 && age <= 7;
      if (filters.age === "7+") return age >= 8;
      return true;
    });
  }
    if (filters.vaccinated) result = result.filter(d => d.vaccinated  === filters.vaccinated);
    if (filters.neutered) result = result.filter(d => (filters.neutered === 'yes' ? d.neutered : !d.neutered));
    setFilteredDogs(result);
  }, [filters, dogs]);

  const handleReset = () => {
    setFilters({
      breed: null,
      gender: '',
      size: '',
      age: '',
      vaccinated: '',
      neutered: '',
    });
  };

  return(
    <div className="font-mitr ">
        <Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
        <div className='max-w-7xl mx-auto p-8'>   
        
        <h1 className="text-2xl font-semibold mb-6">สุนัขทั้งหมด</h1>
        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
            <div style={{ minWidth: 200 }}>
                <Select
                    options={breedOptions}
                    value={filters.breed}
                    onChange={option => setFilters(f => ({ ...f, breed: option }))}
                    placeholder="เลือกสายพันธุ์"
                    isClearable
                />
            </div>
            <select value={filters.gender} onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))} className="border rounded px-2 py-1">
                <option value="">ทุกเพศ</option>
                <option value="MALE">ผู้</option>
                <option value="FEMALE">เมีย</option>
             </select>
             <select value={filters.size} onChange={e => setFilters(f => ({ ...f, size: e.target.value }))} className="border rounded px-2 py-1">
                <option value="">ทุกขนาด</option>
                <option value="SMALL">เล็ก</option>
                <option value="MEDIUM">กลาง</option>
                <option value="LARGE">ใหญ่</option>
            </select>
             <select value={filters.age} onChange={e => setFilters(f => ({ ...f, age: e.target.value }))} className="border rounded px-2 py-1">
              <option value="">ทุกช่วงอายุ</option>
              {ageRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            <select value={filters.vaccinated} onChange={e => setFilters(f => ({ ...f, vaccinated: e.target.value }))} className="border rounded px-2 py-1">
                <option value="">ตัวเลือกการฉีดวัคซีน</option>
                <option value="UNKNOWN">ยังไม่ได้ฉีดวัคซีน</option>
                <option value="COMBINED">ฉีดวัคซีนรวม</option>
                <option value="RABIES">ฉีดพิษสุนัขบ้า</option>
                <option value="BOTH">ฉีดวัคซีนรวม+ฉีดพิษสุนัขบ้า</option>
            </select>
            <select value={filters.neutered} onChange={e => setFilters(f => ({ ...f, neutered: e.target.value }))} className="border rounded px-2 py-1">
                <option value="">ตัวเลือกการทำหมัน</option>
                <option value="yes">ทำหมันแล้ว</option>
                <option value="no">ยังไม่ทำหมัน</option>
            </select>
             <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleReset}
                type="button"
                >
                รีเซ็ตตัวกรอง
            </button>
        </div>

        {/* Dog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {filteredDogs.length > 0 ? (
          filteredDogs.map((dog) => (
            <Link href={`/DogDetail/${dog.id}`} key={dog.id}>
              <div className="border rounded-2xl shadow-md overflow-hidden w-full max-w-xs mx-auto p-3">
                <img
                  src={`/uploads/${dog.dogImage}`}
                  alt={dog.name}
                  className="w-full h-60 object-cover rounded-md"
                />
                <div className="mt-2 text-md font-small">
                  <p>ชื่อ : {dog.name}</p>
                  <p>เพศ : {dog.gender === "MALE" ? "ผู้" : "เมีย"}</p>
                  <p>อายุ : {dog.estimatedAge} ปี</p>
                  <p>สายพันธุ์ : {dog.breed?.name || dog.customBreed || "-"}</p>
                  <p>ขนาด : {dog.size === "SMALL" ? "เล็ก" : dog.size === "MEDIUM" ? "กลาง" : dog.size === "LARGE" ? "ใหญ่" : "-"}</p>
                  <p>วัคซีน : {dog.vaccinated ? "ฉีดแล้ว" : "ยังไม่ฉีด"}</p>
                  <p>ทำหมัน : {dog.neutered ? "ทำหมันแล้ว" : "ยังไม่ทำหมัน"}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">ไม่พบสุนัขที่ตรงกับเงื่อนไข</p>
        )}
      </div>
      </div>
    </div>
  )
}   