'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (res?.ok) {
      toast.success('ورود موفقیت‌آمیز بود!');
      router.push('/dashboard');
    } else {
      toast.error('اطلاعات ورود اشتباه است');
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 cursor-default">ورود به حساب کاربری</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input
              type="email"
              {...register('email', { required: 'ایمیل الزامی است' })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input
              type="password"
              {...register('password', { required: 'رمز عبور الزامی است' })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg cursor-pointer transition"
          >
            {isSubmitting ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          حساب ندارید؟{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            ساخت حساب
          </Link>
        </div>
      </div>
    </div>
  );
}
