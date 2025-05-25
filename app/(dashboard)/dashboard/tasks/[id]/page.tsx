import { notFound } from "next/navigation";

async function getTask(id: string) {
  
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function TaskDetails({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);

  if (!task) return notFound();

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}
