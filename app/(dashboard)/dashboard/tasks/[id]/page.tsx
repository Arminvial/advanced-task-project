import { notFound } from "next/navigation";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const baseUrl = getBaseUrl();

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
