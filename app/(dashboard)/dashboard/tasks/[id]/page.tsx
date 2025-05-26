import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

async function getTask(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://advanced-task-project.vercel.app";

  const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function TaskDetails({ params }: PageProps) {
  const task = await getTask(params.id);

  if (!task) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{task.title}</h1>
      <p className="mt-2 text-gray-700">{task.description}</p>
    </div>
  );
}
