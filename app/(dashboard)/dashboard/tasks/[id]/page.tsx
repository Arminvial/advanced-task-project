/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const getTask = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
};

export default async function Page({ params }: PageProps) {
  const task = await getTask(params.id);

  if (!task) return notFound();

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}
