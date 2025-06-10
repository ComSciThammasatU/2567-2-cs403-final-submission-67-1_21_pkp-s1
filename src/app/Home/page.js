'use client'
import React, { useEffect, useState } from 'react'
import { useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HeroBanner from '../components/HeroBanner.jsx'
import Link from 'next/link';

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter();
    const isLoggedIn = !!session; // Check if the user is logged in
    const profilePicture = !session
    ? "/uploads/default-profile.jpg"
    : session.user.role === "shelter"
    ? `/uploads/${session.user.shelter_picture || "default-profile.jpg"}`
    : `/uploads/${session.user.user_picture || "default-profile.jpg"}`;
    const [articles, setArticles] = useState([]);
    const [dogs, setDogs] = useState([]);

    if(status === "loading") {
        return <div>Loading...</div>; 
    }

    // Redirect to login if not logged in
    useEffect(() => {
        if (!session && status !== 'loading') {
            router.push('/LoginForm');
        }
    }, [session, status, router]);
    
   useEffect(() => {
       async function fetchDogs() {
         try {
           const response = await fetch('/api/auth/alldog');
           if (response.ok) {
             const data = await response.json();
             const shuffled = data.sort(() => 0.5 - Math.random());
             setDogs(shuffled.slice(0,8));
           } else {
             console.error('Failed to fetch dogs:', response.statusText);
           }
         } catch (error) {
           console.error('Error fetching dogs:', error);
         }
       }
       fetchDogs();
     }
     , []);
     useEffect(() => {
         async function fetchArticles() {
           try {
             const response = await fetch('/api/auth/articles');
             if (response.ok) {
               const data = await response.json();
               setArticles(data);
             }
           } catch (error) {
             console.error('Error fetching articles:', error);
           }
         }
         fetchArticles();
       }, []);

    return (
         <div className='font-mitr'>
              <Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
              <HeroBanner />
              <main >
                <div className='flex flex-row gap-4'>
                    <h1 className="text-xl font-medium mb-4 text-customDarkblue mt-10 ml-64 pl-6">ค้นพบสุนัขที่ถูกใจสำหรับคุณ</h1>
                    <Link href="/AllDogs">
                          <button className='px-6 py-2   border-2 border-customDarkblue rounded-full border-customDarkblue font-small mt-9 '>
                              ดูสุนัขทั้งหมด
                          </button>
                    </Link>
                </div>
                <div className='mx-w-7xl w-full mx-auto  flex flex-col items-center justify-between'>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                    {dogs.length > 0 ? (
                      dogs.map((dog) => (
                    <Link href= {`/DogDetail/${dog.id}`} key={dog.id} >
                    <div key={dog.id} className="border rounded-2xl shadow-md overflow-hidden w-full max-w-xs mx-auto p-3"> 
                        <img
                          src={`/uploads/${dog.dogImage}`}
                            alt={dog.name}
                            className="w-full h-60 object-cover rounded-md"
                        />
                      <div className="mt-2 text-md font-small">
                            <p>ชื่อ :  {dog.name}</p>
                            <p>เพศ : {dog.gender === "MALE" ? "ผู้" : "เมีย"}</p>
                            <p>อายุ : {dog.estimatedAge} ปี</p>
                            <p>สายพันธุ์ : {dog.breed?.name || dog.customBreed || "-"}</p>
                        </div>
                      </div>
                      </Link>
                        ))
                        ) : (
                          <p className="text-gray-500">No dogs available.</p>
                        )}
                        </div>
                        </div>
                           {/* Section บทความ */}
                      <div className="max-w-7xl mx-auto mt-16">
                        <h2 className="text-xl font-medium mb-6 text-customDarkblue">บทความแนะนำ</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                          {articles.length > 0 ? (
                            articles.map(article => (
                              <Link href={`/ArticlesPage/${article.id}`} key={article.id}>
                                <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                                  <img
                                    src={`/uploads/${article.image}`}
                                    alt={article.title}
                                    className="w-full h-full object-cover rounded mb-4"
                                  />
                                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                                  <div className="text-gray-500 text-sm mb-2">
                                    {new Date(article.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <p className="text-gray-500">ไม่มีบทความ</p>
                          )}
                        </div>
                      </div>
                    </main>
              
            </div>
    )
}
/*const profilePicture = session?.user?.user_picture // Get the profile image from the session
  ? `/uploads/${session.user.user_picture}` // Adjust the path as needed
  : '/default-profile.jpg';*/