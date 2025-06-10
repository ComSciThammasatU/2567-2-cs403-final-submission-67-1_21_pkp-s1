'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "./InputField";


export default function register_shelter() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        social_media: "",
        shelter_picture: null,
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handlerChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, shelter_picture: e.target.files[0] });
      };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if(formData.password !== formData.confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน");
            return;
        }
        
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError("เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้นและต้องมี 10 หลัก");
            return;
        }
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key,value]) => {
            formDataObj.append(key,value);
        });

        try {
            const res = await fetch("/api/auth/register-shelter", {
                method: "POST",
                body: formDataObj,
            });

            const data = await res.json();
            alert(data.message);
            if (res.ok) {
                router.push("/LoginForm");
            } else {
                setError(data.message || "เกิดข้อผิดพลาด");
            }
        } catch (error) {
            console.log(error);
            alert("เกิดข้อผิดพลาดในการลงทะเบียน");
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      }
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
      }
    
    return(
        <div className="font-mitr">
            <div className="flex items-center bg-customCream  text-customDarkblue p-12">
                <h1 className="font-medium text-3xl">ลงทะเบียนลงทะเบียนสำหรับสถานสงเคราะห์</h1>
                <div className="ml-auto flex gap-2">
                    <Link href="/RegisterForm"> 
                        <button className="border-2 border-customDarkblue text-customDarkblue font-medium px-6 py-2 rounded-full">
                        ลงทะเบียนสำหรับผู้ที่ต้องการรับเลี้ยงสุนัข
                        </button>
                    </Link>
                    <Link href="/LoginForm">
                        <button className="bg-customDarkblue text-white font-medium px-6 py-2 rounded-full">Login</button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center space-x-3 p-10">
                <div className="flex items-center justify-center w-7 h-7 bg-gray-800 text-white text-sm font-normal rounded-full">
                    1
                </div>
                <h2 className="text-2xl font-normal text-gray-900">ข้อมูลบัญชีผู้ใช้</h2>
            </div>

             <form onSubmit={handlerSubmit} encType="multipart/form-data"> 
                        <div className="pl-20" >
                            <InputField label="อีเมล" type="email" name="email" placeholder="Email" onChange={handlerChange} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 pt-10 pl-20">
                            <InputField label="รหัสผ่าน" type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handlerChange} required toggleVisibility={togglePasswordVisibility} showPassword={showPassword} />
                            <InputField label="ยืนยันรหัสผ่าน" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" onChange={handlerChange} required toggleVisibility={toggleConfirmPasswordVisibility} showPassword={showConfirmPassword} />
                        </div>
                        
                        <div className="flex items-center space-x-3 p-10">
                            <div className="flex items-center justify-center w-7 h-7 bg-gray-800 text-white text-sm font-normal rounded-full">
                                2
                            </div>
                            <h2 className="text-2xl font-normal text-gray-900">ข้อมูลสถานสงเคราะห์</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-20">
                            <InputField label="ชื่อสถานสงเคราะห์" name="name" onChange={handlerChange} required />
                            <InputField label="เบอร์โทรศัพท์" name="phone" onChange={handlerChange} required />
                            <InputField label="ที่อยู่สถานสงเคราะห์" name="address" textarea onChange={handlerChange} required/>
                            <InputField label="ช่องทางโชเชียลมีเดีย" name="social_media" textarea onChange={handlerChange} required />
                            <div className="mb-4">
                                <label className="block text-md font-medium text-gray-700 front-normal">รูปภาพผู้ใช้<span className="text-red-500 pl-1">*</span></label>
                                <input type="file" name="user_picture" accept="image/*" onChange={handleFileChange}   className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <button className="w-full max-w-md bg-customDarkblue text-white font-medium py-3 rounded-full">
                                ยืนยันการลงทะเบียน
                            </button>
                        </div>
                        </form>
                        {error && <p>{error}</p>}
        </div>
    )
}
