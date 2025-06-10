'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {useParams} from 'next/navigation';
import Navbar from '../../components/Navbar.jsx'
import Link from 'next/link';

export default function questionsFrom() {
    const { dogId } = useParams();
    const { data: session, status } = useSession();
    const router = useRouter();
    const[categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const isLoggedIn = true; // Check if the user is logged in
    const profilePicture = session?.user?.role === "shelter"
    ? `/uploads/${session?.user?.shelter_picture || "default-profile.jpg"}`
    : `/uploads/${session?.user?.user_picture || "default-profile.jpg"}`;
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch('/api/auth/questions');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                } 
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchQuestions();
    }, []);

    useEffect(() => {
       if (status === "loading") return; // Wait for session to load
       if (!session || session.user?.role !== "user") {
          setShowLoginMessage(true);
           setTimeout (() => {
               router.push('/LoginForm');
           },1500 )
       }
    }, [session, status, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (showLoginMessage) {
        return <div>กรุณาเข้าสู่ระบบก่อนที่จะรับเลี้ยง</div>;
    }

    const handleChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const answersArray = Object.entries(answers).map(([questionId, answerText]) => ({
            questionId,
            answerText
        }));

        const response = await fetch('/api/auth/AdoptionRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dogId,
                userId: session.user.id,
                answers: answersArray,
            }),
        });

        if (response.ok) {
            alert('ส่งคำขอรับเลี้ยงสำเร็จ!');
            router.push('/Home'); 

        } else {
            alert('เกิดข้อผิดพลาดในการส่งคำขอ');
        }
        
    };


    return(
        <div className='font-mitr'>
            <Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
            <h1 className="text-2xl font-bold mb-6 text-customDarkblue p-10 text-center">แบบสอบถามประเมินความพร้อมการรับเลี้ยงสุนัข</h1>
            <form onSubmit={handleSubmit} className='max-w-4xl mx-auto'>
                {categories.map(category => (
                    <div key={category.id} className="bg-customCream rounded-xl p-6 mb-10 shadow">
                        <h2 className='text-xl font-semibold mb-2'>{category.title}</h2>

                        <div className='space-y-10 mt-10'>
                            {category.questions.map((q,index) => (
                                <div key={q.id} className='flex items-start gap-4 '>

                                    {/* หมายเลขข้อ */}
                                    <div className="flex-shrink-0">
                                        <div className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center rounded-full mt-1">
                                            {index + 1}
                                        </div>
                                     </div>

                                    <div className='flex-1'>
                                    <label className="block font-small mb-1">{q.text}</label>
                                    {q.inputType === 'TEXT' && (
                                        <input
                                            type="text"
                                            className="border rounded px-3 py-2 w-full bg-gray-100"
                                            value={answers[q.id] || ''}
                                            onChange={e => handleChange(q.id, e.target.value)}
                                        />
                                    )}
                                    {q.inputType === 'RADIO' && q.options.map(opt => (
                                        <label key={opt} className="mr-4">
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={opt}
                                                checked={answers[q.id] === opt}
                                                onChange={e => handleChange(q.id, opt)}
                                                className="mr-1 bg-gray-100"
                                            /> {opt}
                                        </label>
                                    ))}
                                    {q.inputType === 'SELECT' && (
                                        <select
                                            className="border rounded px-3 py-2 w-full bg-gray-100"
                                            value={answers[q.id] || ''}
                                            onChange={e => handleChange(q.id, e.target.value)}
                                        >
                                            <option value="">เลือก...</option>
                                            {q.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                    <button
                        type="submit"
                        className="bg-customDarkblue text-white  px-6 py-2 rounded-full hover:bg-blue-700 transition block mx-auto w-64"
                    >
                        เสร็จสิ้น
                    </button>
            </form>
        </div>
    )

}