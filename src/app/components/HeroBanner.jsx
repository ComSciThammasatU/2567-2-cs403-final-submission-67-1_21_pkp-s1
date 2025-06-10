"use client"
import Link from "next/link";

export default function HeroBanner() {
    return(
        <div className="font-mitr">
            <section className="relative bg-customCream rounded-3xl overflow-hidden w-full">
                <div className="absolute lg:w-1/2 flex justify-end right-0 pr-48 ">
                    <img
                                src="/HeroBanner.png"
                                alt="Background"
                                className="max-w-full h-auto object-contain"
                            />
                </div>
                
                {/* เนื้อหาด้านซ้าย */}
                    <div className="relative z-10 max-w-7xl mx-48 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12 lg:py-20 gap-12">
                        <div className="max-w-lg space-y-6 lg:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-medium text-customDarkblue leading-tight">
                            มอบบ้านใหม่ <br />
                            <span className="mt-3 block">ให้กับเพื่อนใหม่ของคุณ</span>
                        </h1>
                        <p className="text-lg text-customDarkblue">
                            ค้นพบสุนัขที่รอการรับเลี้ยงพร้อมกับข้อมูลที่ครบถ้วนและ<br />
                            รับเลี้ยงอย่างมั่นใจจากสถานสงเคราะห์ในหลากหลายแห่ง<br />
                            สามารถรับเลี้ยงได้ที่นี้
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link href="/RegisterForm">
                            <button className="px-6 py-2 border-2 border-customDarkblue rounded-full font-medium hover:bg-customDarkblue hover:text-white transition duration-300">
                                ลงทะเบียนสำหรับผู้ที่ต้องการรับเลี้ยงสุนัข
                            </button>
                            </Link>
                            <Link href="/register-shelter">
                            <button className="px-6 py-2 border-2 border-customDarkblue rounded-full font-medium hover:bg-customDarkblue hover:text-white transition duration-300">
                                ลงทะเบียนสำหรับสถานสงเคราะห์
                            </button>
                            </Link>
                        </div>
                        </div>
                    </div>        
                    
              
            </section>
        </div>
    )
}
/*<div className="max-w-lg space-y-6 lg:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-medium text-customDarkblue leading-tight">
                            มอบบ้านใหม่ <br /> <p className="mt-3"> ให้กับเพื่อนใหม่ของคุณ</p>
                        </h1>
                        <p className="text-lg ">
                            ค้นพบสุนัขที่รอการรับเลี้ยงพร้อมกับข้อมูลที่ครบถ้วนและ <br />
                            รับเลี้ยงอย่างมั่นใจจากสถานสงเคราะห์ในหลากหลายแห่ง <br />
                            สามารถรับเลี้ยงได้ที่นี้
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 ">
                                <Link href="/RegisterForm">
                                    <button className="px-6 py-2 border-2 border-customDarkblue rounded-full border-customDarkblue font-small hover:bg-customDarkblue hover:text-white transition duration-300">
                                         ลงทะเบียนสำหรับผู้ที่ต้องการรับเลี้ยงสุนัข
                                         
                                    </button>
                                </Link>
                                <Link href="/register-shelter">
                                    <button className="px-6 py-2 border-2 border-customDarkblue rounded-full border-customDarkblue font-small hover:bg-customDarkblue hover:text-white transition duration-300">
                                        ลงทะเบียนสำหรับสถานสงเคราะห์
                                    </button>
                                </Link>
                        </div>
                    </div> 
                

                    <div className="lg:w-1/2 flex  lg:justify-end relative">
                            <img
                                src="/HeroBanner.png"
                                alt="Background"
                                className="w-50 h-full object-cover translate-y-10"
                            />
                    </div>*/