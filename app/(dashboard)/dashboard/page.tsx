import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Task from "@/models/task";
import ChartClient from "@/components/ChartClient";





export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectDB();

  const userId = session.user?.id;
  const userName = session.user?.name ;

  const totalTasks = await Task.countDocuments({ userId });
  const completedTasks = await Task.countDocuments({ userId, status: "completed" });
  const inProgressTasks = await Task.countDocuments({ userId, status: "in_progress" });
  const pendingTasks = await Task.countDocuments({ userId, status: "pending" });

  const chartData = [
    { name: "انجام‌شده", value: completedTasks, color: "#22c55e" },
    { name: "در حال انجام", value: inProgressTasks, color: "#facc15" },
    { name: "منتظر اقدام", value: pendingTasks, color: "#ef4444" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-8 text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800 cursor-default">
            سلام، {userName} 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg cursor-default">
            به داشبوردت خوش اومدی! اینجا می‌تونی تسک‌هاتو مدیریت کنی.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="تعداد کل تسک‌ها" value={totalTasks} color="bg-blue-100 cursor-default" />
          <StatCard title="انجام‌شده‌ها" value={completedTasks} color="bg-green-100 cursor-default" />
          <StatCard title="در حال انجام" value={inProgressTasks} color="bg-yellow-100 cursor-default" />
          <StatCard title="منتظر اقدام" value={pendingTasks} color="bg-red-100 cursor-default" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/dashboard/tasks/create">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold cursor-pointer px-6 py-3 rounded-xl shadow transition-all duration-200 w-full md:w-auto">
              ساخت تسک جدید
            </button>
          </Link>
          <Link href="/dashboard/tasks">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer px-6 py-3 rounded-xl shadow transition-all duration-200 w-full md:w-auto">
              مشاهده لیست تسک‌ها
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mt-10">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 cursor-default">
            نمودار تسک‌ها
          </h2>
          <div className="w-full flex justify-center mr-10">
            <ChartClient data={chartData} />
          </div>
        </div>
      </div>
      
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className={`rounded-2xl shadow p-6 text-center ${color}`}>
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
