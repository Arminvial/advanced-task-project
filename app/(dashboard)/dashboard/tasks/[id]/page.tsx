// app/(dashboard)/dashboard/tasks/[id]/page.tsx

import { notFound } from "next/navigation";

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://advanced-task-project.vercel.app";

  const res = await fetch(`${baseUrl}/api/tasks/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const task = await res.json();

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}
