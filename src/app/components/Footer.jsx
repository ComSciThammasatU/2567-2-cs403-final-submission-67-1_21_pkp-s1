"use client"
import Link from "next/link";

export default function Footer() {
    return(
        <footer className="bg-customCream text-white py-8 font-mitr mt-10 rounded-xl absolute inset-x-0 bottom-0">
            <div className="bg-customDarkblue rounded-2xl py-10 flex justify-center mr-10 ml-10">
                <div className="flex space-x-12 text-white font-normal text-xl">
                    <Link href="/">หน้าแรก</Link>
                    <Link href="/dogs">ดูสุนัขทั้งหมด</Link>
                    <Link href="/articles">บทความ</Link>
                </div>
            </div>

            <div className="border-t border-customDarkblue my-8 ml-12 mr-12"></div>
            <div className="text-center text-customDarkblue font-bold text-3xl">
                StayDog
            </div>
        </footer>
    )
    
}
