'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (user.email === 'zauqcollection2@gmail.com') {
          setIsAdmin(true);
          setLoading(false);
        } else {
          setIsAdmin(false);
          setLoading(false);
          router.push('/');
          toast.error('Access denied. Admin only.');
        }
      } else {
        setLoading(false);
        router.push('/auth/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mx-auto"></div>
          <p className="text-white mt-4">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
          <p className="text-gray-400 mt-4">You don't have permission to access this page.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-2 bg-gold text-black rounded-full">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <header className="bg-black/95 border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gold">ZAUQ Admin</h1>
            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <button
              onClick={() => { auth.signOut(); router.push('/'); }}
              className="px-4 py-2 border border-white/20 text-white rounded-full text-sm hover:bg-white/10 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['dashboard', 'products', 'orders', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">Products</p>
                <p className="text-3xl font-bold text-gold">12</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">Orders</p>
                <p className="text-3xl font-bold text-blue-400">5</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-green-400">₹24,999</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Welcome to Admin Panel</h3>
              <p className="text-gray-400">
                You have access to manage products, orders, and view analytics.
              </p>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Products</h2>
              <button
                className="px-6 py-2 bg-gold text-black rounded-full font-semibold hover:bg-gold/80 transition"
              >
                + Add Product
              </button>
            </div>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <p className="text-gray-400 text-center py-8">
                Product management coming soon. You'll be able to add, edit, and delete products here.
              </p>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Orders</h2>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <p className="text-gray-400 text-center py-8">
                Order management coming soon. You'll be able to view and update orders here.
              </p>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-gold font-semibold mb-2">Total Revenue</h3>
                <p className="text-4xl font-bold text-white">₹24,999</p>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-gold font-semibold mb-2">Total Orders</h3>
                <p className="text-4xl font-bold text-white">5</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}