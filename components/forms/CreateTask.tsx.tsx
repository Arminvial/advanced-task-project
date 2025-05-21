/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

type FormValues = {
  title: string;
  description: string;
};

export default function CreateTask() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            تسک با موفقیت ایجاد شد!
          </div>
        );
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(
          <div className="flex items-center gap-2">
            <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
            مشکلی در ایجاد تسک رخ داد!
          </div>
        );
      }
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
          خطا در برقراری ارتباط با سرور!
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-xl mt-12"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white text-center cursor-default">
        ساخت تسک جدید
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* عنوان تسک */}
        <div>
          <label
            htmlFor="title"
            className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            عنوان تسک
          </label>
          <input
            id="title"
            type="text"
            placeholder="مثلا: مطالعه کردن"
            {...register("title", { required: "عنوان تسک الزامی است" })}
            className={`w-full px-5 py-3 border rounded-md focus:outline-none focus:ring-3 transition 
              ${
                errors.title
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              } dark:bg-gray-800 dark:text-white`}
          />
          {errors.title && (
            <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <ExclamationCircleIcon className="w-4 h-4" />
              {errors.title.message}
            </p>
          )}
        </div>

        {/* توضیحات تسک */}
        <div>
          <label
            htmlFor="description"
            className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            توضیحات
          </label>
          <textarea
            id="description"
            placeholder="توضیح کامل درباره تسک"
            rows={6}
            {...register("description", { required: "توضیحات تسک الزامی است" })}
            className={`w-full px-5 py-3 border rounded-md focus:outline-none focus:ring-3 transition resize-none
              ${
                errors.description
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              } dark:bg-gray-800 dark:text-white`}
          />
          {errors.description && (
            <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <ExclamationCircleIcon className="w-4 h-4" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* دکمه‌ها */}
        <div className="flex justify-between items-center">
          <motion.button
            type="button"
            onClick={() => router.push("/dashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-gray-300 dark:bg-gray-700 rounded-md cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-shadow shadow-sm"
          >
            بازگشت به داشبورد
          </motion.button>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: !isSubmitting ? 1.05 : 1 }}
            whileTap={{ scale: !isSubmitting ? 0.95 : 1 }}
            className={`flex items-center gap-2 px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-md shadow-md 
              hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "در حال ارسال..." : "ایجاد تسک"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
