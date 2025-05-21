/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        toast.success('ثبت‌نام با موفقیت انجام شد!');
        router.push('/login');
      } else {
        toast.error('خطا در ثبت‌نام');
      }
    } catch (error) {
      toast.error('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 cursor-default">ساخت حساب کاربری</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              نام
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg cursor-pointer text-white font-semibold transition ${
              loading
                ? 'bg-pink-400 opacity-60 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            {loading ? 'در حال پردازش...' : 'ثبت‌نام'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          حساب دارید؟{' '}
          <Link href="/login" className="text-pink-600 hover:underline font-medium">
            ورود به حساب
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
