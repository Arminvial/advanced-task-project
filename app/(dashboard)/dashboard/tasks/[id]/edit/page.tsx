"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams(); 
  const taskId = params?.id as string;

  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      const res = await fetch(`/api/tasks/${taskId}`);
      if (!res.ok) {
        console.error("خطا در دریافت تسک");
        return;
      }
      const data = await res.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (res.ok) {
      router.push("/dashboard/tasks");
    } else {
      console.error("خطا در ویرایش تسک");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-bold">ویرایش تسک</h1>
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="border p-2 w-full"
        placeholder="عنوان تسک"
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="border p-2 w-full"
        placeholder="توضیحات تسک"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        ذخیره تغییرات
      </button>
    </form>
  );
}
