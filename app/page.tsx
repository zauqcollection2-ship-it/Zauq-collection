'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user?.email === 'zauqcollection2@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-gold">ZAUQ</span>
              <span className="ml-1 text-sm font-light text-white/70">COLLECTION</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {['Home', 'Men', 'Women', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                <Link key={item} href="#" className="text-sm text-white/70 hover:text-gold transition">
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <a href="tel:+923490656865" className="hidden lg:flex items-center space-x-2 text-sm text-white/50 hover:text-gold transition">
                <span>📞</span>
                <span>0349-0656865</span>
              </a>
              
              {/* Show Admin Panel button only for admin */}
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition"
                >
                  Admin Panel
                </Link>
              )}
              
              <Link href="/auth/login" className="px-4 py-2 bg-gold text-black rounded-full text-sm font-semibold hover:bg-gold/80 transition">
                Sign In
              </Link>
              <Link href="/auth/register" className="px-4 py-2 border border-white/20 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-gold/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 border border-gold text-gold text-xs tracking-widest uppercase rounded-full mb-6">
              Fall/Winter Collection 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-gold">Elevate Your</span>
              <br />
              <span className="text-white">Style With</span>
              <br />
              <span className="text-gold">ZAUQ</span>
            </h1>
            <p className="text-gray-400 mt-6 text-lg max-w-lg">
              Discover the perfect blend of tradition and modernity. Premium Pakistani fashion crafted for the discerning individual.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="#" className="px-8 py-3 bg-gold text-black rounded-full font-semibold hover:bg-gold/80 transition">
                Shop Now
              </Link>
              <Link href="#" className="px-8 py-3 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your homepage content */}
      {/* ... (keep your existing sections) ... */}

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/923490656865"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}