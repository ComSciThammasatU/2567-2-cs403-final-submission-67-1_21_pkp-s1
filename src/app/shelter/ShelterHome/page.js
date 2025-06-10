'use client'
import React from 'react'
import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Navbar from '../../components/Navbar.jsx'
import Footer from '../../components/Footer.jsx'


export default function ShelterHome() {
     const { data: session, status } = useSession()
     const isLoggedIn = !!session; // Check if the user is logged in
    const profilePicture = session?.user?.shelter_picture // Get the profile image from the session
    ? `/uploads/${session.user.shelter_picture}` // Adjust the path as needed
    : '/default-profile.jpg';
    
    useEffect(() => {
            console.log("Session data:", session);
        }, [session]);
    return (
        <div>
            <Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">shelter Home</h1>
            <p className="text-lg">Welcome to your Shelter home page!</p>
            <p>Email: {session.user.email}</p>
            <p className="text-lg">You can add more content here.</p>
            </div>
            <Footer />
        </div>
    )
}