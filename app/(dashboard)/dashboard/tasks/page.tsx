"use client";
import fetcher from "@/lib/fetcher";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
}

export default function TaskListPage() {
  const { data: session, status } = useSession();
  const {
    data: tasks,
    error,
    isLoading,
    mutate,
  } = useSWR<Task[]>(session ? `/api/tasks` : null, fetcher);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  if (status === "loading")
    return (
      <p className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></p>
    );
  if (!session)
    return (
      <p className="text-center mt-10 text-red-600">
        برای مشاهده تسک‌ها باید وارد شوید.
      </p>
    );
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <p className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></p>
      </div>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">خطا در دریافت تسک‌ها</p>
    );

  const filteredTasks = (tasks ?? [])
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const groupedTasks = {
    pending: [] as Task[],
    in_progress: [] as Task[],
    completed: [] as Task[],
  };

  filteredTasks.forEach((task) => {
    groupedTasks[task.status].push(task);
  });

  const handleChangeStatus = async (taskId: string, status: Task["status"]) => {
    try {
      await axios.patch(`/api/tasks/${taskId}`, { status });
      toast.success("وضعیت تسک تغییر یافت");
      console.log("Changing status for:", taskId, "to", status);
      mutate(undefined, true);
      const updatedTasks = await mutate(undefined, true);
      console.log("Updated tasks:", updatedTasks);
    } catch {
      toast.error("خطا در تغییر وضعیت تسک");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;
    handleChangeStatus(draggableId, destination.droppableId as Task["status"]);
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return toast.error("عنوان تسک نمی‌تواند خالی باشد");
    if (!editingTaskId) return toast.error("تسکی برای ویرایش انتخاب نشده است");
    try {
      await axios.put(`/api/tasks/${editingTaskId}`, {
        title: editTitle,
        description: editDescription,
      });
      toast.success("تسک ویرایش شد");
      mutate();
      handleCancelEdit();
    } catch {
      toast.error("خطا در ویرایش تسک");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("تسک حذف شد");
      mutate();
    } catch {
      toast.error("خطا در حذف تسک");
    }
  };

  const columns: { id: Task["status"]; title: string; color: string }[] = [
    { id: "pending", title: "در انتظار", color: "bg-yellow-50" },
    { id: "in_progress", title: "در حال انجام", color: "bg-blue-50" },
    { id: "completed", title: "انجام شده", color: "bg-green-50" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-4">
        <Link href="/dashboard">
          <button className="bg-blue-500 hover:bg-blue-200 cursor-pointer text-gray-800 font-semibold py-2 px-4 transition-all duration-200 rounded shadow">
            ← بازگشت به داشبورد
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">مدیریت تسک‌ها</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="جستجو در عنوان تسک..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-1/2"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="border border-gray-300 p-2 px-2 rounded"
        >
          <option value="newest">جدیدترین</option>
          <option value="oldest">قدیمی‌ترین</option>
        </select>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-xl p-4 min-h-[400px] shadow-md ${column.color}`}
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
                    {column.title}
                  </h2>
                  {groupedTasks[column.id]?.length === 0 && (
                    <p className="text-center text-gray-400 text-sm">
                      هیچ تسکی وجود ندارد
                    </p>
                  )}
                  {groupedTasks[column.id]?.map((task, index) => (
                    <Draggable
                      draggableId={task._id}
                      index={index}
                      key={task._id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {editingTaskId === task._id ? (
                            <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg mb-3 space-y-2 shadow-sm">
                              {/* فرم ویرایش */}
                              <input
                                className="border p-2 rounded w-full"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                              />
                              <textarea
                                className="border p-2 rounded w-full"
                                value={editDescription}
                                onChange={(e) =>
                                  setEditDescription(e.target.value)
                                }
                              />
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={handleSaveEdit}
                                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                  ذخیره
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                                >
                                  لغو
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white border p-4 rounded-xl shadow-sm mb-3">
                              <h3 className="font-semibold text-gray-800">
                                {task.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {task.description}
                              </p>
                              <div className="flex justify-end gap-3 mt-3">
                                <button
                                  onClick={() => handleEdit(task)}
                                  className="text-blue-500 hover:underline cursor-pointer"
                                >
                                  ویرایش
                                </button>
                                <button
                                  onClick={() => handleDelete(task._id)}
                                  className="text-red-500 hover:underline cursor-pointer"
                                >
                                  حذف
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
