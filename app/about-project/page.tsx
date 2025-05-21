import {
  Code,
  ShieldCheck,
  Database,
  LayoutDashboard,
  Settings,
  MousePointerClick,
} from "lucide-react";

const features = [
  {
    icon: <Code className="w-6 h-6 text-purple-600" />,
    title: "تکنولوژی‌های فرانت‌اند",
    description:
      "Next.js، React، TypeScript، Tailwind CSS، Framer Motion، Axios/SWR، React Toastify، Lucide",
  },
  {
    icon: <Settings className="w-6 h-6 text-blue-600" />,
    title: "مدیریت State",
    description: "Redux Toolkit برای مدیریت وضعیت اپلیکیشن",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    title: "احراز هویت و امنیت",
    description: "NextAuth.js، bcryptjs، حفاظت از مسیرها و session-based auth",
  },
  {
    icon: <Database className="w-6 h-6 text-yellow-600" />,
    title: "بک‌اند و دیتابیس",
    description:
      "API Routes در Next.js، MongoDB با Mongoose، عملیات کامل CRUD",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-pink-600" />,
    title: "قابلیت‌ها",
    description:
      "ثبت‌نام، ورود، ساخت، ویرایش، حذف، Drag & Drop، نوتیفیکیشن، طراحی ریسپانسیو",
  },
  {
    icon: <MousePointerClick className="w-6 h-6 text-indigo-600" />,
    title: "رابط کاربری حرفه‌ای",
    description:
      "استفاده از Tailwind با طراحی تمیز، ریسپانسیو، رنگ‌بندی جذاب و تجربه کاربری عالی",
  },
];

export default function AboutProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 p-6 flex items-center justify-center">
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-300">
          درباره پروژه
        </h1>
        <p className="text-gray-700 leading-relaxed text-lg">
          این پروژه یک داشبورد مدیریت تسک است که با استفاده از تکنولوژی‌های مدرن از جمله
          <span className="font-semibold"> Next.js، Tailwind CSS، MongoDB و NextAuth.js </span>
          توسعه داده شده است. هدف از ساخت این پروژه نمایش مهارت‌های پیاده‌سازی رابط کاربری
          حرفه‌ای، ارتباط با دیتابیس، مدیریت کاربران و انجام عملیات CRUD به صورت کامل است.
          https://github.com/Arminvial
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <div>{item.icon}</div>
              <div>
                <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-snug">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-sm text-gray-500 text-center">
          طراحی شده با ❤️ توسط آرمین
        </div>
      </div>
    </div>
  );
}
