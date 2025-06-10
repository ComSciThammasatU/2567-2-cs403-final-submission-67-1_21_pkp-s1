'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Select from 'react-select';

export default function AddDogFrom() {
    const { data: session, status } = useSession()
    const router = useRouter();
    const isLoggedIn = !!session; // Check if the user is logged in
    const profilePicture = session?.user?.role === "shelter"
    ? `/uploads/${session?.user?.shelter_picture || "default-profile.jpg"}`
    : `/uploads/${session?.user?.user_picture || "default-profile.jpg"}`;

     if(status === "loading") {
        return <div>Loading...</div>
    }
    const[breedOptions, setBreedOptions] = useState([]);
    useEffect(() => {
        async function fetchBreeds() {
            try {
                const response = await fetch('/api/auth/AddDog');
                if (response.ok) {
                    const breeds = await response.json();
                    console.log('Fetched breeds:', breeds);
                    const options = breeds.map((breed) => ({
                        value: breed.id,
                        label: breed.name,
                    }));
                    setBreedOptions(options);
                } else {
                    console.error('Failed to fetch breeds');
                }
            } catch (error) {
                console.error('Error fetching breeds:', error);
            }
        }
        fetchBreeds();
    }, []);
        
    useEffect(() => {
        console.log("Session data:", session);
    if (session?.user?.role === "shelter") {
        setFormData((prevData) => ({
            ...prevData,
            shelterId: session.user.id, 
        }));
     }
    }, [session]);

    useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "shelter") {
        setFormData((prevData) => ({
            ...prevData,
            shelterId: session.user.id,
        }));
     }
    }, [session, status])

    const handleBreedChange = (selectedOption) => {
        setFormData((prevData) => ({
        ...prevData,
        breedId: selectedOption ? selectedOption.value : "",
        }));
    }
    // Redirect to login if not logged in
   useEffect(() => {
           if (!session && status !== 'loading') {
                router.push('/LoginForm');
            }
        }, [session, status, router]);

    const [formData, setFormData] = useState({
        name: "",
        breedId: "",
        customBreed: "",
        gender: "",
        estimatedAge: "",
        estimatedYear: "",
        size: "",
        vaccinated: 'UNKNOWN',
        neutered: false,
        otherIllnesses: "",
        description: "",
        dogImage: null,
        shelterId: "",
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

     const handleFileChange = (e) => {
        console.log(`${e.target.name}:`, e.target.value);   
        setFormData({ ...formData, dogImage : e.target.files[0] });
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataObj.append(key, value);
        });
        try {
            const res = await fetch("/api/auth/AddDog", {
                method: "POST",
                body: formDataObj,
            });
            const data = await res.json();
            alert(data.message);
            if (res.ok) {
                router.push("/Profile");
            } else {
                alert("Error adding dog");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    return (
        <div className="font-mitr">
            <Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
            <h2 className="text-2xl font-medium flex justify-center">เพิ่มข้อมูลสุนัข</h2>
            <form onSubmit={handleSubmit} >
                <div className="flex items-center space-x-3 p-10">
                    <div className="flex items-center justify-center w-7 h-7 bg-gray-800 text-white text-sm font-normal rounded-full">
                        1
                    </div>
                    <h2 className="text-xl font-normal text-gray-900">ข้อมูลพื้นฐานของสุนัข</h2>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4 pl-20">
                    <div>
                        <label className="block text-md font-medium text-gray-700 front-normal">ชื่อสุนัข<span className="text-red-500 pl-1">*</span></label>
                         <input name="name" placeholder="ชื่อสุนัข" onChange={handleChange} className="mt-1 block w-full border border-gray-400 rounded-md p-3 max-w-2xl pr-10 " required/>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-gray-700 front-normal">เพศ<span className="text-red-500 pl-1">*</span></label>
                        <select name="gender" onChange={handleChange} className="mt-1 block w-full border border-gray-400 rounded-md p-3 max-w-2xl pr-10 " required>
                            <option value="">-- เพศ --</option>
                            <option value="MALE">ผู้</option>
                            <option value="FEMALE">เมีย</option>
                        </select>
                    </div>
                   <div>
                        <label className="block text-md font-medium text-gray-700 front-normal">สายพันธุ์<span className="text-red-500 pl-1">*</span></label>
                        <Select
                            options={breedOptions}
                            onChange={handleBreedChange}
                            placeholder="เลือกสายพันธุ์"
                            className="mt-1 block w-full rounded-md  max-w-2xl  "
                            isClearable 
                            required
                            />
                    </div>
                    <div>
                        <label className="block text-md font-medium text-gray-700 front-normal">ระบุสายพันธุ์เอง (ถ้าไม่มีในตัวเลือก)</label>
                        <input name="customBreed" placeholder="ระบุสายพันธุ์เอง (ถ้าไม่มีในตัวเลือก)" onChange={handleChange} className="mt-1 block w-full border border-gray-400 rounded-md p-3 max-w-2xl pr-10 " />
                    </div>
                    
                    <div>
                        <label className="block text-md font-medium text-gray-700 front-normal">อายุโดยประมาณ (ปี)<span className="text-red-500 pl-1">*</span></label>
                        <input name="estimatedAge" type="number" placeholder="อายุโดยประมาณ (ปี)" onChange={handleChange} className="mt-1 block  border border-gray-400 rounded-md p-3 max-w-sm pr-10 " required/>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-gray-700 front-normal">ขนาด<span className="text-red-500 pl-1">*</span></label>
                        <select name="size" onChange={handleChange} className="mt-1 block w-full border border-gray-400 rounded-md p-3 max-w-2xl pr-10 " required>
                            <option value="">-- ขนาด --</option>
                            <option value="SMALL">ขนาดเล็ก(น้ำหนักไม่เกิน 10กก)</option>
                            <option value="MEDIUM">ขนาดกลาง(น้ำหนักระหว่าง 11กก-25กก)</option>
                            <option value="LARGE">ขนาดใหญ่(น้ำหนักเกิน 26กก)</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center space-x-3 p-10">
                    <div className="flex items-center justify-center w-7 h-7 bg-gray-800 text-white text-sm font-normal rounded-full">
                        2
                    </div>
                    <h2 className="text-xl font-normal text-gray-900">สถานะสุขภาพ</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-20">
                    <div>
                        <label className="block text-md font-medium text-gray-700 front-normal">ประวัติการฉีดวัคซีน(ในปีนี้)<span className="text-red-500 pl-1">*</span></label>
                         <select name="vaccinated" onChange={handleChange} className="mt-1 block w-full border border-gray-400 rounded-md p-3 max-w-2xl pr-10 " required>
                            <option value="UNKNOWN">ยังไม่ได้ฉีดวัคซีน</option>
                            <option value="COMBINED">ฉีดวัคซีนรวม</option>
                            <option value="RABIES">ฉีดพิษสุนัขบ้า</option>
                            <option value="BOTH">ฉีดวัคซีนรวม+ฉีดพิษสุนัขบ้า</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-gray-700 front-normal">ประวัติการทำหมัน<span className="text-red-500 pl-1">*</span></label>
                        <div className="flex space-x-4 mt-2">
                            <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="neutered"
                                value="true"
                                onChange={handleChange}
                                checked={formData.neutered === "true"}
                            />
                            <span>ทำหมันแล้ว</span>
                            </label>
                            <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="neutered"
                                value="false"
                                onChange={handleChange}
                                checked={formData.neutered === "false"}
                            />
                            <span>ยังไม่ทำหมัน</span>
                            </label>
                        </div>
                    </div>
                    <div  className="mt-4">   
                        <label className="block text-md font-medium text-gray-700 front-normal">โรคประจำตัวหรือโรคอื่นๆ(ถ้ามี)</label>
                        <textarea name="otherIllnesses" placeholder="โรคอื่น ๆ" onChange={handleChange} className="w-full p-3 border border-gray-400 rounded mt-1 max-w-3xl" />
                    </div>  
                </div>
                <div className="flex items-center space-x-3 p-10">
                    <div className="flex items-center justify-center w-7 h-7 bg-gray-800 text-white text-sm font-normal rounded-full">
                        3
                    </div>
                    <h2 className="text-xl font-normal text-gray-900">ข้อมูลเพิ่มเติม</h2>
                </div>
                <div className="pl-20">
                    <label className="block text-md font-medium text-gray-700 front-normal">รายละเอียดเพิ่มเติม(เช่น นิสัยหรือความชอบ) </label>
                    <textarea name="description" placeholder="รายละเอียดเพิ่มเติม" onChange={handleChange} className="w-full p-3 border border-gray-400 rounded mt-1 max-w-3xl" />
                </div>

                <div className="flex items-center space-x-3 p-10">
                    <div className="flex items-center justify-center w-7 h-7 bg-gray-800 text-white text-sm font-normal rounded-full">
                        4
                    </div>
                    <h2 className="text-xl font-normal text-gray-900">อัปโหลดรูปภาพสุนัข</h2>
                </div>

                <div className="mb-4 pl-20">
                        <label className="block text-md font-medium text-gray-700 front-normal">รูปภาพสุนัข<span className="text-red-500 pl-1">*</span></label>
                        <input type="file" name="user_picture" accept="image/*" onChange={handleFileChange}   className="mt-2"/>
                    </div>

          
                <div className="flex justify-center mb-4">
                    <button className="w-full max-w-md bg-customDarkblue text-white font-medium py-3 rounded-full">
                        ยืนยันการข้อมูลข้อมูลเพิ่มสุนัข
                    </button>
                </div>
            </form>
        </div>
    )
}