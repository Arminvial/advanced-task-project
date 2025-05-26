import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

async function getTask(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://advanced-task-project.vercel.app";

    const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("خطا در دریافت تسک:", error);
    return null;
  }
}

export default async function TaskPage({ params }: PageProps) {
  const task = await getTask(params.id);

  if (!task) return notFound();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-gray-700">{task.description}</p>
    </div>
  );
}
