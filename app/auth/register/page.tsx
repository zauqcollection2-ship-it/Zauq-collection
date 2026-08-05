'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { auth } from '@/lib/firebase/config';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed!');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white/5 p-8 rounded-2xl w-full max-w-md border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-white">Create</span>
          <br />
          <span className="text-yellow-500">Account</span>
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 border border-white/10 focus:border-yellow-500 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 border border-white/10 focus:border-yellow-500 focus:outline-none"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-yellow-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}