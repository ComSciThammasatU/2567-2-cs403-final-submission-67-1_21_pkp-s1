'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import Navbar from "../../components/Navbar";

export default function ArticlePage(){
    const { id } = useParams();
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(null);
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
        
    useEffect(() => {
    fetch('/api/auth/articles')
      .then(res => res.json())
      .then(setArticles);
  }, []);

    useEffect(() => {
    if (!id) return;
    fetch(`/api/auth/articles/${id}`)
      .then(res => res.json())
      .then(setArticle);
  }, [id]);
  
  if (!article) return <div>Loading...</div>;
  return (
    <div>
    <Navbar profilePicture={profilePicture} isLoggedIn={isLoggedIn} />
    <div className="font-mitr max-w-4xl mx-auto p-8">
      {/* Navbar หัวข้อบทความ */}
      <nav className="flex space-x-4 mb-8 border-b pb-4 overflow-x-auto">
        {articles.map(a => (
          <Link
            key={a.id}
            href={`/ArticlesPage/${a.id}`}
            className={`px-4 py-2 rounded-full transition 
              ${a.id === id ? 'bg-customDarkblue text-white' : 'bg-gray-100 text-customDarkblue hover:bg-customDarkblue hover:text-white'}`}
          >
            {a.title}
          </Link>
        ))}
      </nav>

      {/* เนื้อหาบทความ */}
      <h1 className="text-2xl font-semibold mb-4">{article.title}</h1>
      <img
        src={`/uploads/${article.image}`}
        alt={article.title}
        className="w-full h-80 object-contain rounded mb-6"
      />
      <div className="text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: article.content }} />
    </div> 
    </div>
  );
}