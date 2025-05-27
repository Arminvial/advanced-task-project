import connectDB from "@/lib/mongodb";
import Task from "@/models/task";
import { getUserIdFromSession } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const userId = await getUserIdFromSession();

  const task = await Task.findOne({ _id: params.id, userId });

  if (!task) return notFound();

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}
